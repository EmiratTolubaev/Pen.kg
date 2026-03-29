import React from 'react';
import './ProductCard.css';

interface ProductProps {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  color: string;
  onOpen: () => void;
}

const ProductCard: React.FC<ProductProps> = ({ title, price, image, onOpen, category, color }) => {
  return (
    // Добавляем onClick на главный контейнер карточки
    <div className="product-card" onClick={onOpen} style={{ cursor: 'pointer' }}>
      <div className="product-image">
        <img src={image} alt={title} />
        <span className="product-tag">{category}</span>
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-meta">
          Цвет: <span style={{ color: color }}>●</span>
        </p>
        <div className="product-footer">
          <span className="product-price">{price} сом</span>
          <button className="add-to-cart-btn">🛒</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
