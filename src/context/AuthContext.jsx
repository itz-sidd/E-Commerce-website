import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const login = (email, password) => {
    // Mock login - in real app, this would call an API
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: email,
      address: '123 Main St, City, State 12345',
      phone: '+1 234 567 8900'
    };
    setUser(mockUser);
    return Promise.resolve(mockUser);
  };

  const register = (userData) => {
    // Mock registration - in real app, this would call an API
    const newUser = {
      id: Date.now(),
      ...userData
    };
    setUser(newUser);
    return Promise.resolve(newUser);
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
  };

  const addOrder = (order) => {
    const newOrder = {
      id: Date.now(),
      ...order,
      status: 'Processing',
      date: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <AuthContext.Provider value={{
      user,
      orders,
      login,
      register,
      logout,
      addOrder,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
