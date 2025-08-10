export const categories = [
  { id: 1, name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop' },
  { id: 2, name: 'Clothing', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=200&fit=crop' },
  { id: 3, name: 'Home & Garden', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },
  { id: 4, name: 'Sports', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop' },
];

export const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 99.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop'
    ],
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    features: ['Active Noise Cancellation', '30-hour battery', 'Premium sound quality', 'Comfortable fit'],
    rating: 4.5,
    stock: 25,
    featured: true
  },
  {
    id: 2,
    name: 'Classic White T-Shirt',
    price: 29.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f37f4eb6?w=600&h=600&fit=crop'
    ],
    description: 'Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear.',
    features: ['100% Cotton', 'Comfortable fit', 'Machine washable', 'Classic design'],
    rating: 4.3,
    stock: 50,
    featured: true
  },
  {
    id: 3,
    name: 'Smart Home Assistant',
    price: 149.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop'
    ],
    description: 'Voice-controlled smart speaker with built-in AI assistant and smart home integration.',
    features: ['Voice control', 'Smart home integration', 'High-quality speaker', 'AI assistant'],
    rating: 4.7,
    stock: 15,
    featured: true
  },
  {
    id: 4,
    name: 'Premium Denim Jeans',
    price: 79.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop'
    ],
    description: 'High-quality denim jeans with a perfect fit and durable construction.',
    features: ['Premium denim', 'Comfortable fit', 'Durable construction', 'Classic styling'],
    rating: 4.4,
    stock: 30,
    featured: false
  },
  {
    id: 5,
    name: 'Modern Table Lamp',
    price: 59.99,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop'
    ],
    description: 'Elegant modern table lamp with adjustable brightness and sleek design.',
    features: ['Adjustable brightness', 'Modern design', 'Energy efficient', 'Touch control'],
    rating: 4.2,
    stock: 20,
    featured: false
  },
  {
    id: 6,
    name: 'Running Shoes',
    price: 129.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop'
    ],
    description: 'Professional running shoes with advanced cushioning and breathable material.',
    features: ['Advanced cushioning', 'Breathable material', 'Lightweight design', 'Professional grade'],
    rating: 4.6,
    stock: 40,
    featured: true
  }
];

export const banners = [
  {
    id: 1,
    title: 'Summer Sale',
    subtitle: 'Up to 50% off on selected items',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
    cta: 'Shop Now',
    link: '/products'
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Discover our latest collection',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=400&fit=crop',
    cta: 'Explore',
    link: '/products'
  }
];
