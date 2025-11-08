import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardNavbar from '../../components/DashboardNavbar';
import { 
  Box, 
  Typography, 
  Avatar, 
  Paper, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';

const Settings = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const user = {
    name: 'John Doe',
    email: 'john.doe@coll.com',
    role: 'Developer'
  };

  const settings = [
    { title: 'General', desc: 'Time zone, language', icon: <SettingsIcon />, path: '/settings/general' },
    { title: 'Security', desc: 'Password, 2FA', icon: <SecurityIcon />, path: '/settings/security' }
  ];

  const handleSettingClick = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ bgcolor: '#f9fafb', minHeight: '100vh' }}>
      <Sidebar onToggle={setIsCollapsed} />
      
      <Box sx={{ ml: isCollapsed ? '64px' : '244px', pt: '64px', transition: 'all 0.3s' }}>
        <DashboardNavbar isCollapsed={isCollapsed} />

        <Box sx={{ p: 3, maxWidth: 600 }}>
          <Paper sx={{ p: 2, borderRadius: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 48, height: 48, bgcolor: '#4931c1' }}>
                {user.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>{user.name}</Typography>
                <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                  {user.email}
                </Typography>
                <Typography sx={{ fontSize: 13, color: '#4931c1' }}>
                  {user.role}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
            Settings
          </Typography>

          <List disablePadding>
            {settings.map((item, i) => (
              <ListItem 
                key={i}
                onClick={() => handleSettingClick(item.path)}
                sx={{ 
                  mb: 1,
                  borderRadius: 1,
                  bgcolor: 'white',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#f8f9fa' }
                }}
              >
                <ListItemIcon sx={{ color: '#4931c1' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  secondary={item.desc}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;