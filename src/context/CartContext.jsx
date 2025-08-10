import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const API_BASE_URL = '/api'; // Adjust based on your Django API setup

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from backend on mount
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/cart/`, {
        credentials: 'include', // Include session cookies
      });
      
      if (response.ok) {
        const cartData = await response.json();
        if (cartData.items) {
          setCartItems(cartData.items.map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: parseFloat(item.product.price),
            image: item.product.image || '/placeholder-image.jpg',
            quantity: item.quantity
          })));
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      // Fallback to local storage for demo purposes
      loadCartFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const loadCartFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  };

  const saveCartToLocalStorage = (items) => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/add/${product.id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Reload cart to get updated state
          await loadCart();
          return;
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }

    // Fallback to local state
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      const newItems = existingItem
        ? prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];
      
      saveCartToLocalStorage(newItems);
      return newItems;
    });
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}/`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCSRFToken(),
        },
        credentials: 'include',
      });

      if (response.ok) {
        await loadCart();
        return;
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }

    // Fallback to local state
    setCartItems(prev => {
      const newItems = prev.filter(item => item.id !== productId);
      saveCartToLocalStorage(newItems);
      return newItems;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev => {
      const newItems = prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      saveCartToLocalStorage(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    saveCartToLocalStorage([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Function to get CSRF token for Django
  const getCSRFToken = () => {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];
    return cookieValue || '';
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      loading,
      loadCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
