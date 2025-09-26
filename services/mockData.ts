
import type { TollPlaza, VehiclePassage, Transaction, Anomaly, VehicleType, PaymentMethod } from '../types';

export const mockPlazas: TollPlaza[] = [
    { id: 'TP-01', name: 'Downtown Express', lanes: 8, position: { top: '25%', left: '30%' }, congestion: 0.8 },
    { id: 'TP-02', name: 'North Bridge', lanes: 6, position: { top: '10%', left: '60%' }, congestion: 0.5 },
    { id: 'TP-03', name: 'Westside Gantry', lanes: 10, position: { top: '60%', left: '15%' }, congestion: 0.3 },
    { id: 'TP-04', name: 'Airport Link', lanes: 8, position: { top: '75%', left: '70%' }, congestion: 0.9 },
];

const vehicleTypes: VehicleType[] = ['Car', 'Truck', 'Bus', 'Motorcycle'];
const paymentMethods: PaymentMethod[] = ['Cash', 'Card', 'ETC'];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generatePassages = (plazas: TollPlaza[], count: number): VehiclePassage[] => {
    const passages: VehiclePassage[] = [];
    const now = new Date();
    for (let i = 0; i < count; i++) {
        const plaza = getRandomElement(plazas);
        const timestamp = new Date(now.getTime() - getRandomNumber(0, 24 * 60 * 60 * 1000));
        passages.push({
            id: `psg-${i}`,
            plazaId: plaza.id,
            lane: getRandomNumber(1, plaza.lanes),
            timestamp: timestamp.toISOString(),
            vehicleType: getRandomElement(vehicleTypes),
            speed: getRandomNumber(40, 140),
        });
    }
    return passages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const generateTransactions = (passages: VehiclePassage[]): Transaction[] => {
    return passages.map(passage => {
        let amount = 0;
        switch (passage.vehicleType) {
            case 'Car': amount = 2.50; break;
            case 'Truck': amount = 8.00; break;
            case 'Bus': amount = 6.50; break;
            case 'Motorcycle': amount = 1.25; break;
        }
        return {
            id: `txn-${passage.id}`,
            passageId: passage.id,
            plazaId: passage.plazaId,
            amount: amount * (Math.random() * 0.2 + 0.9), // slight variation
            paymentMethod: getRandomElement(paymentMethods),
            timestamp: passage.timestamp,
        };
    });
};

export const generateAnomalies = (passages: VehiclePassage[], transactions: Transaction[]): Anomaly[] => {
    const anomalies: Anomaly[] = [];
    passages.forEach(passage => {
        if (passage.speed > 120) {
            anomalies.push({
                id: `anm-spd-${passage.id}`,
                type: 'Speeding',
                passageId: passage.id,
                plazaId: passage.plazaId,
                details: `Vehicle detected at ${passage.speed} km/h`,
                timestamp: passage.timestamp,
            });
        }
    });
    transactions.forEach(transaction => {
        if (transaction.paymentMethod !== 'ETC' && Math.random() < 0.05) {
             anomalies.push({
                id: `anm-pay-${transaction.id}`,
                type: 'Payment Failure',
                passageId: transaction.passageId,
                plazaId: transaction.plazaId,
                details: `Card declined for $${transaction.amount.toFixed(2)}`,
                timestamp: transaction.timestamp,
            });
        }
    });
     return anomalies.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};
