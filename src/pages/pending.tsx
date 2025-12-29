'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Clock, Mail, Home, Bell } from 'lucide-react';
import { Button, GlassCard } from '@/components/ui';

export default function Pending() {
  const router = useRouter();
  const { payment_id } = router.query;

  const pendingSteps = [
    { step: 1, title: 'Pago registrado', done: true },
    { step: 2, title: 'Verificando transacción', done: false, current: true },
    { step: 3, title: 'Confirmación final', done: false },
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
            {/* Pending icon with animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-6 relative"
            >
              <Clock className="w-10 h-10 text-yellow-500" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full"
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4"
            >
              Pago Pendiente
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 dark:text-gray-400 mb-6"
            >
              Tu pago está siendo procesado. Esto puede tomar unos minutos. 
              Te notificaremos cuando se complete.
            </motion.p>

            {/* Progress steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                {pendingSteps.map((item, index) => (
                  <div key={item.step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                        ${item.done ? 'bg-green-500 text-white' : 
                          item.current ? 'bg-yellow-500 text-white animate-pulse' : 
                          'bg-gray-200 dark:bg-dark-600 text-gray-500'}`}
                    >
                      {item.done ? '✓' : item.step}
                    </div>
                    {index < pendingSteps.length - 1 && (
                      <div className={`w-8 h-0.5 mx-1 ${item.done ? 'bg-green-500' : 'bg-gray-200 dark:bg-dark-600'}`} />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                {pendingSteps.find(s => s.current)?.title}...
              </p>
            </motion.div>

            {/* Payment details */}
            {payment_id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="bg-white/50 dark:bg-dark-600/50 rounded-xl p-4 mb-6 text-left"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  ID de Transacción
                </p>
                <p className="font-mono text-sm text-gray-900 dark:text-white break-all">
                  {payment_id}
                </p>
              </motion.div>
            )}

            {/* Info box */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-start gap-3 bg-nexus-500/10 border border-nexus-500/20 rounded-xl p-4 mb-6 text-left"
            >
              <Mail className="w-5 h-5 text-nexus-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Recibirás un email de confirmación cuando el pago sea aprobado.
                También puedes activar las notificaciones push.
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Button
                variant="primary"
                icon={<Bell className="w-4 h-4" />}
                onClick={() => {
                  // TODO: Enable push notifications
                  alert('Notificaciones activadas');
                }}
              >
                Activar Notificaciones
              </Button>
              <Link href="/">
                <Button variant="ghost" icon={<Home className="w-4 h-4" />}>
                  Volver al Inicio
                </Button>
              </Link>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-bl-full" />
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
