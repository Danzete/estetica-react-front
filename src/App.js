import React, { useState } from 'react';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Sales from './components/sales/Sales';
import Clients from './components/clients/Clients';
import Reports from './components/reports/Reports';
import LoadingSpinner from './components/common/LoadingSpinner';
import { ApiService } from './services/api';
import './styles.css';

const SalesManagementApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [apiService] = useState(new ApiService());
  
  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard apiService={apiService} setLoading={setLoading} />;
      case 'vendas':
        return <Sales apiService={apiService} setLoading={setLoading} />;
      case 'clientes':
        return <Clients apiService={apiService} setLoading={setLoading} />;
      case 'relatorios':
        return <Reports apiService={apiService} setLoading={setLoading} />;
      default:
        return <Dashboard apiService={apiService} setLoading={setLoading} />;
    }
  };

  return (
    <div className="app-container">
      <Header />
      
      <div className="main-layout">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        <main className="main-content">
          <div className="content-container">
            {renderContent()}
          </div>
        </main>
      </div>

      {loading && <LoadingSpinner />}
    </div>
  );
};

export default SalesManagementApp;