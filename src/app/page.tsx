
"use client";
import { useState } from 'react';
import Chat from '../components/chat';
import FileUpload from '../components/file-upload';
import { FileText } from 'lucide-react';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/firebase/config';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export default function Home() {
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('New Document');
  const [user] = useAuthState(auth);

  const handleTextExtracted = (text: string, name: string) => {
    setExtractedText(text);
    setFileName(name);
  };

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-[#0D1117] text-white">
      <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-700 px-6">
        <h1 className="text-xl font-bold">TalkPDF</h1>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {user.photoURL && <Image src={user.photoURL} alt={user.displayName || 'user avatar'} width={32} height={32} className="rounded-full" />}
              <p className="font-semibold">{user.displayName}</p>
              <button onClick={handleSignOut} className="ml-2 text-sm text-gray-400 hover:text-white">
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={handleSignIn} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700">
              Sign in with Google
            </button>
          )}
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col border-r border-gray-700 bg-[#161B22]">
          <div className="flex h-14 items-center justify-between border-b border-gray-700 px-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span className="font-semibold">{fileName}</span>
            </div>
          </div>
          <div className="flex-1 p-6">
             <FileUpload onTextExtracted={handleTextExtracted} />
          </div>
        </div>
        <div className="w-full flex-1 md:w-1/2">
          <Chat extractedText={extractedText} fileName={fileName} />
        </div>
      </div>
    </div>
  );
}
