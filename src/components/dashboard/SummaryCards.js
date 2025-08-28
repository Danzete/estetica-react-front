import React from 'react';
import { formatters } from '../../services/formatters';

const SummaryCards = ({ data }) => {
  // Verificar se os dados estão disponíveis e tratar valores nulos
  const totalVendas = data?.totalVendasMes || 0;
  const quantidadeVendas = data?.quantidadeVendasMes || 0;
  const totalComissoesMes = data?.totalComissoesMes || 0;

  return (
    <div className="cards-grid">
      <div className="card">
        <div className="card-content">
          <div className="card-text">
            <span className="card-label">Total em Vendas</span>
            <span className="card-value">{formatters.currency(totalVendas)}</span>
          </div>
          <div className="card-icon">💰</div>
        </div>
      </div>
      
      <div className="card card-blue">
        <div className="card-content">
          <div className="card-text">
            <span className="card-label">Vendas Realizadas</span>
            <span className="card-value">{quantidadeVendas}</span>
          </div>
          <div className="card-icon">🛒</div>
        </div>
      </div>

      <div className="card card-purple">
        <div className="card-content">
          <div className="card-text">
            <span className="card-label">Total Comissões</span>
            <span className="card-value">{formatters.currency(totalComissoesMes)}</span>
          </div>
          <div className="card-icon">💎</div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;