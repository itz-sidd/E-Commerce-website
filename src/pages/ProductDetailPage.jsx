import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    
    if (foundProduct) {
      // Get related products from the same category
      const related = products.filter(p => 
        p.category === foundProduct.category && p.id !== foundProduct.id
      ).slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link to="/" className="text-gray-500 hover:text-primary-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-primary-600">
                Products
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image Gallery */}
          <div className="flex flex-col">
            {/* Main Image */}
            <div className="aspect-w-1 aspect-h-1 w-full relative">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-800" />
                  </button>
                </>
              )}
              
              {/* Stock Badge */}
              {product.stock < 10 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded">
                  Only {product.stock} left!
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="mt-4 flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index
                        ? 'border-primary-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="ml-3 text-sm text-gray-600">({product.rating} out of 5 stars)</p>
            </div>

            {/* Price */}
            <div className="mt-4">
              <p className="text-3xl font-bold text-primary-600">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            {product.features && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Features</h3>
                <ul className="mt-2 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Quantity</h3>
                <p className="text-sm text-gray-600">
                  {product.stock} available
                </p>
              </div>
              
              <div className="mt-2 flex items-center space-x-3">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <span className="w-12 text-center font-medium text-lg">
                  {quantity}
                </span>
                
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-8 flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-primary text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-gray-300 hover:border-gray-400 text-gray-400 hover:text-gray-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              
              <button className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center text-gray-400 hover:text-gray-500 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 border-t pt-8">
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stock:</span>
                  <span className="font-medium">{product.stock} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="font-medium">SK{product.id.toString().padStart(4, '0')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="card group hover:shadow-lg transition-shadow duration-200">
                  <div className="aspect-w-1 aspect-h-1 relative overflow-hidden">
                    <Link to={`/products/${relatedProduct.id}`}>
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </Link>
                  </div>
                  
                  <div className="p-4">
                    <Link to={`/products/${relatedProduct.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(relatedProduct.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({relatedProduct.rating})</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary-600">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => addToCart(relatedProduct)}
                        className="btn-primary text-sm py-2 px-4"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
