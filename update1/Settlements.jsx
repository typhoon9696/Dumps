// src/pages/Settlements.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';
import reportTypes from '../data/reports/reportTypes';
import schedules from '../data/reports/schedules';

const formatDate = (date) => new Date(date).toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC';

const ReportsTable = ({ data }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
      <thead>
        <tr style={{ backgroundColor: '#f8f9fa' }}>
          {['Report Type', 'Entity', 'Merchant ID', 'Frequency', 'Time Zone', 'Delivery Type', 'Date Created (UTC)'].map(h => (
            <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: 13, color: '#495057' }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={row.id} style={{ borderBottom: '1px solid #e9ecef', backgroundColor: i % 2 === 0 ? 'white' : '#fdfdfe' }}>
            <td style={{ padding: '12px 16px', fontSize: 14 }}>{row.reportType}</td>
            <td style={{ padding: '12px 16px', fontSize: 14 }}>{row.entity}</td>
            <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600 }}>{row.merchantId}</td>
            <td style={{ padding: '12px 16px', fontSize: 14 }}>{row.frequency}</td>
            <td style={{ padding: '12px 16px', fontSize: 14 }}>{row.timeZone || 'UTC'}</td>
            <td style={{ padding: '12px 16px', fontSize: 14 }}>
              <span style={{ backgroundColor: '#e3f2fd', color: '#1976d2', padding: '4px 8px', borderRadius: 4, fontSize: 12 }}>
                {row.deliveryType || 'SFTP'}
              </span>
            </td>
            <td style={{ padding: '12px 16px', fontSize: 14, color: '#6c757d' }}>{formatDate(row.dateCreated)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Settlements = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#4931c1',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const filteredReportTypes = reportTypes.filter(type => 
    type.toLowerCase().includes(search.toLowerCase())
  );

  const handleReportTypeSelect = (type) => {
    setSearch(type);
    setShowDropdown(false);
  };

  const filterData = (data) => {
    return data.filter(item => {
      const matchesSearch = !search || item.reportType.toLowerCase().includes(search.toLowerCase());
      const itemDate = new Date(item.dateCreated);
      const matchesDateFrom = !dateFrom || itemDate >= new Date(dateFrom);
      const matchesDateTo = !dateTo || itemDate <= new Date(dateTo + 'T23:59:59');
      return matchesSearch && matchesDateFrom && matchesDateTo;
    });
  };

  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false);
    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showDropdown]);

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Sidebar onToggle={setIsCollapsed} />
      <div style={{ marginLeft: isCollapsed ? '64px' : '244px', paddingTop: '64px', transition: 'all 0.3s' }}>
        <DashboardNavbar isCollapsed={isCollapsed} />

        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Reports</h2>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
            Manage schedules for reports delivered by SFTP
          </p>



          {/* FILTERS */}
          <div style={{ padding: '16px', marginBottom: '24px', borderRadius: '8px', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                <input
                  type="text"
                  placeholder="Search report type..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onClick={(e) => e.stopPropagation()}
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                {showDropdown && filteredReportTypes.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderTop: 'none',
                    borderRadius: '0 0 4px 4px',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: 1000,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    {filteredReportTypes.map(type => (
                      <div
                        key={type}
                        onClick={() => handleReportTypeSelect(type)}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          borderBottom: '1px solid #f0f0f0'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="date"
                placeholder="From Date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
              />
              <input
                type="date"
                placeholder="To Date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
              />
              <button style={buttonStyle} onClick={()=>navigate('/create-report')}>
                Create Report
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div style={{ borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <ReportsTable data={filterData(schedules)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settlements;