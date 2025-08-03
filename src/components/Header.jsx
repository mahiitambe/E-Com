import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Store as StoreIcon
} from '@mui/icons-material';

const Header = ({ cartItemCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleHomeClick = () => {
    window.location.reload();
  };

  const handleCategoryMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategoryMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const categories = [
    { name: "men's clothing", label: "Men's Clothing", path: "/shop?category=men's%20clothing" },
    { name: "women's clothing", label: "Women's Clothing", path: "/shop?category=women's%20clothing" },
    { name: "jewelery", label: "Jewelry", path: "/shop?category=jewelery" },
    { name: "electronics", label: "Electronics", path: "/shop?category=electronics" }
  ];

  return (
    <AppBar position="sticky" elevation={2} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h4"
              component={Link}
              to="/"
              onClick={handleHomeClick}
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
                fontWeight: 700,
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.dark',
                }
              }}
            >
              Snap@Shop
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                component={Link}
                to="/"
                onClick={handleHomeClick}
                startIcon={<HomeIcon />}
                sx={{ color: 'text.primary' }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/shop"
                startIcon={<StoreIcon />}
                sx={{ color: 'text.primary' }}
              >
                Shop
              </Button>
              <Button
                onClick={handleCategoryMenuOpen}
                sx={{ color: 'text.primary' }}
              >
                Categories
              </Button>
            </Box>
          )}

          {/* Search Bar */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: isMobile ? 1 : 0,
              mx: isMobile ? 2 : 0,
              minWidth: isMobile ? 'auto' : 300
            }}
          >
            <TextField
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'background.paper',
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" size="small">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Cart Icon */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              component={Link}
              to="/cart"
              sx={{ color: 'text.primary' }}
            >
              <Badge badgeContent={cartItemCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                onClick={handleMobileMenuOpen}
                sx={{ ml: 1, color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Category Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCategoryMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
          }
        }}
      >
        {categories.map((category) => (
          <MenuItem
            key={category.name}
            component={Link}
            to={category.path}
            onClick={handleCategoryMenuClose}
          >
            {category.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
          }
        }}
      >
        <MenuItem
          component={Link}
          to="/"
          onClick={() => {
            handleMobileMenuClose();
            handleHomeClick();
          }}
        >
          <HomeIcon sx={{ mr: 2 }} />
          Home
        </MenuItem>
        <MenuItem
          component={Link}
          to="/shop"
          onClick={handleMobileMenuClose}
        >
          <StoreIcon sx={{ mr: 2 }} />
          Shop
        </MenuItem>
        {categories.map((category) => (
          <MenuItem
            key={category.name}
            component={Link}
            to={category.path}
            onClick={handleMobileMenuClose}
          >
            {category.label}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
};

export default Header; 