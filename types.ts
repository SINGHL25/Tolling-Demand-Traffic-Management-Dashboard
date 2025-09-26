
export type VehicleType = 'Car' | 'Truck' | 'Bus' | 'Motorcycle';
export type PaymentMethod = 'Cash' | 'Card' | 'ETC';
export type TimeRange = 'Last 6 Hours' | 'Last 12 Hours' | 'Last 24 Hours';

export interface TollPlaza {
    id: string;
    name: string;
    lanes: number;
    position: { top: string; left: string };
    congestion: number; // 0 to 1
}

export interface VehiclePassage {
    id: string;
    plazaId: string;
    lane: number;
    timestamp: string;
    vehicleType: VehicleType;
    speed: number; // in km/h
}

export interface Transaction {
    id: string;
    passageId: string;
    plazaId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    timestamp: string;
}

export interface Anomaly {
    id: string;
    type: 'Speeding' | 'Payment Failure' | 'Unusual Volume';
    passageId: string;
    plazaId: string;
    details: string;
    timestamp: string;
}

export interface PredictiveAlert {
    id: string;
    plazaId: string;
    severity: 'Low' | 'Medium' | 'High';
    message: string;
}
