
'use client'
import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp, where } from 'firebase/firestore';
import { db, auth } from '../app/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Send } from 'lucide-react';
import Image from 'next/image';
import { getAiResponse } from '../app/actions';

interface Message {
  id: string;
  text: string;
  timestamp: Timestamp | null;
  isUser: boolean;
  userId?: string;
  fileName?: string;
}

const Chat = ({ extractedText, fileName }: { extractedText: string | null; fileName: string }) => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!user) {
      setMessages([{
        id: 'welcome',
        text: 'Please sign in to start a conversation.',
        timestamp: null,
        isUser: false,
      }]);
      return;
    }

    if (!extractedText) {
      setMessages([{
        id: 'welcome',
        text: 'Hello! Upload a document and I will help you with any questions you have.',
        timestamp: null,
        isUser: false,
      }]);
      return;
    }

    const q = query(
      collection(db, 'chats'),
      where('userId', '==', user.uid),
      where('fileName', '==', fileName),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setMessages([{
          id: 'welcome',
          text: `Document "${fileName}" is ready. Ask me anything.`,
          timestamp: null,
          isUser: false,
        }]);
      } else {
        const msgs: Message[] = [];
        querySnapshot.forEach((doc) => {
          msgs.push({ id: doc.id, ...doc.data() } as Message);
        });
        setMessages(msgs);
      }
    });

    return () => unsubscribe();
  }, [user, extractedText, fileName]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || !user || !extractedText) return;

    const userInput = input;
    setInput('');

    await addDoc(collection(db, 'chats'), {
      text: userInput,
      timestamp: serverTimestamp(),
      isUser: true,
      userId: user.uid,
      fileName: fileName,
    });

    const aiResponseText = await getAiResponse(userInput, extractedText);

    await addDoc(collection(db, 'chats'), {
      text: aiResponseText,
      timestamp: serverTimestamp(),
      isUser: false,
      userId: user.uid,
      fileName: fileName,
    });
  };

  return (
    <div className="flex h-full flex-col bg-[#0D1117]">
      <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-gray-700 px-6">
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        {messages.map((message) => (
          <div key={message.id} className={`flex items-start gap-3 ${message.isUser ? 'flex-row-reverse' : ''}`}>
            {!message.isUser && (
              <div className="h-8 w-8 flex-shrink-0 rounded-full bg-blue-600 flex items-center justify-center">
                <Image src="/logo.svg" alt="AI" width={20} height={20} />
              </div>
            )}
            <div className={`max-w-xs rounded-lg p-3 md:max-w-md ${message.isUser ? 'bg-blue-600' : 'bg-gray-700'}`}>
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-700 p-4">
        <form onSubmit={sendMessage} className="flex items-center rounded-lg bg-gray-700 px-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent py-3 px-2 text-sm text-white placeholder-gray-400 focus:outline-none"
            placeholder={!user ? "Please sign in to chat" : !extractedText ? "Please upload a document" : "Ask a question..."}
            disabled={!extractedText || !user}
          />
          <button type="submit" className="rounded-md p-2 text-gray-400 hover:text-white hover:bg-gray-600" disabled={!extractedText || !user}>
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
