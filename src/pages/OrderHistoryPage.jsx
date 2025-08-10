import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, Navigate } from 'react-router-dom';
import { Package, Eye, Download, ArrowLeft, CheckCircle, Clock, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const OrderHistoryPage = () => {
  const { user, orders, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const successOrderId = searchParams.get('success');

  useEffect(() => {
    if (successOrderId) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [successOrderId]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'Shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'Delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-green-900">Order Placed Successfully!</h3>
                <p className="text-green-700 mt-1">
                  Your order #{successOrderId} has been placed successfully. You will receive a confirmation email shortly.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link
              to="/profile"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Profile
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600 mt-2">View and track all your orders</p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="card p-8">
            <div className="text-center">
              <Package className="mx-auto h-16 w-16 text-gray-300 mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Link to="/products" className="btn-primary">
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="card overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Placed on {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ${order.payment.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-16 h-16 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                          <p className="text-gray-600">
                            {order.shipping.firstName} {order.shipping.lastName}<br />
                            {order.shipping.address}<br />
                            {order.shipping.apartment && `${order.shipping.apartment}<br />`}
                            {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}<br />
                            {order.shipping.country}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
                          <div className="space-y-1 text-gray-600">
                            <div className="flex justify-between">
                              <span>Subtotal:</span>
                              <span>${order.summary.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Shipping:</span>
                              <span>{order.summary.shipping === 0 ? 'Free' : `$${order.summary.shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax:</span>
                              <span>${order.summary.tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-medium text-gray-900 pt-1 border-t">
                              <span>Total:</span>
                              <span>${order.summary.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button className="btn-secondary flex items-center justify-center">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                    <button className="btn-secondary flex items-center justify-center">
                      <Download className="w-4 h-4 mr-2" />
                      Download Invoice
                    </button>
                    {order.status === 'Delivered' && (
                      <button className="btn-primary flex items-center justify-center">
                        <Package className="w-4 h-4 mr-2" />
                        Reorder Items
                      </button>
                    )}
                    {order.status === 'Processing' && (
                      <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>

                {/* Order Tracking */}
                {order.status !== 'Processing' && (
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Order Tracking</h4>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="ml-2 text-sm text-gray-600">Order Placed</span>
                      </div>
                      
                      <div className="flex-1 h-px bg-gray-300"></div>
                      
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          order.status === 'Shipped' || order.status === 'Delivered' 
                            ? 'bg-green-500' 
                            : 'bg-gray-300'
                        }`}>
                          <Truck className="w-5 h-5 text-white" />
                        </div>
                        <span className="ml-2 text-sm text-gray-600">Shipped</span>
                      </div>
                      
                      <div className="flex-1 h-px bg-gray-300"></div>
                      
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          order.status === 'Delivered' 
                            ? 'bg-green-500' 
                            : 'bg-gray-300'
                        }`}>
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="ml-2 text-sm text-gray-600">Delivered</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 card p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Have questions about your order? Our customer service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-secondary">
              Contact Support
            </button>
            <button className="btn-secondary">
              Track Package
            </button>
            <button className="btn-secondary">
              Return Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
