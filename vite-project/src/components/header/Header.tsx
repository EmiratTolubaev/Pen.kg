import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'; // Импортируем инструменты навигации
import './Header.css';
import { useTheme } from '../../typescript/ThemeContext';

interface HeaderProps {
  isLoggedIn: boolean;
  cartCount: number;
  onLogin: () => void;
  onRegister: () => void;
  // Убираем лишние пропсы навигации, так как теперь Header сам знает куда идти
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, cartCount, onLogin, onRegister }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate(); // Хук для переходов по клику на кнопки

  return (
    <header className="header">
      <div className="header-container">
        {/* ЛЕВАЯ ЧАСТЬ */}
        <div className="header-left">
          {/* Используем Link вместо window.location, чтобы страница не перезагружалась */}
          <Link to="/" className="logo-section">
            <div className="logo-icon">✒️</div>
            <h1 className="brand-name">
              Pen<span>.kg</span>
            </h1>
          </Link>

          <nav className="nav-menu">
            {/* NavLink автоматически подсветит активную ссылку */}
            <NavLink
              to="/catalog"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Каталог
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              О нас
            </NavLink>
          </nav>
        </div>

        {/* ПРАВАЯ ЧАСТЬ */}
        <div className="header-right">
          <div className="auth-section">
            {isLoggedIn ? (
              <div className="user-actions">
                {/* Используем navigate для перехода по программному клику */}
                <button className="icon-btn" onClick={() => navigate('/cart')} title="Корзина">
                  <span>🛒</span>
                  {cartCount > 0 && <span className="badge">{cartCount}</span>}
                </button>

                <button className="icon-btn" onClick={() => navigate('/profile')} title="Профиль">
                  <span>👤</span>
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button onClick={onLogin} className="btn-login">
                  Войти
                </button>
                <button onClick={onRegister} className="btn-register">
                  Регистрация
                </button>
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
