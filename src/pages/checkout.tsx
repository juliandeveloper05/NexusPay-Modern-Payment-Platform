'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  CreditCard, 
  Trash2, 
  Plus, 
  Minus,
  ArrowRight,
  Shield,
  Lock
} from 'lucide-react';
import { Button, GlassCard, Input } from '@/components/ui';
import { createCheckoutPreference } from '@/actions/payment';
import { Item } from '@/types';
import { toast } from 'sonner';

// Demo products
const demoProducts = [
  {
    id: 'prod_001',
    title: 'Plan Premium',
    description: 'Acceso completo a todas las funcionalidades',
    unit_price: 9999,
    currency_id: 'ARS',
    image: '💎',
  },
  {
    id: 'prod_002',
    title: 'Plan Básico',
    description: 'Funcionalidades esenciales para comenzar',
    unit_price: 4999,
    currency_id: 'ARS',
    image: '🚀',
  },
  {
    id: 'prod_003',
    title: 'Créditos x100',
    description: 'Pack de 100 créditos para transacciones',
    unit_price: 1999,
    currency_id: 'ARS',
    image: '💰',
  },
];

export default function Checkout() {
  const [cart, setCart] = useState<(Item & { image: string })[]>([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const addToCart = (product: typeof demoProducts[0]) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success(`${product.title} agregado al carrito`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean) as typeof cart);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
    toast.info('Producto eliminado del carrito');
  };

  const total = cart.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);

  const handleCheckout = async () => {
    if (!email) {
      toast.error('Por favor ingresa tu email');
      return;
    }

    if (cart.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    setLoading(true);
    
    try {
      const items: Item[] = cart.map(({ image: _image, ...item }) => item);
      
      const result = await createCheckoutPreference(items, { email });
      
      if (result.success && result.data) {
        toast.success('Redirigiendo a MercadoPago...');
        // Use sandbox URL in development
        const checkoutUrl = process.env.NODE_ENV === 'production' 
          ? result.data.init_point 
          : result.data.sandbox_init_point;
        
        window.location.href = checkoutUrl;
      } else {
        toast.error(result.error || 'Error al crear el checkout');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text">Checkout</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Selecciona los productos que deseas comprar y procesa tu pago de forma segura con MercadoPago.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Products */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-nexus-500" />
              Productos Disponibles
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {demoProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="p-5 h-full flex flex-col">
                    <div className="text-4xl mb-3">{product.image}</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold gradient-text">
                        ${product.unit_price.toLocaleString()}
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => addToCart(product)}
                        icon={<Plus className="w-4 h-4" />}
                      >
                        Agregar
                      </Button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="lg:col-span-1">
            <GlassCard className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-nexus-500" />
                Tu Carrito
              </h2>

              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 text-gray-500"
                  >
                    <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>Tu carrito está vacío</p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-dark-600/50"
                      >
                        <span className="text-2xl">{item.image}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            ${item.unit_price.toLocaleString()} x {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-500 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-500 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors ml-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {/* Total */}
              {cart.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 pt-6 border-t border-nexus-500/10"
                >
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600 dark:text-gray-400">Total</span>
                    <span className="text-2xl font-bold gradient-text">
                      ${total.toLocaleString()}
                    </span>
                  </div>

                  {/* Email input */}
                  <div className="mb-4">
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                    />
                  </div>

                  {/* Checkout button */}
                  <Button
                    variant="primary"
                    fullWidth
                    size="lg"
                    loading={loading}
                    onClick={handleCheckout}
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                  >
                    Pagar con MercadoPago
                  </Button>

                  {/* Security badges */}
                  <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>Pago Seguro</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>SSL 256-bit</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
