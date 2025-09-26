
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { VehiclePassage } from '../types';

interface PassageVolumeChartProps {
    data: VehiclePassage[];
}

export const PassageVolumeChart: React.FC<PassageVolumeChartProps> = ({ data }) => {
    const processData = () => {
        const hourlyData: { [key: string]: { Car: number; Truck: number; Bus: number; Motorcycle: number; } } = {};
        const now = new Date();

        data.forEach(passage => {
            const passageDate = new Date(passage.timestamp);
            if (now.getTime() - passageDate.getTime() <= 24 * 60 * 60 * 1000) {
                 const hour = passageDate.getHours().toString().padStart(2, '0') + ":00";
                 if (!hourlyData[hour]) {
                    hourlyData[hour] = { Car: 0, Truck: 0, Bus: 0, Motorcycle: 0 };
                 }
                 hourlyData[hour][passage.vehicleType]++;
            }
        });

        return Object.keys(hourlyData).sort().map(hour => ({
            hour,
            ...hourlyData[hour]
        }));
    };

    const chartData = processData();

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey="hour" stroke="#a0aec0" fontSize={12} />
                <YAxis stroke="#a0aec0" fontSize={12} />
                <Tooltip
                    contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568' }}
                    labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend wrapperStyle={{fontSize: "12px"}}/>
                <Bar dataKey="Car" stackId="a" fill="#38b2ac" />
                <Bar dataKey="Truck" stackId="a" fill="#f6ad55" />
                <Bar dataKey="Bus" stackId="a" fill="#63b3ed" />
                <Bar dataKey="Motorcycle" stackId="a" fill="#d53f8c" />
            </BarChart>
        </ResponsiveContainer>
    );
};
