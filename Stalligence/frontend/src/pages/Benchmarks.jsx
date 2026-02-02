import React from 'react';
import { BarChart3, ArrowRight, TrendingDown } from 'lucide-react';
import useProductData from '../hooks/useProductData';

const Benchmarks = () => {
    const { data, loading, error } = useProductData('BUDS-V2-BLK');

    if (loading) return <div className="p-8 text-indigo-400 animate-pulse">Loading Intelligence...</div>;
    if (error) return <div className="p-8 text-red-400">Error loading benchmarks.</div>;

    const platforms = data?.platforms || [];
    const lowest = data?.lowest_price || 0;
    const highest = Math.max(...platforms.map(p => p.price));
    const diff = highest - lowest;

    return (
        <div className="p-6 pt-24 max-w-7xl mx-auto space-y-8 animate-fade-in">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Price Benchmarking</h1>
                <p className="text-gray-400">Competitive analysis for SKU: <span className="text-indigo-400 font-mono">{data?.sku}</span></p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Comparison Chart */}
                <div className="lg:col-span-2 glass-card">
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <BarChart3 size={20} className="text-indigo-400" />
                        Market Position
                    </h3>

                    <div className="space-y-6">
                        {platforms.map((p) => {
                            const isLowest = p.price === lowest;
                            const width = (p.price / highest) * 100;

                            return (
                                <div key={p.name} className="relative">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-300 font-medium">{p.name}</span>
                                        <span className={`font-mono ${isLowest ? 'text-green-400 font-bold' : 'text-gray-400'}`}>
                                            ₹ {p.price.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${isLowest ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-indigo-500/50'}`}
                                            style={{ width: `${width}%` }}
                                        />
                                    </div>
                                    {isLowest && (
                                        <span className="absolute -right-2 top-8 text-[10px] text-green-500 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                                            Best Price
                                        </span>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Opportunity Card */}
                <div className="glass-card bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/30">
                    <h3 className="text-lg font-semibold text-white mb-4">Arbitrage Opportunity</h3>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/30">
                            <TrendingDown size={32} className="text-white" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Price Gap</p>
                            <h2 className="text-3xl font-bold text-white">₹ {diff.toLocaleString()}</h2>
                        </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed mb-6">
                        There is a <strong className="text-white">{((diff / lowest) * 100).toFixed(1)}%</strong> variance between the highest and lowest listed prices.
                    </p>
                    <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 group">
                        Optimize Pricing <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Benchmarks;
