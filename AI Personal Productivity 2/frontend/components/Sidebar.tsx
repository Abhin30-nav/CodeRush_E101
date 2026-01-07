"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "Command Center", href: "/", icon: "grid_view" },
    { name: "Critical Analysis", href: "/analysis", icon: "emergency_home" },
    { name: "Calendar", href: "/calendar", icon: "calendar_month" },
    { name: "Tasks", href: "/tasks", icon: "check_circle" },
    { name: "Mail", href: "/mail", icon: "mail" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-72 glass-panel border-r-0 z-50 flex flex-col">
            <div className="p-8 pb-4">
                <div className="flex items-center gap-3 mb-1">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                    <h1 className="text-xl font-bold tracking-tight text-white">
                        WorkOS
                    </h1>
                </div>
                <p className="text-xs text-slate-400 font-mono ml-11">V2.0.4 BETA</p>
            </div>

            <nav className="flex-1 px-4 space-y-1 mt-6">
                <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Menu
                </div>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden
                                ${isActive
                                    ? "bg-white/5 text-white shadow-[0_0_20px_rgba(56,189,248,0.1)] border border-white/5"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {isActive && (
                                <div className="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                            )}

                            {/* Material Icon placeholder (using emoji or text for now, assuming icons are fonts or svgs) 
                                Replacing with text-based material icons if available, strictly purely visual update here.
                                Using emojis from original implementation or better unicode 
                            */}
                            <span className={`material-symbols-outlined text-lg transition-colors group-hover:scale-110 duration-200 ${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`}>
                                {item.icon === "grid_view" && "dashboard"}
                                {item.icon === "emergency_home" && "warning"}
                                {item.icon === "calendar_month" && "calendar_today"}
                                {item.icon === "check_circle" && "check_circle"}
                                {item.icon === "mail" && "mail"}
                            </span>

                            <span className="font-medium text-sm tracking-wide">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 m-4 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-4 -mt-4 h-16 w-16 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-colors" />

                <div className="flex items-center gap-3 relative z-10">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <div>
                        <div className="text-xs font-semibold text-white">System Online</div>
                        <div className="text-[10px] text-emerald-500/80">Latency: 12ms</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
