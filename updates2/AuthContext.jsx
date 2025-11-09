import React, { createContext, useContext, useState } from "react";
import { mockUsers } from "../data/mockUsers";

const AuthContext = createContext();

// Mock tenants data - SEA is portal handler, Crunchy is tenant
const mockTenants = [
  { id: 1, name: "SEA", merchant_ids: ["SEA_001", "SEA_002", "SEA_003"], isPortal: true },
  { id: 2, name: "Crunchy", merchant_ids: ["CRUNCHY_001", "CRUNCHY_002"], isPortal: false },
];

// Mock user roles data based on mockUsers
const mockUserRoles = mockUsers.map((user, index) => ({
  id: index + 1,
  user_id: `user_${index + 1}`,
  name: `${user.role} User`,
  email: user.email,
  portal_role: user.tenant === "SEA" ? "portal_user" : null,
  tenant_id: mockTenants.find(t => t.name === user.tenant)?.id || null,
  tenant_role: user.tenant !== "SEA" ? `tenant_${user.role.toLowerCase()}` : null,
}));

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Login function to store user info with RBAC data
  const login = (userData) => {
    const matchedUser = mockUsers.find(u => u.email === userData.email);
    if (matchedUser) {
      const userRole = mockUserRoles.find(ur => ur.email === userData.email);
      const isPortalUser = matchedUser.tenant === 'SEA';
      const isTenantAdmin = matchedUser.tenant === 'Crunchy' && matchedUser.role === 'Admin';
      
      setUser({
        id: userRole?.user_id || 'user_1',
        email: userData.email,
        name: userRole?.name || matchedUser.role + ' User',
        tenant: matchedUser.tenant,
        role: matchedUser.role,
        isPortalUser,
        isTenantAdmin,
        canAccessUserRoles: isPortalUser || isTenantAdmin
      });
    }
  };

  // Logout clears the context
  const logout = () => {
    setUser(null);
  };

  // Check if user is logged in
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoggedIn,
      tenants: mockTenants,
      userRoles: mockUserRoles,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Add a helper hook for easier usage
export const useAuth = () => useContext(AuthContext);
