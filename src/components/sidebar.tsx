
"use client";
import { useState } from "react";
import { ChevronLeft, File, Search, Plus, MessageCircle } from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`flex flex-col bg-[#0c0c0d] text-white transition-all duration-300 ${isCollapsed ? "w-20" : "w-80"}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && <h1 className="text-lg font-bold">TalkPDF</h1>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 rounded-md hover:bg-gray-700">
          <ChevronLeft className={`transform transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
        </button>
      </div>
      <div className="flex-grow p-4">
        <button className="flex items-center justify-center w-full py-2 mb-4 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          {!isCollapsed && <span className="ml-2">New Document</span>}
        </button>
        <div className="relative mb-4">
          <Search className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" />
          {!isCollapsed && <input type="text" placeholder="Search" className="w-full py-2 pl-10 pr-4 text-white bg-gray-700 rounded-md focus:outline-none" />}
        </div>
        <div className="p-2 mb-4 bg-gray-800 rounded-md">
          <div className="flex items-center text-sm text-gray-400">
            <File className="w-4 h-4 mr-2" />
            {!isCollapsed && <span>Product Requir...</span>}
          </div>
          {!isCollapsed && <p className="text-xs text-gray-500">12 Mar 2024</p>}
        </div>
        <h2 className="mb-2 text-sm text-gray-400">Search History</h2>
        <ul className="space-y-2">
          <li className="flex items-center text-sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            {!isCollapsed && <span>what are the biggest risk in plan?</span>}
          </li>
          <li className="flex items-center text-sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            {!isCollapsed && <span>write a LinkedIn post about this...</span>}
          </li>
          <li className="flex items-center text-sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            {!isCollapsed && <span>who will approve the final budget.</span>}
          </li>
        </ul>
        
      </div>
    </div>
  );
};

export default Sidebar;