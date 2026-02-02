import React from 'react';
import { Package, AlertTriangle, RefreshCcw } from 'lucide-react';
import useProductData from '../hooks/useProductData';

const Inventory = () => {
    const { data, loading, error, refetch } = useProductData('BUDS-V2-BLK');

    if (loading) return <div className="p-8 text-indigo-400 animate-pulse">Syncing Inventory Nodes...</div>;
    if (error) return <div className="p-8 text-red-400">Error syncing inventory.</div>;

    const platforms = data?.platforms || [];
    const totalStock = platforms.reduce((acc, p) => acc + p.stock, 0);

    return (
        <div className="p-6 pt-24 max-w-7xl mx-auto space-y-8 animate-fade-in">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Global Inventory</h1>
                    <p className="text-gray-400">Real-time stock levels across all connected channels.</p>
                </div>
                <button
                    onClick={refetch}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-indigo-400 transition-colors border border-white/5"
                >
                    <RefreshCcw size={20} />
                </button>
            </header>

            {/* Global Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm mb-1">Total Stock</p>
                        <p className="text-2xl font-bold text-white">{totalStock} Units</p>
                    </div>
                    <Package className="text-indigo-500" size={28} />
                </div>
                <div className="glass-card flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm mb-1">Active Nodes</p>
                        <p className="text-2xl font-bold text-white">{platforms.length}</p>
                    </div>
                    <div className="flex gap-1">
                        {platforms.map(p => (
                            <div key={p.name} className="w-2 h-2 rounded-full bg-green-500" />
                        ))}
                    </div>
                </div>
                <div className="glass-card flex items-center justify-between border-red-500/30 bg-red-500/5">
                    <div>
                        <p className="text-gray-400 text-sm mb-1">Low Stock Alerts</p>
                        <p className="text-2xl font-bold text-red-400">0</p>
                    </div>
                    <AlertTriangle className="text-red-500" size={28} />
                </div>
            </div>

            {/* Inventory Table */}
            <div className="glass-card p-0 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-gray-800 text-gray-400 text-sm uppercase tracking-wider">
                            <th className="p-6 font-medium">Platform</th>
                            <th className="p-6 font-medium">SKU Ref</th>
                            <th className="p-6 font-medium">Status</th>
                            <th className="p-6 font-medium text-right">Quantity</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {platforms.map((p) => (
                            <tr key={p.name} className="hover:bg-white/5 transition-colors group">
                                <td className="p-6 text-white font-medium flex items-center gap-3">
                                    {p.name}
                                </td>
                                <td className="p-6 text-gray-400 font-mono text-sm">
                                    {data.sku}
                                </td>
                                <td className="p-6">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.stock < 20 ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                                        {p.stock < 20 ? 'Low Stock' : 'In Stock'}
                                    </span>
                                </td>
                                <td className="p-6 text-right text-gray-200 font-mono">
                                    {p.stock}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
