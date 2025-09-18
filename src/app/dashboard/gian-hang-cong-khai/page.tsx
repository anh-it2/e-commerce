'use client';
import {
  Business,
  ExpandMore,
  Favorite,
  FavoriteBorder,
  FilterList as FilterIcon,
  HandshakeOutlined,
  LocalShipping,
  LocationOn,
  Refresh,
  Search as SearchIcon,
  Share,
  Star,
  Storefront,
  Support,
  TrendingUp,
  Verified
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  hsCode: string;
  company: string;
  companyLogo?: string;
  price: string;
  unit: string;
  moq: string;
  description: string;
  category: string;
  location: string;
  rating: number;
  verified: boolean;
  inStock: boolean;
  images: string[];
  specifications: Record<string, string>;
}

interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  rating: number;
  verified: boolean;
  specialties: string[];
  description: string;
  employees: string;
  establishedYear: string;
}

interface Field {
  id: string;
  name: string;
  icon: string;
  description: string;
  trending: boolean;
  productCount: number;
}

interface SpecialService {
  id: string;
  title: string;
  provider: string;
  description: string;
  type: 'logistics' | 'finance' | 'consulting' | 'quality';
  price: string;
  rating: number;
  features: string[];
}

interface PublicMarketplaceData {
  products: Product[];
  companies: Company[];
  recommendedFields: Field[];
  specialServices: SpecialService[];
  totalProducts: number;
  totalCompanies: number;
}

