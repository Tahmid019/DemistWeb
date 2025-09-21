
"use client";
import { useState } from 'react';
import { Send } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../app/firebase/config';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [user] = useAuthState(auth);

  const [messages, loading, error] = useCollection(
    query(collection(db, 'chats'), orderBy('timestamp', 'asc'))
  );

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '' || !user) return;

    try {
      await addDoc(collection(db, 'chats'), {
        text: message,
        timestamp: serverTimestamp(),
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      setMessage('');
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-4 overflow-y-auto">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {messages && messages.docs.map(doc => {
          const data = doc.data();
          const isUser = data.uid === user?.uid;
          return (
            <div key={doc.id} className={`flex items-start mb-4 ${isUser ? 'justify-end' : ''}`}>
              <div className={`p-3 text-sm rounded-lg ${isUser ? 'text-white bg-blue-600' : 'bg-gray-200'}`}>
                <p>{data.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={sendMessage} className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message"
            className="w-full py-2 pl-4 pr-12 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!user}
          />
          <button type="submit" className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-blue-600 rounded-r-md hover:bg-blue-700" disabled={!user}>
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
