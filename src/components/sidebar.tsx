
import { Plus, Search, FileText, Folder } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-80 bg-slate-900 text-white flex flex-col p-6">
      <div className="flex items-center mb-10">
        <FileText className="w-8 h-8 mr-3 text-blue-500" />
        <h1 className="text-2xl font-bold">TalkPDF</h1>
      </div>
      <button className="flex items-center justify-center py-3 px-4 bg-blue-600 rounded-lg mb-10 hover:bg-blue-700 transition-colors shadow-lg">
        <Plus className="w-5 h-5 mr-2" />
        <span className="font-semibold">New Document</span>
      </button>
      <div className="relative mb-10">
        <Search className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input type="text" placeholder="Search documents..." className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500" />
      </div>
      
      <div className="flex items-center mb-4">
        <Folder className="w-5 h-5 mr-3 text-gray-400" />
        <h2 className="text-lg font-semibold">History</h2>
      </div>
      <div className="space-y-4">
        <div className="p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
          <p className="font-semibold">Product Requirements</p>
          <p className="text-sm text-gray-400">12 Mar 2024</p>
        </div>
        <div className="p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
          <p className="font-semibold">Marketing Plan</p>
          <p className="text-sm text-gray-400">10 Mar 2024</p>
        </div>
        <div className="p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
          <p className="font-semibold">Financial Projections</p>
          <p className="text-sm text-gray-400">8 Mar 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
