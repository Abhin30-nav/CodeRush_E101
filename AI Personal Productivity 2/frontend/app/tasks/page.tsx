"use client";

import React, { useEffect, useState } from "react";
import { getEvents } from "../../lib/api";

type Event = {
    id: string;
    source?: string;
    type: string;
    title: string;
    timestamp: string;
    metadata: any;
};

export default function TasksPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEvents()
            .then((res) => {
                const taskEvents = res.events.filter((e: Event) => e.source === "task" || e.type === "task");
                setEvents(taskEvents);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <main className="p-8 max-w-5xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                <span>✅</span> Tasks
            </h1>

            {loading ? (
                <div className="text-slate-400">Loading tasks...</div>
            ) : (
                <div className="space-y-4">
                    {events.length === 0 ? (
                        <div className="p-10 border border-dashed border-slate-700 rounded text-center text-slate-500">
                            No pending tasks found.
                        </div>
                    ) : (
                        events.map((evt) => (
                            <div key={evt.id} className="glass-card p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                                <div className="h-5 w-5 rounded border-2 border-slate-500 flex-shrink-0 cursor-pointer hover:bg-slate-500/50" />
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium text-white">{evt.title}</h3>
                                    {evt.metadata.notes && (
                                        <p className="text-sm text-slate-500 line-clamp-1">{evt.metadata.notes}</p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-mono text-slate-400">
                                        {evt.metadata.due ? new Date(evt.metadata.due).toLocaleDateString() : "No Due Date"}
                                    </div>
                                    {evt.source && (
                                        <span className="text-[10px] uppercase bg-slate-800 text-slate-400 px-1 rounded">
                                            {evt.source}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </main>
    );
}
