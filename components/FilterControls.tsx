
import React from 'react';
import type { TimeRange, VehicleType, TollPlaza } from '../types';

interface FilterControlsProps {
    timeRange: TimeRange;
    setTimeRange: (value: TimeRange) => void;
    vehicleType: VehicleType | 'All';
    setVehicleType: (value: VehicleType | 'All') => void;
    plaza: TollPlaza | null;
    setPlaza: (plazaId: string | null) => void;
    plazas: TollPlaza[];
    onPredict: () => void;
    isLoading: boolean;
}

const Button: React.FC<{ onClick: () => void; isActive: boolean; children: React.ReactNode }> = ({ onClick, isActive, children }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${isActive ? 'bg-cyan-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
    >
        {children}
    </button>
);

export const FilterControls: React.FC<FilterControlsProps> = ({
    timeRange,
    setTimeRange,
    vehicleType,
    setVehicleType,
    plaza,
    setPlaza,
    plazas,
    onPredict,
    isLoading
}) => {
    return (
        <div className="bg-gray-800/50 p-3 rounded-lg flex flex-wrap items-center justify-between gap-4 border border-gray-700 backdrop-blur-sm">
            <div className="flex items-center gap-4 flex-wrap">
                {/* Time Range Filter */}
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-400">Time:</span>
                    <Button onClick={() => setTimeRange('Last 6 Hours')} isActive={timeRange === 'Last 6 Hours'}>6H</Button>
                    <Button onClick={() => setTimeRange('Last 12 Hours')} isActive={timeRange === 'Last 12 Hours'}>12H</Button>
                    <Button onClick={() => setTimeRange('Last 24 Hours')} isActive={timeRange === 'Last 24 Hours'}>24H</Button>
                </div>

                {/* Vehicle Type Filter */}
                <div className="flex items-center gap-2">
                     <span className="text-sm font-medium text-gray-400">Vehicle:</span>
                     <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value as VehicleType | 'All')}
                        className="bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-sm focus:ring-cyan-500 focus:border-cyan-500"
                     >
                         <option value="All">All</option>
                         <option value="Car">Car</option>
                         <option value="Truck">Truck</option>
                         <option value="Bus">Bus</option>
                         <option value="Motorcycle">Motorcycle</option>
                     </select>
                </div>
                 {/* Plaza Filter */}
                 <div className="flex items-center gap-2">
                     <span className="text-sm font-medium text-gray-400">Plaza:</span>
                     <select
                        value={plaza?.id || 'All'}
                        onChange={(e) => setPlaza(e.target.value === 'All' ? null : e.target.value)}
                        className="bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-sm focus:ring-cyan-500 focus:border-cyan-500"
                     >
                         <option value="All">All Plazas</option>
                         {plazas.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                     </select>
                </div>
            </div>

            <button
                onClick={onPredict}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors disabled:bg-indigo-800 disabled:cursor-not-allowed"
            >
                 {isLoading ? (
                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                 ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                 )}
                {isLoading ? 'Analyzing...' : 'Get Predictions'}
            </button>
        </div>
    );
};
