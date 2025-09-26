
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import type { VehiclePassage } from '../types'; // Using passage as a proxy for transactions for simplicity here

interface TollRevenueChartProps {
    data: VehiclePassage[];
}

export const TollRevenueChart: React.FC<TollRevenueChartProps> = ({ data }) => {
     const processData = () => {
        const hourlyRevenue: { [key: string]: number } = {};
        const now = new Date();

        data.forEach(passage => {
            const passageDate = new Date(passage.timestamp);
             if (now.getTime() - passageDate.getTime() <= 24 * 60 * 60 * 1000) {
                const hour = passageDate.getHours().toString().padStart(2, '0') + ":00";
                if (!hourlyRevenue[hour]) {
                    hourlyRevenue[hour] = 0;
                }
                let amount = 0;
                switch (passage.vehicleType) {
                    case 'Car': amount = 2.50; break;
                    case 'Truck': amount = 8.00; break;
                    case 'Bus': amount = 6.50; break;
                    case 'Motorcycle': amount = 1.25; break;
                }
                hourlyRevenue[hour] += amount;
            }
        });

        return Object.keys(hourlyRevenue).sort().map(hour => ({
            hour,
            revenue: parseFloat(hourlyRevenue[hour].toFixed(2)),
        }));
    };

    const chartData = processData();

    return (
        <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#48bb78" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#48bb78" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey="hour" stroke="#a0aec0" fontSize={10} />
                <YAxis stroke="#a0aec0" fontSize={10} />
                <Tooltip
                    contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568' }}
                    labelStyle={{ color: '#e2e8f0' }}
                    formatter={(value: number) => `$${value.toFixed(2)}`}
                />
                <Area type="monotone" dataKey="revenue" stroke="#48bb78" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};
