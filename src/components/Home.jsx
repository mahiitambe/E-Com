import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  Paper
} from '@mui/material';
import {
  LocalShipping as ShippingIcon,
  AttachMoney as MoneyIcon,
  Security as SecurityIcon,
  Star as StarIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

const Home = () => {
  const features = [
    {
      icon: <ShippingIcon sx={{ fontSize: 40 }} />,
      title: "Fast Delivery",
      description: "Get your products delivered quickly and safely"
    },
    {
      icon: <MoneyIcon sx={{ fontSize: 40 }} />,
      title: "Best Prices",
      description: "Competitive prices on all our products"
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: "Secure Shopping",
      description: "Safe and secure payment options"
    }
  ];

  const categories = [
    {
      name: "men's clothing",
      label: "Men's Clothing",
      icon: "👔",
      path: "/shop?category=men's%20clothing"
    },
    {
      name: "women's clothing",
      label: "Women's Clothing",
      icon: "👗",
      path: "/shop?category=women's%20clothing"
    },
    {
      name: "jewelery",
      label: "Jewelry",
      icon: "💍",
      path: "/shop?category=jewelery"
    },
    {
      name: "electronics",
      label: "Electronics",
      icon: "📱",
      path: "/shop?category=electronics"
    }
  ];

  return (
    <Box
      className="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
      }}
    >
      {/* Hero Section */}
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #757f9a 0%, #d7dde8 100%)', // Grey gradient
          color: 'white',
          py: { xs: 5, md: 8 },
          mb: { xs: 4, md: 6 },
          width: '100%',
          borderRadius: 0,
          boxShadow: 'none',
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '3rem' },
                  wordBreak: 'break-word',
                }}
              >
                SnapShop
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: '1.1rem', md: '1.5rem' },
                }}
              >
                Discover amazing products at unbeatable prices
              </Typography>
              <Button
                component={Link}
                to="/shop"
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                sx={{
                  backgroundColor: 'white',
                  color: 'success.main', // Use green from theme
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                  fontWeight: 600,
                }}
              >
                Shop Now
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: { xs: 4, md: 6 } }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.25rem' }, color: '#424242' }}>
            Why Choose SnapShop?
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  transition: 'transform 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f5f5f5', // light grey card
                  color: '#333',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ color: '#757575', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ mb: { xs: 4, md: 6 } }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.25rem' }, color: '#424242' }}>
            Shop by Category
          </Typography>
        </Box>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.name}>
              <Card
                component={Link}
                to={category.path}
                sx={{
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: '#333',
                  background: '#f5f5f5',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 25px rgba(117, 127, 154, 0.15)', // grey shadow
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ fontSize: '48px', mb: 2, color: '#757575' }}>
                    {category.icon}
                  </Box>
                  <Typography variant="h6" component="h3">
                    {category.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #ece9e6 0%, #d7dde8 100%)', // Light grey gradient
          py: { xs: 4, md: 6 },
          width: '100%',
          borderRadius: 0,
          boxShadow: 'none',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.25rem' }, color: '#424242' }}>
              Ready to Start Shopping?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Explore our wide range of products and find what you're looking for
            </Typography>
            <Button
              component={Link}
              to="/shop"
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              sx={{
                fontWeight: 600,
                background: 'linear-gradient(135deg, #757f9a 0%, #d7dde8 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #616161 0%, #bdbdbd 100%)',
                }
              }}
            >
              Browse Products
            </Button>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default Home;