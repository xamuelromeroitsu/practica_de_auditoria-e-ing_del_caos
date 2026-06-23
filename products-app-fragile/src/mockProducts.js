// Mock data — algunos productos tienen imágenes null o vacías intencionalmente
export const mockProducts = [
  {
    id: 1,
    name: 'Laptop Pro',
    price: 1299.99,
    image: 'https://fakestoreapi.com/img/81fAn1XK-fL._AC_SX679_.jpg',
    category: 'electronics',
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    price: 29.99,
    image: null, // ← imagen null intencionalmente
    category: 'electronics',
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    price: 89.99,
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    category: 'electronics',
  },
  {
    id: 4,
    name: 'Monitor 4K',
    price: 449.99,
    image: '', // ← imagen vacía intencionalmente
    category: 'electronics',
  },
  {
    id: 5,
    name: 'USB Hub',
    price: 19.99,
    image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
    category: 'accessories',
  },
]