export default function PublicMarketplace() {
  const [data, setData] = useState<PublicMarketplaceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hsCodeFilter, setHsCodeFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [partnerRequestDialog, setPartnerRequestDialog] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Filter options
  const hsCodeOptions = [
    '7208.10.00 - Steel Coil',
    '7213.10.00 - Steel Bars',
    '7606.11.00 - Aluminum Sheets',
    '1006.30.00 - Jasmine Rice',
    '0901.21.00 - Coffee',
    '2523.29.00 - Cement'
  ];

  const categoryOptions = [
    'Steel & Metal',
    'Agriculture',
    'Food & Beverage',
    'Construction',
    'Electronics',
    'Textiles',
    'Chemicals'
  ];

  const locationOptions = [
    'Ho Chi Minh City',
    'Hanoi',
    'Da Nang',
    'Hai Phong',
    'Can Tho',
    'Dong Nai',
    'Binh Duong'
  ];

  useEffect(() => {
    fetchMarketplaceData();
  }, []);

  const fetchMarketplaceData = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual endpoint
      const mockData: PublicMarketplaceData = {
        products: [
          {
            id: '1',
            name: 'Premium Steel Coil',
            hsCode: '7208.10.00',
            company: 'VietSteel Corporation',
            price: '$650',
            unit: 'per ton',
            moq: '10 tons',
            description: 'High-quality steel coil for construction and manufacturing',
            category: 'Steel & Metal',
            location: 'Ho Chi Minh City',
            rating: 4.8,
            verified: true,
            inStock: true,
            images: ['/placeholder-steel.jpg'],
            specifications: {
              'Thickness': '2-10mm',
              'Width': '1000-2000mm',
              'Grade': 'Q235, Q345'
            }
          },
          {
            id: '2',
            name: 'Organic Jasmine Rice',
            hsCode: '1006.30.00',
            company: 'Mekong Rice Export',
            price: '$580',
            unit: 'per ton',
            moq: '5 tons',
            description: 'Premium organic jasmine rice from Mekong Delta',
            category: 'Agriculture',
            location: 'Can Tho',
            rating: 4.9,
            verified: true,
            inStock: true,
            images: ['/placeholder-rice.jpg'],
            specifications: {
              'Origin': 'Mekong Delta',
              'Moisture': '14% max',
              'Broken': '5% max'
            }
          },
          {
            id: '3',
            name: 'Aluminum Sheets',
            hsCode: '7606.11.00',
            company: 'Saigon Aluminum',
            price: '$1,850',
            unit: 'per ton',
            moq: '2 tons',
            description: 'Industrial grade aluminum sheets for various applications',
            category: 'Steel & Metal',
            location: 'Dong Nai',
            rating: 4.7,
            verified: true,
            inStock: true,
            images: ['/placeholder-aluminum.jpg'],
            specifications: {
              'Alloy': '1060, 3003, 5052',
              'Thickness': '0.5-8mm',
              'Temper': 'O, H14, H24'
            }
          }
        ],
        companies: [
          {
            id: '1',
            name: 'VietSteel Corporation',
            industry: 'Steel Manufacturing',
            location: 'Ho Chi Minh City',
            rating: 4.8,
            verified: true,
            specialties: ['Steel Production', 'Metal Processing', 'Construction Materials'],
            description: 'Leading steel manufacturer in Vietnam with 20+ years experience',
            employees: '500-1000',
            establishedYear: '2003'
          },
          {
            id: '2',
            name: 'Mekong Rice Export',
            industry: 'Agriculture',
            location: 'Can Tho',
            rating: 4.9,
            verified: true,
            specialties: ['Rice Production', 'Organic Farming', 'Export Services'],
            description: 'Premium rice exporter specializing in organic products',
            employees: '100-500',
            establishedYear: '1998'
          },
          {
            id: '3',
            name: 'Saigon Tech Solutions',
            industry: 'Technology',
            location: 'Ho Chi Minh City',
            rating: 4.7,
            verified: true,
            specialties: ['Software Development', 'IoT Solutions', 'Digital Transformation'],
            description: 'Innovative technology company providing digital solutions',
            employees: '200-500',
            establishedYear: '2010'
          },
          {
            id: '4',
            name: 'Green Energy Vietnam',
            industry: 'Renewable Energy',
            location: 'Da Nang',
            rating: 4.6,
            verified: true,
            specialties: ['Solar Power', 'Wind Energy', 'Energy Storage'],
            description: 'Leading renewable energy solutions provider',
            employees: '150-300',
            establishedYear: '2015'
          },
          {
            id: '5',
            name: 'Pacific Textiles',
            industry: 'Textile & Garment',
            location: 'Hai Phong',
            rating: 4.5,
            verified: false,
            specialties: ['Garment Manufacturing', 'Fabric Production', 'Fashion Design'],
            description: 'Quality textile manufacturer serving global markets',
            employees: '1000+',
            establishedYear: '2001'
          },
          {
            id: '6',
            name: 'Vietnam Food Co',
            industry: 'Food Processing',
            location: 'Dong Nai',
            rating: 4.8,
            verified: true,
            specialties: ['Food Processing', 'Packaging', 'Quality Control'],
            description: 'Premium food processing company with international standards',
            employees: '300-500',
            establishedYear: '2005'
          },
          {
            id: '7',
            name: 'Delta Logistics',
            industry: 'Transportation & Logistics',
            location: 'Ho Chi Minh City',
            rating: 4.4,
            verified: true,
            specialties: ['International Shipping', 'Warehousing', 'Supply Chain'],
            description: 'Comprehensive logistics solutions for import and export',
            employees: '500-1000',
            establishedYear: '2008'
          },
          {
            id: '8',
            name: 'Hanoi Chemical Industries',
            industry: 'Chemicals & Petrochemicals',
            location: 'Hanoi',
            rating: 4.3,
            verified: false,
            specialties: ['Industrial Chemicals', 'Petrochemicals', 'Research & Development'],
            description: 'Leading chemical manufacturer with advanced production facilities',
            employees: '800+',
            establishedYear: '1995'
          },
          {
            id: '9',
            name: 'Smart Electronics Vietnam',
            industry: 'Electronics & Technology',
            location: 'Binh Duong',
            rating: 4.7,
            verified: true,
            specialties: ['Consumer Electronics', 'IoT Devices', 'Smart Home'],
            description: 'Innovative electronics manufacturer for global markets',
            employees: '300-500',
            establishedYear: '2012'
          },
          {
            id: '10',
            name: 'Eco Construction Group',
            industry: 'Construction & Building Materials',
            location: 'Da Nang',
            rating: 4.5,
            verified: true,
            specialties: ['Green Building', 'Sustainable Materials', 'Project Management'],
            description: 'Sustainable construction solutions and eco-friendly materials',
            employees: '200-500',
            establishedYear: '2009'
          },
          {
            id: '11',
            name: 'Vietnam Seafood Export',
            industry: 'Seafood & Aquaculture',
            location: 'Can Tho',
            rating: 4.9,
            verified: true,
            specialties: ['Seafood Processing', 'Aquaculture', 'Export Services'],
            description: 'Premium seafood processing and export with global reach',
            employees: '400-800',
            establishedYear: '2000'
          },
          {
            id: '12',
            name: 'Renewable Power Solutions',
            industry: 'Renewable Energy',
            location: 'Hai Phong',
            rating: 4.6,
            verified: true,
            specialties: ['Solar Installation', 'Wind Power', 'Energy Consulting'],
            description: 'Complete renewable energy solutions and consulting services',
            employees: '100-300',
            establishedYear: '2016'
          }
        ],
        recommendedFields: [
          {
            id: '1',
            name: 'Steel & Metallurgy',
            icon: '🏭',
            description: 'Growing demand for construction and infrastructure',
            trending: true,
            productCount: 1250
          },
          {
            id: '2',
            name: 'Organic Agriculture',
            icon: '🌾',
            description: 'Sustainable farming and export opportunities',
            trending: true,
            productCount: 890
          },
          {
            id: '3',
            name: 'Electronics Manufacturing',
            icon: '📱',
            description: 'High-tech components and assembly services',
            trending: false,
            productCount: 670
          },
          {
            id: '4',
            name: 'Renewable Energy',
            icon: '⚡',
            description: 'Solar, wind and sustainable energy solutions',
            trending: true,
            productCount: 520
          },
          {
            id: '5',
            name: 'Textile & Garment',
            icon: '👕',
            description: 'Fashion and textile manufacturing',
            trending: false,
            productCount: 780
          },
          {
            id: '6',
            name: 'Food Processing',
            icon: '🍽️',
            description: 'Food production and packaging',
            trending: true,
            productCount: 950
          }
        ],
        specialServices: [
          {
            id: '1',
            title: 'Express Logistics',
            provider: 'VietShip Logistics',
            description: 'Fast and reliable shipping for B2B transactions',
            type: 'logistics',
            price: 'From $50',
            rating: 4.6,
            features: ['Door-to-door', 'Insurance included', 'Real-time tracking']
          },
          {
            id: '2',
            title: 'Trade Finance',
            provider: 'BusinessBank Vietnam',
            description: 'Flexible financing solutions for international trade',
            type: 'finance',
            price: 'From 0.8%',
            rating: 4.5,
            features: ['Letters of credit', 'Export financing', 'Currency hedging']
          },
          {
            id: '3',
            title: 'Quality Inspection',
            provider: 'CertifyVN',
            description: 'Professional quality control and certification services',
            type: 'quality',
            price: 'From $200',
            rating: 4.8,
            features: ['ISO certification', 'Lab testing', 'Factory audits']
          }
        ],
        totalProducts: 15420,
        totalCompanies: 4280
      };

      setData(mockData);
    } catch (error) {
      console.error('Failed to fetch marketplace data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = data?.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHsCode = !hsCodeFilter || product.hsCode.includes(hsCodeFilter.split(' - ')[0]);
    const matchesCompany = !companyFilter || product.company.toLowerCase().includes(companyFilter.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    const matchesLocation = !locationFilter || product.location === locationFilter;

    return matchesSearch && matchesHsCode && matchesCompany && matchesCategory && matchesLocation;
  }) || [];

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const handleRequestPartner = () => {
    setPartnerRequestDialog(true);
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'logistics': return <LocalShipping />;
      case 'finance': return <Business />;
      case 'consulting': return <Support />;
      case 'quality': return <Verified />;
      default: return <Star />;
    }
  };

  if (loading || !data) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          🏪 Gian hàng công khai
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Public Marketplace - Discover products, connect with companies, and grow your business
        </Typography>

        {/* Stats */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">{data.totalProducts.toLocaleString()}</Typography>
                <Typography variant="body2">Products</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="success.main">{data.totalCompanies.toLocaleString()}</Typography>
                <Typography variant="body2">Companies</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="info.main">{data.recommendedFields.length}</Typography>
                <Typography variant="body2">Trending Fields</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="warning.main">{data.specialServices.length}</Typography>
                <Typography variant="body2">Special Services</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Enhanced Filters */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 3
        }}
      >
        <Box sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 2,
          p: 3,
          backdropFilter: 'blur(10px)'
        }}>
          <Typography variant="h5" gutterBottom sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 3
          }}>
            <FilterIcon sx={{ mr: 1 }} />
            🔍 Bộ lọc tìm kiếm nâng cao (Advanced Search Filters)
          </Typography>

          {/* Main Search Row */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Tìm kiếm sản phẩm (Search Products)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'white',
                    fontSize: '1.1rem',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)'
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 6px 16px rgba(102, 126, 234, 0.25)'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '1.1rem'
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" sx={{ fontSize: '1.5rem' }} />
                    </InputAdornment>
                  )
                }}
                placeholder="Enter product name, description, keywords, HS code, company name..."
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Tên công ty (Company Name)"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'white',
                    fontSize: '1.1rem',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '1.1rem'
                  }
                }}
                placeholder="Company name..."
              />
            </Grid>
          </Grid>

          {/* Secondary Filter Row */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={hsCodeOptions}
                value={hsCodeFilter}
                onChange={(_, newValue) => setHsCodeFilter(newValue || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Mã HS (HS Code)"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'white',
                        fontSize: '1rem'
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '1rem'
                      }
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel sx={{ fontSize: '1rem' }}>Danh mục (Category)</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Danh mục (Category)"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: 'white',
                    fontSize: '1rem'
                  }}
                >
                  <MenuItem value="">Tất cả danh mục</MenuItem>
                  {categoryOptions.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel sx={{ fontSize: '1rem' }}>Khu vực (Location)</InputLabel>
                <Select
                  value={locationFilter}
                  label="Khu vực (Location)"
                  onChange={(e) => setLocationFilter(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: 'white',
                    fontSize: '1rem'
                  }}
                >
                  <MenuItem value="">Tất cả khu vực</MenuItem>
                  {locationOptions.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Refresh Button Row */}
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={fetchMarketplaceData}
                sx={{
                  height: '56px',
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                    transform: 'translateY(-2px)'
                  }
                }}
                startIcon={<Refresh />}
              >
                Làm mới
              </Button>
            </Grid>
          </Grid>

          {/* Result Counter */}
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              🎯 Tìm thấy <span style={{ color: '#667eea' }}>{filteredProducts.length}</span> sản phẩm
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Recommended Fields - Full Width Row */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom sx={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 3
        }}>
          <TrendingUp sx={{ mr: 1 }} />
          📈 Lĩnh vực được đề xuất (Recommended Fields)
        </Typography>

        <Grid container spacing={3}>
          {data.recommendedFields.map((field) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={field.id}>
              <Card sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
              }}>
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h2" sx={{ mb: 1, lineHeight: 1 }}>
                    {field.icon}
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.85rem', lineHeight: 1.2 }}>
                      {field.name}
                    </Typography>
                    {field.trending && (
                      <Chip
                        label="🔥 Hot"
                        color="error"
                        size="small"
                        sx={{ mt: 0.5, fontSize: '0.6rem', height: '18px' }}
                      />
                    )}
                  </Box>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>
                    {field.productCount.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                    sản phẩm
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Recommended Companies - Full Width Row */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom sx={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 3
        }}>
          <Business sx={{ mr: 1 }} />
          🏢 Công ty được đề xuất (Recommended Companies)
        </Typography>

        <Grid container spacing={2}>
          {data.companies.map((company) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={company.id}>
              <Card sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
              }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1.5 }}>
                    <Avatar sx={{
                      bgcolor: company.verified ? 'primary.main' : 'grey.500',
                      width: 40,
                      height: 40,
                      mb: 1
                    }}>
                      {company.name[0]}
                    </Avatar>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
                        <Typography variant="subtitle2" sx={{
                          fontWeight: 'bold',
                          fontSize: '0.8rem',
                          lineHeight: 1.2,
                          textAlign: 'center'
                        }}>
                          {company.name.length > 15 ? `${company.name.substring(0, 15)}...` : company.name}
                        </Typography>
                        {company.verified && (
                          <Verified color="primary" sx={{ ml: 0.5, fontSize: 14 }} />
                        )}
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                        {company.industry}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ textAlign: 'center', mb: 1 }}>
                    <Rating value={company.rating} precision={0.1} size="small" readOnly sx={{ fontSize: '0.9rem' }} />
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem' }}>
                      Since {company.establishedYear}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
                    {company.specialties.slice(0, 2).map((specialty) => (
                      <Chip
                        key={specialty}
                        label={specialty.length > 8 ? `${specialty.substring(0, 8)}...` : specialty}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.6rem', height: '20px' }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Button variant="outlined" size="small" sx={{ fontSize: '0.65rem', py: 0.3 }}>
                      Xem chi tiết
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleRequestPartner}
                      sx={{ fontSize: '0.65rem', py: 0.3 }}
                    >
                      Liên hệ
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          {/* Products Section */}
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Storefront sx={{ mr: 1 }} />
            Sản phẩm nổi bật ({filteredProducts.length} products)
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ height: '100%', position: 'relative' }}>
                  <Box sx={{ position: 'relative' }}>
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

                    <IconButton
                      sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'white' }}
                      onClick={() => toggleFavorite(product.id)}
                    >
                      {favorites.has(product.id) ?
                        <Favorite color="error" /> :
                        <FavoriteBorder />
                      }
                    </IconButton>

                    {product.verified && (
                      <Chip
                        icon={<Verified />}
                        label="Verified"
                        color="success"
                        size="small"
                        sx={{ position: 'absolute', top: 8, left: 8 }}
                      />
                    )}
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Business sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {product.company}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {product.location}
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      HS Code: {product.hsCode}
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {product.description}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" color="primary">
                          {product.price}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {product.unit}
                        </Typography>
                      </Box>
                      <Rating value={product.rating} precision={0.1} size="small" readOnly />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      MOQ: {product.moq}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        onClick={() => setSelectedProduct(product)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleRequestPartner}
                      >
                        <HandshakeOutlined />
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>

          {/* Special Services */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Dịch vụ đặc biệt
            </Typography>

            {data.specialServices.map((service) => (
              <Accordion key={service.id}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    {getServiceIcon(service.type)}
                    <Box sx={{ ml: 2, flexGrow: 1 }}>
                      <Typography variant="subtitle2">
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.provider}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2" color="primary">
                      {service.price}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {service.description}
                  </Typography>

                  <Rating value={service.rating} precision={0.1} size="small" readOnly sx={{ mb: 2 }} />

                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Features:</Typography>
                  <Box sx={{ ml: 2 }}>
                    {service.features.map((feature, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                        • {feature}
                      </Typography>
                    ))}
                  </Box>

                  <Button variant="contained" size="small" fullWidth sx={{ mt: 2 }}>
                    Request Service
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Product Detail Dialog */}
      <Dialog
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedProduct && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">
                  {selectedProduct.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating value={selectedProduct.rating} precision={0.1} size="small" readOnly />
                  {selectedProduct.verified && (
                    <Verified color="primary" sx={{ ml: 1 }} />
                  )}
                </Box>
              </Box>
            </DialogTitle>

            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{
                    height: 300,
                    backgroundColor: 'grey.200',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}>
                    <Typography variant="h6" color="text.secondary">
                      Product Image
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    {selectedProduct.price}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    {selectedProduct.unit}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Company:</strong> {selectedProduct.company}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Location:</strong> {selectedProduct.location}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>HS Code:</strong> {selectedProduct.hsCode}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Category:</strong> {selectedProduct.category}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>MOQ:</strong> {selectedProduct.moq}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedProduct.description}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Specifications
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableBody>
                        {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                          <TableRow key={key}>
                            <TableCell component="th" scope="row">
                              {key}
                            </TableCell>
                            <TableCell>{value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setSelectedProduct(null)}>
                Close
              </Button>
              <Button variant="outlined" startIcon={<Share />}>
                Share
              </Button>
              <Button
                variant="contained"
                startIcon={<HandshakeOutlined />}
                onClick={handleRequestPartner}
              >
                Request Partnership
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Partner Request Dialog */}
      <Dialog
        open={partnerRequestDialog}
        onClose={() => setPartnerRequestDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Request Partnership
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Send a partnership request to connect with this company.
          </Typography>

          <TextField
            fullWidth
            label="Your Company Name"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Contact Person"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            placeholder="Describe your business needs and partnership interests..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPartnerRequestDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              alert('Partnership request sent successfully!');
              setPartnerRequestDialog(false);
            }}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}