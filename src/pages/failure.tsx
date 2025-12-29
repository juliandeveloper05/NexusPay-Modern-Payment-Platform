'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { XCircle, RefreshCw, Home, HelpCircle } from 'lucide-react';
import { Button, GlassCard } from '@/components/ui';

export default function Failure() {
  const router = useRouter();
  const { payment_id } = router.query;

  const errorReasons = [
    'Fondos insuficientes en la tarjeta',
    'Datos de la tarjeta incorrectos',
    'Tarjeta bloqueada o vencida',
    'Límite de crédito excedido',
    'Transacción rechazada por el banco',
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="max-w-lg mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 md:p-12 text-center relative overflow-hidden">
            {/* Error icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 mb-6"
            >
              <XCircle className="w-10 h-10 text-red-500" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4"
            >
              Pago No Procesado
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 dark:text-gray-400 mb-6"
            >
              Lo sentimos, no pudimos procesar tu pago. Esto puede ocurrir por varias razones:
            </motion.p>

            {/* Error reasons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 mb-6 text-left"
            >
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {errorReasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Payment ID if available */}
            {payment_id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="bg-white/50 dark:bg-dark-600/50 rounded-xl p-3 mb-6 text-sm"
              >
                <span className="text-gray-500">ID: </span>
                <span className="font-mono text-gray-900 dark:text-white">{payment_id}</span>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-3"
            >
              <Link href="/checkout">
                <Button
                  variant="primary"
                  fullWidth
                  icon={<RefreshCw className="w-4 h-4" />}
                >
                  Intentar de Nuevo
                </Button>
              </Link>
              <div className="flex gap-3">
                <Link href="/" className="flex-1">
                  <Button variant="ghost" fullWidth icon={<Home className="w-4 h-4" />}>
                    Inicio
                  </Button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <Button variant="secondary" fullWidth icon={<HelpCircle className="w-4 h-4" />}>
                    Ayuda
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full" />
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
