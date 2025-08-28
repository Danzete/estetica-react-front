// Formas de pagamento
export const FORMA_PAGAMENTO = {
  PIX: 'PIX',
  CARTAO: 'CARTAO',
  DINHEIRO: 'DINHEIRO',
  TRANSFERENCIA: 'TRANSFERENCIA',
};

// Tipos de cliente
export const TIPO_CLIENTE = {
  FISICA: 'FISICA',
  JURIDICA: 'JURIDICA',
};

// Função para obter cores para as formas de pagamento
export const getFormaPagamentoColor = (forma) => {
  switch (forma) {
    case 'PIX': return '#4CAF50';
    case 'CARTAO': return '#2196F3';
    case 'DINHEIRO': return '#FF9800';
    case 'TRANSFERENCIA': return '#9C27B0';
    default: return '#666';
  }
};