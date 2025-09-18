'use client';
import {
  Business,
  FilterList,
  LocationOn,
  Message,
  RequestPage,
  Verified
} from '@mui/icons-material';
import {
  Avatar,
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
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  Slider,
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

interface Partner {
  id: string;
  name: string;
  industry?: string;
  location?: string;
  rating?: number;
  description?: string;
  companySize?: string;
  trustScore?: number;
}

export default function PartnerSearch() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filters, setFilters] = useState({
    industry: '',
    distance: 100,
    rating: 0
  });
  const [chatDialog, setChatDialog] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.industry) params.append('industry', filters.industry);
      params.append('distance', filters.distance.toString());
      if (filters.rating > 0) params.append('rating', filters.rating.toString());

      const response = await fetch(`/api/partners?${params}`);
      const data = await response.json();
      setPartners(data.partners || []);
    } catch (error) {
      console.error('Failed to fetch partners:', error);
    }
  };

  const handleConnect = (partner: Partner) => {
    setSelectedPartner(partner);
    setChatDialog(true);
  };

  const handleSendMessage = () => {
    alert(`Message sent to ${selectedPartner?.name}`);
    setChatDialog(false);
    setMessage('');
  };

  const industries = ['Manufacturing', 'Agriculture', 'Electronics', 'Construction', 'Trading'];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Find Business Partners
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          <FilterList sx={{ mr: 1 }} />
          Search Filters
        </Typography>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Industry</InputLabel>
              <Select
                value={filters.industry}
                onChange={(e) => setFilters({...filters, industry: e.target.value})}
                label="Industry"
              >
                <MenuItem value="">All Industries</MenuItem>
                {industries.map((industry) => (
                  <MenuItem key={industry} value={industry}>
                    {industry}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography gutterBottom>Distance: {filters.distance} km</Typography>
            <Slider
              value={filters.distance}
              onChange={(e, value) => setFilters({...filters, distance: value as number})}
              min={5}
              max={200}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography gutterBottom>Min Rating: {filters.rating}</Typography>
            <Slider
              value={filters.rating}
              onChange={(e, value) => setFilters({...filters, rating: value as number})}
              min={0}
              max={5}
              step={0.5}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={fetchPartners}
              sx={{ height: 56 }}
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Results */}
      <Typography variant="h6" gutterBottom>
        Found {partners.length} Partners
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Partner Name</TableCell>
              <TableCell>Location & Rating</TableCell>
              <TableCell>Schedule with Partner</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {partner.name[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" noWrap>
                        {partner.name}
                        {partner.verified && (
                          <Verified color="primary" sx={{ ml: 1, fontSize: 20 }} />
                        )}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {partner.sector} • {partner.employees} employees
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <LocationOn sx={{ mr: 1, fontSize: 16 }} />
                    {partner.location} ({partner.distance} km away)
                  </Typography>
                  <Rating value={partner.rating} precision={0.1} size="small" readOnly />
                </TableCell>
                <TableCell>
                  <Chip
                    label={partner.partnerSchedule || "Not Scheduled"}
                    size="small"
                    color={partner.partnerSchedule ? "success" : "default"}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<Message />}
                      onClick={() => handleConnect(partner)}
                    >
                      Connect
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<RequestPage />}
                    >
                      View Profile
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Chat Dialog */}
      <Dialog open={chatDialog} onClose={() => setChatDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Connect with {selectedPartner?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Send a message to start a conversation
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Hi, I'm interested in discussing potential business opportunities..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChatDialog(false)}>Cancel</Button>
          <Button onClick={handleSendMessage} variant="contained">
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}