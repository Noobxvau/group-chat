import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { updateProfile } from 'firebase/auth';
import { User, Camera } from 'lucide-react';

export default function Profile() {
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || '');
  const [message, setMessage] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: displayName
        });
        setMessage('প্রোফাইল আপডেট সফল হয়েছে!');
      }
    } catch (error) {
      setMessage('প্রোফাইল আপডেট ব্যর্থ হয়েছে।');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-8">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            {auth.currentUser?.photoURL ? (
              <img
                src={auth.currentUser.photoURL}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white">
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>

      <form onSubmit={handleUpdateProfile}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            নাম
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ইমেইল
          </label>
          <input
            type="email"
            value={auth.currentUser?.email || ''}
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {message && (
          <div className={`mb-4 text-sm ${message.includes('সফল') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          প্রোফাইল আপডেট করুন
        </button>
      </form>
    </div>
  );
}