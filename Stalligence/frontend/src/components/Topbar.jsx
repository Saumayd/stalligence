import React from 'react';
import { Bell, Search } from 'lucide-react';

const Topbar = ({ title }) => {
    return (
        <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-stalligence-bg/60 backdrop-blur-md border-b border-gray-800 z-40 flex items-center justify-between px-6">
            <h2 className="text-xl font-semibold text-white tracking-wide">{title}</h2>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center bg-gray-900/50 border border-gray-800 rounded-full px-4 py-1.5 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
                    <Search size={16} className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search SKU, Order ID..."
                        className="bg-transparent border-none outline-none text-sm text-gray-300 ml-2 w-48 placeholder-gray-600"
                    />
                </div>

                <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse"></span>
                </button>
            </div>
        </header>
    );
};

export default Topbar;
