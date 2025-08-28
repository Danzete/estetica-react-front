import React, { useState, useEffect } from 'react';
import DateFilters from './DateFilters';
import Analytics from './Analytics';

const Reports = ({ apiService, setLoading }) => {
  const [dataInicio, setDataInicio] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [dataFim, setDataFim] = useState(new Date());
  const [relatorioData, setRelatorioData] = useState({
    vendasPorFormaPagamento: {},
    clientesAnalytics: [],
    produtosAnalytics: []
  });
  const [downloadLoading, setDownloadLoading] = useState(false);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const [clientesData, produtosData] = await Promise.all([
        apiService.getClientesAnalytics(),
        apiService.getProdutosAnalytics()
      ]);
      setRelatorioData(prev => ({
        ...prev,
        clientesAnalytics: clientesData || [],
        produtosAnalytics: produtosData || []
      }));
    } catch (error) {
      console.error('Erro ao carregar analytics:', error);
      alert('Erro ao carregar analytics');
    } finally {
      setLoading(false);
    }
  };

  const loadRelatorios = async () => {
    try {
      setLoading(true);
      const vendasResponse = await apiService.getVendasPorFormaPagamento(dataInicio, dataFim);
      
      setRelatorioData(prev => ({
        ...prev,
        vendasPorFormaPagamento: vendasResponse.quantidadePorFormaPagamento || {}
      }));
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error);
      alert('Erro ao carregar relatórios');
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = async () => {
    try {
      setDownloadLoading(true);
      const hoje = new Date();
      const ano = hoje.getFullYear();
      const mes = hoje.getMonth() + 1;

      const blob = await apiService.getVendasMensaisExcel(ano, mes);
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `vendas_mensais_${ano}_${String(mes).padStart(2, '0')}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      alert('Relatório baixado com sucesso!');
    } catch (error) {
      console.error('Erro ao baixar relatório:', error);
      alert('Erro ao baixar relatório');
    } finally {
      setDownloadLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
    loadRelatorios();
  }, []);

  return (
    <div className="space-y-6">
      <div className="reports-header">
        <h1 className="section-title">Relatórios</h1>
        <button
          onClick={downloadExcel}
          disabled={downloadLoading}
          className="btn btn-success"
        >
          <span>📊</span> {downloadLoading ? 'Baixando...' : 'Baixar Excel'}
        </button>
      </div>

      <DateFilters
        dataInicio={dataInicio}
        dataFim={dataFim}
        setDataInicio={setDataInicio}
        setDataFim={setDataFim}
        onFilter={loadRelatorios}
      />

      <Analytics data={relatorioData} />
    </div>
  );
};

export default Reports;