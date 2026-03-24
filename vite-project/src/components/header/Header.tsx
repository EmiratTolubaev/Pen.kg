import React from 'react';
import './Header.css';

interface HeaderProps {
  isLoggedIn: boolean;
  userName?: string;
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isLoggedIn, 
  userName, 
  onLogin, 
  onRegister, 
  onLogout 
}) => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Логотип и Название */}
        <div className="logo-section">
          <div className="logo-icon">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 3L21 10.5L7.5 24H0V16.5L13.5 3Z" fill="currentColor"/>
              <path d="M17 6.5L19.5 9" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <h1 className="brand-name">Pen<span>.kg</span></h1>
        </div>

        {/* Навигация */}
        <nav className="nav-menu">
          <a href="/">Каталог</a>
          <a href="/about">О нас</a>
        </nav>

        {/* Блок авторизации */}
        <div className="auth-section">
          {isLoggedIn ? (
            <div className="user-controls">
              <span className="welcome-text">Привет, <strong>{userName}</strong></span>
              <button className="btn-cart">
                🛒 <span className="cart-count">3</span>
              </button>
              <button onClick={onLogout} className="btn-secondary">Выйти</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={onLogin} className="btn-ghost">Войти</button>
              <button onClick={onRegister} className="btn-primary">Регистрация</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;