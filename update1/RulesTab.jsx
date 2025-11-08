import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Select, MenuItem, TextField, IconButton, Box, Typography } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import SaveNotification from '../components/SaveNotification';

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'AU', name: 'Australia' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'ALL', name: 'All Countries' },
];

export default function RulesTab({ config, onChange, onSave, onCancel, isSaving, isDirty, isCollapsed }) {
  const [showNotification, setShowNotification] = useState(false);
  
  const rules = config.dynamic_rules || [];

  const addRule = () => {
    const newRules = [...rules, { country: 'ALL', skip_3ds: false, force_avs: false }];
    onChange({ ...config, dynamic_rules: newRules });
  };

  const updateRule = (index, field, value) => {
    const updated = [...rules];
    updated[index][field] = value;
    onChange({ ...config, dynamic_rules: updated });
  };

  const deleteRule = (index) => {
    const updated = rules.filter((_, i) => i !== index);
    onChange({ ...config, dynamic_rules: updated });
  };

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowNotification(true);
    if (onSave) onSave();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Dynamic 3DS & AVS Rules</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Override global settings per country. Rules apply in order.
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>3DS</TableCell>
            <TableCell>AVS</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rules.map((rule, i) => (
            <TableRow key={i}>
              <TableCell>
                <Select
                  value={rule.country}
                  onChange={(e) => updateRule(i, 'country', e.target.value)}
                  size="small"
                >
                  {countries.map(c => (
                    <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={rule.skip_3ds ? 'skip' : 'require'}
                  onChange={(e) => updateRule(i, 'skip_3ds', e.target.value === 'skip')}
                  size="small"
                >
                  <MenuItem value="require">Require 3DS</MenuItem>
                  <MenuItem value="skip">Skip 3DS</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={rule.force_avs ? 'force' : 'optional'}
                  onChange={(e) => updateRule(i, 'force_avs', e.target.value === 'force')}
                  size="small"
                >
                  <MenuItem value="force">Force AVS</MenuItem>
                  <MenuItem value="optional">Optional</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => deleteRule(i)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button startIcon={<Add />} onClick={addRule} variant="outlined" sx={{ mt: 2 }}>
        Add Rule
      </Button>

      <Box sx={{ mt: 3, p: 2, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
        <Typography variant="body2">
          <strong>How it works:</strong><br/>
          On checkout: <code>country → match rule → apply 3DS/AVS</code><br/>
          EU/UK: 3DS <strong>mandatory</strong> (PSD2)<br/>
          US/CA: AVS <strong>recommended</strong>
        </Typography>
      </Box>
      
      <Box sx={{ 
        position: 'fixed',
        bottom: 0,
        left: isCollapsed ? '64px' : '244px',
        right: 0,
        backgroundColor: 'white',
        padding: '12px 24px',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        transition: 'left 0.3s ease'
      }}>
        <Typography sx={{ color: '#6b7280', fontSize: 14 }}>
          {isDirty ? 'You have unsaved changes' : 'All changes saved'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            onClick={onCancel}
            disabled={!isDirty}
            variant="outlined"
            size="small"
            sx={{
              opacity: isDirty ? 1 : 0.5,
              cursor: isDirty ? 'pointer' : 'not-allowed',
              fontSize: 13
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            size="small"
            sx={{
              backgroundColor: '#4f46e5',
              '&:hover': { backgroundColor: '#4338ca' },
              fontSize: 13,
              fontWeight: 500
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
      
      <Box sx={{ mb: 10 }}>
        {/* Space for fixed footer */}
      </Box>
      
      <SaveNotification
        isVisible={showNotification}
        message="Rules Configuration Saved"
        onClose={() => setShowNotification(false)}
      />
    </Box>
  );
}