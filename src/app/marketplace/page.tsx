'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Chip,
  Avatar,
  Rating,
  Paper,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn,
  Business,
  Verified,
  TrendingUp,
  FilterList,
  ArrowBack
} from '@mui/icons-material';

export default function Marketplace() {
  const router = useRouter();
  const [marketplaceData, setMarketplaceData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [minRating, setMinRating] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMarketplaceData();
  }, []);

  const fetchMarketplaceData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedSector) params.append('sector', selectedSector);
      if (minRating) params.append('rating', minRating);

      const response = await fetch(`/api/marketplace?${params}`);
      const data = await response.json();
      setMarketplaceData(data);
    } catch (error) {
      console.error('Failed to fetch marketplace data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchMarketplaceData();
  };

  const handleConnect = (companyId: number) => {
    alert(`Connection request sent to company ${companyId}`);
  };

  const sectors = ['Manufacturing', 'Trading', 'Agriculture', 'Construction', 'Technology'];

  if (!marketplaceData) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => router.push('/')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            B2B Marketplace
          </Typography>
          <Button color="inherit" onClick={() => router.push('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => router.push('/dashboard')}>
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" gutterBottom>
            Global B2B Marketplace
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Connect with verified businesses worldwide
          </Typography>
        </Box>

        {/* Search and Filters */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search companies or products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Sector</InputLabel>
                <Select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  label="Sector"
                >
                  <MenuItem value="">All</MenuItem>
                  {sectors.map((sector) => (
                    <MenuItem key={sector} value={sector}>
                      {sector}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Min Rating</InputLabel>
                <Select
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  label="Min Rating"
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="4.0">4.0+</MenuItem>
                  <MenuItem value="4.5">4.5+</MenuItem>
                  <MenuItem value="4.8">4.8+</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSearch}
                disabled={loading}
                sx={{ height: 56 }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Featured Companies Table */}
        <Typography variant="h5" gutterBottom>
          Trusted Companies
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Location & Rating</TableCell>
                <TableCell>Schedule with Partner</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marketplaceData.companies?.slice(0, 6).map((company: any) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        {company.name[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" noWrap>
                          {company.name}
                          {company.verified && (
                            <Verified color="primary" sx={{ ml: 1, fontSize: 20 }} />
                          )}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {company.sector}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                          {company.products.slice(0, 2).map((product: string) => (
                            <Chip key={product} label={product} size="small" />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <LocationOn sx={{ mr: 1, fontSize: 16 }} />
                      {company.location}
                    </Typography>
                    <Rating value={company.rating} precision={0.1} size="small" readOnly />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={company.partnerSchedule || "Not Scheduled"}
                      size="small"
                      color={company.partnerSchedule ? "success" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleConnect(company.id)}
                      size="small"
                    >
                      Connect
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Latest Business Needs */}
        <Typography variant="h5" gutterBottom>
          Latest Business Needs
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {marketplaceData.latestNeeds?.map((need: any) => (
            <Grid item xs={12} md={6} key={need.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Chip
                      label={need.type.toUpperCase()}
                      color={need.type === 'buy' ? 'primary' : need.type === 'sell' ? 'success' : 'warning'}
                      size="small"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {need.postedDate}
                    </Typography>
                  </Box>

                  <Typography variant="h6" gutterBottom>
                    {need.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Company: {need.company}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Quantity: {need.quantity}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Location: {need.location}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={need.status}
                      color="success"
                      size="small"
                    />
                    <Button size="small" variant="outlined">
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Featured Products */}
        <Typography variant="h5" gutterBottom>
          Featured Products
        </Typography>
        <Grid container spacing={3}>
          {marketplaceData.featuredProducts?.map((product: any) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    backgroundColor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    {product.name}
                  </Typography>
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    By: {product.company}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    HS Code: {product.hsCode}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Box>
                      <Typography variant="h6" color="primary">
                        {product.price}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        MOQ: {product.moq}
                      </Typography>
                    </Box>
                    <Button variant="outlined" size="small">
                      Inquire
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}