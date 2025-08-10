import React from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#333', fontSize: '32px', margin: '0 0 16px 0' }}>
          E-Commerce Store
        </h1>
        <p style={{ color: '#666', fontSize: '18px', margin: '0 0 24px 0' }}>
          Welcome to our store!
        </p>
        <button style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Shop Now
        </button>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
