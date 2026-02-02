import React from 'react';
import { LayoutDashboard, BarChart3, Package, Settings, Zap } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'benchmarks', label: 'Benchmarks', icon: BarChart3 },
        { id: 'inventory', label: 'Inventory', icon: Package },
        { id: 'tunnels', label: 'Tunnels', icon: Zap },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-stalligence-bg/80 backdrop-blur-xl border-r border-gray-800 flex flex-col z-50 transition-all duration-300">
            <div className="h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-gray-800">
                <div className="w-8 h-8 rounded bg-gradient-to-tr from-indigo-500 to-purple-500 mr-0 md:mr-3 flex-shrink-0"></div>
                <span className="hidden md:block font-bold text-xl tracking-wider text-white">STALLIGENCE</span>
            </div>

            <nav className="flex-1 py-6 flex flex-col gap-2 px-2 md:px-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center justify-center md:justify-start p-3 md:px-4 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                    ? 'bg-stalligence-accent/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)] border border-stalligence-accent/30'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon size={22} className={`relative z-10 ${isActive ? 'text-indigo-400' : ''}`} />
                            <span className="hidden md:block ml-3 font-medium relative z-10">{item.label}</span>
                            {isActive && <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-50" />}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center justify-center md:justify-start p-2 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white">SA</div>
                    <div className="hidden md:block ml-3">
                        <p className="text-sm font-medium text-white">Admin</p>
                        <p className="text-xs text-gray-400">Pro Plan</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
