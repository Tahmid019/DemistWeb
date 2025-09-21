
"use client";
import { useState } from 'react';
import Chat from '../components/chat';
import FileUpload from '../components/file-upload';
import { Bell, FileText, ChevronDown, Menu, MessageCircle, X } from 'lucide-react';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/firebase/config';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import Sidebar from '../components/sidebar';

export default function Home() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [user] = useAuthState(auth);

  const handleFileUrlChange = (url: string) => {
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
    <div className="flex h-screen bg-slate-100">
      <div className={`fixed inset-y-0 left-0 z-30 w-80 bg-slate-900 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
        <Sidebar />
      </div>
      {sidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
      <main className="flex-1 flex flex-col p-4 md:p-8 relative">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button className="md:hidden mr-4" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex items-center">
              <FileText className="w-6 h-6 mr-3 text-gray-500" />
              <h1 className="text-xl font-bold text-gray-800">Product Requirements</h1>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Bell className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
            {user ? (
              <div className="flex items-center gap-3">
                {user.photoURL && <Image src={user.photoURL} alt={user.displayName || 'user avatar'} width={40} height={40} className="rounded-full" />}
                <div>
                  <p className="font-semibold text-gray-800">{user.displayName}</p>
                  <p className="text-sm text-gray-500">Free Plan</p>
                </div>
                <ChevronDown className="w-5 h-5 text-gray-500 cursor-pointer" />
                <button onClick={handleSignOut} className="ml-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold">
                  Sign Out
                </button>
              </div>
            ) : (
              <button onClick={handleSignIn} className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <Image src="/google-logo.svg" alt="Google logo" width={20} height={20} />
                <span className="font-semibold">Sign in with Google</span>
              </button>
            )}
          </div>
        </header>
        <div className="flex-1 flex flex-col md:flex-row gap-8">
          <div className="flex-1 rounded-lg bg-white p-6 shadow-md">
            {fileUrl ? (
              <iframe src={fileUrl} className="w-full h-full rounded-lg" title="PDF document" />
            ) : (
              <FileUpload onFileUrlChange={handleFileUrlChange} />
            )}
          </div>
          <div className="hidden md:flex w-full md:w-96 flex-col">
            <Chat />
          </div>
        </div>

        {chatOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-slate-100 flex flex-col">
            <div className="flex justify-end p-4">
              <button onClick={() => setChatOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 flex flex-col px-4 pb-4">
              <Chat />
            </div>
          </div>
        )}

        <button
          onClick={() => setChatOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-30 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </main>
    </div>
  );
}
