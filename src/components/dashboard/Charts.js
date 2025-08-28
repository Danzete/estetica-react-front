import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatters } from '../../services/formatters';

const Charts = ({ data }) => {
  return (
    <div className="charts-container">
      {/* Produtos Mais Vendidos */}
      <div className="chart-card">
        <h3 className="chart-title">Produtos Mais Vendidos</h3>
        {data.produtosMaisVendidos?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.produtosMaisVendidos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nomeProduto" />
              <YAxis />
              <Tooltip formatter={(value) => formatters.currency(value)} />
              <Bar dataKey="valorTotal" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray p-8">Nenhum dado disponível</p>
        )}
      </div>

      {/* Produtos Menos Vendidos */}
      <div className="chart-card">
        <h3 className="chart-title">Produtos Menos Vendidos</h3>
        {data.produtosMenosVendidos?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.produtosMenosVendidos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nomeProduto" />
              <YAxis />
              <Tooltip formatter={(value) => formatters.currency(value)} />
              <Bar dataKey="valorTotal" fill="#F44336" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray p-8">Nenhum dado disponível</p>
        )}
      </div>
    </div>
  );
};

export default Charts;