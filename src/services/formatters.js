// Utilitários de formatação
export const formatters = {
  currency: (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0);
  },

  date: (date, includeTime = false) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };

    if (includeTime) {
      Object.assign(options, {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    return new Date(date).toLocaleDateString('pt-BR', options);
  },

  percentage: (value) => {
    return `${parseFloat(value || 0).toFixed(2)}%`;
  },

  formatPhone: (phone) => {
    if (!phone) return '';
    return phone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  }
};