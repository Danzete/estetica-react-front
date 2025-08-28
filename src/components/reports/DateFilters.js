import React from 'react';

const DateFilters = ({ dataInicio, dataFim, setDataInicio, setDataFim, onFilter }) => {
  return (
    <div className="filters-card">
      <h3 className="filters-title">Filtros de Período</h3>
      <div className="filters-grid">
        <div className="form-group">
          <label className="form-label">Data Início</label>
          <input
            type="date"
            value={dataInicio.toISOString().split('T')[0]}
            onChange={(e) => setDataInicio(new Date(e.target.value))}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Data Fim</label>
          <input
            type="date"
            value={dataFim.toISOString().split('T')[0]}
            onChange={(e) => setDataFim(new Date(e.target.value))}
            className="form-input"
          />
        </div>
        <div className="form-group flex items-end">
          <button
            onClick={onFilter}
            className="btn btn-primary"
          >
            Atualizar Dados
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateFilters;