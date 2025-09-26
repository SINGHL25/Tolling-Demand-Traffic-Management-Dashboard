
import React from 'react';
import type { VehiclePassage } from '../types';

interface CongestionHeatmapProps {
    data: VehiclePassage[];
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));

export const CongestionHeatmap: React.FC<CongestionHeatmapProps> = ({ data }) => {
    const heatmapData = React.useMemo(() => {
        const grid: number[][] = Array(7).fill(0).map(() => Array(24).fill(0));
        data.forEach(p => {
            const date = new Date(p.timestamp);
            const day = date.getDay();
            const hour = date.getHours();
            grid[day][hour]++;
        });
        
        const maxVal = Math.max(...grid.flat());
        return grid.map(row => row.map(cell => maxVal > 0 ? cell / maxVal : 0));
    }, [data]);

    const getColor = (value: number) => {
        if (value > 0.8) return 'bg-red-600';
        if (value > 0.6) return 'bg-orange-500';
        if (value > 0.4) return 'bg-yellow-500';
        if (value > 0.2) return 'bg-green-600';
        if (value > 0) return 'bg-green-800';
        return 'bg-gray-700/50';
    };

    return (
        <div className="flex text-xs">
            <div className="flex flex-col text-right pr-2 space-y-1 text-gray-400">
                {DAYS.map(day => <div key={day} className="h-4 flex items-center">{day}</div>)}
            </div>
            <div className="flex-1">
                <div className="grid grid-cols-24 gap-1">
                    {heatmapData.flat().map((value, index) => (
                        <div key={index} className="h-4 w-full rounded-sm" title={`Congestion: ${(value * 100).toFixed(0)}%`}>
                            <div className={`h-full w-full rounded-sm ${getColor(value)}`}></div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-12 text-center mt-1 text-gray-500">
                    <div className="col-span-3">12am</div>
                    <div className="col-span-3">6am</div>
                    <div className="col-span-3">12pm</div>
                    <div className="col-span-3">6pm</div>
                </div>
            </div>
        </div>
    );
};
