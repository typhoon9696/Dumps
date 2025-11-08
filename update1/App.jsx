import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CoreFeatures from './components/CoreFeatures';
import HorizontalCard from './components/HorizontalCard';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Resources from './pages/Resources';
import Settings from './pages/settings/Settings';
import GeneralSettings from './pages/settings/GeneralSettings';
import SecuritySettings from './pages/settings/SecuritySettings';
import Support from './pages/Support';
import Configurations from './features/configurations/Configurations';
import TransactionDetail from './pages/TransactionDetail';
import Settlements from './pages/Settlements';
import CreateReport from './pages/CreateReport';
import './App.css';

// ✅ Public Layout with Navbar + Footer
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="main-content">{children}</main>
    <Footer />
  </>
);

// ✅ Dashboard Layout without Navbar/Footer
const DashboardLayout = ({ children }) => (
  <main className="main-content">{children}</main>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Hero />
              <CoreFeatures />
              <HorizontalCard />
              <FAQ />
            </PublicLayout>
          }
        />
        <Route path="/login" element={<Login />} /> {/* ❌ No layout here */}
        <Route
          path="/signup"
          element={
            <PublicLayout>
              <Signup />
            </PublicLayout>
          }
        />
        <Route
          path="/resources"
          element={
            <PublicLayout>
              <Resources />
            </PublicLayout>
          }
        />
        
        <Route
          path="/faq"
          element={
            <PublicLayout>
              <FAQ />
            </PublicLayout>
          }
        />
        {/* Dashboard Pages (no Navbar/Footer) */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/transactions"
          element={
            <DashboardLayout>
              <Transactions />
            </DashboardLayout>
          }
        />
        <Route
          path="/transactions/:id"
          element={
            <DashboardLayout>
              <TransactionDetail />
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />
        <Route
          path="/settings/general"
          element={
            <DashboardLayout>
              <GeneralSettings />
            </DashboardLayout>
          }
        />
        <Route
          path="/settings/security"
          element={
            <DashboardLayout>
              <SecuritySettings />
            </DashboardLayout>
          }
        />
        <Route
          path="/support"
          element={
            <DashboardLayout>
              <Support />
            </DashboardLayout>
          }
        />
        <Route
          path="/configurations"
          element={
            <DashboardLayout>
              <Configurations />
            </DashboardLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <DashboardLayout>
              <Settlements />
            </DashboardLayout>
          }
        />
        <Route
          path="/create-report"
          element={
            <DashboardLayout>
              <CreateReport />
            </DashboardLayout>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;