import React from 'react';
import './Footer.css';

/**
 * Компонент Footer (Подвал сайта)
 * Содержит логотип, краткое описание, ссылки на соцсети и контакты.
 */
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Блок 1: Брендинг */}
        <div className="footer-section brand">
          <h2 className="footer-logo">
            Pen<span>.kg</span>
          </h2>
          <p className="footer-description">
            Ваш надежный поставщик качественной канцелярии для офиса, школы и творчества в
            Кыргызстане.
          </p>
        </div>

        {/* Блок 2: Быстрые ссылки (Заглушки) */}
        <div className="footer-section">
          <h4>Навигация</h4>
          <ul className="footer-links">
            <li>
              <a href="/catalog">Каталог</a>
            </li>
            <li>
              <a href="/about">О нас</a>
            </li>
            <li>
              <a href="/delivery">Доставка</a>
            </li>
            <li>
              <a href="/faq">Вопросы и ответы</a>
            </li>
          </ul>
        </div>

        {/* Блок 3: Контакты и Соцсети */}
        <div className="footer-section">
          <h4>Контакты</h4>
          <ul className="footer-contacts">
            {/* Ссылки-заглушки (href="#") */}
            <li>
              📞 <a href="tel:+996555123456">+996 (555) 12-34-56</a>
            </li>
            <li>
              ✉️ <a href="mailto:info@pen.kg">info@pen.kg</a>
            </li>
            <li className="social-icons">
              <a href="#" className="social-link" title="Instagram">
                📸 Inst
              </a>
              <a href="#" className="social-link" title="Telegram">
                ✈️ TG
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Нижняя полоса с авторскими правами */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Pen.kg. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
