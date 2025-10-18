
import React, { useState } from 'react';
import type { UserProfile } from '../types';

interface UserProfilePageProps {
  onLogout: () => void;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ onLogout }) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    bloodGroup: 'O+',
    age: 28,
    emergencyContact: 'Jane Doe (555-876-5432)',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({...prev, [name]: name === 'age' ? parseInt(value) : value}));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <button onClick={() => setIsEditing(!isEditing)} className="text-sm font-medium text-primary hover:underline">
                {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
        </div>

        <div className="space-y-6">
          <ProfileField label="Name" value={profile.name} name="name" isEditing={isEditing} onChange={handleInputChange} />
          <ProfileField label="Email" value={profile.email} name="email" isEditing={isEditing} onChange={handleInputChange} type="email" />
          <ProfileField label="Age" value={profile.age.toString()} name="age" isEditing={isEditing} onChange={handleInputChange} type="number" />
          <ProfileField label="Blood Group" value={profile.bloodGroup} name="bloodGroup" isEditing={isEditing} onChange={handleInputChange} />
          <ProfileField label="Emergency Contact" value={profile.emergencyContact} name="emergencyContact" isEditing={isEditing} onChange={handleInputChange} />
        </div>

        <div className="mt-10 flex items-center justify-between">
            {isEditing ? (
                 <button onClick={() => setIsEditing(false)} className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    Save Changes
                </button>
            ) : (
                 <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
                    Share Live Location
                </button>
            )}
            <button onClick={onLogout} className="px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
                Logout
            </button>
        </div>
      </div>
    </div>
  );
};

interface ProfileFieldProps {
    label: string;
    value: string;
    name: keyof UserProfile;
    isEditing: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value, name, isEditing, onChange, type = 'text' }) => (
    <div>
        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</label>
        {isEditing ? (
             <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full mt-1 p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
             />
        ) : (
            <p className="text-lg font-semibold text-gray-800 dark:text-white mt-1">{value}</p>
        )}
    </div>
);


export default UserProfilePage;
