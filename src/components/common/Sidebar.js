import React from 'react';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'vendas', name: 'Vendas', icon: '💰' },
    { id: 'clientes', name: 'Clientes', icon: '👥' },
    { id: 'relatorios', name: 'Relatórios', icon: '📈' }
  ];

  return (
    <nav className="sidebar">
      <div className="p-4">
        <ul className="sidebar-nav">
          {navigation.map((item) => (
            <li key={item.id} className="sidebar-item">
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`sidebar-button ${currentPage === item.id ? 'active' : ''}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="connection-status">
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span className="status-text">Conectado à API</span>
          </div>
          <div className="status-url">
            {process.env.REACT_APP_API_URL?.replace('http://', '') || '192.168.1.12:8080/api'}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;