import React, { useState, useEffect } from 'react';
import SalesList from './SalesList';
import NewSaleForm from './NewSaleForm';

const Sales = ({ apiService, setLoading }) => {
  const [vendas, setVendas] = useState([]);
  const [showNovaVendaForm, setShowNovaVendaForm] = useState(false);

  const loadVendas = async () => {
    try {
      setLoading(true);
      const data = await apiService.getVendasCompletas();
      setVendas(data);
    } catch (error) {
      console.error('Erro ao carregar vendas:', error);
      alert('Erro ao carregar vendas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendas();
  }, []);

  return (
    <div className="space-y-6">
      <div className="sales-header">
        <h1 className="section-title">Vendas</h1>
        <button
          onClick={() => setShowNovaVendaForm(true)}
          className="btn btn-success"
        >
          <span>+</span> Nova Venda
        </button>
      </div>

      <SalesList vendas={vendas} apiService={apiService} setLoading={setLoading} />
      
      {showNovaVendaForm && (
        <NewSaleForm
          apiService={apiService}
          setLoading={setLoading}
          onClose={() => setShowNovaVendaForm(false)}
          onSave={() => {
            setShowNovaVendaForm(false);
            loadVendas();
          }}
        />
      )}
    </div>
  );
};

export default Sales;