import React, { useState } from 'react';
import visaIcon from '../../../assets/visa.svg';
import mastercardIcon from '../../../assets/mastercard.svg';
import amexIcon from '../../../assets/amex.svg';
import discoverIcon from '../../../assets/discover.svg';
import paypalIcon from '../../../assets/paypal.svg';
import applePayIcon from '../../../assets/apay.png';
import googlePayIcon from '../../../assets/gpay.png';
import SaveNotification from '../components/SaveNotification';


const PaymentMethodsTab = ({ config, onChange, onSave, onCancel, isSaving, isDirty, isCollapsed }) => {
  const [showNotification, setShowNotification] = useState(false);
  const countries = [
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽' }
  ];
  
  const paymentMethods = [
    { id: 'visa', name: 'Visa', icon: visaIcon },
    { id: 'mastercard', name: 'Mastercard', icon: mastercardIcon },
    { id: 'amex', name: 'American Express', icon: amexIcon },
    { id: 'discover', name: 'Discover', icon: discoverIcon },
    { id: 'paypal', name: 'PayPal', icon: paypalIcon },
    { id: 'applepay', name: 'Apple Pay', icon: applePayIcon },
    { id: 'googlepay', name: 'Google Pay', icon: googlePayIcon }
  ];

  const isMethodAvailableInCountry = (methodId, countryCode) => {
    const availability = {
      discover: ['US', 'CA'],
    };
    return !availability[methodId] || availability[methodId].includes(countryCode);
  };

  const handleToggle = (countryCode, methodId) => {
    const updated = { ...config };
    if (!updated.paymentMethods) updated.paymentMethods = {};
    if (!updated.paymentMethods[countryCode]) updated.paymentMethods[countryCode] = {};
    
    const currentValue = updated.paymentMethods[countryCode][methodId] || false;
    updated.paymentMethods[countryCode][methodId] = !currentValue;
    
    onChange(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowNotification(true);
    if (onSave) onSave();
  };

  const isEnabled = (countryCode, methodId) => {
    return config?.paymentMethods?.[countryCode]?.[methodId] || false;
  };

  const ToggleSwitch = ({ enabled, onChange, disabled }) => (
      <div 
        onClick={disabled ? null : onChange}
        style={{
          width: 44,
          height: 24,
          borderRadius: 12,
          backgroundColor: disabled 
            ? '#f3f4f6' 
            : (enabled ? '#4931c1' : '#e5e7eb'),
          position: 'relative',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          border: disabled 
            ? '2px solid #d1d5db' 
            : (enabled ? '2px solid #4931c1' : '2px solid #d1d5db'),
          opacity: disabled ? 0.6 : 1
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: 'white',
            position: 'absolute',
            top: 2,
            left: enabled ? 24 : 2,
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        />
      </div>
    );

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#111827' }}>Payment Methods Configuration</h3>
        <p style={{ color: '#6b7280', fontSize: 16 }}>Configure payment method availability across different markets</p>
      </div>
      
      <div style={{ 
        backgroundColor: '#f9fafb', 
        border: '1px solid #e5e7eb', 
        borderRadius: 12, 
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6' }}>
                <th style={{ 
                  padding: '20px 24px', 
                  textAlign: 'left', 
                  fontWeight: 700, 
                  fontSize: 14,
                  color: '#374151',
                  borderBottom: '2px solid #e5e7eb',
                  position: 'sticky',
                  left: 0,
                  backgroundColor: '#f3f4f6',
                  zIndex: 10
                }}>
                  Market
                </th>
                {paymentMethods.map(method => (
                  <th key={method.id} style={{ 
                    padding: '20px 16px', 
                    textAlign: 'center', 
                    fontWeight: 700, 
                    fontSize: 14,
                    color: '#374151',
                    borderBottom: '2px solid #e5e7eb',
                    minWidth: 120
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                      <img 
                        src={method.icon} 
                        alt={method.name}
                        style={{ 
                          width: 32, 
                          height: 20, 
                          objectFit: 'contain'
                        }}
                      />
                      <span>{method.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {countries.map((country, index) => (
                <tr key={country.code} style={{ 
                  backgroundColor: index % 2 === 0 ? 'white' : '#fafafa',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <td style={{ 
                    padding: '20px 24px', 
                    fontWeight: 600,
                    fontSize: 15,
                    color: '#111827',
                    position: 'sticky',
                    left: 0,
                    backgroundColor: index % 2 === 0 ? 'white' : '#fafafa',
                    zIndex: 5,
                    borderRight: '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 20 }}>{country.flag}</span>
                      <span style={{ fontWeight: 600 }}>{country.name} </span>
                    </div>
                  </td>
                  {paymentMethods.map(method => (
                    <td key={method.id} style={{ padding: '20px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                          <ToggleSwitch
                            enabled={isEnabled(country.code, method.id)}
                            onChange={() => handleToggle(country.code, method.id)}
                            disabled={!isMethodAvailableInCountry(method.id, country.code)}
                          />
                          {!isMethodAvailableInCountry(method.id, country.code) && (
                            <span style={{ 
                              fontSize: 10, 
                              color: '#dc2626', 
                              fontWeight: 600,
                              marginTop: 2
                            }}>
                              Not available
                            </span>
                          )}
                        </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div style={{ 
        marginTop: 24, 
        padding: 16, 
        backgroundColor: '#eff6ff', 
        border: '1px solid #bfdbfe', 
        borderRadius: 8,
        fontSize: 14,
        color: '#1e40af'
      }}>
        <strong>Note:</strong> Changes will be applied after saving the configuration. Disabled payment methods will not be available for transactions in the respective markets.
      </div>
      
      <div style={{ 
        position: 'fixed',
        bottom: 0,
        left: isCollapsed ? '64px' : '244px',
        right: 0,
        backgroundColor: 'white',
        padding: '12px 24px',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        transition: 'left 0.3s ease'
      }}>
        <div style={{ color: '#6b7280', fontSize: 14 }}>
          {isDirty ? 'You have unsaved changes' : 'All changes saved'}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={onCancel}
            disabled={!isDirty}
            style={{
              padding: '6px 12px',
              border: '1px solid #d1d5db',
              background: 'white',
              color: '#374151',
              borderRadius: 6,
              cursor: isDirty ? 'pointer' : 'not-allowed',
              fontSize: 13,
              fontWeight: 500,
              opacity: isDirty ? 1 : 0.5
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '6px 16px',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
          >
            Save Changes
          </button>
        </div>
      </div>
      
      <div style={{ marginBottom: 80 }}>
        {/* Space for fixed footer */}
      </div>
      
      <SaveNotification
        isVisible={showNotification}
        message="Payment Methods Configured"
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
};

export default PaymentMethodsTab;