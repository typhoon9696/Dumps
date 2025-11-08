// src/pages/Configurations.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardNavbar from '../../components/DashboardNavbar';
import SaveBar from './components/SaveBar';
import useConfig from './hooks/useConfig';
import PaymentMethodsTab from './tabs/PaymentMethodsTab';
import WebhooksTab from './tabs/WebhooksTab';
import RulesTab from './tabs/RulesTab';

const Configurations = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tab, setTab] = useState(0);
  const { data, saveConfig, isSaving } = useConfig();
  const [local, setLocal] = useState(data);
  useEffect(() => setLocal(data), [data]);
  
  const isDirty = JSON.stringify(local) !== JSON.stringify(data);
  
  const handleCancel = () => {
    setLocal(data); // Reset to original data without page reload
  };

  return (
    <div className="dashboard-page">
      <Sidebar onToggle={setIsCollapsed} />
      <div
        className="main-content"
        style={{
          marginLeft: isCollapsed ? "64px" : "244px",
          paddingTop: "64px",
          transition: "all 0.3s ease",
        }}
      >
        <DashboardNavbar isCollapsed={isCollapsed} />
        <div className="dashboard-content-wrapper" style={{ padding: 32, backgroundColor: '#f9fafb' }}>
          <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>Payment Configurations</h2>
          <p style={{ color: '#666', marginBottom: 32 }}>Manage security, webhooks, and advanced settings</p>

          <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
              {['Payment Methods', 'Webhooks','Rules'].map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTab(i)}
                  style={{
                    flex: 1,
                    padding: '16px',
                    border: 'none',
                    background: 'transparent',
                    fontWeight: 600,
                    color: tab === i ? '#4931c1' : '#666',
                    borderBottom: tab === i ? '3px solid #4931c1' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  {t}
                  {t === 'Rules' && tab === i && <span style={{ marginLeft: 8, fontSize: 12 }}>⚙️</span>}
                </button>
              ))}
            </div>
            <div style={{ padding: 32 }}>
                {tab === 0 ? (
                  <PaymentMethodsTab 
                    config={local} 
                    onChange={setLocal} 
                    onSave={() => saveConfig(local)}
                    onCancel={handleCancel}
                    isSaving={isSaving}
                    isDirty={isDirty}
                    isCollapsed={isCollapsed}
                  />
                ) : tab === 1 ? (
                  <WebhooksTab 
                    config={local} 
                    onChange={setLocal}
                    onSave={() => saveConfig(local)}
                    onCancel={handleCancel}
                    isSaving={isSaving}
                    isDirty={isDirty}
                    isCollapsed={isCollapsed}
                  />
                ) : (
                  <RulesTab 
                    config={local} 
                    onChange={setLocal}
                    onSave={() => saveConfig(local)}
                    onCancel={handleCancel}
                    isSaving={isSaving}
                    isDirty={isDirty}
                    isCollapsed={isCollapsed}
                  />
                )}
            </div>

          </div>


        </div>
      </div>
    </div>
  );
};

export default Configurations;