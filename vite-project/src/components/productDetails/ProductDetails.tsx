import React from 'react';
import './ProductDetails.css';

interface ProductDetailsProps {
  title: string;
  price: number;
  category: string;
  image: string;
  color: string;
  description: string;
  features: string[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  title,
  price,
  category,
  image,
  color,
  description,
  features,
}) => {
  return (
    <div className="product-details">
      <div className="details-image">
        <img src={image} alt={title} />
      </div>

      <div className="details-info">
        <span className="details-category">{category}</span>
        <h2 className="details-title">{title}</h2>
        <p className="details-price">{price} сом</p>

        <div className="details-description">
          <h4>Описание:</h4>
          <p>{description}</p>
        </div>

        <div className="details-features">
          <h4>Характеристики:</h4>
          <ul>
            {features.map((f, index) => (
              <li key={index}>{f}</li>
            ))}
          </ul>
        </div>

        <div className="details-color">
          <span>Цвет: </span>
          <div className="color-preview" style={{ backgroundColor: color }}></div>
        </div>

        <button className="btn-submit full-width">Добавить в корзину</button>
      </div>
    </div>
  );
};

export default ProductDetails;
