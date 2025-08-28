import React, { useState } from 'react';
import { formatters } from '../../services/formatters';
import { getFormaPagamentoColor } from '../../constants/enums';

const SalesList = ({ vendas, apiService, setLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  console.log('Estrutura das vendas:', vendas[0]); // Verifique a primeira venda

  const filteredVendas = vendas.filter(venda =>
    venda.cliente?.nome?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venda.formaPagamento?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Barra de busca */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar vendas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Lista de vendas */}
      <div className="sales-list">
        {filteredVendas.length > 0 ? (
          filteredVendas.map((venda) => (
            <div key={venda.id} className="sale-card">
              <div className="sale-header">
                <div>
                  <h3 className="sale-client">{venda.cliente?.nome || 'Cliente não informado'}</h3>
                  <p className="sale-date">{formatters.date(venda.dataVenda, true)}</p>
                </div>
                <div className="text-right">
                  <span 
                    className="payment-badge"
                    style={{
                      borderColor: getFormaPagamentoColor(venda.formaPagamento),
                      color: getFormaPagamentoColor(venda.formaPagamento)
                    }}
                  >
                    {venda.formaPagamento}
                  </span>
                </div>
              </div>

              <div className="sale-details">
                <div className="sale-detail">
                  <span>🛒</span>
                  <span>{venda.itens?.length || 0} produto(s)</span>
                </div>
                <div className="sale-detail">
                  <span>💰</span>
                  <span>Comissão: {formatters.currency(venda.totalComissao)}</span>
                </div>
                <div className="sale-detail">
                  <span>✅</span>
                  <span className="text-green">{venda.status}</span>
                </div>
              </div>

              <div className="sale-footer">
                <div>
                  {venda.observacoes && (
                    <p className="sale-notes">{venda.observacoes}</p>
                  )}
                </div>
                <div className="sale-total">
                  {formatters.currency(venda.valorTotal)}
                </div>
              </div>

              {/* Itens da venda */}
              {venda.itens && venda.itens.length > 0 && (
                <div className="sale-items">
                  <h4>Itens:</h4>
                  <div className="sale-items-list">
                    {venda.itens.map((item, index) => (
                      <div key={index} className="sale-item">
                        <span>{item.nomeProduto} (x{item.quantidade})</span>
                        <span>{formatters.currency(item.valorUnitario * item.quantidade)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray p-12">
            <div className="text-6xl mb-4">🛒</div>
            <p>Nenhuma venda encontrada</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SalesList;