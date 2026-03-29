import React, { useState, useMemo } from 'react';
import ProductCard from '../../components/productCard/ProductCard';
import Modal from '../../components/modal/Modal';
import ProductDetails from '../../components/productDetails/ProductDetails';
import { MOCK_PRODUCTS } from '../../typescript/mockProducts';
import { getPaginationRange } from '../../typescript/paginationUtils';
import './Catalog.css';

const ITEMS_PER_PAGE = 8; // Константа: сколько товаров на одной странице

const Catalog: React.FC = () => {
  // Состояния (State)
  const [searchQuery, setSearchQuery] = useState(''); // Строка поиска
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // Выбранный товар для модалки

  /**
   * 1. ФИЛЬТРАЦИЯ ПО ПОИСКУ
   * useMemo кэширует результат. Фильтрация сработает только если изменится searchQuery.
   */
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  /**
   * 2. РАСЧЕТ ПАГИНАЦИИ
   */
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Если после поиска страниц стало меньше, чем текущая (например, была 5, стала 1),
  // используем 1-ю страницу, чтобы не видеть пустой экран.
  const safeCurrentPage = currentPage > totalPages ? 1 : currentPage;

  /**
   * 3. НАРЕЗКА МАССИВА (Slicing)
   * Берем только те 8 товаров, которые должны быть на текущей странице.
   */
  const currentItems = useMemo(() => {
    const lastIndex = safeCurrentPage * ITEMS_PER_PAGE;
    const firstIndex = lastIndex - ITEMS_PER_PAGE;
    return filteredProducts.slice(firstIndex, lastIndex);
  }, [filteredProducts, safeCurrentPage]);

  // Генерируем массив кнопок пагинации (например: [1, 2, "...", 7])
  const paginationRange = getPaginationRange(safeCurrentPage, totalPages);

  // Функция для смены страницы со скроллом вверх
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="catalog-page">
      <div className="catalog-container">
        {/* САЙДБАР С ПОИСКОМ */}
        <aside className="catalog-sidebar">
          <div className="search-box">
            <h4>Поиск</h4>
            <input
              type="text"
              placeholder="Найти в Pen.kg..."
              className="form-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // При каждом новом поиске сбрасываем на 1-ю страницу
              }}
            />
          </div>
          {/* Здесь в будущем добавим фильтры по цвету/типу */}
        </aside>

        {/* ОСНОВНАЯ ЧАСТЬ */}
        <main className="catalog-main">
          <div className="catalog-header">
            <span>Найдено товаров: {filteredProducts.length}</span>
          </div>

          <div className="product-grid">
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onOpen={() => setSelectedProduct(product)}
                />
              ))
            ) : (
              <div className="no-results">По вашему запросу ничего не найдено 🖋️</div>
            )}
          </div>

          {/* БЛОК ПАГИНАЦИИ */}
          {totalPages > 1 && (
            <div className="pagination">
              {/* Кнопка "Назад" */}
              <button
                className="page-btn"
                disabled={safeCurrentPage === 1}
                onClick={() => handlePageChange(safeCurrentPage - 1)}
              >
                ←
              </button>

              {/* Рендер числовых кнопок и многоточий */}
              {paginationRange.map((page, index) => (
                <button
                  key={index}
                  className={`page-btn ${page === safeCurrentPage ? 'active' : ''} ${page === '...' ? 'dots' : ''}`}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                  disabled={page === '...'}
                >
                  {page}
                </button>
              ))}

              {/* Кнопка "Вперед" */}
              <button
                className="page-btn"
                disabled={safeCurrentPage === totalPages}
                onClick={() => handlePageChange(safeCurrentPage + 1)}
              >
                →
              </button>
            </div>
          )}
        </main>
      </div>

      {/* МОДАЛЬНОЕ ОКНО ТОВАРА */}
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title="Детали товара"
      >
        {selectedProduct && <ProductDetails {...selectedProduct} />}
      </Modal>
    </div>
  );
};

export default Catalog;
