import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardNavbar from '../../components/DashboardNavbar';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Switch,
  FormControlLabel,
  Alert
} from '@mui/material';

const SecuritySettings = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });
  const [message, setMessage] = useState('');

  const handleChange = (field, value) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = async () => {
    if (security.newPassword !== security.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      // Backend API call would go here
      // await changePassword(security.currentPassword, security.newPassword);
      setMessage('Password changed successfully');
      setSecurity(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to change password');
    }
  };

  const handleTwoFactorToggle = async () => {
    try {
      // Backend API call would go here
      // await toggleTwoFactor(!security.twoFactorEnabled);
      setSecurity(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }));
      setMessage(`Two-factor authentication ${!security.twoFactorEnabled ? 'enabled' : 'disabled'}`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update two-factor authentication');
    }
  };

  return (
    <Box sx={{ bgcolor: '#f9fafb', minHeight: '100vh' }}>
      <Sidebar onToggle={setIsCollapsed} />
      
      <Box sx={{ ml: isCollapsed ? '64px' : '244px', pt: '64px', transition: 'all 0.3s' }}>
        <DashboardNavbar isCollapsed={isCollapsed} />

        <Box sx={{ p: 3, maxWidth: 600 }}>
          <Typography sx={{ fontSize: 24, fontWeight: 600, mb: 3 }}>
            Security Settings
          </Typography>

          {message && (
            <Alert severity={message.includes('success') || message.includes('enabled') || message.includes('disabled') ? 'success' : 'error'} sx={{ mb: 3 }}>
              {message}
            </Alert>
          )}

          <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
              Change Password
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                type="password"
                label="Current Password"
                value={security.currentPassword}
                onChange={(e) => handleChange('currentPassword', e.target.value)}
                fullWidth
              />
              <TextField
                type="password"
                label="New Password"
                value={security.newPassword}
                onChange={(e) => handleChange('newPassword', e.target.value)}
                fullWidth
              />
              <TextField
                type="password"
                label="Confirm New Password"
                value={security.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                fullWidth
              />
              <Button 
                variant="contained" 
                onClick={handlePasswordChange}
                sx={{ bgcolor: '#4931c1', alignSelf: 'flex-start' }}
              >
                Change Password
              </Button>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
              Two-Factor Authentication
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={security.twoFactorEnabled}
                  onChange={handleTwoFactorToggle}
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#4931c1' } }}
                />
              }
              label="Enable two-factor authentication"
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default SecuritySettings;