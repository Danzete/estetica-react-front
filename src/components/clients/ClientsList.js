import React, { useState } from 'react';
import { formatters } from '../../services/formatters';
import { TIPO_CLIENTE } from '../../constants/enums';

const ClientsList = ({ clientes, apiService, setLoading, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cliente.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cliente.cidade?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteCliente = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        setLoading(true);
        await apiService.deleteCliente(id);
        onDelete();
        alert('Cliente excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        alert('Erro ao excluir cliente');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {/* Barra de busca */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar clientes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Lista de clientes */}
      <div className="clients-grid">
        {filteredClientes.length > 0 ? (
          filteredClientes.map((cliente) => (
            <div key={cliente.id} className="client-card">
              <div className="client-header">
                <h3 className="client-name">{cliente.nome}</h3>
                <span className={`client-type ${cliente.tipo === TIPO_CLIENTE.JURIDICA ? 'type-pj' : 'type-pf'}`}>
                  {cliente.tipo === TIPO_CLIENTE.JURIDICA ? 'PJ' : 'PF'}
                </span>
              </div>

              <div className="client-details">
                {cliente.email && (
                  <div className="client-detail">
                    <span>📧</span>
                    <span>{cliente.email}</span>
                  </div>
                )}
                {cliente.telefone && (
                  <div className="client-detail">
                    <span>📞</span>
                    <span>{formatters.formatPhone(cliente.telefone)}</span>
                  </div>
                )}
                {cliente.cidade && (
                  <div className="client-detail">
                    <span>📍</span>
                    <span>{cliente.cidade}</span>
                  </div>
                )}
                {cliente.crm && (
                  <div className="client-detail">
                    <span>🏥</span>
                    <span>CRM: {cliente.crm}</span>
                  </div>
                )}
                {cliente.cro && (
                  <div className="client-detail">
                    <span>🦷</span>
                    <span>CRO: {cliente.cro}</span>
                  </div>
                )}
              </div>

              <div className="client-actions">
                <button
                  onClick={() => onEdit(cliente)}
                  className="btn btn-primary"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteCliente(cliente.id)}
                  className="btn btn-danger"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray p-12">
            <div className="text-6xl mb-4">👥</div>
            <p>Nenhum cliente encontrado</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ClientsList;