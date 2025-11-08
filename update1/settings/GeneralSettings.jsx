import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardNavbar from '../../components/DashboardNavbar';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  MenuItem,
  Alert
} from '@mui/material';

const GeneralSettings = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [settings, setSettings] = useState({
    timezone: 'UTC',
    language: 'en',
    theme: 'light'
  });
  const [message, setMessage] = useState('');

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      // Backend API call would go here
      // await updateUserSettings(settings);
      setMessage('Settings saved successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to save settings');
    }
  };

  return (
    <Box sx={{ bgcolor: '#f9fafb', minHeight: '100vh' }}>
      <Sidebar onToggle={setIsCollapsed} />
      
      <Box sx={{ ml: isCollapsed ? '64px' : '244px', pt: '64px', transition: 'all 0.3s' }}>
        <DashboardNavbar isCollapsed={isCollapsed} />

        <Box sx={{ p: 3, maxWidth: 600 }}>
          <Typography sx={{ fontSize: 24, fontWeight: 600, mb: 3 }}>
            General Settings
          </Typography>

          {message && (
            <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mb: 3 }}>
              {message}
            </Alert>
          )}

          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                select
                label="Timezone"
                value={settings.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                fullWidth
              >
                <MenuItem value="UTC">UTC</MenuItem>
                <MenuItem value="EST">Eastern Time</MenuItem>
                <MenuItem value="PST">Pacific Time</MenuItem>
                <MenuItem value="GMT">GMT</MenuItem>
              </TextField>

              <TextField
                select
                label="Language"
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                fullWidth
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                <MenuItem value="de">German</MenuItem>
              </TextField>

              <TextField
                select
                label="Theme"
                value={settings.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
                fullWidth
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="auto">Auto</MenuItem>
              </TextField>

              <Button 
                variant="contained" 
                onClick={handleSave}
                sx={{ bgcolor: '#4931c1', alignSelf: 'flex-start' }}
              >
                Save Changes
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default GeneralSettings;