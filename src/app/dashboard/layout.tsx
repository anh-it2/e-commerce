'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Divider,
  Breadcrumbs,
  Link,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Store as StoreIcon,
  PostAdd as PostAddIcon,
  People as PeopleIcon,
  AccountBalance as FinanceIcon,
  Business as BusinessIcon,
  NavigateNext as NavigateNextIcon,
  Home as HomeIcon,
  Storefront as StorefrontIcon
} from '@mui/icons-material';

const drawerWidth = 280;

interface User {
  userID: string;
  companyCode: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      router.push('/');
      return;
    }
    setUser(JSON.parse(savedUser));
  }, [router]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { id: 'company', label: 'Company Info', icon: <BusinessIcon />, path: '/dashboard/company' },
    { id: 'store', label: 'Store Management', icon: <StoreIcon />, path: '/dashboard/store' },
    { id: 'needs', label: 'Post Business Need', icon: <PostAddIcon />, path: '/dashboard/needs' },
    { id: 'partners', label: 'Find Partners', icon: <PeopleIcon />, path: '/dashboard/partners' },
    { id: 'finance', label: 'Financial Services', icon: <FinanceIcon />, path: '/dashboard/finance' },
    { id: 'public-marketplace', label: 'Gian hàng công khai', icon: <StorefrontIcon />, path: '/dashboard/gian-hang-cong-khai' },
  ];

  const handleMenuClick = (path: string) => {
    if (path !== pathname) {
      router.push(path);
    }
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const getBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Home', href: '/', icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> }
    ];

    if (pathSegments.length > 0) {
      breadcrumbs.push({ label: 'Dashboard', href: '/dashboard' });

      if (pathSegments.length > 1) {
        const currentPage = pathSegments[1];
        const menuItem = menuItems.find(item => item.path.includes(currentPage));
        if (menuItem) {
          breadcrumbs.push({ label: menuItem.label, href: pathname });
        }
      }
    }

    return breadcrumbs;
  };

  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === pathname);
    return currentItem ? currentItem.label : 'Dashboard';
  };

  const drawer = (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap component="div" color="primary" fontWeight="bold">
          B2B Platform
        </Typography>
        {user && (
          <Box sx={{ mt: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
              {user.userID?.[0]?.toUpperCase()}
            </Avatar>
            <Typography variant="body2" fontWeight="bold">
              {user.userID}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.companyCode}
            </Typography>
            {user.userID === 'demo_admin' && (
              <Chip label="Admin" size="small" color="secondary" sx={{ mt: 1 }} />
            )}
          </Box>
        )}
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.id}
            onClick={() => handleMenuClick(item.path)}
            sx={{
              cursor: 'pointer',
              backgroundColor: pathname === item.path ? 'action.selected' : 'transparent',
              '&:hover': { backgroundColor: 'action.hover' },
              borderRight: pathname === item.path ? 3 : 0,
              borderColor: 'primary.main'
            }}
          >
            <ListItemIcon sx={{ color: pathname === item.path ? 'primary.main' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{ color: pathname === item.path ? 'primary.main' : 'inherit' }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" noWrap component="div">
              {getPageTitle()}
            </Typography>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}
            >
              {getBreadcrumbs().map((crumb, index) => (
                <Link
                  key={index}
                  color="inherit"
                  href={crumb.href}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(crumb.href);
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  {crumb.icon}
                  {crumb.label}
                </Link>
              ))}
            </Breadcrumbs>
          </Box>

          <IconButton color="inherit" onClick={() => router.push('/marketplace')}>
            <BusinessIcon />
          </IconButton>
          <Typography variant="body2" sx={{ mx: 1 }}>
            Marketplace
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <Typography variant="body2">
              Logout
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8
        }}
      >
        {children}
      </Box>
    </Box>
  );
}