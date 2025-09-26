
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { Map } from './components/Map';
import { ChartCard } from './components/ChartCard';
import { PassageVolumeChart } from './components/PassageVolumeChart';
import { TollRevenueChart } from './components/TollRevenueChart';
import { VehicleTypeDistributionChart } from './components/VehicleTypeDistributionChart';
import { CongestionHeatmap } from './components/CongestionHeatmap';
import { DataTable } from './components/DataTable';
import { PredictiveAlerts } from './components/PredictiveAlerts';
import { FilterControls } from './components/FilterControls';
import type { TollPlaza, VehiclePassage, Transaction, Anomaly, PredictiveAlert, TimeRange, VehicleType } from './types';
import { mockPlazas, generatePassages, generateTransactions, generateAnomalies } from './services/mockData';
import { getTrafficPrediction } from './services/geminiService';
import { RECENT_TRANSACTIONS_COLUMNS, ANOMALIES_COLUMNS } from './constants';

const App: React.FC = () => {
    const [plazas] = useState<TollPlaza[]>(mockPlazas);
    const [passages, setPassages] = useState<VehiclePassage[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
    const [alerts, setAlerts] = useState<PredictiveAlert[]>([]);
    const [selectedPlaza, setSelectedPlaza] = useState<TollPlaza | null>(plazas[0] || null);
    const [timeRange, setTimeRange] = useState<TimeRange>('Last 6 Hours');
    const [vehicleType, setVehicleType] = useState<VehicleType | 'All'>('All');
    const [isLoadingPredictions, setIsLoadingPredictions] = useState(false);

    useEffect(() => {
        const passageData = generatePassages(plazas, 200);
        const transactionData = generateTransactions(passageData);
        const anomalyData = generateAnomalies(passageData, transactionData);
        setPassages(passageData);
        setTransactions(transactionData);
        setAnomalies(anomalyData);
    }, [plazas]);

    const filteredData = useMemo(() => {
        const now = new Date();
        const hoursAgo = timeRange === 'Last 6 Hours' ? 6 : timeRange === 'Last 12 Hours' ? 12 : 24;
        const startTime = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);

        return passages.filter(p => 
            new Date(p.timestamp) >= startTime &&
            (vehicleType === 'All' || p.vehicleType === vehicleType)
        );
    }, [passages, timeRange, vehicleType]);

    const handlePlazaSelect = useCallback((plazaId: string | null) => {
        if (plazaId === null) {
            setSelectedPlaza(null);
        } else {
            const plaza = plazas.find(p => p.id === plazaId) || null;
            setSelectedPlaza(plaza);
        }
    }, [plazas]);

    const fetchPredictions = async () => {
        setIsLoadingPredictions(true);
        setAlerts([]);
        try {
            const summary = `Current traffic volume: ${filteredData.length} vehicles in ${timeRange}. Selected plaza: ${selectedPlaza?.name || 'All'}.`;
            const prediction = await getTrafficPrediction(summary);
            setAlerts(prediction);
        } catch (error) {
            console.error("Failed to fetch predictions:", error);
            setAlerts([{
                id: 'err1',
                severity: 'High',
                message: 'Failed to retrieve predictive data from Gemini.',
                plazaId: selectedPlaza?.id || 'N/A'
            }]);
        } finally {
            setIsLoadingPredictions(false);
        }
    };

    const plazaData = selectedPlaza ? filteredData.filter(p => p.plazaId === selectedPlaza.id) : filteredData;
    const transactionData = selectedPlaza ? transactions.filter(t => t.plazaId === selectedPlaza.id) : transactions;
    const anomalyData = selectedPlaza ? anomalies.filter(a => a.plazaId === selectedPlaza.id) : anomalies;
    
    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 space-y-4">
            <Header />

            <div className="grid grid-cols-12 gap-4">
                {/* Main Content Area */}
                <main className="col-span-12 lg:col-span-9 space-y-4">
                    <FilterControls
                        timeRange={timeRange}
                        setTimeRange={setTimeRange}
                        vehicleType={vehicleType}
                        setVehicleType={setVehicleType}
                        plaza={selectedPlaza}
                        setPlaza={handlePlazaSelect}
                        plazas={plazas}
                        onPredict={fetchPredictions}
                        isLoading={isLoadingPredictions}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                             <ChartCard title="Toll Plazas & Congestion">
                                <Map plazas={plazas} onPlazaSelect={handlePlazaSelect} selectedPlazaId={selectedPlaza?.id || null} />
                            </ChartCard>
                        </div>
                        <div className="space-y-4">
                            <ChartCard title="Revenue (Last 24h)">
                                <TollRevenueChart data={plazaData} />
                            </ChartCard>
                            <ChartCard title="Vehicle Distribution">
                                <VehicleTypeDistributionChart data={plazaData} />
                            </ChartCard>
                        </div>
                    </div>
                    
                    <ChartCard title={`Passage Volume: ${selectedPlaza?.name || 'All Plazas'}`}>
                       <PassageVolumeChart data={plazaData} />
                    </ChartCard>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ChartCard title="Recent Transactions" fullHeight>
                            <DataTable columns={RECENT_TRANSACTIONS_COLUMNS} data={transactionData.slice(0, 50)} />
                        </ChartCard>
                        <ChartCard title="Detected Anomalies" fullHeight>
                             <DataTable columns={ANOMALIES_COLUMNS} data={anomalyData.slice(0, 50)} />
                        </ChartCard>
                    </div>
                </main>

                {/* Sidebar */}
                <aside className="col-span-12 lg:col-span-3 space-y-4">
                    <PredictiveAlerts alerts={alerts} isLoading={isLoadingPredictions} />
                    <ChartCard title="Congestion Heatmap (Weekly)">
                        <CongestionHeatmap data={passages} />
                    </ChartCard>
                </aside>
            </div>
        </div>
    );
};

export default App;
