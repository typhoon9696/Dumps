// src/components/settings/UsersRolesTab.jsx
/*
 * BACKEND INTEGRATION REQUIREMENTS:
 * 
 * API Endpoints needed:
 * 1. PUT /api/users/:id - Update user role/tenant
 *    Body: { role: string, tenant: string }
 * 
 * 2. DELETE /api/users/:id - Delete user
 * 
 * 3. POST /api/users/invite - Invite new user
 *    Body: { email: string, role: string, tenantId: string }
 * 
 * 4. GET /api/users - Get all users (with filtering)
 *    Query: { tenantId?: string, search?: string }
 * 
 * Response format for users:
 * {
 *   id: string,
 *   user_id: string,
 *   name: string,
 *   email: string,
 *   tenant_id: string,
 *   tenant_role: string,
 *   portal_role?: string
 * }
 */
import React, { useState, useMemo } from 'react';
import {
  Box, Typography, Paper, Tabs, Tab, Button, TextField, MenuItem,
  Table, TableBody, TableCell, TableHead, TableRow, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Select,
  Chip, Avatar, LinearProgress, CircularProgress
} from '@mui/material';
import { Add, Edit, Delete, PersonAdd, Shield, Business, Search, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { mockUsers } from '../../data/mockUsers';

// TODO: Replace with actual API service
// import { userAPI } from '../../services/api';

const portalRoles = ['portal_admin'];
const tenantRoles = ['tenant_developer', 'tenant_operator', 'tenant_qa'];

const roleLabels = {
  portal_admin: { label: 'Portal Admin', icon: <Shield /> },
  tenant_developer: { label: 'Developer', icon: <Business /> },
  tenant_operator: { label: 'Operator', icon: <Business /> },
  tenant_qa: { label: 'QA', icon: <Business /> }
};

const UsersRolesTab = () => {
  const { user: currentUser, tenants = [], userRoles = [], loading } = useAuth();
  const [tab, setTab] = useState(0);
  const [openInvite, setOpenInvite] = useState(false);
  const [inviteData, setInviteData] = useState({ email: '', role: '', tenantId: '' });
  const [inviting, setInviting] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [editData, setEditData] = useState({ role: '', tenant: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [localUserRoles, setLocalUserRoles] = useState(userRoles);

  const isPortalUser = currentUser?.isPortalUser; // SEA users
  const isTenantAdmin = currentUser?.isTenantAdmin; // Crunchy Admin

  // Update local state when userRoles changes
  React.useEffect(() => {
    setLocalUserRoles(userRoles);
  }, [userRoles]);

  // TENANT FILTERING
  const manageableTenants = useMemo(() => {
    if (isPortalUser) return tenants; // SEA users see all tenants
    return tenants.filter(t => t.name === currentUser?.tenant); // Tenant admins see only their tenant
  }, [isPortalUser, tenants, currentUser?.tenant]);

  // USER FILTERING
  const filteredUsers = useMemo(() => {
    let users = localUserRoles;

    // If viewing specific tenant details
    if (selectedTenant) {
      users = users.filter(u => u.tenant_id === selectedTenant.id);
    } else if (selectedRole) {
      // Filter by selected role and tenant for tenant admins
      users = users.filter(u => {
        const mockUser = mockUsers.find(mu => mu.email === u.email);
        const hasRole = mockUser?.role === selectedRole;
        
        // For tenant admins, also filter by their manageable tenants
        if (!isPortalUser) {
          const tenantIds = manageableTenants.map(t => t.id);
          return hasRole && u.tenant_id && tenantIds.includes(u.tenant_id);
        }
        
        return hasRole;
      });
    } else if (!isPortalUser) {
      // Tenant admins only see users from their tenant
      const tenantIds = manageableTenants.map(t => t.id);
      users = users.filter(u => u.tenant_id && tenantIds.includes(u.tenant_id));
    }

    // Search
    if (search) {
      users = users.filter(u => 
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return users;
  }, [localUserRoles, isPortalUser, manageableTenants, search, selectedTenant, selectedRole]);

  // Group users by tenant for portal users
  const usersByTenant = useMemo(() => {
    if (!isPortalUser || selectedTenant) return {};
    
    const grouped = {};
    filteredUsers.forEach(user => {
      const tenant = tenants.find(t => t.id === user.tenant_id);
      if (tenant) {
        if (!grouped[tenant.name]) {
          grouped[tenant.name] = { tenant, users: [] };
        }
        grouped[tenant.name].users.push(user);
      }
    });
    return grouped;
  }, [filteredUsers, tenants, isPortalUser, selectedTenant]);

  // Group users by role for tenant admins
  const usersByRole = useMemo(() => {
    if (isPortalUser || selectedTenant || selectedRole) return {};
    
    const grouped = {};
    // For tenant admins, only show users from their own tenant
    const tenantUsers = localUserRoles.filter(user => {
      const tenantIds = manageableTenants.map(t => t.id);
      return user.tenant_id && tenantIds.includes(user.tenant_id);
    });
    
    tenantUsers.forEach(user => {
      const mockUser = mockUsers.find(mu => mu.email === user.email);
      const role = mockUser?.role || 'Developer';
      if (!grouped[role]) {
        grouped[role] = [];
      }
      grouped[role].push(user);
    });
    return grouped;
  }, [localUserRoles, isPortalUser, selectedTenant, selectedRole, manageableTenants]);

  const handleEdit = (user) => {
    const mockUser = mockUsers.find(mu => mu.email === user.email);
    setEditUser(user);
    setEditData({ 
      role: mockUser?.role || 'Developer', 
      tenant: mockUser?.tenant || 'Crunchy' 
    });
  };

  const handleSaveEdit = async () => {
    try {
      // TODO: Replace with actual API call
      // await api.put(`/users/${editUser.id}`, {
      //   role: editData.role,
      //   tenant: editData.tenant
      // });
      
      // Update local state for immediate UI feedback
      setLocalUserRoles(prev => prev.map(user => 
        user.id === editUser.id 
          ? { ...user, tenant_role: `tenant_${editData.role.toLowerCase()}` }
          : user
      ));
      
      setEditUser(null);
      setEditData({ role: '', tenant: '' });
      setSuccessMessage('Changes saved successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error - show error message
    }
  };

  const handleDelete = (user) => {
    setDeleteUser(user);
  };

  const confirmDelete = async () => {
    try {
      // TODO: Replace with actual API call
      // await api.delete(`/users/${deleteUser.id}`);
      
      // Update local state for immediate UI feedback
      setLocalUserRoles(prev => prev.filter(user => user.id !== deleteUser.id));
      
      setDeleteUser(null);
      setSuccessMessage('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error - show error message
    }
  };

  const handleAddUserToTenant = (tenant) => {
    setInviteData({ email: '', role: '', tenantId: tenant.id });
    setOpenInvite(true);
  };

  const handleInviteForTenantAdmin = () => {
    const tenantId = tenants.find(t => t.name === currentUser?.tenant)?.id;
    setInviteData({ email: '', role: '', tenantId: tenantId || '' });
    setOpenInvite(true);
  };

  const handleInviteUser = async () => {
    if (!inviteData.email || !inviteData.role || (tenantRoles.includes(inviteData.role) && !inviteData.tenantId)) return;

    setInviting(true);
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/users/invite', {
      //   email: inviteData.email,
      //   role: inviteData.role,
      //   tenantId: inviteData.tenantId
      // });
      
      setOpenInvite(false);
      setInviteData({ email: '', role: '', tenantId: '' });
      setSuccessMessage('User invited successfully!');
      
      // Optionally refresh user list
      // await refreshUserList();
    } catch (error) {
      console.error('Error inviting user:', error);
      // Handle error - show error message
    } finally {
      setInviting(false);
    }
  };

  if (loading) return <LinearProgress />;

  return (
    <Box sx={{ p: 4, maxWidth: 1300, mx: 'auto', bgcolor: '#fafbfc', minHeight: '100vh' }}>
      {/* HEADER */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        p: 3,
        bgcolor: 'white',
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a' }}>
            Users & Roles
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#6b7280' }}>
            {isPortalUser ? 'Manage all tenants and portal users' : 'Manage users in your tenant'}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={isTenantAdmin ? handleInviteForTenantAdmin : () => setOpenInvite(true)}
          disabled={!isPortalUser && !isTenantAdmin}
          sx={{
            bgcolor: '#0066cc',
            '&:hover': { bgcolor: '#0052a3' },
            borderRadius: 2,
            px: 3,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Invite User
        </Button>
      </Box>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
        {isPortalUser && (
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab label="Users" sx={{ fontSize: 14 }} />
            <Tab label="Tenants" sx={{ fontSize: 14 }} />
            <Tab label="Roles" sx={{ fontSize: 14 }} />
          </Tabs>
        )}

        {/* USERS TAB OR ROLE CARDS FOR TENANT ADMINS */}
        {(isPortalUser && tab === 0) || isTenantAdmin ? (
          <Box sx={{ p: 3 }}>
            {selectedTenant && (
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                  {selectedTenant.name} Users
                </Typography>
                <Button 
                  onClick={() => setSelectedTenant(null)}
                  sx={{ color: '#0066cc' }}
                >
                  ← Back to Overview
                </Button>
              </Box>
            )}
            
            {selectedRole && (
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                  {selectedRole} Users
                </Typography>
                <Button 
                  onClick={() => setSelectedRole(null)}
                  sx={{ color: '#0066cc' }}
                >
                  ← Back to Overview
                </Button>
              </Box>
            )}
            
            <TextField
              fullWidth
              placeholder="Search users..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              InputProps={{ startAdornment: <Search sx={{ color: '#9ca3af', mr: 1 }} /> }}
              sx={{ mb: 3 }}
            />
            
            {/* Portal users see tenant sections, tenant admins see role sections, others see direct table */}
            {isPortalUser && !selectedTenant ? (
              <Box>
                {Object.entries(usersByTenant).map(([tenantName, { tenant, users }]) => (
                  <Paper 
                    key={tenantName} 
                    sx={{ 
                      p: 3, 
                      mb: 2, 
                      borderRadius: 2, 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#f8fafc' }
                    }}
                    onClick={() => setSelectedTenant(tenant)}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: 18 }}>{tenantName}</Typography>
                        <Typography sx={{ fontSize: 14, color: '#6b7280' }}>
                          {users.length} users • Merchant IDs: {tenant.merchant_ids.join(', ')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontSize: 14, color: '#0066cc' }}>View Details</Typography>
                        <ChevronRightIcon sx={{ color: '#0066cc' }} />
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : isTenantAdmin && !selectedTenant && !selectedRole ? (
              <Box>
                {Object.entries(usersByRole).map(([roleName, users]) => (
                  <Paper 
                    key={roleName} 
                    sx={{ 
                      p: 3, 
                      mb: 2, 
                      borderRadius: 2, 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#f8fafc' }
                    }}
                    onClick={() => setSelectedRole(roleName)}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: 18 }}>{roleName}s</Typography>
                        <Typography sx={{ fontSize: 14, color: '#6b7280' }}>
                          {users.length} users
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontSize: 14, color: '#0066cc' }}>View Details</Typography>
                        <ChevronRightIcon sx={{ color: '#0066cc' }} />
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : selectedRole ? (
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8fafc' }}>
                    <TableCell sx={{ fontSize: 14, fontWeight: 600 }}>User</TableCell>
                    <TableCell sx={{ fontSize: 14, fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontSize: 14, fontWeight: 600 }}>Tenant</TableCell>
                    <TableCell sx={{ fontSize: 14, fontWeight: 600 }}>Role</TableCell>
                    <TableCell align="right" sx={{ fontSize: 14, fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map(u => {
                    const tenant = tenants.find(t => t.id === u.tenant_id);
                    return (
                      <TableRow key={u.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: '#0066cc' }}>
                              {u.name?.[0] || 'U'}
                            </Avatar>
                            <Box>
                              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{u.name}</Typography>
                              <Typography sx={{ fontSize: 14, color: '#6b7280' }}>ID: {u.user_id}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: 14 }}>{u.email}</TableCell>
                        <TableCell sx={{ fontSize: 14 }}>{tenant?.name || '—'}</TableCell>
                        <TableCell>
                          <RoleChip role={selectedRole} />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" sx={{ color: '#0066cc' }} onClick={() => handleEdit(u)}>
                            <Edit />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(u)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8fafc' }}>
                    <TableCell sx={{ fontSize: 14, fontWeight: 600 }}>User</TableCell>
                    <TableCell sx={{ fontSize: 14, fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontSize: 14, fontWeight: 600 }}>Tenant</TableCell>
                    <TableCell sx={{ fontSize: 14, fontWeight: 600 }}>Role</TableCell>
                    <TableCell align="right" sx={{ fontSize: 14, fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map(u => {
                    const tenant = tenants.find(t => t.id === u.tenant_id);
                    return (
                      <TableRow key={u.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: '#0066cc' }}>
                              {u.name?.[0] || 'U'}
                            </Avatar>
                            <Box>
                              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{u.name}</Typography>
                              <Typography sx={{ fontSize: 14, color: '#6b7280' }}>ID: {u.user_id}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: 14 }}>{u.email}</TableCell>
                        <TableCell sx={{ fontSize: 14 }}>{tenant?.name || '—'}</TableCell>
                        <TableCell>
                          {u.tenant_role ? (
                            <RoleChip role={u.tenant_role} />
                          ) : u.portal_role ? (
                            <RoleChip role={u.portal_role} />
                          ) : (
                            <RoleChip role={mockUsers.find(mu => mu.email === u.email)?.role || 'User'} />
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" sx={{ color: '#0066cc' }} onClick={() => handleEdit(u)}>
                            <Edit />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(u)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </Box>
        ) : null}

        {/* TENANTS TAB */}
        {tab === 1 && isPortalUser && (
          <Box sx={{ p: 3 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>All Tenants</Typography>
            {tenants.map(t => (
              <Paper key={t.id} sx={{ p: 3, mb: 2, borderRadius: 2, bgcolor: '#f8fafc' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: 18 }}>{t.name}</Typography>
                    <Typography sx={{ fontSize: 14, color: '#6b7280' }}>
                      Merchant IDs: {t.merchant_ids.join(', ')}
                    </Typography>
                  </Box>
                  <Button 
                    size="small" 
                    startIcon={<Add />} 
                    variant="outlined"
                    onClick={() => handleAddUserToTenant(t)}
                  >
                    Add User
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        )}

        {/* ROLES TAB */}
        {tab === 2 && isPortalUser && (
          <Box sx={{ p: 3 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>Role Permissions</Typography>
            {Object.entries(roleLabels).map(([role, { label, icon }]) => (
              <Paper key={role} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {icon}
                    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{label}</Typography>
                  </Box>
                  <Chip 
                    label={role === 'portal_admin' ? 'Full Access' : 'Tenant Access'} 
                    size="small" 
                    variant="outlined" 
                  />
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </Paper>

      {/* INVITE DIALOG */}
      <Dialog open={openInvite} onClose={() => !inviting && setOpenInvite(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontSize: 18, fontWeight: 600 }}>Invite User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={inviteData.email}
            onChange={e => setInviteData({ ...inviteData, email: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />
          <Select
            fullWidth
            displayEmpty
            value={inviteData.role}
            onChange={e => setInviteData({ ...inviteData, role: e.target.value, tenantId: inviteData.tenantId })}
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>Select Role</MenuItem>
            {(() => {
              const selectedTenant = tenants.find(t => t.id === inviteData.tenantId);
              if (selectedTenant?.name === 'SEA') {
                return portalRoles.map(r => (
                  <MenuItem key={r} value={r}>{roleLabels[r].label}</MenuItem>
                ));
              } else if (selectedTenant) {
                return tenantRoles.map(r => (
                  <MenuItem key={r} value={r}>{roleLabels[r].label}</MenuItem>
                ));
              } else {
                // Default behavior when no tenant is pre-selected
                return [
                  ...(isPortalUser ? portalRoles.map(r => (
                    <MenuItem key={r} value={r}>{roleLabels[r].label}</MenuItem>
                  )) : []),
                  ...((isPortalUser || isTenantAdmin) ? tenantRoles.map(r => (
                    <MenuItem key={r} value={r}>{roleLabels[r].label}</MenuItem>
                  )) : [])
                ];
              }
            })()}
          </Select>
          {inviteData.role && tenantRoles.includes(inviteData.role) && isPortalUser && (
            <Select
              fullWidth
              displayEmpty
              value={inviteData.tenantId}
              onChange={e => setInviteData({ ...inviteData, tenantId: e.target.value })}
            >
              <MenuItem value="" disabled>Select Tenant</MenuItem>
              {manageableTenants.map(t => (
                <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
              ))}
            </Select>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInvite(false)} disabled={inviting} sx={{ fontSize: 14 }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleInviteUser} 
            disabled={!inviteData.email || !inviteData.role || (tenantRoles.includes(inviteData.role) && !inviteData.tenantId) || inviting}
            startIcon={inviting ? <CircularProgress size={16} /> : null}
            sx={{ fontSize: 14 }}
          >
            Send Invite
          </Button>
        </DialogActions>
      </Dialog>

      {/* EDIT USER DIALOG */}
      <Dialog open={!!editUser} onClose={() => setEditUser(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontSize: 18, fontWeight: 600 }}>Edit User</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2, color: '#6b7280', fontSize: 14 }}>
            Editing: {editUser?.email}
          </Typography>
          <TextField
            fullWidth
            label="Role"
            select
            value={editData.role}
            onChange={e => setEditData({ ...editData, role: e.target.value })}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="QA">QA</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
          {isPortalUser && (
            <TextField
              fullWidth
              label="Tenant"
              select
              value={editData.tenant}
              onChange={e => setEditData({ ...editData, tenant: e.target.value })}
            >
              <MenuItem value="SEA">SEA</MenuItem>
              <MenuItem value="Crunchy">Crunchy</MenuItem>
            </TextField>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser(null)} sx={{ fontSize: 14 }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveEdit}
            sx={{ fontSize: 14 }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE USER DIALOG */}
      <Dialog open={!!deleteUser} onClose={() => setDeleteUser(null)} maxWidth="sm">
        <DialogTitle sx={{ fontSize: 18, fontWeight: 600, color: '#d32f2f' }}>Delete User</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: 14 }}>
            Are you sure you want to delete user <strong>{deleteUser?.email}</strong>?
          </Typography>
          <Typography sx={{ mt: 1, color: '#6b7280', fontSize: 14 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteUser(null)} sx={{ fontSize: 14 }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={confirmDelete}
            sx={{ fontSize: 14 }}
          >
            Delete User
          </Button>
        </DialogActions>
      </Dialog>

      {/* SUCCESS MESSAGE DIALOG */}
      <Dialog 
        open={!!successMessage} 
        onClose={() => setSuccessMessage('')}
        maxWidth="sm"
        sx={{
          '& .MuiDialog-paper': {
            textAlign: 'center',
            p: 2
          }
        }}
      >
        <DialogContent sx={{ py: 4 }}>
          <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#22c55e', mb: 2 }}>
            ✓ Success
          </Typography>
          <Typography sx={{ fontSize: 14 }}>
            {successMessage}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            variant="contained" 
            onClick={() => setSuccessMessage('')}
            sx={{ 
              bgcolor: '#22c55e',
              '&:hover': { bgcolor: '#16a34a' },
              px: 4
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const RoleChip = ({ role }) => {
  const { label } = roleLabels[role] || {};
  // If role is not in roleLabels, use the role directly (for mockUsers roles)
  const displayLabel = label || role;
  if (!displayLabel) return null;
  return (
    <Chip
      size="small"
      label={displayLabel}
      sx={{
        bgcolor: '#0066cc15',
        color: '#0066cc',
        fontWeight: 600,
        fontSize: 12
      }}
    />
  );
};

export default UsersRolesTab;