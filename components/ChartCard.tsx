
import React from 'react';

interface ChartCardProps {
    title: string;
    children: React.ReactNode;
    fullHeight?: boolean;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children, fullHeight = false }) => {
    return (
        <div className={`bg-gray-800/50 rounded-lg shadow-lg p-4 border border-gray-700 backdrop-blur-sm flex flex-col ${fullHeight ? 'h-full' : ''}`}>
            <h2 className="text-md font-semibold text-cyan-300 mb-4">{title}</h2>
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
};
