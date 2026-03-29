/**
 * Генерируем массив из 50 объектов товаров.
 * Используем Array.from для создания массива заданной длины.
 */
export const MOCK_PRODUCTS = Array.from({ length: 1001 }).map((_, i) => {
  // Определяем варианты для разнообразия данных
  const titles = ['Ручка Parker', 'Тетрадь A5', 'Маркеры Touch', 'Ежедневник', 'Карандаши Faber'];
  const categories = ['Письмо', 'Бумага', 'Творчество', 'Принадлежности'];
  const colors = ['blue', 'green', 'red', 'black', 'white', 'multi'];
  const types = ['pen', 'notebook', 'markers', 'pencil', 'ruler'];

  return {
    id: i + 1, // Уникальный ID (1, 2, 3...)
    title: `${titles[i % titles.length]} #${i + 1}`, // Смешиваем название и номер
    price: Math.floor(Math.random() * (3000 - 50) + 50), // Рандомная цена от 50 до 3000
    category: categories[i % categories.length],
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg',
    color: colors[i % colors.length],
    type: types[i % types.length],
    description:
      'Профессиональный инструмент для тех, кто ценит качество и эстетику Pen.kg. Идеально подходит для ежедневного использования.',
    features: ['Высокая прочность', 'Эргономичный дизайн', 'Премиум материалы'],
  };
});
