"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button2';
import { Input } from '@/components/ui/input';
import { Package, MapPin, Clock, User, Phone, Mail, CreditCard, ArrowLeft, Truck, CheckCircle, Search, AlertCircle } from 'lucide-react';
import { getOrderByTracking } from '@/actions/get-orders';

// Types
interface OrderItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: any;
    images: { url: string }[];
  };
}

interface TrackingUpdate {
  id: string;
  status: string;
  location?: string;
  note?: string;
  timestamp: Date;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  county: string;
  customerEmail?: string;
  trackingId?: string;
  deliveryStatus: string;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
  trackingUpdates: TrackingUpdate[];
}

function formatDate(date: Date | string) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'in transit':
    case 'shipped':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'order confirmed':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function getStatusIcon(status: string) {
  switch (status.toLowerCase()) {
    case 'delivered':
      return <CheckCircle className="h-4 w-4" />;
    case 'in transit':
    case 'shipped':
      return <Truck className="h-4 w-4" />;
    case 'processing':
    case 'order confirmed':
      return <Package className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
}

const ClientOrderTracking = ({ storeId }: { storeId: string }) => {
  const [trackingId, setTrackingId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrackOrder = async () => {
    if (!trackingId.trim()) {
      setError('Please enter a tracking ID');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = await getOrderByTracking(storeId, trackingId.trim());
      setOrder(orderData);
    } catch (err) {
      setError('Order not found. Please check your tracking ID and try again.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOrder(null);
    setTrackingId('');
    setError(null);
  };

  if (order) {
    // Calculate total price from order items
    const totalPrice = order.orderItems.reduce((total, item) => {
      return total + (item.quantity * Number(item.product.price.toString()));
    }, 0);

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Track Another Order
            </Button>
            <h1 className="text-2xl font-bold">Track Your Order</h1>
          </div>

          {/* Order Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Customer:</span>
                    <span className="text-sm">{order.customerName}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Delivery Address:</span>
                  </div>
                  <p className="text-sm ml-6">{order.address}, {order.county}</p>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Phone:</span>
                    <span className="text-sm">{order.phone}</span>
                  </div>

                  {order.customerEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Email:</span>
                      <span className="text-sm">{order.customerEmail}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Total Amount:</span>
                    <span className="text-sm font-semibold">KSh {totalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Tracking ID:</span>
                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{order.trackingId}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Payment Status:</span>
                    <Badge variant={order.isPaid ? "default" : "destructive"}>
                      {order.isPaid ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <Badge className={getStatusColor(order.deliveryStatus)}>
                  {getStatusIcon(order.deliveryStatus)}
                  <span className="ml-1">{order.deliveryStatus}</span>
                </Badge>
                <Badge variant="outline">
                  Order #{order.id.slice(-6)}
                </Badge>
                <Badge variant="outline">
                  {formatDate(order.createdAt).split(',')[0]}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Your Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
                    <img
                      src={item.product.images[0]?.url || '/placeholder-image.jpg'}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-image.jpg';
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity} × KSh {Number(item.product.price.toString()).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        KSh {(item.quantity * Number(item.product.price.toString())).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tracking Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Delivery Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              {order.trackingUpdates.length > 0 ? (
                <div className="space-y-6">
                  {order.trackingUpdates.map((update, index) => (
                    <div key={update.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          update.status.toLowerCase() === 'delivered' 
                            ? 'bg-green-500' 
                            : index === 0 
                              ? 'bg-blue-500' 
                              : 'bg-gray-300'
                        }`}>
                          {update.status.toLowerCase() === 'delivered' && (
                            <CheckCircle className="h-3 w-3 text-white" />
                          )}
                        </div>
                        {index < order.trackingUpdates.length - 1 && (
                          <div className="w-px h-16 bg-gray-200 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex flex-col gap-1 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{update.status}</span>
                            {update.location && (
                              <span className="text-sm text-gray-500">• {update.location}</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400">
                            {formatDate(update.timestamp)}
                          </p>
                        </div>
                        {update.note && (
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            {update.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No tracking updates available yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Tracking ID Input View
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your tracking ID to see your order status</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Order Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="trackingId" className="block text-sm font-medium text-gray-700 mb-2">
                  Tracking ID
                </label>
                <Input
                  id="trackingId"
                  type="text"
                  placeholder="Enter your tracking ID (e.g., TRK001234567)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
                  className="w-full"
                />
              </div>
              
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <Button 
                onClick={handleTrackOrder}
                disabled={loading || !trackingId.trim()}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Track Order
                  </>
                )}
              </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">How to find your tracking ID:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Check your order confirmation email</li>
                <li>• Look for SMS notifications from our delivery team</li>
                <li>• Contact customer support if you can't find it</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientOrderTracking;