import React, { useState } from 'react';
// Импортируем компоненты роутинга
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Modal from './components/modal/Modal';
import Catalog from './page/сatalog/Catalog';
import Profile from './page/profile/Profile';
import Footer from './components/footer/Footer';
import { LoginForm, RegisterForm } from './components/authForms/AuthForms';
import { ThemeProvider } from './typescript/ThemeContext';

function App() {
  // Состояния для модальных окон
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'register'>('login');

  // Временный статус авторизации (потом заменим на настоящий)
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const openLogin = () => {
    setModalType('login');
    setModalOpen(true);
  };

  const openRegister = () => {
    setModalType('register');
    setModalOpen(true);
  };

  return (
    /* 1. Все приложение оборачиваем в Router для работы навигации */
    <Router>
      <ThemeProvider>
        <div className="app-wrapper">
          {/* Header всегда виден, на какой бы странице мы ни были */}
          <Header
            isLoggedIn={isLoggedIn}
            cartCount={1}
            onLogin={openLogin}
            onRegister={openRegister}
            // Эти функции теперь могут быть пустыми, так как навигация
            // внутри Header будет работать через Link или useNavigate
            onNavigateToCart={() => {}}
            onNavigateToProfile={() => {}}
          />

          {/* 2. Секция Routes определяет, какой контент показать в зависимости от URL */}
          <main className="main-content">
            <Routes>
              {/* Если путь "/", перенаправляем сразу на каталог */}
              <Route path="/" element={<Navigate to="/catalog" />} />

              {/* Страница каталога */}
              <Route path="/catalog" element={<Catalog />} />

              {/* Страница профиля (доступна только если залогинен) */}
              <Route
                path="/profile"
                element={isLoggedIn ? <Profile /> : <Navigate to="/catalog" />}
              />

              {/* Заглушка для корзины */}
              <Route
                path="/cart"
                element={
                  <div style={{ padding: '100px', textAlign: 'center' }}>
                    <h2>Корзина пока пуста 🛒</h2>
                  </div>
                }
              />

              {/* О нас */}
              <Route
                path="/about"
                element={
                  <div style={{ padding: '100px', textAlign: 'center' }}>
                    <h2>О магазине Pen.kg</h2>
                  </div>
                }
              />
            </Routes>
          </main>

          <Footer />

          {/* Модальное окно (глобальное, вызывается откуда угодно) */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            title={modalType === 'login' ? 'Вход' : 'Регистрация'}
          >
            {modalType === 'login' ? <LoginForm /> : <RegisterForm />}
          </Modal>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
