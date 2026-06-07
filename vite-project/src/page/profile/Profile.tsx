import React, { useState } from 'react';
import './Profile.css';

/**
 * Типы для вкладок личного кабинета
 */
type ProfileTab = 'personal' | 'orders' | 'favorites';

const Profile: React.FC = () => {
  // Состояние текущей активной вкладки
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');

  // Состояние данных пользователя (для демонстрации редактирования)
  const [userData, setUserData] = useState({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+996 555 123 456',
    address: 'г. Бишкек, ул. Киевская 124',
  });

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* ЛЕВАЯ ЧАСТЬ: Навигация по кабинету */}
        <aside className="profile-sidebar">
          <div className="user-brief">
            <div className="avatar-placeholder">{userData.name[0]}</div>
            <h3>{userData.name}</h3>
          </div>

          <nav className="profile-nav">
            <button
              className={activeTab === 'personal' ? 'active' : ''}
              onClick={() => setActiveTab('personal')}
            >
              👤 Личные данные
            </button>
            <button
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              📦 История заказов
            </button>
            <button
              className={activeTab === 'favorites' ? 'active' : ''}
              onClick={() => setActiveTab('favorites')}
            >
              ❤️ Избранные товары
            </button>
            {/* Ссылка на корзину — это переход на другую страницу */}
            <a href="/cart" className="nav-cart-link">
              🛒 Перейти в корзину
            </a>
          </nav>
        </aside>

        {/* ПРАВАЯ ЧАСТЬ: Контент вкладки */}
        <main className="profile-content">
          {/* Вкладка: Личные данные */}
          {activeTab === 'personal' && (
            <section className="profile-section">
              <h2>Редактировать профиль</h2>
              <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
                <div className="input-group">
                  <label>ФИО</label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={userData.email}
                    disabled
                    className="form-input disabled"
                  />
                </div>
                <div className="input-group">
                  <label>Телефон</label>
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="input-group">
                  <label>Адрес доставки</label>
                  <textarea
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    className="form-input"
                  />
                </div>
                <button className="btn-submit">Сохранить изменения</button>
              </form>
            </section>
          )}

          {/* Вкладка: История заказов */}
          {activeTab === 'orders' && (
            <section className="profile-section">
              <h2>Ваши заказы</h2>
              <div className="orders-table-wrapper">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>№ Заказа</th>
                      <th>Дата</th>
                      <th>Сумма</th>
                      <th>Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#00452</td>
                      <td>12.03.2024</td>
                      <td>1,250 сом</td>
                      <td>
                        <span className="status delivered">Доставлен</span>
                      </td>
                    </tr>
                    <tr>
                      <td>#00489</td>
                      <td>05.04.2024</td>
                      <td>450 сом</td>
                      <td>
                        <span className="status processing">В пути</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Вкладка: Избранное */}
          {activeTab === 'favorites' && (
            <section className="profile-section">
              <h2>❤️ Избранное</h2>
              <p className="empty-message">Здесь будут товары, которые вы сохранили.</p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
