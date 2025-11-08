import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, TextField, Button, MenuItem, Alert } from '@mui/material';
import { Email, Chat, Phone, BugReport } from '@mui/icons-material';

const Support = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [issueForm, setIssueForm] = useState({
    subject: '',
    description: '',
    priority: 'medium',
    category: 'bug'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!issueForm.subject || !issueForm.description) {
      setMessage('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Backend API call
      const response = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...issueForm,
          userId: localStorage.getItem('userId'),
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setMessage('Issue submitted successfully');
        setIssueForm({ subject: '', description: '', priority: 'medium', category: 'bug' });
      } else {
        setMessage('Failed to submit issue. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Please check your connection.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f9fafb', minHeight: '100vh' }}>
      <Sidebar onToggle={setIsCollapsed} />
      
      <Box sx={{ ml: isCollapsed ? '64px' : '244px', pt: '64px', transition: 'all 0.3s' }}>
        <DashboardNavbar isCollapsed={isCollapsed} />

        <Box sx={{ p: 3, maxWidth: 600 }}>
          <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 3 }}>
            Support
          </Typography>

          <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
              Contact Support
            </Typography>
            <List disablePadding>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 40, color: '#4931c1' }}>
                  <Email fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary={<Typography sx={{ fontSize: 14 }}>support@siee.com</Typography>}
                />
              </ListItem>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 40, color: '#4931c1' }}>
                  <Chat fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary={<Typography sx={{ fontSize: 14 }}>Live Chat (24/7)</Typography>}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 40, color: '#4931c1' }}>
                  <Phone fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary={<Typography sx={{ fontSize: 14 }}>+1 (555) 123-4567</Typography>}
                />
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
              Report Issue
            </Typography>
            
            {message && (
              <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mb: 2 }}>
                {message}
              </Alert>
            )}
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                select
                label="Category"
                value={issueForm.category}
                onChange={(e) => setIssueForm(prev => ({ ...prev, category: e.target.value }))}
                size="small"
              >
                <MenuItem value="bug">Bug Report</MenuItem>
                <MenuItem value="feature">Feature Request</MenuItem>
                <MenuItem value="account">Account Issue</MenuItem>
                <MenuItem value="payment">Payment Issue</MenuItem>
              </TextField>
              
              <TextField
                label="Subject"
                value={issueForm.subject}
                onChange={(e) => setIssueForm(prev => ({ ...prev, subject: e.target.value }))}
                size="small"
              />
              
              <TextField
                label="Description"
                multiline
                rows={4}
                value={issueForm.description}
                onChange={(e) => setIssueForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Please describe the issue in detail..."
              />
              
              <TextField
                select
                label="Priority"
                value={issueForm.priority}
                onChange={(e) => setIssueForm(prev => ({ ...prev, priority: e.target.value }))}
                size="small"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="urgent">Urgent</MenuItem>
              </TextField>
              
              <Button 
                variant="contained" 
                startIcon={<BugReport />}
                onClick={handleSubmit}
                disabled={loading || !issueForm.subject || !issueForm.description}
                sx={{ bgcolor: '#4931c1', alignSelf: 'flex-start' }}
              >
                {loading ? 'Submitting...' : 'Submit Issue'}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Support;