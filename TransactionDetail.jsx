// src/pages/TransactionDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';
import transactionsData from '../data/transactions.js';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Chip, 
  Grid, 
  Divider,
  Card,
  CardContent,
  Alert,
  Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BlockIcon from '@mui/icons-material/Block';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const getStatusColor = (status) => {
  const colors = {
    'Success': '#4caf50',
    'Pending': '#ff9800',
    'Failed': '#f44336',
    'Chargeback Initiated': '#1976d2',
    'Chargeback Completed': '#9c27b0',
  };
  return colors[status] || '#9e9e9e';
};

export default function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const txn = transactionsData.find(t => t.id === id);
  const handleSidebarToggle = (collapsed) => setIsCollapsed(collapsed);

  if (!txn) {
    return (
      <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh' }}>
        <Sidebar onToggle={handleSidebarToggle} />
        <Box
          component="main"
          sx={{
            marginLeft: isCollapsed ? '64px' : '244px',
            pt: '64px',
            transition: 'all 0.3s ease',
            minHeight: '100vh',
            p: 3
          }}
        >
          <DashboardNavbar isCollapsed={isCollapsed} />
          <Alert severity="error">Transaction not found</Alert>
        </Box>
      </Box>
    );
  }

  const handleRejectCard = () => {
    if (window.confirm(`Block card ${txn.cardType} for future transactions?`)) {
      alert(`Card ${txn.cardType} has been blocked successfully.`);
    }
  };

  const handleChargeback = () => {
    if (window.confirm('Initiate chargeback? This action cannot be undone.')) {
      alert('Chargeback has been initiated successfully.');
    }
  };

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <Sidebar onToggle={handleSidebarToggle} />
      <Box
        component="main"
        sx={{
          marginLeft: isCollapsed ? '64px' : '244px',
          pt: '64px',
          transition: 'all 0.3s ease',
          minHeight: '100vh',
        }}
      >
        <DashboardNavbar isCollapsed={isCollapsed} />
        
        <Box sx={{ p: 3 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/transactions')} 
            sx={{ mb: 3, color: 'text.secondary' }}
          >
            Back to Transactions
          </Button>

          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Transaction Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Transaction ID: {txn.id}
              </Typography>
            </Box>
            <Chip
              label={txn.status}
              size="large"
              sx={{
                bgcolor: getStatusColor(txn.status) + '15',
                color: getStatusColor(txn.status),
                fontWeight: 600,
                fontSize: '0.875rem',
                px: 2,
                py: 1
              }}
            />
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} lg={8} sx={{ order: { xs: 2, lg: 1 }, minHeight: '600px' }}>
              <Stack spacing={3}>
                <Card elevation={2}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon color="primary" />
                      Customer Information
                    </Typography>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Full Name</Typography>
                        <Typography variant="body1" fontWeight={500}>{txn.customer}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Email Address</Typography>
                        <Typography variant="body1">{txn.email || `${txn.customer.toLowerCase().replace(' ', '.')}@email.com`}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                <Card elevation={2}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PaymentIcon color="primary" />
                      Payment Details
                    </Typography>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Amount</Typography>
                        <Typography variant="h5" color="primary" fontWeight={600}>
                          {txn.currency} {txn.amount}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Payment Method</Typography>
                        <Typography variant="body1">{txn.paymentMethod}</Typography>
                        <Typography variant="body2" color="text.secondary">{txn.cardType} •••• 1234</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Description</Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            minHeight: '96px'
                          }}
                        >
                          {txn.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                <Card elevation={2}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarTodayIcon color="primary" />
                      Transaction Timeline
                    </Typography>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Transaction Date</Typography>
                        <Typography variant="body1">{new Date(txn.date).toLocaleDateString()}</Typography>
                        <Typography variant="body2" color="text.secondary">{new Date(txn.date).toLocaleTimeString()}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOnIcon fontSize="small" />
                          Location
                        </Typography>
                        <Typography variant="body1">{txn.country}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>

            <Grid item xs={12} lg={4} sx={{ order: { xs: 1, lg: 2 } }}>
              <Stack spacing={3} sx={{ position: 'sticky', top: 24, alignSelf: 'flex-start' }}>
                <Card elevation={2}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Quick Actions
                    </Typography>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<BlockIcon />}
                        onClick={handleRejectCard}
                        fullWidth
                        sx={{ py: 1.5 }}
                      >
                        Block Card
                      </Button>
                      <Button
                        variant="contained"
                        color="warning"
                        startIcon={<CurrencyExchangeIcon />}
                        onClick={handleChargeback}
                        disabled={txn.status.includes('Chargeback')}
                        fullWidth
                        sx={{ py: 1.5 }}
                      >
                        {txn.status.includes('Chargeback') ? 'Chargeback Active' : 'Initiate Chargeback'}
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>

                <Card elevation={2}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Transaction Summary
                    </Typography>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Transaction ID</Typography>
                        <Typography variant="body2" fontWeight={500}>{txn.id}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Status</Typography>
                        <Typography variant="body2" fontWeight={500}>{txn.status}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Amount</Typography>
                        <Typography variant="body2" fontWeight={500}>{txn.currency} {txn.amount}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Country</Typography>
                        <Typography variant="body2" fontWeight={500}>{txn.country}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}