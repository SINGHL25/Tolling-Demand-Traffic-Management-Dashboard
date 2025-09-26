
import React from 'react';
import type { TollPlaza } from '../types';

interface MapProps {
    plazas: TollPlaza[];
    onPlazaSelect: (plazaId: string) => void;
    selectedPlazaId: string | null;
}

const getCongestionColor = (congestion: number) => {
    if (congestion > 0.8) return 'bg-red-500';
    if (congestion > 0.5) return 'bg-yellow-500';
    return 'bg-green-500';
};

const getCongestionRingColor = (congestion: number) => {
    if (congestion > 0.8) return 'ring-red-400';
    if (congestion > 0.5) return 'ring-yellow-400';
    return 'ring-green-400';
};

export const Map: React.FC<MapProps> = ({ plazas, onPlazaSelect, selectedPlazaId }) => {
    return (
        <div className="relative w-full h-96 bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600">
            {/* Background SVG - simplified road network */}
            <svg width="100%" height="100%" className="absolute inset-0">
                <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#52525b" strokeWidth="10" />
                <line x1="33%" y1="0" x2="33%" y2="100%" stroke="#52525b" strokeWidth="8" />
                <line x1="0" y1="80%" x2="70%" y2="80%" stroke="#52525b" strokeWidth="6" strokeDasharray="10 5" />
                <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#52525b" strokeWidth="6" />
                <circle cx="33%" cy="30%" r="20" fill="#a1a1aa" />
                <circle cx="70%" cy="30%" r="20" fill="#a1a1aa" />
                <circle cx="70%" cy="80%" r="15" fill="#a1a1aa" />
            </svg>
            
            {plazas.map(plaza => {
                const isSelected = selectedPlazaId === plaza.id;
                return (
                    <div
                        key={plaza.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{ top: plaza.position.top, left: plaza.position.left }}
                    >
                        <button
                            onClick={() => onPlazaSelect(plaza.id)}
                            className={`relative flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-125 focus:outline-none ${isSelected ? 'scale-125' : ''}`}
                        >
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getCongestionColor(plaza.congestion)}`}></span>
                            <span className={`relative inline-flex rounded-full h-4 w-4 ${getCongestionColor(plaza.congestion)} ring-2 ${isSelected ? 'ring-cyan-400' : getCongestionRingColor(plaza.congestion)}`}></span>
                        </button>
                        <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs text-center p-1 rounded bg-gray-900/70 whitespace-nowrap ${isSelected ? 'text-cyan-300 font-bold' : ''}`}>
                            {plaza.name}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
