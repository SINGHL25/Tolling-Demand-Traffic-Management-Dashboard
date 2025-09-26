
import React from 'react';
import type { Anomaly, Transaction } from './types';

export const CarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>
);

export const TruckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h3.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
);

export const BusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M4 16c0 .88.39 1.67 1 2.22V21c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-2.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM18 11H6V6h12v5z"/></svg>
);

export const MotorcycleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19.44 9.03L15.44 5.03c-.29-.29-.77-.29-1.06 0L12.9 6.5C12.55 6.19 12.04 6 11.5 6c-1.38 0-2.5 1.12-2.5 2.5 0 .34.07.67.19.97L5.53 13.14C5.19 12.55 4.58 12 4 12c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3c0-.59-.19-1.12-.5-1.56l.38-.38c.67.24 1.4.34 2.12.34s1.45-.1 2.12-.34l.38.38c-.31.44-.5 1-.5 1.56 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3c-.58 0-1.19.19-1.69.53l3.6-3.6c.32-.32.3-0.82-.03-1.13zM6.5 15c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm6.75-2.25c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm.75 3.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm5-2.25c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z"/></svg>
);

export const VEHICLE_ICONS: { [key: string]: React.FC<{ className?: string }> } = {
    Car: CarIcon,
    Truck: TruckIcon,
    Bus: BusIcon,
    Motorcycle: MotorcycleIcon,
};

export const RECENT_TRANSACTIONS_COLUMNS: { key: string; label: string; render?: (item: Transaction) => React.ReactNode }[] = [
    { key: 'id', label: 'ID' },
    { key: 'plazaId', label: 'Plaza' },
    { key: 'amount', label: 'Amount', render: (item) => `$${item.amount.toFixed(2)}` },
    { key: 'paymentMethod', label: 'Method' },
    { key: 'timestamp', label: 'Time', render: (item) => new Date(item.timestamp).toLocaleTimeString() },
];

export const ANOMALIES_COLUMNS: { key: string; label: string; render?: (item: Anomaly) => React.ReactNode }[] = [
    { key: 'type', label: 'Type' },
    { key: 'plazaId', label: 'Plaza' },
    { key: 'details', label: 'Details' },
    { key: 'timestamp', label: 'Time', render: (item) => new Date(item.timestamp).toLocaleTimeString() },
];
