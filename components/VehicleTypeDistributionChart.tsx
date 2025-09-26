
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import type { VehiclePassage } from '../types';

interface VehicleTypeDistributionChartProps {
    data: VehiclePassage[];
}

const COLORS = {
    Car: '#38b2ac',
    Truck: '#f6ad55',
    Bus: '#63b3ed',
    Motorcycle: '#d53f8c',
};

export const VehicleTypeDistributionChart: React.FC<VehicleTypeDistributionChartProps> = ({ data }) => {
    const processData = () => {
        const counts = { Car: 0, Truck: 0, Bus: 0, Motorcycle: 0 };
        data.forEach(passage => {
            counts[passage.vehicleType]++;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    };

    const chartData = processData();

    return (
        <ResponsiveContainer width="100%" height={150}>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {chartData.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568' }}
                    labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend layout="vertical" align="right" verticalAlign="middle" iconSize={8} wrapperStyle={{ fontSize: '12px', color: '#a0aec0' }}/>
            </PieChart>
        </ResponsiveContainer>
    );
};
