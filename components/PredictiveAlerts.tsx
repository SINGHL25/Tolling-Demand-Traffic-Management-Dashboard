
import React from 'react';
import type { PredictiveAlert } from '../types';

interface PredictiveAlertsProps {
    alerts: PredictiveAlert[];
    isLoading: boolean;
}

const AlertIcon: React.FC<{ severity: 'Low' | 'Medium' | 'High' }> = ({ severity }) => {
    const color = {
        Low: 'text-yellow-400',
        Medium: 'text-orange-400',
        High: 'text-red-400',
    }[severity];

    return (
        <div className={`flex-shrink-0 w-6 h-6 ${color}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
            </svg>
        </div>
    );
};

const LoadingSkeleton: React.FC = () => (
    <div className="animate-pulse space-y-3">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
            </div>
        ))}
    </div>
);

export const PredictiveAlerts: React.FC<PredictiveAlertsProps> = ({ alerts, isLoading }) => {
    return (
        <div className="bg-gray-800/50 rounded-lg shadow-lg p-4 border border-gray-700 backdrop-blur-sm">
            <h2 className="text-md font-semibold text-indigo-300 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 2a.5.5 0 01.5.5V3h5V2.5a.5.5 0 011 0V3h1a2 2 0 012 2v1H2V5a2 2 0 012-2h1V2.5a.5.5 0 01.5-.5zM2 8v8a2 2 0 002 2h12a2 2 0 002-2V8H2zm12 2.5a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                </svg>
                Predictive Alerts (Next 4 Hours)
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {isLoading ? <LoadingSkeleton /> :
                    alerts.length > 0 ? alerts.map(alert => (
                        <div key={alert.id} className="flex items-start space-x-3">
                            <AlertIcon severity={alert.severity} />
                            <div>
                                <p className="text-sm font-semibold">{alert.message}</p>
                                <p className="text-xs text-gray-400">Plaza: {alert.plazaId}</p>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center text-sm text-gray-500 py-4">
                            Click "Get Predictions" to see AI-powered alerts.
                        </div>
                    )
                }
            </div>
        </div>
    );
};
