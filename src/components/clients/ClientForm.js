import React, { useState, useEffect } from 'react';
import { TIPO_CLIENTE } from '../../constants/enums';

const ClientForm = ({ apiService, setLoading, cliente, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nome: '',
    tipo: TIPO_CLIENTE.FISICA,
    cpf: '',
    cnpj: '',
    cro: '',
    crm: '',
    inscricaoEstadual: '',
    inscricaoMunicipal: '',
    email: '',
    telefone: '',
    celular: '',
    endereco: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    dataNascimento: '',
    clinica: ''
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        ...cliente,
        dataNascimento: cliente.dataNascimento ? 
          new Date(cliente.dataNascimento).toISOString().split('T')[0] : ''
      });
    }
  }, [cliente]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const clienteData = {
        ...formData,
        dataNascimento: formData.dataNascimento ? new Date(formData.dataNascimento) : null
      };

      if (cliente) {
        await apiService.updateCliente(cliente.id, clienteData);
        alert('Cliente atualizado com sucesso!');
      } else {
        await apiService.createCliente(clienteData);
        alert('Cliente cadastrado com sucesso!');
      }
      
      onSave();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      alert('Erro ao salvar cliente');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h2 className="form-title">
          {cliente ? 'Editar Cliente' : 'Novo Cliente'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Tipo de Cliente */}
          <div className="form-group">
            <label className="form-label">Tipo de Cliente</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tipo"
                  value={TIPO_CLIENTE.FISICA}
                  checked={formData.tipo === TIPO_CLIENTE.FISICA}
                  onChange={handleChange}
                />
                <span className="ml-2">Pessoa Física</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tipo"
                  value={TIPO_CLIENTE.JURIDICA}
                  checked={formData.tipo === TIPO_CLIENTE.JURIDICA}
                  onChange={handleChange}
                />
                <span className="ml-2">Pessoa Jurídica</span>
              </label>
            </div>
          </div>

          {/* Dados Básicos */}
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                {formData.tipo === TIPO_CLIENTE.JURIDICA ? 'Razão Social *' : 'Nome Completo *'}
              </label>
              <input
                type="text"
                name="nome"
                required
                value={formData.nome}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {formData.tipo === TIPO_CLIENTE.JURIDICA && (
              <div className="form-group">
                <label className="form-label">Clínica/Empresa</label>
                <input
                  type="text"
                  name="clinica"
                  value={formData.clinica}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            )}

            {formData.tipo === TIPO_CLIENTE.FISICA ? (
              <>
                <div className="form-group">
                  <label className="form-label">CPF *</label>
                  <input
                    type="text"
                    name="cpf"
                    required
                    value={formData.cpf}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Data de Nascimento</label>
                  <input
                    type="date"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </>
            ) : (
              <div className="form-group">
                <label className="form-label">CNPJ *</label>
                <input
                  type="text"
                  name="cnpj"
                  required
                  value={formData.cnpj}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">CRO</label>
              <input
                type="text"
                name="cro"
                value={formData.cro}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">CRM</label>
              <input
                type="text"
                name="crm"
                value={formData.crm}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          {/* Contato */}
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Telefone</label>
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Celular</label>
              <input
                type="text"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          {/* Endereço */}
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Endereço</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Bairro</label>
              <input
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">CEP</label>
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Cidade</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Estado</label>
              <input
                type="text"
                name="estado"
                maxLength="2"
                value={formData.estado}
                onChange={handleChange}
                className="form-input"
                style={{ textTransform: 'uppercase' }}
              />
            </div>
          </div>

          {/* Botões */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-success"
            >
              {cliente ? 'Atualizar' : 'Salvar'}
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

export default ClientForm;