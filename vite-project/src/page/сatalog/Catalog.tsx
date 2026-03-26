import React, { useState } from 'react';
import ProductCard from '../../components/productCard/ProductCard';
import './Catalog.css';
import { MOCK_PRODUCTS } from '../../typescript/mockProducts';

const Catalog: React.FC = () => {
  const [products] = useState(MOCK_PRODUCTS);

  return (
    <div className="catalog-page">
      <div className="catalog-container">
        {/* SIDEBAR - ФИЛЬТРЫ */}
        <aside className="catalog-sidebar">
          <h3>Фильтры</h3>

          <div className="filter-group">
            <h4>Категория</h4>
            <label>
              <input type="checkbox" /> Ручки
            </label>
            <label>
              <input type="checkbox" /> Тетради
            </label>
            <label>
              <input type="checkbox" /> Маркеры
            </label>
          </div>

          <div className="filter-group">
            <h4>Цвет</h4>
            <div className="color-selector">
              <button className="color-dot" style={{ backgroundColor: 'blue' }}></button>
              <button className="color-dot" style={{ backgroundColor: 'red' }}></button>
              <button className="color-dot" style={{ backgroundColor: 'black' }}></button>
            </div>
          </div>
        </aside>

        {/* ОСНОВНОЙ КОНТЕНТ */}
        <main className="catalog-main">
          <div className="catalog-header">
            <span>Найдено товаров: {products.length}</span>
            <select className="sort-select">
              <option>Сначала дешевые</option>
              <option>Сначала дорогие</option>
            </select>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Пагинация (Заглушка) */}
          <div className="pagination">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Catalog;
