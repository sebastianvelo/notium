"use client";
import React, { useState } from "react";

interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    defaultTab?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab }) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    const activeContent = tabs.find(tab => tab.id === activeTab)?.content;

    return (
        <div className="w-full">
            <div className="border-b border-secondary-200 dark:border-secondary-900">
                <nav className="flex space-x-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                ? "border-primary-500 text-primary-600"
                                : "border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300 dark:border-secondary-800"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="mt-6">
                {activeContent}
            </div>
        </div>
    );
};

export default Tabs;