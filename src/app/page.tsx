'use client';
import {
  Business,
  Language,
  Security,
  TrendingUp
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Paper,
  Toolbar,
  Typography
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuthModal from './components/AuthModal';

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    router.push('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const features = [
    {
      icon: <Business color="primary" sx={{ fontSize: 40 }} />,
      title: 'B2B Marketplace',
      description: 'Connect with verified businesses worldwide and expand your trading network.'
    },
    {
      icon: <TrendingUp color="primary" sx={{ fontSize: 40 }} />,
      title: 'Trade Analytics',
      description: 'Get insights into market trends and optimize your business decisions.'
    },
    {
      icon: <Security color="primary" sx={{ fontSize: 40 }} />,
      title: 'Secure Transactions',
      description: 'Bank-level security with integrated financial services and guarantees.'
    },
    {
      icon: <Language color="primary" sx={{ fontSize: 40 }} />,
      title: 'Global Reach',
      description: 'Access international markets with built-in compliance and documentation.'
    }
  ];

  const stats = [
    { label: 'Active Companies', value: '10,000+' },
    { label: 'Countries Served', value: '50+' },
    { label: 'Trade Volume', value: '$2.5B+' },
    { label: 'Success Rate', value: '98%' }
  ];

  return (
    <Box>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            B2B Trade Platform
          </Typography>
          {user ? (
            <>
              <Button color="inherit" onClick={() => router.push('/dashboard')}>
                Dashboard
              </Button>
              <Button color="inherit" onClick={() => router.push('/marketplace')}>
                Marketplace
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout ({user.userID})
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => setAuthModalOpen(true)}>
              Login / Register
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Global B2B Trade Platform
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Connect, Trade, and Grow Your Business Worldwide
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setAuthModalOpen(true)}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push('/marketplace')}
            >
              Browse Marketplace
            </Button>
          </Box>
        </Box>

        {/* Stats Section */}
        <Paper elevation={2} sx={{ p: 4, mb: 6 }}>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Features Section */}
        <Typography variant="h3" textAlign="center" sx={{ mb: 6 }}>
          Why Choose Our Platform?
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {feature.icon}
                    <Typography variant="h6" sx={{ ml: 2 }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Demo Accounts Section */}
        <Paper elevation={1} sx={{ p: 4, mb: 6, bgcolor: 'background.default' }}>
          <Typography variant="h6" gutterBottom>
            Demo Accounts Available:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              label="DEMO123 / demo_user / demo123 (Standard)"
              color="primary"
              variant="outlined"
            />
            <Chip
              label="BANK999 / demo_admin / admin999 (Admin)"
              color="secondary"
              variant="outlined"
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Demo OTP is always: 123456
          </Typography>
        </Paper>

        {/* CTA Section */}
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h4" gutterBottom>
            Ready to Start Trading?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Join thousands of businesses already using our platform
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => setAuthModalOpen(true)}
          >
            Create Account Now
          </Button>
        </Box>
      </Container>

      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </Box>
  );
}
