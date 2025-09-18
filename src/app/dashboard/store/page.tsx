'use client';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  TrendingUp,
  Upload as UploadIcon,
  Visibility as ViewIcon
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
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography
} from '@mui/material';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function StoreManagement() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [tabValue, setTabValue] = useState(0);
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [companyForm, setCompanyForm] = useState({
    companyName: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: ''
  });

  const [productForm, setProductForm] = useState({
    name: '',
    sku: '',
    moq: '',
    price: '',
    unit: '',
    description: '',
    category: '',
    hsCode: ''
  });

  const [policyForm, setPolicyForm] = useState({
    payment: [] as string[],
    shipping: '',
    warranty: '',
    returns: ''
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      router.push('/');
      return;
    }
    setUser(JSON.parse(savedUser));
    fetchStoreData();
  }, [router]);

  const fetchStoreData = async () => {
    try {
      const response = await fetch('/api/store');
      const data = await response.json();
      setStoreData(data);
      setCompanyForm({
        companyName: data.companyName || '',
        description: data.description || '',
        address: data.address || '',
        phone: data.phone || '',
        email: data.email || '',
        website: data.website || ''
      });
      setPolicyForm(data.policy || {
        payment: [],
        shipping: '',
        warranty: '',
        returns: ''
      });
    } catch (error) {
      console.error('Failed to fetch store data:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCompanyUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/store', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyForm)
      });

      if (response.ok) {
        fetchStoreData();
        alert('Company information updated successfully');
      }
    } catch (error) {
      alert('Failed to update company information');
    } finally {
      setLoading(false);
    }
  };

  const handlePolicyUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/store', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ policy: policyForm })
      });

      if (response.ok) {
        fetchStoreData();
        alert('Policy updated successfully');
      }
    } catch (error) {
      alert('Failed to update policy');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async () => {
    setLoading(true);
    try {
      const isEditing = editingProduct !== null;
      const method = isEditing ? 'PUT' : 'POST';
      const body = isEditing
        ? { ...productForm, id: editingProduct.id }
        : productForm;

      const response = await fetch('/api/store/product', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setProductDialog(false);
        setEditingProduct(null);
        setProductForm({
          name: '',
          sku: '',
          moq: '',
          price: '',
          unit: '',
          description: '',
          category: '',
          hsCode: ''
        });
        fetchStoreData();
        alert(`Product ${isEditing ? 'updated' : 'created'} successfully`);
      }
    } catch (error) {
      alert(`Failed to ${editingProduct ? 'update' : 'create'} product`);
    } finally {
      setLoading(false);
    }
  };

  const handleProductEdit = (product: any) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      sku: product.sku,
      moq: product.moq.toString(),
      price: product.price.toString(),
      unit: product.unit,
      description: product.description,
      category: product.category,
      hsCode: product.hsCode
    });
    setProductDialog(true);
  };

  const handleProductDelete = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/store/product?id=${productId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchStoreData();
        alert('Product deleted successfully');
      }
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  if (!user || !storeData) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Store Management
      </Typography>

      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Company Info" />
          <Tab label="Media" />
          <Tab label="Products" />
          <Tab label="Policy" />
          <Tab label="Confirmation" />
          <Tab label="Statistics" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', py: 3 }}>
            <Box sx={{ width: '100%', maxWidth: '600px', px: 2 }}>
              <TextField
                fullWidth
                label="Company Name"
                value={companyForm.companyName}
                onChange={(e) => setCompanyForm({...companyForm, companyName: e.target.value})}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={companyForm.description}
                onChange={(e) => setCompanyForm({...companyForm, description: e.target.value})}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Address"
                value={companyForm.address}
                onChange={(e) => setCompanyForm({...companyForm, address: e.target.value})}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone"
                value={companyForm.phone}
                onChange={(e) => setCompanyForm({...companyForm, phone: e.target.value})}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={companyForm.email}
                onChange={(e) => setCompanyForm({...companyForm, email: e.target.value})}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Website"
                value={companyForm.website}
                onChange={(e) => setCompanyForm({...companyForm, website: e.target.value})}
                margin="normal"
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={handleCompanyUpdate}
                  disabled={loading}
                  size="large"
                >
                  Update Company Info
                </Button>
              </Box>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', py: 3 }}>
            <Box sx={{ width: '100%', maxWidth: '800px', px: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Company Logo
                      </Typography>
                      <Box sx={{ textAlign: 'center', p: 4, border: '2px dashed #ccc', borderRadius: 2 }}>
                        <UploadIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Upload company logo (JPG, PNG, max 2MB)
                        </Typography>
                        <Button variant="outlined" size="large">
                          Choose File
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Product Images
                      </Typography>
                      <Box sx={{ textAlign: 'center', p: 4, border: '2px dashed #ccc', borderRadius: 2 }}>
                        <UploadIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Upload product images (Multiple files allowed)
                        </Typography>
                        <Button variant="outlined" size="large">
                          Choose Files
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Products</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setProductDialog(true)}
            >
              Add Product
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Time Schedule with Partner</TableCell>
                  <TableCell>MOQ</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Views</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {storeData.products?.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>
                      <Chip
                        label={product.partnerSchedule || "Not Scheduled"}
                        size="small"
                        color={product.partnerSchedule ? "success" : "default"}
                      />
                    </TableCell>
                    <TableCell>{product.moq} {product.unit}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      <Chip
                        icon={<ViewIcon />}
                        label={product.views}
                        size="small"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleProductEdit(product)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleProductDelete(product.id)}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', py: 3 }}>
            <Box sx={{ width: '100%', maxWidth: '600px', px: 2 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Payment Methods</InputLabel>
                <Select
                  multiple
                  value={policyForm.payment}
                  onChange={(e) => setPolicyForm({...policyForm, payment: e.target.value as string[]})}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="Letter of Credit">Letter of Credit</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="Trade Finance">Trade Finance</MenuItem>
                  <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Shipping Policy"
                multiline
                rows={4}
                value={policyForm.shipping}
                onChange={(e) => setPolicyForm({...policyForm, shipping: e.target.value})}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Warranty Policy"
                value={policyForm.warranty}
                onChange={(e) => setPolicyForm({...policyForm, warranty: e.target.value})}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Returns Policy"
                multiline
                rows={4}
                value={policyForm.returns}
                onChange={(e) => setPolicyForm({...policyForm, returns: e.target.value})}
                margin="normal"
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={handlePolicyUpdate}
                  disabled={loading}
                  size="large"
                >
                  Update Policy
                </Button>
              </Box>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Alert severity="info" sx={{ mb: 3 }}>
            Review your store information before publishing. Make sure all required fields are completed.
          </Alert>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Store Checklist</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip
                      label="Company Info"
                      color={companyForm.companyName ? "success" : "default"}
                    />
                    <Chip
                      label="Products Added"
                      color={storeData.products?.length > 0 ? "success" : "default"}
                    />
                    <Chip
                      label="Payment Policy"
                      color={policyForm.payment?.length > 0 ? "success" : "default"}
                    />
                    <Chip
                      label="Shipping Policy"
                      color={policyForm.shipping ? "success" : "default"}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Publish Store</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Once published, your store will be visible to potential partners
                  </Typography>
                  <Button variant="contained" color="primary" size="large">
                    Publish Store
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h4" color="primary">
                        {storeData.statistics?.totalViews || 0}
                      </Typography>
                      <Typography color="text.secondary">
                        Total Views
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ViewIcon color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h4" color="primary">
                        {storeData.statistics?.monthlyViews || 0}
                      </Typography>
                      <Typography color="text.secondary">
                        This Month
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AddIcon color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h4" color="primary">
                        {storeData.statistics?.inquiries || 0}
                      </Typography>
                      <Typography color="text.secondary">
                        Inquiries
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Top Products</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Views</TableCell>
                        <TableCell>Time Schedule with Partner</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {storeData.statistics?.topProducts?.map((product: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.views}</TableCell>
                          <TableCell>
                            <Chip
                              label={product.partnerSchedule || "Not Scheduled"}
                              color={product.partnerSchedule ? "success" : "default"}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Product Dialog */}
      <Dialog open={productDialog} onClose={() => setProductDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <TextField
              fullWidth
              label="Product Name"
              value={productForm.name}
              onChange={(e) => setProductForm({...productForm, name: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="SKU"
              value={productForm.sku}
              onChange={(e) => setProductForm({...productForm, sku: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Category"
              value={productForm.category}
              onChange={(e) => setProductForm({...productForm, category: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="HS Code"
              value={productForm.hsCode}
              onChange={(e) => setProductForm({...productForm, hsCode: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Unit"
              value={productForm.unit}
              onChange={(e) => setProductForm({...productForm, unit: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="MOQ"
              type="number"
              value={productForm.moq}
              onChange={(e) => setProductForm({...productForm, moq: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={productForm.price}
              onChange={(e) => setProductForm({...productForm, price: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={productForm.description}
              onChange={(e) => setProductForm({...productForm, description: e.target.value})}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setProductDialog(false)} size="large">
            Cancel
          </Button>
          <Button
            onClick={handleProductSubmit}
            variant="contained"
            disabled={loading}
            size="large"
          >
            {editingProduct ? 'Update' : 'Add'} Product
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}