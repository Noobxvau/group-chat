import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { Send, LogOut, User } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    });

    return unsubscribe;
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      sender: auth.currentUser.email,
      senderName: auth.currentUser.displayName,
      timestamp: serverTimestamp()
    });

    setNewMessage('');
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="bg-blue-500 p-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">টেলিগ্রাম ক্লোন</h1>
        <div className="flex items-center space-x-4">
          <Link
            to="/profile"
            className="text-white hover:bg-blue-600 p-2 rounded-full"
          >
            <User className="w-6 h-6" />
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:bg-blue-600 p-2 rounded-full"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === auth.currentUser?.email ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                msg.sender === auth.currentUser?.email
                  ? 'bg-blue-500 text-white'
                  : 'bg-white'
              }`}
            >
              <p className="text-xs opacity-75 mb-1">{msg.senderName || msg.sender}</p>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="মেসেজ লিখুন..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}