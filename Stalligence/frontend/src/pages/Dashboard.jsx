import React from 'react';
import { TrendingUp, ShoppingBag, Clock, AlertTriangle, Loader2 } from 'lucide-react';
import useProductData from '../hooks/useProductData';

const StatCard = ({ title, value, subtext, icon: Icon, trend }) => (
    <div className="glass-card group">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
            </div>
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                <Icon size={24} />
            </div>
        </div>

        <div className="flex items-center">
            {trend !== undefined && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${trend > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'} mr-2`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            )}
            <p className="text-gray-500 text-xs">{subtext}</p>
        </div>

        {/* Decorative gradient glow */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl group-hover:bg-indigo-600/20 transition-all duration-500 pointer-events-none" />
    </div>
);

const PlatformPill = ({ name, status, price, stock }) => (
    <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-800 mb-2 hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`} />
            <div>
                <span className="text-sm font-medium text-gray-300 block">{name}</span>
                <span className="text-xs text-gray-500">Stock: {stock}</span>
            </div>
        </div>
        <span className="text-sm font-mono text-indigo-400">₹{price.toLocaleString()}</span>
    </div>
);

const Dashboard = () => {
    // Hardcoded SKU for demo
    const { data, loading, error, latency } = useProductData('BUDS-V2-BLK');

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                <p className="text-gray-400 animate-pulse">Establishing Secure Uplink to Aggregator...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-red-400">
                <AlertTriangle className="w-12 h-12 mb-4" />
                <p>Connection Failed: {error.message}</p>
                <p className="text-sm text-gray-500 mt-2">Ensure Backend is running on Port 8000</p>
            </div>
        );
    }

    const platforms = data?.platforms || [];
    const lowestPrice = data?.lowest_price || 0;
    const priceGap = data?.price_gap || 0;

    // Calculate aggregate stats from platforms for demo purposes
    const totalStock = platforms.reduce((acc, p) => acc + p.stock, 0);

    return (
        <div className="p-6 pt-24 pb-12 max-w-7xl mx-auto space-y-6 animate-fade-in">

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Lowest Price"
                    value={`₹ ${lowestPrice.toLocaleString()}`}
                    subtext={`Market Gap: ₹ ${priceGap}`}
                    icon={TrendingUp}
                    trend={12.5}
                />
                <StatCard
                    title="Total Inventory"
                    value={totalStock}
                    subtext="Across all nodes"
                    icon={ShoppingBag}
                    trend={-2.3}
                />
                <StatCard
                    title="Sys Latency"
                    value={`${latency}ms`}
                    subtext="Roundtrip Time"
                    icon={Clock}
                    trend={(latency < 200 ? 5 : -5)}
                />
                <StatCard
                    title="Active Tunnels"
                    value={platforms.length}
                    subtext="Healthy Connections"
                    icon={AlertTriangle}
                />
            </div>

            {/* Main Grid Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto">

                {/* Chart Area (Placeholder) */}
                <div className="lg:col-span-2 glass-card min-h-[400px]">
                    <h3 className="text-lg font-semibold text-white mb-6">Price Trend Analytics</h3>
                    <div className="w-full h-64 flex items-end justify-between gap-2 px-4 border-b border-gray-800 pb-2">
                        {[35, 60, 45, 80, 55, 70, 40, 50, 65, 85, 95, 75].map((h, i) => (
                            <div key={i} className="w-full bg-indigo-500/20 hover:bg-indigo-500/40 transition-all rounded-t-sm relative group" style={{ height: `${h}%` }}>
                                <div className="absolute top-0 w-full h-1 bg-indigo-500 shadow-[0_0_10px_indigo]" />
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-700">
                                    Day {i + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-500 px-4">
                        <span>Jan</span><span>Dec</span>
                    </div>
                </div>

                {/* System Status Panel */}
                <div className="glass-card">
                    <h3 className="text-lg font-semibold text-white mb-6">Real-Time Aggregation</h3>
                    <div className="space-y-3">
                        {platforms.map((p) => (
                            <PlatformPill
                                key={p.name}
                                name={p.name}
                                status="active"
                                price={p.price}
                                stock={p.stock}
                            />
                        ))}
                        {platforms.length === 0 && <p className="text-gray-500 text-sm">No platforms connected.</p>}
                    </div>

                    <div className="mt-8">
                        <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Event Log</h3>
                        <div className="relative pl-4 border-l border-gray-800 space-y-6">
                            <div className="relative">
                                <div className="absolute -left-[21px] top-1 w-3 h-3 bg-indigo-500 rounded-full ring-4 ring-[#03050a]" />
                                <p className="text-sm text-gray-300">Sync Pulse M42</p>
                                <p className="text-xs text-gray-500 mt-0.5">Just now • Automated</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[21px] top-1 w-3 h-3 bg-green-500 rounded-full ring-4 ring-[#03050a]" />
                                <p className="text-sm text-gray-300">Cluster Rebalancing</p>
                                <p className="text-xs text-gray-500 mt-0.5">34ms ago • Node A</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
