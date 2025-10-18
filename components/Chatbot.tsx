
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChatMessage } from '../types';
import { streamChatResponse } from '../services/geminiService';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', role: 'system', text: "Disclaimer: This chatbot provides first-aid information only, not medical diagnosis. In case of a serious emergency, please call your local emergency number immediately." },
        { id: '2', role: 'model', text: 'Hello! How can I assist you with your emergency?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim() && !imageFile) return;

        const userInput: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            ...(imagePreview && { image: imagePreview })
        };

        setMessages(prev => [...prev, userInput]);
        setInput('');
        setImageFile(null);
        setImagePreview(null);
        setIsLoading(true);

        const currentInput = input;
        const currentImageFile = imageFile;
        
        try {
            const stream = await streamChatResponse(messages.filter(m => m.role !== 'system'), currentInput, currentImageFile || undefined);

            let modelResponse = '';
            const modelMessageId = (Date.now() + 1).toString();
            setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '...' }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => prev.map(m => m.id === modelMessageId ? { ...m, text: modelResponse } : m));
            }

        } catch (error) {
            console.error("Gemini API error:", error);
            const errorMessageId = (Date.now() + 1).toString();
            setMessages(prev => [...prev, { id: errorMessageId, role: 'model', text: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    
    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-primary text-white rounded-full p-4 shadow-lg"
                >
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    )}
                </motion.button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        className="fixed bottom-24 right-6 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
                    >
                        <header className="p-4 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700">
                            <h3 className="font-bold text-center">AI First-Aid Assistant</h3>
                        </header>
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'system' ? (
                                        <div className="w-full text-xs text-center p-2 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 rounded-lg">{msg.text}</div>
                                    ) : (
                                        <div className={`max-w-[80%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                            {msg.image && <img src={msg.image} alt="user upload" className="rounded-lg mb-2 max-h-40" />}
                                            <p className="whitespace-pre-wrap">{msg.text}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <footer className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                            {imagePreview && (
                                <div className="relative mb-2 w-20 h-20">
                                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover rounded-md" />
                                    <button onClick={() => { setImageFile(null); setImagePreview(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs">&times;</button>
                                </div>
                            )}
                            <div className="flex items-center space-x-2">
                                <button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-500 hover:text-primary dark:hover:text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </button>
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                                    disabled={isLoading}
                                />
                                <button onClick={handleSendMessage} disabled={isLoading} className="p-2 bg-primary text-white rounded-full disabled:bg-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </button>
                            </div>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
