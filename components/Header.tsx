
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700">
            <div className="flex items-center space-x-3">
                 <svg className="w-8 h-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
                <h1 className="text-xl font-bold text-white tracking-wider">
                    Tolling Demand & Traffic Management
                </h1>
            </div>
            <div className="text-sm text-gray-400">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
        </header>
    );
};
