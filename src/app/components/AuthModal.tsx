'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Tab,
  Tabs,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function AuthModal({ open, onClose, onLoginSuccess }: AuthModalProps) {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpId, setOtpId] = useState('');

  // Login form state
  const [loginForm, setLoginForm] = useState({
    companyCode: '',
    userID: '',
    password: ''
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    companyCode: '',
    phoneNumber: ''
  });

  // OTP state
  const [otp, setOtp] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();

      if (response.ok) {
        if (data.needsOTP) {
          setShowOTPModal(true);
          setOtpId('demo_otp_id');
        } else {
          onLoginSuccess(data.user);
          onClose();
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm)
      });

      const data = await response.json();

      if (response.ok) {
        setShowOTPModal(true);
        setOtpId(data.otpId);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otpId, otp })
      });

      const data = await response.json();

      if (response.ok) {
        if (tabValue === 0) {
          // Login flow - proceed to dashboard
          onLoginSuccess({ companyCode: loginForm.companyCode, userID: loginForm.userID });
        } else {
          // Register flow - show welcome message
          alert('Registration successful! You can now login.');
          setTabValue(0);
        }
        setShowOTPModal(false);
        onClose();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (showOTPModal) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Enter OTP</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
            Please enter the OTP sent to your phone. Demo OTP: 123456
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            fullWidth
            label="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            inputProps={{ maxLength: 6 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowOTPModal(false)}>Back</Button>
          <Button
            onClick={handleVerifyOTP}
            variant="contained"
            disabled={loading || otp.length !== 6}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TabPanel value={tabValue} index={0}>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
            Demo accounts: DEMO123/demo_user/demo123 or BANK999/demo_admin/admin999
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Company Code"
              value={loginForm.companyCode}
              onChange={(e) => setLoginForm({...loginForm, companyCode: e.target.value})}
            />
            <TextField
              fullWidth
              label="User ID"
              value={loginForm.userID}
              onChange={(e) => setLoginForm({...loginForm, userID: e.target.value})}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Company Code"
              value={registerForm.companyCode}
              onChange={(e) => setRegisterForm({...registerForm, companyCode: e.target.value})}
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={registerForm.phoneNumber}
              onChange={(e) => setRegisterForm({...registerForm, phoneNumber: e.target.value})}
            />
          </Box>
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={tabValue === 0 ? handleLogin : handleRegister}
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Processing...' : (tabValue === 0 ? 'Login' : 'Register')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}