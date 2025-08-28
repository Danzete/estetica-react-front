import React, { useState, useEffect } from 'react';
import { FORMA_PAGAMENTO } from '../../constants/enums';
import { formatters } from '../../services/formatters';

const NewSaleForm = ({ apiService, setLoading, onClose, onSave }) => {
  const [venda, setVenda] = useState({
    clienteId: '',
    formaPagamento: FORMA_PAGAMENTO.PIX,
    observacoes: '',
    frete: 0,
    itens: []
  });

  const [novoItem, setNovoItem] = useState({
    nomeProduto: '',
    quantidade: 1,
    valorUnitario: 0,
    percentualComissao: 0
  });

  const [clientes, setClientes] = useState([]);

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

  const adicionarItem = () => {
    if (!novoItem.nomeProduto || novoItem.valorUnitario <= 0 || novoItem.quantidade <= 0) {
      alert('Preencha todos os campos do item');
      return;
    }

    setVenda({
      ...venda,
      itens: [...venda.itens, { ...novoItem, id: Date.now() }]
    });

    setNovoItem({
      nomeProduto: '',
      quantidade: 1,
      valorUnitario: 0,
      percentualComissao: 0
    });
  };

  const removerItem = (itemId) => {
    setVenda({
      ...venda,
      itens: venda.itens.filter(item => item.id !== itemId)
    });
  };

  const calcularTotal = () => {
    const subtotal = venda.itens.reduce((total, item) => {
      return total + (item.valorUnitario * item.quantidade);
    }, 0);
    return subtotal + (venda.frete || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!venda.clienteId) {
      alert('Selecione um cliente');
      return;
    }

    if (venda.itens.length === 0) {
      alert('Adicione pelo menos um item');
      return;
    }

    try {
      setLoading(true);

      const vendaDTO = {
        clienteId: parseInt(venda.clienteId),
        formaPagamento: venda.formaPagamento,
        observacoes: venda.observacoes,
        frete: venda.frete,
        itens: venda.itens.map(item => ({
          nomeProduto: item.nomeProduto,
          quantidade: item.quantidade,
          valorUnitario: item.valorUnitario,
          percentualComissao: item.percentualComissao
        }))
      };

      await apiService.createVenda(vendaDTO);
      alert('Venda registrada com sucesso!');
      onSave();
    } catch (error) {
      console.error('Erro ao criar venda:', error);
      alert('Erro ao registrar venda');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h2 className="form-title">Nova Venda</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Cliente */}
          <div className="form-group">
            <label className="form-label">Cliente *</label>
            <select
              required
              value={venda.clienteId}
              onChange={(e) => setVenda({...venda, clienteId: e.target.value})}
              className="form-input"
            >
              <option value="">Selecione um cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Forma de Pagamento */}
          <div className="form-group">
            <label className="form-label">Forma de Pagamento</label>
            <div className="payment-options">
              {Object.values(FORMA_PAGAMENTO).map(forma => (
                <label key={forma} className="payment-option">
                  <input
                    type="radio"
                    value={forma}
                    checked={venda.formaPagamento === forma}
                    onChange={(e) => setVenda({...venda, formaPagamento: e.target.value})}
                  />
                  <span>{forma}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Adicionar Item */}
          <div className="form-section">
            <h3>Adicionar Item</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Produto</label>
                <input
                  type="text"
                  value={novoItem.nomeProduto}
                  onChange={(e) => setNovoItem({...novoItem, nomeProduto: e.target.value})}
                  className="form-input"
                  placeholder="Nome do produto"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Quantidade</label>
                <input
                  type="number"
                  min="1"
                  value={novoItem.quantidade}
                  onChange={(e) => setNovoItem({...novoItem, quantidade: parseInt(e.target.value) || 1})}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Valor Unitário</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={novoItem.valorUnitario}
                  onChange={(e) => setNovoItem({...novoItem, valorUnitario: parseFloat(e.target.value) || 0})}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Comissão %</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={novoItem.percentualComissao}
                  onChange={(e) => setNovoItem({...novoItem, percentualComissao: parseFloat(e.target.value) || 0})}
                  className="form-input"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={adicionarItem}
              className="btn btn-primary"
            >
              Adicionar Item
            </button>
          </div>

          {/* Lista de Itens */}
          {venda.itens.length > 0 && (
            <div className="form-section">
              <h3>Itens da Venda</h3>
              <div className="items-list">
                {venda.itens.map((item, index) => (
                  <div key={item.id} className="item-row">
                    <div className="item-info">
                      <span className="item-name">{item.nomeProduto}</span>
                      <span className="item-details">
                        {item.quantidade}x {formatters.currency(item.valorUnitario)} 
                        ({item.percentualComissao}% comissão)
                      </span>
                    </div>
                    <div className="item-actions">
                      <span className="item-total">
                        {formatters.currency(item.quantidade * item.valorUnitario)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removerItem(item.id)}
                        className="btn-remove"
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Frete e Total */}
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Frete</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={venda.frete}
                onChange={(e) => setVenda({...venda, frete: parseFloat(e.target.value) || 0})}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Total da Venda</label>
              <div className="total-display">
                {formatters.currency(calcularTotal())}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Observações</label>
            <textarea
              value={venda.observacoes}
              onChange={(e) => setVenda({...venda, observacoes: e.target.value})}
              rows="3"
              className="form-input"
              placeholder="Observações sobre a venda"
            />
          </div>

          {/* Botões */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-success"
            >
              Finalizar Venda
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-danger"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSaleForm;