import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = ({ products, addToCart }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">⭐</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">⭐</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }

    return stars;
  };

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="not-found">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="back-btn">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-image-section">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
        </div>

        <div className="product-info-section">
          <div className="breadcrumb">
            <Link to="/shop">Shop</Link> / {product.category} / {product.title}
          </div>

          <h1 className="product-title">{product.title}</h1>

          <div className="product-category">
            Category: <span>{product.category}</span>
          </div>

          <div className="product-rating">
            <div className="stars">
              {renderStars(product.rating.rate)}
            </div>
            <span className="rating-text">
              {product.rating.rate} out of 5 ({product.rating.count} reviews)
            </span>
          </div>

          <div className="product-price">
            ${product.price.toFixed(2)}
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-actions">
            <button 
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              🛒 Add to Cart
            </button>
            <Link to="/shop" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>

          <div className="product-features">
            <div className="feature">
              <span className="feature-icon">🚚</span>
              <span>Free Shipping</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🔄</span>
              <span>Easy Returns</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🛡️</span>
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 