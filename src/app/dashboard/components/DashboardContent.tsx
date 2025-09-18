'use client';
import {
  CalendarToday,
  AccountBalance as FinanceIcon,
  People as PeopleIcon,
  PostAdd as PostAddIcon,
  Security,
  Store as StoreIcon,
  TrendingUp
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardContent() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  if (!dashboardData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography>Loading dashboard data...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Quick Stats */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PeopleIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {dashboardData.connections}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    New Connections
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PostAddIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {dashboardData.activeNeeds}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Active Needs
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Security color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {dashboardData.trustScore}%
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Trust Score
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StoreIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Chip
                    label={dashboardData.storeStatus}
                    color={dashboardData.storeStatus === 'complete' ? 'success' : 'warning'}
                    size="small"
                  />
                  <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
                    Store Status
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Store Status Alert */}
        {dashboardData.storeStatus === 'incomplete' && (
          <Grid item xs={12}>
            <Alert
              severity="warning"
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => router.push('/dashboard/store')}
                >
                  Complete Store
                </Button>
              }
            >
              Your store profile is incomplete. Complete it to start receiving business inquiries.
            </Alert>
          </Grid>
        )}

        {/* Main Content Grid */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<PostAddIcon />}
                  onClick={() => router.push('/dashboard/needs')}
                  sx={{ height: 56 }}
                >
                  Post Business Need
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<PeopleIcon />}
                  onClick={() => router.push('/dashboard/partners')}
                  sx={{ height: 56 }}
                >
                  Find Partners
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<StoreIcon />}
                  onClick={() => router.push('/dashboard/store')}
                  sx={{ height: 56 }}
                >
                  Manage Store
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FinanceIcon />}
                  onClick={() => router.push('/dashboard/finance')}
                  sx={{ height: 56 }}
                >
                  Financial Services
                </Button>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Activity</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Schedule with Partner</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData.recentActivities?.map((activity: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{activity.title || `Activity ${index + 1}`}</TableCell>
                      <TableCell>
                        <Chip
                          label={activity.status || "Active"}
                          color="primary"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={activity.partnerSchedule || "Not Scheduled"}
                          size="small"
                          color={activity.partnerSchedule ? "success" : "default"}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarToday sx={{ mr: 1 }} />
              Upcoming Events
            </Typography>
            {dashboardData.upcomingEvents?.map((event: string, index: number) => (
              <Box key={index} sx={{ mb: 1, p: 2, bgcolor: 'background.default', borderRadius: 1, borderLeft: 3, borderColor: 'primary.main' }}>
                <Typography variant="body2">
                  {event}
                </Typography>
              </Box>
            ))}
          </Paper>

          <Paper sx={{ p: 3 }} elevation={2}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ mr: 1 }} />
              Performance Metrics
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">Profile Views</Typography>
              <Typography variant="h6" color="primary">247 this month</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">Inquiry Response Rate</Typography>
              <Typography variant="h6" color="success.main">85%</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">Average Response Time</Typography>
              <Typography variant="h6" color="info.main">2.3 hours</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}