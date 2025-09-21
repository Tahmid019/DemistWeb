
"use client";
import { useState } from 'react';
import Chat from '../components/chat';
import FileUpload from '../components/file-upload';
import { Bell } from 'lucide-react';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/firebase/config';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export default function Home() {
  const [fileUrl, setFileUrl] = useState(null);
  const [user] = useAuthState(auth);

  const handleFileUrlChange = (url) => {
    setFileUrl(url);
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
    <div className="flex h-full bg-gray-100">
      <div className="flex-1 w-1/2 p-4 flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b">
          <h1 className="text-lg font-bold">Product Requirements Doc.pdf</h1>
          <div className="flex items-center">
            <Bell className="w-5 h-5 mr-4 text-gray-500" />
            {user ? (
              <div className="flex items-center">
                {user.photoURL && <Image src={user.photoURL} alt={user.displayName || 'user avatar'} width={32} height={32} className="rounded-full" />}
                <span className="ml-2 font-semibold">{user.displayName}</span>
                <button onClick={handleSignOut} className="ml-4 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">
                  Sign Out
                </button>
              </div>
            ) : (
              <button onClick={handleSignIn} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Sign in with Google
              </button>
            )}
          </div>
        </div>
        <div className="flex-grow mt-4 h-[calc(100%-4rem)]">
          {fileUrl ? (
            <iframe src={fileUrl} className="w-full h-full" title="PDF document" />
          ) : (
            <FileUpload onFileUrlChange={handleFileUrlChange} />
          )}
        </div>
      </div>
      <div className="w-1/3 border-l border-gray-200">
        <Chat />
      </div>
    </div>
  );
}
