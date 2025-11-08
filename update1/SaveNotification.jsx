import React from 'react';

const SaveNotification = ({ isVisible, message, onClose }) => {
  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: 12,
        padding: '32px 40px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid #e5e7eb',
        minWidth: 400,
        textAlign: 'center'
      }}>
        <div style={{
          width: 64,
          height: 64,
          backgroundColor: '#10b981',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: 28,
          color: 'white'
        }}>
          ✓
        </div>
        <h3 style={{
          fontSize: 20,
          fontWeight: 600,
          color: '#111827',
          margin: '0 0 8px 0'
        }}>
          {message}
        </h3>
        <p style={{
          color: '#6b7280',
          fontSize: 14,
          margin: '0 0 24px 0'
        }}>
          Your changes have been successfully applied
        </p>
        <button
          onClick={onClose}
          style={{
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '10px 24px',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SaveNotification;