import React from 'react';
import './AuthForms.css';

export const LoginForm = () => (
  <div className="auth-form">
    <div className="input-group">
      <label>Email</label>
      <input type="email" placeholder="example@mail.com" className="form-input" />
    </div>
    <div className="input-group">
      <label>Пароль</label>
      <input type="password" placeholder="••••••••" className="form-input" />
    </div>
    <button className="btn-submit">Войти</button>
    <p className="auth-switch">Забыли пароль?</p>
  </div>
);

export const RegisterForm = () => (
  <div className="auth-form">
    <div className="input-group">
      <label>Имя</label>
      <input type="text" placeholder="Иван" className="form-input" />
    </div>
    <div className="input-group">
      <label>Номер телефона</label>
      <input type="tel" placeholder="+996 (___) __-__-__" className="form-input" />
    </div>
    <div className="input-group">
      <label>Email</label>
      <input type="email" placeholder="example@mail.com" className="form-input" />
    </div>
    <div className="input-group">
      <label>Пароль</label>
      <input type="password" placeholder="Минимум 8 символов" className="form-input" />
    </div>
    <button className="btn-submit">Создать аккаунт</button>
  </div>
);