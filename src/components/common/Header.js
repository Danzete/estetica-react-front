import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Sistema de Vendas</h1>
        <div className="header-info">
          <div className="header-date">
            {new Date().toLocaleDateString('pt-BR')}
          </div>
          <div className="header-avatar">
            U
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;