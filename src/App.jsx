import React from 'react';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '1rem'
        }}>
          E-Commerce Store
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#6b7280',
          marginBottom: '1.5rem'
        }}>
          Welcome to our online store!
        </p>
        <button style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
