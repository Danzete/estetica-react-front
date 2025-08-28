import React, { useState, useEffect } from 'react';
import ClientsList from './ClientsList';
import ClientForm from './ClientForm';

const Clients = ({ apiService, setLoading }) => {
  const [clientes, setClientes] = useState([]);
  const [showNovoClienteForm, setShowNovoClienteForm] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);

  const loadClientes = async () => {
    try {
      setLoading(true);
      const data = await apiService.getClientes();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      alert('Erro ao carregar clientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClientes();
  }, []);

  return (
    <div className="space-y-6">
      <div className="sales-header">
        <h1 className="section-title">Clientes</h1>
        <button
          onClick={() => setShowNovoClienteForm(true)}
          className="btn btn-primary"
        >
          <span>+</span> Novo Cliente
        </button>
      </div>

      <ClientsList 
        clientes={clientes} 
        apiService={apiService} 
        setLoading={setLoading}
        onEdit={(cliente) => {
          setEditingCliente(cliente);
          setShowNovoClienteForm(true);
        }}
        onDelete={loadClientes}
      />
      
      {showNovoClienteForm && (
        <ClientForm
          apiService={apiService}
          setLoading={setLoading}
          cliente={editingCliente}
          onClose={() => {
            setShowNovoClienteForm(false);
            setEditingCliente(null);
          }}
          onSave={() => {
            setShowNovoClienteForm(false);
            setEditingCliente(null);
            loadClientes();
          }}
        />
      )}
    </div>
  );
};

export default Clients;