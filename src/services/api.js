// Configuração da API
const API_BASE_URL = 'https://estetica-backend-0gia.onrender.com/api';

export class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Dashboard
  async getDashboard() {
  const data = await this.request('/dashboard');
  return data;
}

  // Clientes
  async getClientes() {
    return this.request('/clientes');
  }

  async getClienteById(id) {
    return this.request(`/clientes/${id}`);
  }

  async createCliente(cliente) {
    return this.request('/clientes', {
      method: 'POST',
      body: JSON.stringify(cliente)
    });
  }

  async updateCliente(id, cliente) {
    return this.request(`/clientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cliente)
    });
  }

  async deleteCliente(id) {
    return this.request(`/clientes/${id}`, {
      method: 'DELETE'
    });
  }

  async buscarClientesPorNome(nome) {
    return this.request(`/clientes/buscar?nome=${encodeURIComponent(nome)}`);
  }

  // Vendas
  async getVendas() {
    return this.request('/vendas/completas');
  }

  async getVendasCompletas() {
    return this.request('/vendas/completas');
  }

  async getVendaById(id) {
    return this.request(`/vendas/${id}`);
  }

  async createVenda(vendaDTO) {
    return this.request('/vendas', {
      method: 'POST',
      body: JSON.stringify(vendaDTO)
    });
  }

  // Relatórios
  async getVendasMensaisExcel(ano, mes) {
    const url = `${this.baseURL}/relatorios/vendas-mensais?ano=${ano}&mes=${mes}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.blob();
  }

  async getVendasPorFormaPagamento(dataInicio, dataFim) {
    const inicio = dataInicio.toISOString().split('T')[0];
    const fim = dataFim.toISOString().split('T')[0];
    return this.request(`/relatorios/vendas/forma-pagamento?dataInicio=${inicio}&dataFim=${fim}`);
  }

  async getClientesAnalytics() {
    return this.request('/relatorios/clientes/analytics');
  }

  async getProdutosAnalytics() {
    return this.request('/relatorios/produtos/analytics');
  }
}