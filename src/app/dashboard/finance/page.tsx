'use client';
import {
  AccountBalance,
  CheckCircle,
  Description,
  Security,
  Verified
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';

import { useEffect, useState } from 'react';

interface FinancialService {
  id: string;
  name: string;
  category: string;
  description: string;
  provider: string;
  rate: string;
  maxAmount: string;
  processingTime: string;
  partnerSchedule?: string;
  status: string;
}

export default function FinancialServices() {
  const [services, setServices] = useState<FinancialService[]>([]);
  const [applicationDialog, setApplicationDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<FinancialService | null>(null);
  const [applicationForm, setApplicationForm] = useState({
    amount: '',
    purpose: '',
    companyInfo: '',
    contactPerson: ''
  });

  useEffect(() => {
    fetchFinancialServices();
  }, []);

  const fetchFinancialServices = async () => {
    try {
      const response = await fetch('/api/finance');
      const data = await response.json();
      setServices(data.services || []);
    } catch (error) {
      console.error('Failed to fetch financial services:', error);
    }
  };

  const handleApply = (service: FinancialService) => {
    setSelectedService(service);
    setApplicationDialog(true);
  };

  const handleSubmitApplication = () => {
    alert(`Application submitted for ${selectedService?.name}`);
    setApplicationDialog(false);
    setApplicationForm({
      amount: '',
      purpose: '',
      companyInfo: '',
      contactPerson: ''
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'financing': return <AccountBalance color="primary" />;
      case 'guarantee': return <Security color="success" />;
      case 'digital': return <Description color="info" />;
      case 'insurance': return <Verified color="warning" />;
      default: return <AccountBalance color="primary" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'financing': return 'primary';
      case 'guarantee': return 'success';
      case 'digital': return 'info';
      case 'insurance': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Financial Services
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        Access banking and financial services tailored for B2B trade. All services are provided by verified financial partners.
      </Alert>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Service Name</TableCell>
              <TableCell>Provider & Rate</TableCell>
              <TableCell>Schedule with Partner</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getCategoryIcon(service.category)}
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6">
                        {service.name}
                      </Typography>
                      <Chip
                        label={service.category.toUpperCase()}
                        color={getCategoryColor(service.category) as 'primary' | 'success' | 'info' | 'warning' | 'default'}
                        size="small"
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {service.description}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight="bold">
                    {service.provider}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="primary">
                    {service.rate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Max: {service.maxAmount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Processing: {service.processingTime}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={service.partnerSchedule || "Not Scheduled"}
                    size="small"
                    color={service.partnerSchedule ? "success" : "default"}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleApply(service)}
                    disabled={service.status !== 'available'}
                    size="small"
                  >
                    Apply Now
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Application Dialog */}
      <Dialog open={applicationDialog} onClose={() => setApplicationDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Apply for {selectedService?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              This is a demo application. In a real system, this would connect to the financial provider&apos;s API.
            </Alert>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Requested Amount"
                  value={applicationForm.amount}
                  onChange={(e) => setApplicationForm({...applicationForm, amount: e.target.value})}
                  placeholder="e.g., $100,000"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Person"
                  value={applicationForm.contactPerson}
                  onChange={(e) => setApplicationForm({...applicationForm, contactPerson: e.target.value})}
                  placeholder="Full name and title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Purpose of Financing"
                  multiline
                  rows={3}
                  value={applicationForm.purpose}
                  onChange={(e) => setApplicationForm({...applicationForm, purpose: e.target.value})}
                  placeholder="Describe how you plan to use the financing..."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Information"
                  multiline
                  rows={2}
                  value={applicationForm.companyInfo}
                  onChange={(e) => setApplicationForm({...applicationForm, companyInfo: e.target.value})}
                  placeholder="Brief company overview, annual revenue, etc."
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApplicationDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitApplication} variant="contained">
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}