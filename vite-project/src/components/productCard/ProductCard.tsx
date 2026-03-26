import React from 'react';
import './ProductCard.css';

interface ProductProps {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  color: string;
}

const ProductCard: React.FC<ProductProps> = ({ title, price, category, image, color }) => {
  return (
    <div className="product-card">
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
