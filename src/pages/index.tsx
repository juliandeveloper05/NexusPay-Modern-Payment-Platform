'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Zap, 
  Shield, 
  Bell, 
  Webhook, 
  CreditCard, 
  ArrowRight,
  CheckCircle,
  Sparkles,
  Globe,
  Lock,
  TrendingUp
} from 'lucide-react';
import { Button, GlassCard } from '@/components/ui';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Features data
const features = [
  {
    icon: CreditCard,
    title: 'Preferences',
    description: 'Configura preferencias de pago personalizadas con integración directa a MercadoPago.',
    color: 'from-nexus-500 to-nexus-600',
  },
  {
    icon: Webhook,
    title: 'Webhooks',
    description: 'Recibe notificaciones en tiempo real de cada transacción y cambio de estado.',
    color: 'from-magenta-500 to-magenta-600',
  },
  {
    icon: Bell,
    title: 'Notificaciones',
    description: 'Sistema de alertas inteligente para mantener informados a usuarios y administradores.',
    color: 'from-nexus-400 to-magenta-500',
  },
  {
    icon: Zap,
    title: 'Server Actions',
    description: 'Backend optimizado con Next.js 15 Server Actions para máxima velocidad.',
    color: 'from-magenta-400 to-nexus-500',
  },
];

// Stats data
const stats = [
  { value: '99.9%', label: 'Uptime garantizado' },
  { value: '<100ms', label: 'Latencia promedio' },
  { value: '256-bit', label: 'Encriptación SSL' },
  { value: '24/7', label: 'Soporte técnico' },
];

export default function Home() {
  return (
    <div className="relative">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-nexus-500/30 via-magenta-500/10 to-transparent blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nexus-500/10 border border-nexus-500/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-nexus-500" />
              <span className="text-sm font-medium text-nexus-600 dark:text-nexus-400">
                Powered by MercadoPago
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
            >
              <span className="text-gray-900 dark:text-white">Pagos del </span>
              <span className="gradient-text">Futuro</span>
              <br />
              <span className="text-gray-900 dark:text-white">Hoy.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10"
            >
              NexusPay integra la potencia de MercadoPago con una experiencia 
              de usuario extraordinaria. Webhooks, notificaciones y server actions 
              en una plataforma unificada.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/checkout">
                <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
                  Comenzar Ahora
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="secondary" size="lg">
                  Ver Dashboard
                </Button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Pagos seguros</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-nexus-500" />
                <span>Cobertura global</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-magenta-500" />
                <span>PCI DSS Compliant</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-nexus-500/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-nexus-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================
          STATS SECTION
          ============================================ */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <GlassCard key={index} hover={false} className="p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================
          FEATURES SECTION
          ============================================ */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="text-gray-900 dark:text-white">Integración </span>
              <span className="gradient-text">Completa</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Todo lo que necesitas para procesar pagos con MercadoPago, 
              en una plataforma moderna y fácil de usar.
            </p>
          </motion.div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="p-8 h-full group">
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:shadow-glow transition-shadow duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard glow className="p-8 md:p-12 text-center relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-nexus-500/10 via-transparent to-magenta-500/10 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-nexus-500 to-magenta-500 shadow-glow mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                  ¿Listo para revolucionar tus pagos?
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                  Únete a miles de negocios que ya confían en NexusPay para 
                  procesar sus pagos de manera segura y eficiente.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/checkout">
                    <Button variant="primary" size="lg">
                      Empezar Gratis
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="ghost" size="lg">
                      Contactar Ventas
                    </Button>
                  </Link>
                </div>

                {/* Benefits */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
                  {['Sin costos ocultos', 'Configuración en minutos', 'Soporte 24/7'].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
