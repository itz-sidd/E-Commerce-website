import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-lg text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products" className="btn-primary text-lg py-3 px-8">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium">
            Continue Shopping
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Cart Items */}
          <div className="lg:col-span-7">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Cart Items ({cartItems.length})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b border-gray-200 pb-6">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <p className="text-lg font-semibold text-blue-600 mt-2">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-16 lg:mt-0">
            <div className="card p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-base">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium">${subtotal.toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between text-base">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </p>
                </div>
                
                <div className="flex justify-between text-base">
                  <p className="text-gray-600">Tax</p>
                  <p className="font-medium">${tax.toFixed(2)}</p>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="w-full btn-primary text-center block text-lg py-3"
                >
                  Proceed to Checkout
                </Link>
              </div>

              {shipping > 0 && (
                <div className="mt-4 text-sm text-gray-600 text-center">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
