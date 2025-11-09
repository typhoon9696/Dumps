// src/pages/UsersRolesPage.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';
import UsersRolesTab from '../pages/settings/UsersRolesTab';
import { Box, LinearProgress, Paper, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const UsersRolesPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, loading } = useAuth();

  // Access control: Only portal users (SEA) and tenant admins (Crunchy Admin) can access
  if (!loading && !user?.canAccessUserRoles) {
    return (
      <Box sx={{ bgcolor: '#fafbfc', minHeight: '100vh' }}>
        <Sidebar onToggle={setIsCollapsed} />
        <Box
          sx={{
            marginLeft: isCollapsed ? '64px' : '244px',
            pt: '64px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <DashboardNavbar isCollapsed={isCollapsed} />
          <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
              <Typography variant="h6" color="error" gutterBottom>
                Access Denied
              </Typography>
              <Typography color="text.secondary">
                You don't have permission to access the Users & Roles section.
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#fafbfc', minHeight: '100vh' }}>
      <Sidebar onToggle={setIsCollapsed} />
      
      <Box
        sx={{
          marginLeft: isCollapsed ? '64px' : '244px',
          pt: '64px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <DashboardNavbar isCollapsed={isCollapsed} />

        <Box sx={{ p: 0 }}>
          {loading ? (
            <Box sx={{ p: 3 }}>
              <LinearProgress sx={{ borderRadius: 1, height: 4 }} />
            </Box>
          ) : (
            <UsersRolesTab />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UsersRolesPage;