
import { useState } from 'react';
import ValidatedTextField from '../components/ValidatedTextField';
import SecretField from '../components/SecretField';
import EventSelector from '../components/EventSelector';
import TestWebhook from '../components/TestWebhook';
import DeliveryHistory from '../components/DeliveryHistory';
import SaveNotification from '../components/SaveNotification';
import { Box, Typography, Button, Alert } from '@mui/material';

export default function WebhooksTab({ config, onChange, onSave, onCancel, isSaving, isDirty, isCollapsed }) {
  const [testResult, setTestResult] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const regenerateSecret = () => {
    const newSecret = 'whsec_' + Math.random().toString(36).substring(2, 15);
    onChange({ ...config, webhook_secret: newSecret });
  };

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowNotification(true);
    if (onSave) onSave();
  };

  return (
    <Box sx={{ display: 'grid', gap: 4 }}>
      <Box>
        <Typography fontWeight={600} gutterBottom>Webhook URL</Typography>
        <ValidatedTextField
          label="Endpoint URL"
          value={config.webhook_url || ''}
          onChange={(url) => onChange({ ...config, webhook_url: url })}
          placeholder="https://api.yourcompany.com/adyen-webhook"
        />
        <Typography variant="caption" color="text.secondary">
          Must be HTTPS. We send POST with JSON payload.
        </Typography>
      </Box>

      <Box>
        <Typography fontWeight={600} gutterBottom>Security</Typography>
        <SecretField value={config.webhook_secret} />
        <Button onClick={regenerateSecret} size="small" sx={{ mt: 1 }}>
          Regenerate Secret
        </Button>
        <Typography variant="caption" color="text.secondary" display="block">
          We sign payloads with HMAC SHA256. Verify with your secret.
        </Typography>
      </Box>

      <EventSelector
        selected={config.selected_events || []}
        onChange={(events) => onChange({ ...config, selected_events: events })}
      />

      <TestWebhook
        url={config.webhook_url}
        secret={config.webhook_secret}
        onResult={setTestResult}
      />

      {testResult && (
        <Alert severity={testResult.success ? 'success' : 'error'}>
          {testResult.message}
        </Alert>
      )}

      <DeliveryHistory deliveries={config.recent_deliveries || []} />
      
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
        message="Webhook Configuration Saved"
        onClose={() => setShowNotification(false)}
      />
    </Box>
  );
}