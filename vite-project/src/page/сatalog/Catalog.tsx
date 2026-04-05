import React, { useState, useMemo } from 'react';
import ProductCard from '../../components/productCard/ProductCard';
import Modal from '../../components/modal/Modal';
import ProductDetails from '../../components/productDetails/ProductDetails';
import { MOCK_PRODUCTS } from '../../typescript/mockProducts';
import { getPaginationRange } from '../../typescript/paginationUtils';
import './Catalog.css';

const ITEMS_PER_PAGE = 12; // Константа: сколько товаров на одной странице

const getUniqueValues = (data: any[], key: string) => {
  // Map собирает все значения ключа, а Set оставляет только уникальные.
  // Array.from превращает Set обратно в массив для удобного рендера.
  return Array.from(new Set(data.map((item) => item[key]))).filter(Boolean);
};

const Catalog: React.FC = () => {
  // Состояния (State)
  const [searchQuery, setSearchQuery] = useState(''); // Строка поиска
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // Выбранный товар для модалки
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // 1. Извлекаем уникальные бренды (динамически)
  const brands = useMemo(() => getUniqueValues(MOCK_PRODUCTS, 'brand'), []);

  //1. ГЛАВНАЯ ЛОГИКА ФИЛЬТРАЦИИ
  // Фильтруем массив по поиску + категориям + фирмы цветам одновременно.
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color);

      // НОВАЯ ПРОВЕРКА: по брендам
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      return matchesSearch && matchesCategory && matchesColor && matchesBrand;
    });
  }, [searchQuery, selectedCategories, selectedColors, selectedBrands]);

  // ДИНАМИЧЕСКОЕ ПОЛУЧЕНИЕ СПИСКОВ типов и цветов(Масштабируемость)
  // Эти списки всегда актуальны, даже если товаров станет 10 000
  const categories = useMemo(() => getUniqueValues(MOCK_PRODUCTS, 'category'), []);
  const colors = useMemo(() => getUniqueValues(MOCK_PRODUCTS, 'color'), []);

  //ФУНКЦИИ ОБРАБОТКИ КЛИКОВ фильтрации
  const toggleFilter = (value: string, state: string[], setState: (v: string[]) => void) => {
    // Если значение уже в массиве — удаляем, если нет — добавляем.
    const newState = state.includes(value)
      ? state.filter((item) => item !== value)
      : [...state, value];
    setState(newState);
    setCurrentPage(1); // Всегда сбрасываем на 1-ю страницу при смене фильтра
  };

  //РАСЧЕТ ПАГИНАЦИИ

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Если после поиска страниц стало меньше, чем текущая (например, была 5, стала 1),
  // используем 1-ю страницу, чтобы не видеть пустой экран.
  const safeCurrentPage = currentPage > totalPages ? 1 : currentPage;
  //НАРЕЗКА МАССИВА (Slicing)
  //Берем только те 8 товаров, которые должны быть на текущей странице.

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
          {/* Динамические Категории
          <div className="filter-group">
            <h4>Категории</h4>
            {categories.map((cat) => (
              <label key={cat} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat as string)}
                  onChange={() =>
                    toggleFilter(cat as string, selectedCategories, setSelectedCategories)
                  }
                />
                {cat}
              </label>
            ))}
          </div> */}
          {/* Блок Категории */}
<div className="filter-group">
  <h4>Категории</h4>
  {/* Используем тот же класс со скроллом, что и для брендов */}
  <div className="filter-scroll-area">
    {categories.map(cat => (
      <label key={cat as string} className="filter-checkbox">
        <input 
          type="checkbox" 
          checked={selectedCategories.includes(cat as string)}
          // toggleFilter — наша универсальная функция, которая 
          // добавляет или удаляет значение из массива выбранных
          onChange={() => toggleFilter(cat as string, selectedCategories, setSelectedCategories)}
        />
        {/* Отображаем название категории */}
        <span className="brand-name-text">{cat}</span>
      </label>
    ))}
  </div>
</div>

          <div className="filter-group">
            <h4>Бренды</h4>
            <div className="filter-scroll-area">
              {brands.map((brand) => (
                <label key={brand as string} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand as string)}
                    onChange={() =>
                      toggleFilter(brand as string, selectedBrands, setSelectedBrands)
                    }
                  />
                  <span className="brand-name-text">{brand}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Динамические Цвета */}
          <div className="filter-group">
            <h4>Цвета</h4>
            <div className="color-grid">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`color-option ${selectedColors.includes(color as string) ? 'active' : ''}`}
                  style={{ backgroundColor: color as string }}
                  onClick={() => toggleFilter(color as string, selectedColors, setSelectedColors)}
                  title={color as string}
                />
              ))}
            </div>
          </div>

          {/* Кнопка сброса */}
          {(selectedCategories.length > 0 || selectedColors.length > 0) && (
            <button
              className="btn-ghost full-width"
              onClick={() => {
                setSelectedCategories([]);
                setSelectedColors([]);
              }}
            >
              Сбросить фильтры
            </button>
          )}
        </aside>

        {/* отрисовка карточек товаров */}
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
