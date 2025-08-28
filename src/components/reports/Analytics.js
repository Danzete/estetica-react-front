import React from 'react';
import { formatters } from '../../services/formatters';
import { getFormaPagamentoColor } from '../../constants/enums';

const Analytics = ({ data }) => {
  return (
    <>
      {/* Analytics Cards */}
      <div className="analytics-grid">
        {/* Top Clientes Analytics */}
        <div className="table-card">
          <h3 className="table-title">Top Clientes</h3>
          {data.clientesAnalytics.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th className="text-right">Compras</th>
                  <th className="text-right">Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {data.clientesAnalytics.slice(0, 10).map((cliente, index) => (
                  <tr key={cliente.nomeCliente || index}>
                    <td>{cliente.nomeCliente || 'N/A'}</td>
                    <td className="text-right">{cliente.quantidadeCompras || 0}</td>
                    <td className="text-right font-semibold">
                      {formatters.currency(cliente.valorTotal || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray p-8">Nenhum cliente encontrado</p>
          )}
        </div>

        {/* Produtos Mais Vendidos */}
        <div className="table-card">
          <h3 className="table-title">Produtos Mais Vendidos</h3>
          {data.produtosAnalytics.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th className="text-right">Qtd</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.produtosAnalytics.slice(0, 10).map((produto, index) => (
                  <tr key={produto.nomeProduto || index}>
                    <td>{produto.nomeProduto || 'N/A'}</td>
                    <td className="text-right">{produto.quantidadeVendida || 0}</td>
                    <td className="text-right font-semibold">
                      {formatters.currency(produto.valorTotal || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray p-8">Nenhum produto encontrado</p>
          )}
        </div>
      </div>

      {/* Vendas por Forma de Pagamento */}
      <div className="table-card">
        <h3 className="table-title">Vendas por Forma de Pagamento</h3>
        {Object.keys(data.vendasPorFormaPagamento).length > 0 ? (
          <div className="payment-stats">
            {Object.entries(data.vendasPorFormaPagamento).map(([forma, quantidade]) => (
              <div key={forma} className="payment-stat">
                <div 
                  className="payment-value"
                  style={{ color: getFormaPagamentoColor(forma) }}
                >
                  {quantidade}
                </div>
                <div className="payment-label">{forma}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray p-8">Nenhum dado disponível para o período selecionado</p>
        )}
      </div>
    </>
  );
};

export default Analytics;