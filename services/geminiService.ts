
import { GoogleGenAI } from "@google/genai";
import type { ChatMessage } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const model = ai.models;

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const streamChatResponse = async (history: ChatMessage[], latestMessage: string, imageFile?: File) => {
    const contents = history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
    }));

    const userParts = [{ text: latestMessage }];
    if (imageFile) {
        const imagePart = await fileToGenerativePart(imageFile);
        userParts.unshift(imagePart as any);
    }
    contents.push({ role: 'user', parts: userParts as any});

    const systemInstruction = "You are an AI assistant specialized in providing first-aid guidance. Your primary goal is to offer clear, concise, and safe first-aid steps for various emergency situations. Analyze any images provided to understand the context of the injury. IMPORTANT: You must not provide medical diagnoses. Always include a disclaimer that your advice is not a substitute for professional medical help and that users should call emergency services for serious conditions. Structure your responses for clarity and quick comprehension.";

    const stream = await model.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: contents as any,
        config: {
            systemInstruction: systemInstruction,
        }
    });

    return stream;
};
