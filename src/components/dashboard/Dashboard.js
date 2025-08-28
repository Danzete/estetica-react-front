import React, { useState, useEffect } from 'react';
import SummaryCards from './SummaryCards';
import Charts from './Charts';
import RecentData from './RecentData';

const Dashboard = ({ apiService, setLoading }) => {
  const [dashboardData, setDashboardData] = useState({
    totalVendasMes: 0,
    totalComissoesMes: 0,
    quantidadeVendasMes: 0,
    produtosMaisVendidos: [],
    produtosMenosVendidos: [],
    clientesMaisCompraram: [],
    vendasRecentes: [],
    vendasPorFormaPagamento: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const loadDashboard = async () => {
    try {
      setIsLoading(true);
      setLoading(true);
      const data = await apiService.getDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
      alert('Erro ao carregar dashboard');
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center" style={{ height: '400px' }}>
        <div className="spinner" style={{ width: '40px', height: '40px' }}></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="dashboard-title">Dashboard</h1>
      
      <SummaryCards data={dashboardData} />
      <Charts data={dashboardData} />
      <RecentData data={dashboardData} />
    </div>
  );
};

export default Dashboard;