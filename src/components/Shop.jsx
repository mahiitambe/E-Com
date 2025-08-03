import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Chip,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  Stack
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  ShoppingBag as ShoppingBagIcon
} from '@mui/icons-material';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

const Shop = ({ products, loading, addToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get URL parameters
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';

  useEffect(() => {
    setSearchTerm(searchQuery);
    setSelectedCategory(categoryQuery);
  }, [searchQuery, categoryQuery]);

  useEffect(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    setSearchParams(params);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (category) params.set('category', category);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSearchParams({});
  };

  const categories = [
    { name: "men's clothing", label: "Men's Clothing", icon: "👔" },
    { name: "women's clothing", label: "Women's Clothing", icon: "👗" },
    { name: "jewelery", label: "Jewelry", icon: "💍" },
    { name: "electronics", label: "Electronics", icon: "📱" }
  ];

  if (loading) {
    return (
      <Box sx={{ py: 4 }}>
        <LoadingSpinner message="Loading products..." />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Shop Products
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover amazing products at great prices
        </Typography>
      </Box>

      {/* Search and Filter Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack spacing={3}>
          {/* Search Form */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
          >
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{ minWidth: 120 }}
            >
              Search
            </Button>
          </Box>

          {/* Category Filters */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip
                label="All Categories"
                onClick={() => handleCategoryChange('')}
                color={!selectedCategory ? 'primary' : 'default'}
                variant={!selectedCategory ? 'filled' : 'outlined'}
                clickable
              />
              {categories.map((category) => (
                <Chip
                  key={category.name}
                  label={`${category.icon} ${category.label}`}
                  onClick={() => handleCategoryChange(category.name)}
                  color={selectedCategory === category.name ? 'primary' : 'default'}
                  variant={selectedCategory === category.name ? 'filled' : 'outlined'}
                  clickable
                />
              ))}
            </Box>
          </Box>

          {/* Clear Filters */}
          {(searchTerm || selectedCategory) && (
            <Button
              onClick={clearFilters}
              startIcon={<ClearIcon />}
              variant="outlined"
              sx={{ alignSelf: 'flex-start' }}
            >
              Clear Filters
            </Button>
          )}
        </Stack>
      </Paper>

      {/* Results Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Showing {filteredProducts.length} of {products.length} products
          {searchTerm && ` for "${searchTerm}"`}
          {selectedCategory && ` in ${selectedCategory}`}
        </Typography>
      </Box>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard
                product={product}
                addToCart={addToCart}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Box sx={{ mb: 3 }}>
            <ShoppingBagIcon sx={{ fontSize: 64, color: 'text.secondary' }} />
          </Box>
          <Typography variant="h5" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {searchTerm || selectedCategory
              ? `No products match your search criteria. Try adjusting your filters.`
              : 'No products available at the moment.'}
          </Typography>
          {(searchTerm || selectedCategory) && (
            <Button
              onClick={clearFilters}
              variant="contained"
              startIcon={<ClearIcon />}
            >
              Clear Filters
            </Button>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default Shop; 