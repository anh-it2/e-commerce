'use client';
import {
  CheckCircle
} from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const steps = [
  'Select Type',
  'Product Details',
  'Pricing & Quantity',
  'Visibility Settings',
  'Review & Submit'
];

const productSuggestions = [
  'Steel Coil', 'Steel Bars', 'Steel Sheets',
  'Aluminum Sheets', 'Aluminum Coils',
  'Jasmine Rice', 'Basmati Rice', 'Brown Rice',
  'Arabica Coffee', 'Robusta Coffee',
  'Cement', 'Concrete', 'Construction Steel',
  'Electronics Components', 'Automotive Parts'
];

const hsCodeSuggestions = [
  { product: 'Steel Coil', code: '7208.10.00' },
  { product: 'Steel Bars', code: '7213.10.00' },
  { product: 'Aluminum Sheets', code: '7606.11.00' },
  { product: 'Jasmine Rice', code: '1006.30.00' },
  { product: 'Coffee', code: '0901.21.00' },
  { product: 'Cement', code: '2523.29.00' }
];

export default function PostBusinessNeed() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [existingNeeds, setExistingNeeds] = useState<any[]>([]);
  const [showExisting, setShowExisting] = useState(false);

  const [formData, setFormData] = useState({
    type: '',
    product: '',
    hsCode: '',
    quantity: '',
    unit: 'tons',
    moq: '',
    price: '',
    currency: 'USD',
    expiry: '',
    visibility: 'public',
    description: '',
    location: 'Ho Chi Minh City, Vietnam'
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      router.push('/');
      return;
    }
    fetchExistingNeeds();
  }, [router]);

  const fetchExistingNeeds = async () => {
    try {
      const response = await fetch('/api/needs');
      const data = await response.json();
      setExistingNeeds(data.needs || []);
    } catch (error) {
      console.error('Failed to fetch existing needs:', error);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleProductChange = (value: string | null) => {
    if (value) {
      setFormData({ ...formData, product: value });

      // Auto-suggest HS Code
      const suggestion = hsCodeSuggestions.find(s =>
        value.toLowerCase().includes(s.product.toLowerCase())
      );
      if (suggestion) {
        setFormData(prev => ({ ...prev, product: value, hsCode: suggestion.code }));
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/needs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionResult(result);
        setActiveStep(steps.length);
      } else {
        alert('Failed to submit business need');
      }
    } catch (error) {
      alert('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0: return formData.type !== '';
      case 1: return formData.product !== '' && formData.hsCode !== '';
      case 2: return formData.quantity !== '' && formData.price !== '';
      case 3: return formData.visibility !== '';
      case 4: return true;
      default: return false;
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              What type of business need do you have?
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <RadioGroup
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <FormControlLabel
                  value="buy"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body1">Buy</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Looking to purchase products or services
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="sell"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body1">Sell</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Offering products or services for sale
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="outsource"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body1">Outsource</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Seeking manufacturing or service partnerships
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Product Details
            </Typography>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Autocomplete
                  options={productSuggestions}
                  value={formData.product}
                  onChange={(event, value) => handleProductChange(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product Name"
                      placeholder="Start typing to search..."
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="HS Code"
                  value={formData.hsCode}
                  onChange={(e) => setFormData({ ...formData, hsCode: e.target.value })}
                  placeholder="e.g., 7208.10.00"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your requirements, quality specifications, etc."
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Pricing & Quantity
            </Typography>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Unit</InputLabel>
                  <Select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    label="Unit"
                  >
                    <MenuItem value="tons">Tons</MenuItem>
                    <MenuItem value="kg">Kilograms</MenuItem>
                    <MenuItem value="pieces">Pieces</MenuItem>
                    <MenuItem value="units">Units</MenuItem>
                    <MenuItem value="containers">Containers</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="MOQ (Minimum Order Quantity)"
                  type="number"
                  value={formData.moq}
                  onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={formData.type === 'buy' ? 'Target Price' : 'Selling Price'}
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    label="Currency"
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="CNY">CNY</MenuItem>
                    <MenuItem value="VND">VND</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  type="date"
                  value={formData.expiry}
                  onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Visibility Settings
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <RadioGroup
                value={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
              >
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="body1">Public</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Visible to all platform users
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="body1">Private</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Only visible to you and invited partners
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="industry"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="body1">Industry Only</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Visible to companies in the same industry
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Business Need
            </Typography>
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Chip
                      label={formData.type.toUpperCase()}
                      color={formData.type === 'buy' ? 'primary' : formData.type === 'sell' ? 'success' : 'warning'}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">Product</Typography>
                    <Typography variant="body1">{formData.product}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">HS Code</Typography>
                    <Typography variant="body1">{formData.hsCode}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">Quantity</Typography>
                    <Typography variant="body1">{formData.quantity} {formData.unit}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">Price</Typography>
                    <Typography variant="body1">{formData.price} {formData.currency}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">MOQ</Typography>
                    <Typography variant="body1">{formData.moq} {formData.unit}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">Visibility</Typography>
                    <Typography variant="body1">{formData.visibility}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Description</Typography>
                    <Typography variant="body1">{formData.description}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  if (activeStep === steps.length) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircle color="success" sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h4" gutterBottom color="success.main">
            Business Need Posted Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Your business need has been published and is now visible to potential partners.
          </Typography>

          {submissionResult?.need?.suggestedPartners && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Suggested Partners:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {submissionResult.need.suggestedPartners.map((partner: string, index: number) => (
                  <Chip key={index} label={partner} color="primary" />
                ))}
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={() => router.push('/dashboard')}
            >
              Back to Dashboard
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setActiveStep(0);
                setFormData({
                  type: '',
                  product: '',
                  hsCode: '',
                  quantity: '',
                  unit: 'tons',
                  moq: '',
                  price: '',
                  currency: 'USD',
                  expiry: '',
                  visibility: 'public',
                  description: '',
                  location: 'Ho Chi Minh City, Vietnam'
                });
                setSubmissionResult(null);
              }}
            >
              Post Another Need
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Business Needs Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant={showExisting ? "outlined" : "contained"}
            onClick={() => setShowExisting(false)}
          >
            Post New Need
          </Button>
          <Button
            variant={showExisting ? "contained" : "outlined"}
            onClick={() => setShowExisting(true)}
          >
            View Existing Needs
          </Button>
        </Box>
      </Box>

      {showExisting ? (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Your Posted Business Needs
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product/Service</TableCell>
                  <TableCell>Type & Status</TableCell>
                  <TableCell>Schedule with Partner</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {existingNeeds.map((need: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold">
                        {need.product || `Business Need ${index + 1}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {need.quantity || 'N/A'} {need.unit || ''}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: {need.price || 'N/A'} {need.currency || ''}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={need.type?.toUpperCase() || 'UNKNOWN'}
                        color={need.type === 'buy' ? 'primary' : need.type === 'sell' ? 'success' : 'warning'}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Status: {need.status || 'Active'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={need.partnerSchedule || "Not Scheduled"}
                        size="small"
                        color={need.partnerSchedule ? "success" : "default"}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button size="small" variant="outlined">
                          Edit
                        </Button>
                        <Button size="small" variant="outlined" color="error">
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {existingNeeds.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
                      <Typography color="text.secondary">
                        No business needs posted yet.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <Paper sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || !isStepValid(activeStep)}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isStepValid(activeStep)}
            >
              Next
            </Button>
          )}
        </Box>
        </Paper>
      )}
    </Container>
  );
}