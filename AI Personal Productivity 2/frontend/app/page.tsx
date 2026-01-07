"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getContexts, getCriticalAnalysis, getAuthStatus } from "../lib/api";

export default function Dashboard() {
  const [contexts, setContexts] = useState<any[]>([]);
  const [criticalPreview, setCriticalPreview] = useState<any[]>([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getContexts(),
      getCriticalAnalysis(),
      getAuthStatus()
    ]).then(([ctxRes, critRes, authRes]) => {
      setContexts(ctxRes.contexts || []);
      setCriticalPreview(critRes.criticalItems?.slice(0, 3) || []);
      setAuthenticated(authRes.authenticated);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-blue-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-t-2 border-l-2 border-purple-500 animate-spin reverse" />
        </div>
        <div className="text-sm font-mono text-blue-400 animate-pulse">INITIALIZING SYSTEM...</div>
      </div>
    </div>
  );

  return (
    <main className="p-8 md:p-12 max-w-[1600px] mx-auto space-y-10 animate-fade-in relative z-10">

      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-end pb-2 relative">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">System Operational</span>
          </div>
          <h1 className="heading-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-400">
            Command Center
          </h1>
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            Real-time workflow orchestration and decision support system.
          </p>
        </div>

        {!authenticated && (
          <a
            href="http://localhost:4000/auth/google"
            className="group relative px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 relative z-10" alt="Google" />
            <span className="text-white font-medium relative z-10">Connect Google Workspace</span>
            <span className="material-symbols-outlined text-sm text-slate-400 group-hover:translate-x-1 transition-transform relative z-10">arrow_forward</span>
          </a>
        )}
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Metric Cards - Top Row */}
        <div className="col-span-1 md:col-span-4 glass-card p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-6xl">grid_view</span>
          </div>
          <div className="text-sm text-slate-400 font-medium mb-2 uppercase tracking-wider">Active Contexts</div>
          <div className="text-5xl font-bold text-white tracking-tight">{contexts.length}</div>
          <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[60%]" />
          </div>
        </div>

        <div className="col-span-1 md:col-span-4 glass-card p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-6xl text-red-500">warning</span>
          </div>
          <div className="text-sm text-slate-400 font-medium mb-2 uppercase tracking-wider">Critical Alerts</div>
          <div className="text-5xl font-bold text-red-400 tracking-tight">{criticalPreview.length}</div>
          <div className="mt-4 text-xs text-red-400/80 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            Requiring immediate attention
          </div>
        </div>

        <div className="col-span-1 md:col-span-4 glass-card p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-6xl text-emerald-500">memory</span>
          </div>
          <div className="text-sm text-slate-400 font-medium mb-2 uppercase tracking-wider">System Status</div>
          <div className="text-5xl font-bold text-emerald-400 tracking-tight">98%</div>
          <div className="mt-4 text-xs text-emerald-400/80 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Optimized
          </div>
        </div>

        {/* Main Content Area */}

        {/* Critical Actions - Large Block */}
        <div className="col-span-1 md:col-span-8 glass-card p-8 flex flex-col h-full animate-delay-100">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                <span className="material-symbols-outlined">gpp_maybe</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Critical Actions</h2>
            </div>
            <Link href="/analysis" className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2">
              View All Analysis <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </Link>
          </div>

          <div className="space-y-4 flex-1">
            {criticalPreview.map((item, i) => (
              <div key={i} className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-red-500/30 transition-all duration-300 cursor-pointer flex items-center gap-5">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">priority_high</span>
                </div>
                <div className="flex-1">
                  <div className="text-lg font-semibold text-white group-hover:text-red-300 transition-colors mb-1">
                    {item.event.title}
                  </div>
                  <div className="text-sm text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {item.reasoning}
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                  <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                </div>
              </div>
            ))}
            {criticalPreview.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 p-8 border border-dashed border-white/10 rounded-2xl">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">check_circle</span>
                <p>No critical actions pending. Good job!</p>
              </div>
            )}
          </div>
        </div>

        {/* Active Streams - Side Block */}
        <div className="col-span-1 md:col-span-4 glass-card p-8 flex flex-col h-full animate-delay-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Active Streams</h2>
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]" />
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
            {contexts.slice(0, 5).map((ctx) => (
              <div key={ctx.contextId} className="relative p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group border-l-2 border-transparent hover:border-blue-500">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-slate-200 group-hover:text-white transition-colors">{ctx.name}</h3>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                    active
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="text-xs text-slate-500">
                    Last active: {new Date(ctx.lastActiveAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <span className="text-sm font-mono text-blue-400 group-hover:text-blue-300">{ctx.signals.unresolvedTasks}</span>
                    <span className="material-symbols-outlined text-[14px]">task</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <button className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 text-sm text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2 group">
              View All Streams
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Bottom Banner - Quick Actions or Insight */}
        <div className="col-span-1 md:col-span-12 glass-card p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/10 flex items-center justify-between animate-delay-300">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
              <span className="material-symbols-outlined text-2xl">auto_awesome</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Suggestion</h3>
              <p className="text-slate-400 text-sm">Based on your activity, you should focus on "Atlas Project" next.</p>
            </div>
          </div>
          <button className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/25 transition-all">
            Accept Suggestion
          </button>
        </div>

      </div>
    </main>
  );
}
