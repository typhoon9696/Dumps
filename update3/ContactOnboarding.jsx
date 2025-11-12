// src/pages/ContactOnboarding.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Container, Paper, Button, List, ListItem, ListItemIcon, ListItemText,
  Chip, Divider, useTheme, Alert, TextField, Grid
} from '@mui/material';
import { CheckCircle, Email, Phone, Schedule, Business, SupportAgent } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const interestMap = {
  'multi-tenant-management': "I'm interested in **Multi-Tenant Management** — managing multiple business entities under one portal.",
  'real-time-payments-settlements': "I'm interested in **Real-Time Payments & Settlements** — instant processing and SFTP reporting.",
  'global-insights': "I'm interested in **Global Insights** — unified analytics across all markets.",
  'secure-compliant': "I'm interested in **Secure & Compliant** — PCI DSS, SOC2, and global compliance.",
  'multi-tenant-dashboard': "I'm interested in **Multi-Tenant Payment Dashboard** — unified view for Sony Pictures, Music, Crunchyroll with isolated access.",
  'tenant-configuration': "I'm interested in **Tenant Configuration & Preferences** — custom payment methods, currencies, and settlement settings.",
  'admin-global-insights': "I'm interested in **Admin Control & Global Insights** — tenant onboarding, global transaction map, and financial monitoring.",
  'sftp-settlement-reporting': "I'm interested in **SFTP-Ready Settlement Reporting** — daily automated reports at 02:00 UTC via SFTP.",
'white-glove-onboarding': "I'm interested in **3-Month White-Glove Onboarding** — dedicated PM, compliance, custom integration, enterprise only."
};
const ContactOnboarding = () => {
  const theme = useTheme();
  const location = useLocation();
  const [preFilledMessage, setPreFilledMessage] = useState('');
  const [userDetails, setUserDetails] = useState({ name: '', company: '', phone: '', volume: '' });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const interest = params.get('interest');
    if (interest && interestMap[interest]) {
      setPreFilledMessage(interestMap[interest]);
    }
  }, [location]);

  const handleSendEmail = () => {
    const body = `
${preFilledMessage}

---
Name: ${userDetails.name}
Company: ${userDetails.company}
Phone: ${userDetails.phone}
Monthly Volume: ${userDetails.volume}

---
Interested in: ${preFilledMessage.split('**')[1]}
    `.trim();

    window.location.href = `mailto:onboarding@crunchyroll-payportal.com?subject=Enterprise Onboarding Inquiry&body=${encodeURIComponent(body)}`;
  };

  return (
    <Box sx={{ bgcolor: '#f8faff', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2 }}>
                Enterprise Onboarding
              </Typography>
              <Typography variant="body1" sx={{ color: '#6b7280', maxWidth: 600, mx: 'auto' }}>
                Our portal supports global payment operations with strict compliance and security standards. 
                Onboarding requires a dedicated 3-month integration process.
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Timeline */}
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#1a1a1a' }}>
                What to Expect
              </Typography>
              <List>
                {[
                  { text: 'Initial consultation with our onboarding team', icon: <SupportAgent /> },
                  { text: 'Legal, compliance, and technical due diligence', icon: <Business /> },
                  { text: 'Custom integration planning (SFTP, API, webhooks)', icon: <CheckCircle /> },
                  { text: 'Dedicated project manager assigned', icon: <Schedule /> },
                  { text: 'Go-live with full support and monitoring', icon: <CheckCircle /> }
                ].map((item, i) => (
                  <ListItem key={i} sx={{ py: 1.5 }}>
                    <ListItemIcon sx={{ color: theme.palette.primary.main, minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography sx={{ fontSize: 15, color: '#374151' }}>{item.text}</Typography>}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Inquiry Form */}
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#1a1a1a' }}>
                Your Inquiry
              </Typography>

              <TextField
                multiline
                rows={5}
                fullWidth
                value={preFilledMessage}
                onChange={(e) => setPreFilledMessage(e.target.value)}
                placeholder="Your message will appear here..."
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#f8fafc',
                    borderRadius: 2,
                    fontSize: '0.95rem'
                  }
                }}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f8fafc', borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    value={userDetails.company}
                    onChange={(e) => setUserDetails({ ...userDetails, company: e.target.value })}
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f8fafc', borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={userDetails.phone}
                    onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f8fafc', borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Monthly Volume (USD)"
                    value={userDetails.volume}
                    onChange={(e) => setUserDetails({ ...userDetails, volume: e.target.value })}
                    placeholder="e.g. 10M+"
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f8fafc', borderRadius: 2 } }}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                fullWidth
                onClick={handleSendEmail}
                disabled={!userDetails.name || !userDetails.company || !preFilledMessage}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  bgcolor: '#4f46e5',
                  '&:hover': { bgcolor: '#4338ca' }
                }}
              >
                Send Inquiry via Email
              </Button>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Contact Info */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#1a1a1a' }}>
                Or Reach Us Directly
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mb: 4 }}>
                <Paper sx={{ p: 3, flex: 1, textAlign: 'center', borderRadius: 3, bgcolor: '#f8fafc' }}>
                  <Email sx={{ fontSize: 32, color: '#4B7BFF', mb: 1 }} />
                  <Typography sx={{ fontWeight: 600, mb: 1 }}>Email</Typography>
                  <Typography sx={{ fontSize: 14, color: '#6b7280' }}>onboarding@crunchyroll-payportal.com</Typography>
                  <Button 
                    component="a" 
                    href="mailto:onboarding@crunchyroll-payportal.com"
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2, borderRadius: 2 }}
                  >
                    Send Email
                  </Button>
                </Paper>

                <Paper sx={{ p: 3, flex: 1, textAlign: 'center', borderRadius: 3, bgcolor: '#f8fafc' }}>
                  <Phone sx={{ fontSize: 32, color: '#4B7BFF', mb: 1 }} />
                  <Typography sx={{ fontWeight: 600, mb: 1 }}>Phone</Typography>
                  <Typography sx={{ fontSize: 14, color: '#6b7280' }}>+91 80 4718 1234 (IN)</Typography>
                  <Typography sx={{ fontSize: 14, color: '#6b7280' }}>+81 3-1234-5678 (JP)</Typography>
                  <Button 
                    component="a" 
                    href="tel:+918047181234"
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2, borderRadius: 2 }}
                  >
                    Call India
                  </Button>
                </Paper>
              </Box>

              <Alert severity="info" sx={{ borderRadius: 2 }}>
                <strong>Expected Response:</strong> Within 24 hours on business days
              </Alert>
            </Box>

            {/* Back Link */}
            <Box sx={{ textAlign: 'center', mt: 5 }}>
              <Chip 
                label="3-Month Onboarding Process" 
                color="primary" 
                sx={{ fontWeight: 600, mb: 2 }}
              />
              <Typography variant="body2" sx={{ color: '#6b7280', mt: 1 }}>
                Already in talks? <Link to="/login" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>Log in here</Link>
                <br />
                <Link to="/" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.9rem' }}>
                  Back to Features
                </Link>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ContactOnboarding;