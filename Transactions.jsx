// Transactions.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';
import transactionsData from '../data/transactions';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';


import theme from '../theme';


import {
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

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

const Transactions = ({ userRole = 'tenant_admin' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [transactions, setTransactions] = useState(transactionsData);
  const [dateRange, setDateRange] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10; // show 10 per page
  const handleSidebarToggle = (collapsed) => setIsCollapsed(collapsed);
  const navigate = useNavigate();

  // actions
  const initiateChargeback = (id) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Chargeback Initiated' } : t))
    );
    // replace with API call later
    console.info(`Chargeback initiated for ${id}`);
  };

  const rejectCard = (cardType, id) => {
    // maintain a blocklist in backend later; for now, show toast/console
    console.info(`Card ${cardType} blocked (txn: ${id})`);
    alert(`Card ${cardType} blocked for future transactions.`);
  };

  const viewDetails = (txn) => {
    const details = `
        ID: ${txn.id}
        Customer: ${txn.customer}
        Amount: ${txn.amount} ${txn.currency}
        Method: ${txn.paymentMethod} (${txn.cardType})
        Status: ${txn.status}
        Date: ${new Date(txn.date).toLocaleString()}
        Country: ${txn.country}
        Desc: ${txn.description}
            `;
            alert(details);
    };

  const exportToCSV = () => {
    const headers = ['ID', 'Date', 'Customer', 'Description', 'Amount', 'Currency', 'Country', 'Payment Method', 'Card Type', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filtered.map(txn => [
        txn.id,
        new Date(txn.date).toLocaleString(),
        `"${txn.customer}"`,
        `"${txn.description}"`,
        txn.amount,
        txn.currency,
        txn.country,
        `"${txn.paymentMethod}"`,
        txn.cardType,
        txn.status
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // filtered list (simple client-side)
//   const filtered = transactions.filter((t) => {
//     if (statusFilter !== 'All') {
//       if (statusFilter === 'Completed' && t.status !== 'Success') return false;
//       if (statusFilter === 'Pending' && t.status !== 'Pending') return false;
//       if (statusFilter === 'Failed' && t.status !== 'Failed') return false;
//     }
//     // typeFilter left for extension
//     return true;
//   });

const isWithinDateRange = (txnDateStr) => {
  const txnDate = new Date(txnDateStr);
  const now = new Date();

  if (dateRange === 'Custom') {
    if (!customStartDate || !customEndDate) return true; // show all if incomplete
    return txnDate >= customStartDate && txnDate <= customEndDate;
  }

  const diffDays = (now - txnDate) / (1000 * 60 * 60 * 24);

  if (dateRange === 'All') return true;
  if (dateRange === 'Last 7 days') return diffDays <= 7;
  if (dateRange === 'Last 30 days') return diffDays <= 30;
  if (dateRange === 'Last 3 months') return diffDays <= 90;

  return true;
};

 const filtered = transactions.filter((t) => {
   // 1️⃣ Date range filter
   if (!isWithinDateRange(t.date)) return false;
   // 2️⃣ Status filter
   if (statusFilter !== 'All') {
     if (statusFilter === 'Completed' && t.status !== 'Success') return false;
     if (statusFilter === 'Pending' && t.status !== 'Pending') return false;
     if (statusFilter === 'Failed' && t.status !== 'Failed') return false;
   }

   // 3️⃣ Country filter
   if (countryFilter !== 'All' && t.country !== countryFilter) return false;

   return true;
 });

 const startIdx = (page - 1) * rowsPerPage;
 const paginated = filtered.slice(startIdx, startIdx + rowsPerPage);
 const totalPages = Math.ceil(filtered.length / rowsPerPage);


  return (
    <Box className="transactions-page" sx={{ bgcolor: '#f4f6f8', minHeight: '100vh' }}>
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
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" fontWeight={700}>
              Transactions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View and manage transactions for your tenant
            </Typography>
          </Box>

          {/* Filters */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              {/* <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Date Range</InputLabel>
                <Select value={dateRange} label="Date Range" onChange={(e) => setDateRange(e.target.value)}>
                  <MenuItem value="Last 7 days">Last 7 days</MenuItem>
                  <MenuItem value="Last 30 days">Last 30 days</MenuItem>
                  <MenuItem value="Last 3 months">Last 3 months</MenuItem>
                </Select>
              </FormControl> */}
              <FormControl size="small" sx={{ minWidth: 220 }}>
                  <InputLabel>Date Range</InputLabel>
                  <Select
                    value={dateRange}
                    label="Date Range"
                    onChange={(e) => {
                      setDateRange(e.target.value);
                      // reset custom dates when selecting preset
                      if (e.target.value !== 'Custom') {
                        setCustomStartDate(null);
                        setCustomEndDate(null);
                      }
                    }}
                  >
                    <MenuItem value="All">All Time</MenuItem>
                    <MenuItem value="Last 7 days">Last 7 days</MenuItem>
                    <MenuItem value="Last 30 days">Last 30 days</MenuItem>
                    <MenuItem value="Last 3 months">Last 3 months</MenuItem>
                    <MenuItem value="Custom">Custom Range</MenuItem>
                  </Select>
                </FormControl>
                
                {dateRange === 'Custom' && (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <DatePicker
                        label="Start Date"
                        value={customStartDate}
                        onChange={(newValue) => setCustomStartDate(newValue)}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                      <DatePicker
                        label="End Date"
                        value={customEndDate}
                        onChange={(newValue) => setCustomEndDate(newValue)}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </Box>
                  </LocalizationProvider>
                )}


              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Status</InputLabel>
                <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Failed">Failed</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Country</InputLabel>
                <Select value={countryFilter} label="Country" onChange={(e) => setCountryFilter(e.target.value)}>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="US">US</MenuItem>
                  <MenuItem value="UK">UK</MenuItem>
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="Germany">Germany</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                  <MenuItem value="France">France</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ flex: 1 }} /> {/* spacer */}
              <Button variant="contained" size="small" onClick={exportToCSV}>Export CSV</Button>
            </Box>
          </Paper>

          {/* Table with horizontal + vertical scrolling */}
          <Paper elevation={2}>
            <TableContainer
              sx={{
                maxHeight: 560,        // vertical scroll
                overflowX: 'auto',     // horizontal scroll
              }}
            >
              <Table stickyHeader sx={{ minWidth: 1200 }} aria-label="transactions table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>Card Type</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} align="center" sx={{ py: 6 }}>
                        No transactions found
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginated.map((txn) => (
                      <TableRow key={txn.id} hover
                        onClick={() => navigate(`/transactions/${txn.id}`)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell sx={{ fontWeight: 600 }}>{txn.id}</TableCell>
                        <TableCell>{new Date(txn.date).toLocaleString()}</TableCell>
                        <TableCell>{txn.customer}</TableCell>
                        <TableCell>{txn.description}</TableCell>
                        <TableCell>{txn.amount}</TableCell>
                        <TableCell>{txn.currency}</TableCell>
                        <TableCell>{txn.country}</TableCell>
                        <TableCell>{txn.paymentMethod}</TableCell>
                        <TableCell>{txn.cardType}</TableCell>
                        <TableCell>
                          <Box
                            component="span"
                            sx={{
                              bgcolor: getStatusColor(txn.status) + '15',
                              color: getStatusColor(txn.status),
                              px: 1.5,
                              py: 0.75,
                              borderRadius: 1,
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              display: 'inline-block'
                            }}
                          >
                            {txn.status}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            

          </Paper>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Transactions;
