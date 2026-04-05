// import React from 'react';
// import './ProductDetails.css';

// interface ProductDetailsProps {
//   title: string;
//   price: number;
//   category: string;
//   image: string;
//   color: string;
//   description: string;
//   features: string[];
// }

// const ProductDetails: React.FC<ProductDetailsProps> = ({
//   title,
//   price,
//   category,
//   image,
//   color,
//   description,
//   features,
// }) => {
//   return (
//     <div className="product-details">
//       <div className="details-image">
//         <img src={image} alt={title} />
//       </div>

//       <div className="details-info">
//         <span className="details-category">{category} | {brand}</span>
//   <h2 className="details-title">{title}</h2>

//   <div className="stock-status">
//     {stock > 0 ? (
//       <span className="in-stock">✅ В наличии: {stock} шт.</span>
//     ) : (
//       <span className="out-of-stock">❌ Нет в наличии</span>
//     )}
//   </div>

//   <p className="details-barcode">Штрих-код: <code>{barcode}</code></p>
//         <span className="details-category">{category}</span>
//         <h2 className="details-title">{title}</h2>
//         <p className="details-price">{price} сом</p>

//         <div className="details-description">
//           <h4>Описание:</h4>
//           <p>{description}</p>
//         </div>

//         <div className="details-features">
//           <h4>Характеристики:</h4>
//           <ul>
//             {features.map((f, index) => (
//               <li key={index}>{f}</li>
//             ))}
//           </ul>
//         </div>

//         <div className="details-color">
//           <span>Цвет: </span>
//           <div className="color-preview" style={{ backgroundColor: color }}></div>
//         </div>

//         <button className="btn-submit full-width">Добавить в корзину</button>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React from 'react';
import './ProductDetails.css';

/**
 * Расширяем интерфейс пропсов новыми полями,
 * чтобы компонент знал о бренде, складе и штрих-коде.
 */
interface ProductDetailsProps {
  title: string;
  price: number;
  category: string;
  image: string;
  color: string;
  description: string;
  features: string[];
  brand: string; // Добавлено
  stock: number; // Добавлено
  barcode: string; // Добавлено
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  title,
  price,
  category,
  image,
  color,
  description,
  features,
  brand, // Извлекаем из пропсов
  stock, // Извлекаем из пропсов
  barcode, // Извлекаем из пропсов
}) => {
  return (
    <div className="product-details">
      {/* Левая колонка: Изображение */}
      <div className="details-image">
        <img src={image} alt={title} />
      </div>

      {/* Правая колонка: Информация */}
      <div className="details-info">
        {/* Хлебные крошки: Категория и Бренд */}
        <span className="details-category">
          {category} | {brand}
        </span>

        <h2 className="details-title">{title}</h2>

        {/* Статус наличия */}
        <div className="stock-status">
          {stock > 0 ? (
            <span className="in-stock">✅ В наличии: {stock} шт.</span>
          ) : (
            <span className="out-of-stock">❌ Нет в наличии</span>
          )}
        </div>

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
          {/* Отображаем штрих-код в характеристиках */}
          <p className="details-barcode">
            <strong>Штрих-код:</strong> <code>{barcode}</code>
          </p>
        </div>

        <div className="details-color">
          <span>Цвет: </span>
          <div className="color-preview" style={{ backgroundColor: color }} title={color}></div>
        </div>

        {/* Кнопка действия */}
        <button
          className="btn-submit full-width"
          disabled={stock === 0} // Блокируем кнопку, если товара нет
        >
          {stock > 0 ? 'Добавить в корзину' : 'Нет в наличии'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
