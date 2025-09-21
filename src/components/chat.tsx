
'use client'
import { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../app/firebase/config';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  timestamp: Timestamp | null;
  isUser: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'chats'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages: Message[] = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = {
        id: 'welcome',
        text: 'Hello! I am your AI assistant. Upload a document and I will help you with any questions you have.',
        timestamp: null,
        isUser: false,
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    await addDoc(collection(db, 'chats'), {
      text: input,
      timestamp: serverTimestamp(),
      isUser: true,
    });

    // Simulate a bot response for demonstration
    setTimeout(async () => {
      await addDoc(collection(db, 'chats'), {
        text: `This is a simulated response to: "${input}" `,
        timestamp: serverTimestamp(),
        isUser: false,
      });
    }, 1000);

    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Chat with Document</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start gap-3 ${message.isUser ? 'flex-row-reverse' : ''}`}>
                {!message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    AI
                  </div>
                )}
                <div className={`p-3 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-slate-100 text-gray-800'}`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t">
        <form onSubmit={sendMessage} className="flex items-center bg-slate-100 rounded-lg p-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700"
            placeholder="Ask a question..."
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
