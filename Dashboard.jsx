  import React, { useState } from 'react';
  import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button
  } from '@mui/material';
  import {
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts';
  import Sidebar from '../components/Sidebar';
  import DashboardNavbar from '../components/DashboardNavbar';
  import './Dashboard.css';
  import MapComponent from '../components/Map';
  import globalData from '../data/global.js';

  const Dashboard = () => {

    //prym crs
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleSidebarToggle = (collapsed) => {
      setIsCollapsed(collapsed);
    };

    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleCountrySelect = (countryData) => {
      setSelectedCountry(countryData);
    };

    // Use country data or fall back to global
    const data = selectedCountry || globalData;

    const getStatusColor = (status) => {
      const colors = {
        'Success': '#4caf50',
        'Pending': '#ff9800',
        'Failed': '#f44336'
      };
      return colors[status] || '#9e9e9e';
    };

    const MetricCard = ({ title, value, change, trend, description }) => (
      <Card
        elevation={0}
        sx={{
          height: '100%',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)',
            borderColor: '#cbd5e1'
          }
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#64748b', 
              fontWeight: 600,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              mb: 2
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h4" 
            fontWeight="800" 
            sx={{ 
              mb: 2, 
              color: '#0f172a',
              fontSize: '28px',
              letterSpacing: '-0.025em'
            }}
          >
            {value}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              variant="body2"
              sx={{
                color: trend === 'up' ? '#059669' : '#dc2626',
                fontWeight: 700,
                fontSize: '13px'
              }}
            >
              {change}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#64748b',
                fontSize: '13px',
                fontWeight: 500
              }}
            >
              {description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );

    return (
      <div className="dashboard-page" style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <Sidebar onToggle={handleSidebarToggle} />
        <div
          className="main-content"
          style={{
            marginLeft: isCollapsed ? "64px" : "244px",
            width: isCollapsed ? "calc(100vw - 64px)" : "calc(100vw - 244px)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            minHeight: '100vh'
          }}
        >
          <DashboardNavbar isCollapsed={isCollapsed} />

          <div 
            className="dashboard-content-wrapper"
            style={{
              padding: "24px 32px 32px",
              paddingTop: "88px",
              width: "100%",
              boxSizing: "border-box",
              maxWidth: '1400px',
              margin: '0 auto'
            }}
          >
              {/* Header */}
              <Box sx={{ mb: 5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box>
                    <Typography 
                      variant="h3" 
                      fontWeight="700" 
                      sx={{ 
                        color: '#0f172a', 
                        fontSize: '32px',
                        letterSpacing: '-0.025em',
                        mb: 0.5
                      }}
                    >
                      {selectedCountry ? `${selectedCountry.country} Analytics` : 'Global Overview'}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#64748b', 
                        fontSize: '16px',
                        fontWeight: 400
                      }}
                    >
                      Real-time payment operations and performance metrics
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {selectedCountry && (
                      <Button 
                        onClick={() => setSelectedCountry(null)}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: '#e2e8f0',
                          color: '#475569',
                          '&:hover': {
                            borderColor: '#cbd5e1',
                            backgroundColor: '#f8fafc'
                          }
                        }}
                      >
                        ← Back to Global
                      </Button>
                    )}
                    <Box sx={{ 
                      px: 3, py: 1.5, 
                      backgroundColor: '#ffffff', 
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                    }}>
                      <Typography variant="body2" sx={{ color: '#475569', fontWeight: 500 }}>
                        Last updated: {new Date().toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Grid container spacing={3} sx={{ mb: 5 }}>
                <Grid item xs={12}>
                  <Card 
                    elevation={0} 
                    sx={{ 
                      p: 4,
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center', overflow:'visible' }}>
                      <MapComponent onCountrySelect={handleCountrySelect} />
                    </Box>
                  </Card>
                </Grid>
              </Grid>

              {/* Metrics Section */}
              <Grid container spacing={3} sx={{ mb: 5 }}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MetricCard
                      title="Total Transactions"
                      value={data.totalTransactions.toLocaleString()}
                      change="+12.5%"
                      trend="up"
                      description="Last 30 days"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MetricCard
                      title="Success Rate"
                      value={`${data.successRate}%`}
                      change="+0.3%"
                      trend="up"
                      description="Transaction success"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MetricCard
                      title="Total Revenue"
                      value={`$${data.totalRevenue.toLocaleString()}`}
                      change="+18.7%"
                      trend="up"
                      description="This month"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MetricCard
                      title="API Calls"
                      value={data.apiCalls.toLocaleString()}
                      change="+8.4%"
                      trend="up"
                      description="Last 30 days"
                    />
                  </Grid>
              </Grid>
              
              {/* Charts Section */}
              <Grid container spacing={3} sx={{ mb: 5, alignItems: 'stretch' }}>
                {/* Transactions Over Time - Line Chart */}
                <Grid item xs={12} md={8}>
                  <Card 
                    elevation={0}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 4 }}>
                      <Box sx={{ mb: 4 }}>
                        <Typography 
                          variant="h6" 
                          fontWeight="700" 
                          sx={{ color: '#0f172a', fontSize: '18px', mb: 1 }}
                        >
                          Transactions Over Time
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ color: '#64748b', fontSize: '14px' }}
                        >
                          Daily transaction volume (Last 7 days)
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1, minHeight: 400, minWidth: 400 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={data.transactionsOverTime}>
                            <defs>
                              <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2196f3" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#2196f3" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e8eaf6" vertical={false} />
                            <XAxis 
                              dataKey="day" 
                              stroke="#666" 
                              tick={{ fill: '#666' }}
                              style={{ fontSize: '0.875rem' }}
                            />
                            <YAxis 
                              stroke="#666"
                              tick={{ fill: '#666' }}
                              style={{ fontSize: '0.875rem' }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                              }}
                              labelStyle={{ fontWeight: 600, color: '#333' }}
                            />
                            <Legend 
                              wrapperStyle={{ paddingTop: '20px' }}
                              iconType="line"
                            />
                            <Line
                              type="monotone"
                              dataKey="transactions"
                              stroke="#2196f3"
                              strokeWidth={3}
                              dot={{ fill: '#2196f3', r: 6, strokeWidth: 2 }}
                              activeDot={{ r: 8 }}
                              name="Transactions"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Payment Method Distribution - Pie Chart */}
                <Grid item xs={12} md={4}>
                  <Card 
                    elevation={0}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 4 }}>
                      <Box sx={{ mb: 4 }}>
                        <Typography 
                          variant="h6" 
                          fontWeight="700" 
                          sx={{ color: '#0f172a', fontSize: '18px', mb: 1 }}
                        >
                          Payment Methods
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ color: '#64748b', fontSize: '14px' }}
                        >
                          Distribution by payment type
                        </Typography>
                      </Box>
                      <Box 
                          sx={{ 
                            flex: 1, 
                            minHeight: 400,
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center'
                          }}
                      >
                        <ResponsiveContainer width="85%" height="85%">
                          <PieChart>
                            <Pie
                              data={data.paymentMethods}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {data.paymentMethods.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </Box>
                      {/* Legend for pie chart */}
                      <Box sx={{ mt: 2, display: 'flex',justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
                        {data.paymentMethods.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                bgcolor: item.color
                              }}
                            />
                            <Typography variant="body2" color="textSecondary">
                              {item.name}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Recent Transactions Table */}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      width: '100%',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                <Box sx={{ p: 4, minWidth: '950px' }}>
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      fontWeight="700" 
                      sx={{ color: '#0f172a', fontSize: '18px', mb: 1 }}
                    >
                      Recent Transactions
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ color: '#64748b', fontSize: '14px' }}
                    >
                      Latest payment transactions
                    </Typography>
                  </Box>
                      
                  <TableContainer sx={{ borderRadius: '12px', overflow: 'auto', border: '1px solid #f1f5f9' }}>
                    <Table sx={{ minWidth: 650 }}>
                      <TableHead>
                        <TableRow sx={{ bgcolor: '#f8fafc' }}>
                          <TableCell sx={{ fontWeight: 700, color: '#334155', fontSize: '0.875rem', py: 2 }}>
                            Transaction ID
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#334155', fontSize: '0.875rem', py: 2 }}>
                            Amount
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#334155', fontSize: '0.875rem', py: 2 }}>
                            Status
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#334155', fontSize: '0.875rem', py: 2 }}>
                            Date
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#334155', fontSize: '0.875rem', py: 2 }}>
                            Payment Method
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.recentTransactions.map((transaction, index) => (
                          <TableRow
                            key={transaction.id}
                            sx={{
                              '&:hover': { bgcolor: '#f8fafc' },
                              transition: 'all 0.2s ease',
                              borderBottom: index < data.recentTransactions.length - 1 ? '1px solid #f1f5f9' : 'none'
                            }}
                          >
                            <TableCell sx={{ fontWeight: 600, color: '#0f172a', py: 2 }}>
                              {transaction.id}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700, color: '#0f172a', py: 2 }}>
                              ${transaction.amount.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Box
                                component="span"
                                sx={{
                                  bgcolor: getStatusColor(transaction.status) + '15',
                                  color: getStatusColor(transaction.status),
                                  px: 1.5,
                                  py: 0.75,
                                  borderRadius: 1,
                                  fontWeight: 600,
                                  fontSize: '0.75rem',
                                  display: 'inline-block'
                                }}
                              >
                                {transaction.status}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ color: '#64748b', fontWeight: 500, py: 2 }}>
                              {transaction.date}
                            </TableCell>
                            <TableCell sx={{ color: '#64748b', fontWeight: 500, py: 2 }}>
                              {transaction.method}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Paper>
                </Grid>
              </Grid>
          </div>
        </div>
      </div>
      
    );
  };

  export default Dashboard;
