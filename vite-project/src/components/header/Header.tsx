import React, { useState } from 'react';
import './Header.css';
import { useTheme } from '../../typescript/ThemeContext';

interface HeaderProps {
  isLoggedIn: boolean;
  cartCount: number;
  onLogin: () => void;
  onRegister: () => void;
  onNavigateToProfile: () => void;
  onNavigateToCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isLoggedIn, 
  cartCount, 
  onLogin, 
  onRegister, 
  onNavigateToProfile, 
  onNavigateToCart 
}) => {
  // const [isDark, setIsDark] = useState(false);

  // const toggleTheme = () => {
  //   const newTheme = !isDark ? 'dark' : 'light';
  //   setIsDark(!isDark);
  //   document.documentElement.setAttribute('data-theme', newTheme);
  // };

  const { theme, toggleTheme } = useTheme(); // Берем глобальную тему

  return (
    <header className="header">
      <div className="header-container">
        {/* Левая часть: Логотип */}
        <div className="header-left">
          <div className="logo-section" onClick={() => window.location.href = '/'}>
            <div className="logo-icon">✒️</div>
            <h1 className="brand-name">Pen<span>.kg</span></h1>
          </div>

          {/* Навигация (вернули и дополнили) */}
          <nav className="nav-menu">
            <a href="/catalog">Каталог</a>
            <a href="/new">Новинки</a>
            <a href="/about">О нас</a>
          </nav>
        </div>

        {/* Правая часть: Интерфейс и Тема */}
        <div className="header-right">
          <div className="auth-section">
            {isLoggedIn ? (
              <div className="user-actions">
                <button className="icon-btn" onClick={onNavigateToCart} title="Корзина">
                  <span>🛒</span>
                  {cartCount > 0 && <span className="badge">{cartCount}</span>}
                </button>
                <button className="icon-btn" onClick={onNavigateToProfile} title="Профиль">
                  <span>👤</span>
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button onClick={onLogin} className="btn-login">Войти</button>
                <button onClick={onRegister} className="btn-register">Регистрация</button>
              </div>
            )}
          </div>

          <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
        </div>
      </div>
    </header>
  );
};

export default Header;