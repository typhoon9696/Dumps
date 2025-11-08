// src/pages/CreateReport.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, TextField, MenuItem, Button, FormControlLabel, Checkbox, Grid } from '@mui/material';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';
import reportTypes from '../data/reports/reportTypes';
import entities from '../data/reports/entities';
import frequency from '../data/reports/frequency';

const timeZones = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Asia/Kolkata'];

const allFields = [
  'Actions ID', 'Action Date UTC', 'Client Name', 'Action Type', 'Amount', 'Currency Symbol',
  'Response Code', 'Reference', '3DS Version', 'Attempt N3D', 'AVS Check', 'Billing Country',
  'CC Bin', 'CC Type', 'CVV Check', 'Card Holder Name', 'Customer Email', 'Payment Type',
  'Billing Descriptor Part1', 'CC Issuing Bank', 'Merchant Category Code', 'Processing Channel ID'
];

const CreateReport = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    reportType: '',
    entity: '',
    merchantId: '',
    timeZone: 'UTC',
    frequency: '',
    scheduleName: ''
  });
  const [selectedFields, setSelectedFields] = useState(['Actions ID', 'Action Date UTC', 'Client Name', 'Amount']);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFieldToggle = (field) => {
    setSelectedFields(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    height: '48px',
    '& fieldset': {
      borderColor: '#d0d0d0',
    },
    '&:hover fieldset': {
      borderColor: '#4931c1',
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: 14,
    minWidth: '100%',
  },
  '& .MuiInputBase-input': {
    fontSize: 14,
    overflow:'visible'
  },

};


  const handleSubmit = () => {
    console.log('Creating report:', { ...formData, selectedFields });
    navigate('/reports');
  };

  return (
    <Box sx={{ bgcolor: '#f9fafb', minHeight: '100vh' }}>
      <Sidebar onToggle={setIsCollapsed} />
      <Box sx={{ ml: isCollapsed ? '64px' : '244px', pt: '64px', transition: 'all 0.3s' }}>
        <DashboardNavbar isCollapsed={isCollapsed} />

        <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto', pb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a' }}>Create Report</Typography>
            <Button onClick={() => navigate('/reports')} variant="outlined" sx={{ px: 3, py: 1, fontSize: 14, borderColor: '#4931c1', color: '#4931c1', '&:hover': { borderColor: '#3d2a9f', color: '#3d2a9f' } }}>
              Back to Reports
            </Button>
          </Box>

          {/* Report Configuration */}
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 4, border: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
            <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 600, mb: 2, color: '#333' }}>
              Report Configuration
            </Typography>
          
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                select
                fullWidth
                label="Report Type"
                value={formData.reportType}
                onChange={(e) => handleInputChange('reportType', e.target.value)}
                size="small"
                sx={{ '& .MuiInputLabel-root': { fontSize: 14 }, '& .MuiInputBase-input': { fontSize: 14 } }}
              >
                <MenuItem value="">Select Report Type</MenuItem>
                {reportTypes.map((t) => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </TextField>
                
              <TextField
                select
                fullWidth
                label="Entity"
                value={formData.entity}
                onChange={(e) => handleInputChange('entity', e.target.value)}
                size="small"
                sx={{ '& .MuiInputLabel-root': { fontSize: 14 }, '& .MuiInputBase-input': { fontSize: 14 } }}
              >
                <MenuItem value="">Select Entity</MenuItem>
                {entities.map((e) => (
                  <MenuItem key={e} value={e}>{e}</MenuItem>
                ))}
              </TextField>
                
              <TextField
                fullWidth
                label="Merchant ID"
                value={formData.merchantId}
                onChange={(e) => handleInputChange('merchantId', e.target.value)}
                placeholder="MCH-12345"
                size="small"
                sx={{ '& .MuiInputLabel-root': { fontSize: 14 }, '& .MuiInputBase-input': { fontSize: 14 } }}
              />
                
              <TextField
                select
                fullWidth
                label="Time Zone"
                value={formData.timeZone}
                onChange={(e) => handleInputChange('timeZone', e.target.value)}
                size="small"
                sx={{ '& .MuiInputLabel-root': { fontSize: 14 }, '& .MuiInputBase-input': { fontSize: 14 } }}
              >
                {timeZones.map((tz) => (
                  <MenuItem key={tz} value={tz}>{tz}</MenuItem>
                ))}
              </TextField>
                
              <TextField
                select
                fullWidth
                label="Frequency"
                value={formData.frequency}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                size="small"
                sx={{ '& .MuiInputLabel-root': { fontSize: 14 }, '& .MuiInputBase-input': { fontSize: 14 } }}
              >
                <MenuItem value="">Select Frequency</MenuItem>
                {frequency.map((f) => (
                  <MenuItem key={f} value={f}>{f}</MenuItem>
                ))}
              </TextField>
                
              <TextField
                fullWidth
                label="Schedule Name"
                value={formData.scheduleName}
                onChange={(e) => handleInputChange('scheduleName', e.target.value)}
                placeholder="Daily Settlement - IN"
                size="small"
                sx={{ '& .MuiInputLabel-root': { fontSize: 14 }, '& .MuiInputBase-input': { fontSize: 14 } }}
              />
            </Box>
          </Paper>

          {/* Fields Selection */}
          <Paper elevation={2} sx={{ p: 4, borderRadius: 3, border: '1px solid #e0e0e0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 600, color: '#333' }}>Select Report Fields</Typography>
              <Box>
                <Button onClick={() => setSelectedFields(allFields)} variant="outlined" sx={{ mr: 2, px: 3, fontSize: 14, borderColor: '#4931c1', color: '#4931c1', '&:hover': { borderColor: '#3d2a9f', color: '#3d2a9f' } }}>
                  Select All
                </Button>
                <Button onClick={() => setSelectedFields(['Actions ID', 'Action Date UTC', 'Client Name', 'Amount'])} variant="outlined" sx={{ px: 3, fontSize: 14, borderColor: '#4931c1', color: '#4931c1', '&:hover': { borderColor: '#3d2a9f', color: '#3d2a9f' } }}>
                  Reset to Defaults
                </Button>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: 2,
              maxHeight: 400,
              overflowY: 'auto',
              p: 3,
              bgcolor: '#fafafa',
              borderRadius: 2,
              border: '1px solid #e8e8e8'
            }}>
              {allFields.map(field => (
                <FormControlLabel
                  key={field}
                  control={
                    <Checkbox
                      checked={selectedFields.includes(field)}
                      onChange={() => handleFieldToggle(field)}
                      size="small"
                      sx={{ color: '#4931c1', '&.Mui-checked': { color: '#4931c1' } }}
                    />
                  }
                  label={<Typography sx={{ fontSize: 14, fontWeight: 500 }}>{field}</Typography>}
                  sx={{ m: 0, py: 0.5 }}
                />
              ))}
            </Box>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
              <Button onClick={() => navigate('/reports')} variant="outlined" sx={{ px: 4, py: 1.5, fontSize: 14, borderColor: '#4931c1', color: '#4931c1', '&:hover': { borderColor: '#3d2a9f', color: '#3d2a9f' } }}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                variant="contained"
                disabled={!formData.reportType || !formData.entity || !formData.frequency}
                sx={{ bgcolor: '#4931c1', px: 4, py: 1.5, fontSize: 14, '&:hover': { bgcolor: '#3d2a9f' } }}
              >
                Create Report Schedule
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateReport;