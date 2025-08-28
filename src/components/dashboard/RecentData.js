import React from 'react';
import { formatters } from '../../services/formatters';

const RecentData = ({ data }) => {
  return (
    <div className="analytics-grid">
      {/* Top Clientes */}
      <div className="table-card">
        <h3 className="table-title">Top Clientes</h3>
        {data.clientesMaisCompraram?.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th className="text-right">Compras</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.clientesMaisCompraram.map((cliente, index) => (
                <tr key={index}>
                  <td>{cliente.nomeCliente}</td>
                  <td className="text-right">{cliente.quantidadeCompras}</td>
                  <td className="text-right font-semibold">{formatters.currency(cliente.valorTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray p-8">Nenhum dado disponível</p>
        )}
      </div>
      {/* Vendas Recentes */}
      <div className="table-card">
        <h3 className="table-title">Vendas Recentes</h3>
        {data.vendasRecentes?.length > 0 ? (
          <div className="space-y-3">
            {data.vendasRecentes.map((venda) => (
              <div key={venda.id} className="sale-card">
                <div className="sale-header">
                  <div>
                    <p className="sale-client">{venda.nomeCliente}</p>
                    <p className="sale-date">{formatters.date(venda.dataVenda, true)}</p>
                    <p className="sale-payment">{venda.formaPagamento}</p>
                  </div>
                  <p className="sale-total">{formatters.currency(venda.valorTotal)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray p-8">Nenhum dado disponível</p>
        )}
      </div>
    </div>
  );
};

export default RecentData;