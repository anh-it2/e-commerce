'use client';
import {
  Business,
  Edit,
  Save,
  Cancel,
  LocationOn,
  Phone,
  Email,
  Language,
  People
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

import { useEffect, useState } from 'react';

interface CompanyData {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  employees: string;
  sector: string;
  description: string;
}

export default function CompanyInfo() {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<CompanyData>({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    employees: '',
    sector: '',
    description: ''
  });

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const response = await fetch('/api/company');
      const data = await response.json();
      setCompanyData(data.company || {});
      setFormData(data.company || {
        name: 'Your Company Name',
        address: '123 Business Street, City, Country',
        phone: '+1 234 567 8900',
        email: 'info@yourcompany.com',
        website: 'www.yourcompany.com',
        employees: '50-100',
        sector: 'Manufacturing',
        description: 'Company description here...'
      });
    } catch (error) {
      console.error('Failed to fetch company data:', error);
      // Set default data if API fails
      const defaultData = {
        name: 'Your Company Name',
        address: '123 Business Street, City, Country',
        phone: '+1 234 567 8900',
        email: 'info@yourcompany.com',
        website: 'www.yourcompany.com',
        employees: '50-100',
        sector: 'Manufacturing',
        description: 'Company description here...'
      };
      setCompanyData(defaultData);
      setFormData(defaultData);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/company', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setCompanyData(formData);
        setEditMode(false);
        alert('Company information updated successfully');
      } else {
        alert('Failed to update company information');
      }
    } catch (error) {
      console.error('Failed to update company:', error);
      alert('Failed to update company information');
    }
  };

  const handleCancel = () => {
    if (companyData) {
      setFormData(companyData);
    }
    setEditMode(false);
  };

  const sectors = ['Manufacturing', 'Trading', 'Agriculture', 'Construction', 'Technology', 'Services'];
  const employeeSizes = ['1-10', '11-50', '51-100', '101-500', '500+'];

  // Sample meetings data for the schedule table
  const meetings = [
    { id: 1, partner: 'ABC Trading Co.', date: '2024-01-15', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, partner: 'XYZ Manufacturing', date: '2024-01-16', time: '2:00 PM', status: 'Pending' },
    { id: 3, partner: 'Global Exports Ltd.', date: '2024-01-18', time: '11:00 AM', status: 'Confirmed' }
  ];

  if (!companyData) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Company Information
      </Typography>

      {/* Company Info Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
              <Business sx={{ mr: 1 }} />
              Company Details
            </Typography>
            {!editMode ? (
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={!editMode}
                variant={editMode ? "outlined" : "filled"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={!editMode} variant={editMode ? "outlined" : "filled"}>
                <InputLabel>Sector</InputLabel>
                <Select
                  value={formData.sector}
                  onChange={(e) => setFormData({...formData, sector: e.target.value})}
                  label="Sector"
                >
                  {sectors.map((sector) => (
                    <MenuItem key={sector} value={sector}>
                      {sector}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                disabled={!editMode}
                variant={editMode ? "outlined" : "filled"}
                InputProps={{
                  startAdornment: <LocationOn sx={{ mr: 1, color: 'action.active' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                disabled={!editMode}
                variant={editMode ? "outlined" : "filled"}
                InputProps={{
                  startAdornment: <Phone sx={{ mr: 1, color: 'action.active' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled={!editMode}
                variant={editMode ? "outlined" : "filled"}
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Website"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                disabled={!editMode}
                variant={editMode ? "outlined" : "filled"}
                InputProps={{
                  startAdornment: <Language sx={{ mr: 1, color: 'action.active' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={!editMode} variant={editMode ? "outlined" : "filled"}>
                <InputLabel>Number of Employees</InputLabel>
                <Select
                  value={formData.employees}
                  onChange={(e) => setFormData({...formData, employees: e.target.value})}
                  label="Number of Employees"
                >
                  {employeeSizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                disabled={!editMode}
                variant={editMode ? "outlined" : "filled"}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Schedule with Partners Table */}
      <Typography variant="h5" gutterBottom>
        Scheduled Meetings with Partners
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Partner Name</TableCell>
              <TableCell>Meeting Date</TableCell>
              <TableCell>Schedule Time with Partner</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetings.map((meeting) => (
              <TableRow key={meeting.id}>
                <TableCell>{meeting.partner}</TableCell>
                <TableCell>{meeting.date}</TableCell>
                <TableCell>
                  <Chip
                    label={meeting.time}
                    size="small"
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={meeting.status}
                    size="small"
                    color={meeting.status === 'Confirmed' ? 'success' : 'warning'}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}