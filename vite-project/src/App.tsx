import React, { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Modal from './components/modal/Modal';
import Catalog from './page/сatalog/Catalog';
import { LoginForm, RegisterForm } from './components/authForms/AuthForms';
import { ThemeProvider } from './typescript/ThemeContext';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'register'>('login');

  const openLogin = () => {
    setModalType('login');
    setModalOpen(true);
  };

  const openRegister = () => {
    setModalType('register');
    setModalOpen(true);
  };

  return (
    <>
      <ThemeProvider>
        <Header
          isLoggedIn={true}
          cartCount={1}
          onLogin={openLogin}
          onRegister={openRegister}
          onNavigateToCart={() => {}}
          onNavigateToProfile={() => {}}
        />
        <Catalog />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title={modalType === 'login' ? 'Вход' : 'Регистрация'}
        >
          {modalType === 'login' ? <LoginForm /> : <RegisterForm />}
        </Modal>
      </ThemeProvider>
    </>
  );
}

export default App;
