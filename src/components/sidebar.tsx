
import { Plus, Search, MessageSquare } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-80 bg-gray-900 text-white flex flex-col p-4">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold">TalkPDF</h1>
      </div>
      <button className="flex items-center justify-center py-2 px-4 bg-gray-700 rounded-md mb-8 hover:bg-gray-600">
        <Plus className="w-5 h-5 mr-2" />
        New Document
      </button>
      <div className="relative mb-8">
        <Search className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input type="text" placeholder="Search" className="w-full bg-gray-800 border border-gray-700 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-400">12 Mar 2024</p>
        <p>Product Requir...</p>
      </div>
      <h2 className="text-lg font-semibold mb-4">Search History</h2>
      <ul>
        <li className="flex items-center mb-2">
          <MessageSquare className="w-5 h-5 mr-2 text-gray-400" />
          what are the biggest risk in plan
        </li>
        <li className="flex items-center mb-2">
          <MessageSquare className="w-5 h-5 mr-2 text-gray-400" />
          write a Linkedin post about this...
        </li>
        <li className="flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-gray-400" />
          who will approve the final budget
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
