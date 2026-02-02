import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import Benchmarks from './pages/Benchmarks'
import Inventory from './pages/Inventory'

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="flex min-h-screen bg-[#03050a] text-white font-sans selection:bg-indigo-500/30">

            {/* Sidebar Navigation */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content Area */}
            <main className="flex-1 ml-0 md:ml-64 relative min-h-screen transition-all duration-300">
                {/* Top Bar */}
                <Topbar title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} />

                {/* Dynamic Content */}
                <div className="animate-fade-in relative z-10">
                    {activeTab === 'dashboard' && <Dashboard />}
                    {activeTab === 'benchmarks' && <Benchmarks />}
                    {activeTab === 'inventory' && <Inventory />}
                    {activeTab === 'tunnels' && (
                        <div className="flex items-center justify-center h-[calc(100vh-64px)] text-gray-500">
                            Gateway Tunnel Manager (Coming Soon)
                        </div>
                    )}
                    {activeTab === 'settings' && (
                        <div className="flex items-center justify-center h-[calc(100vh-64px)] text-gray-500">
                            System Settings (Coming Soon)
                        </div>
                    )}
                </div>
            </main>

        </div>
    )
}

export default App
