import React, { useState } from 'react';
import './App.css'
import Header from './components/header/Header'
import Modal from './components/modal/Modal';
import { LoginForm, RegisterForm } from './components/authForms/AuthForms';

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
<Header 
        isLoggedIn={false} 
        cartCount={1} 
        onLogin={openLogin} 
        onRegister={openRegister}
        onNavigateToCart={() => {}}
        onNavigateToProfile={() => {}}
      />
<Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        title={modalType === 'login' ? 'Вход в Pen.kg' : 'Регистрация'}
      >
        {modalType === 'login' ? <LoginForm /> : <RegisterForm />}
      </Modal>
    </>
  )
}

export default App
