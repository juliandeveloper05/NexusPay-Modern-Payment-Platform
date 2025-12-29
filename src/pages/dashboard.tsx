'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  CreditCard, 
  Activity, 
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search,
  RefreshCw,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { Button, GlassCard } from '@/components/ui';

// Mock data
const stats = [
  {
    title: 'Ingresos Totales',
    value: '$2,847,500',
    change: '+12.5%',
    positive: true,
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Transacciones',
    value: '1,247',
    change: '+8.2%',
    positive: true,
    icon: CreditCard,
    color: 'from-nexus-500 to-nexus-600',
  },
  {
    title: 'Tasa de Éxito',
    value: '98.5%',
    change: '+0.3%',
    positive: true,
    icon: Activity,
    color: 'from-magenta-500 to-magenta-600',
  },
  {
    title: 'Ticket Promedio',
    value: '$2,284',
    change: '-2.1%',
    positive: false,
    icon: Users,
    color: 'from-orange-500 to-amber-600',
  },
];

const transactions = [
  { id: 'TXN-001', customer: 'Juan Pérez', email: 'juan@email.com', amount: 9999, status: 'approved', date: '2024-12-29 14:30', method: 'Visa ****4242' },
  { id: 'TXN-002', customer: 'María García', email: 'maria@email.com', amount: 4999, status: 'approved', date: '2024-12-29 13:15', method: 'Mastercard ****8888' },
  { id: 'TXN-003', customer: 'Carlos López', email: 'carlos@email.com', amount: 1999, status: 'pending', date: '2024-12-29 12:45', method: 'Debit ****1234' },
  { id: 'TXN-004', customer: 'Ana Martínez', email: 'ana@email.com', amount: 14998, status: 'approved', date: '2024-12-29 11:20', method: 'Visa ****5678' },
  { id: 'TXN-005', customer: 'Roberto Díaz', email: 'roberto@email.com', amount: 4999, status: 'rejected', date: '2024-12-29 10:00', method: 'Mastercard ****9999' },
  { id: 'TXN-006', customer: 'Laura Fernández', email: 'laura@email.com', amount: 9999, status: 'approved', date: '2024-12-28 18:45', method: 'Visa ****3333' },
];

const statusConfig: Record<string, { label: string; icon: typeof CheckCircle; className: string }> = {
  approved: { label: 'Aprobado', icon: CheckCircle, className: 'text-green-500 bg-green-500/10' },
  pending: { label: 'Pendiente', icon: Clock, className: 'text-yellow-500 bg-yellow-500/10' },
  rejected: { label: 'Rechazado', icon: XCircle, className: 'text-red-500 bg-red-500/10' },
};

export default function Dashboard() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredTransactions = transactions.filter(txn => {
    if (filter !== 'all' && txn.status !== filter) return false;
    if (search && !txn.customer.toLowerCase().includes(search.toLowerCase()) && 
        !txn.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Resumen de actividad y transacciones
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" icon={<RefreshCw className="w-4 h-4" />}>
              Actualizar
            </Button>
            <Button variant="primary" size="sm">
              Exportar
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.positive ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.positive ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.title}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Transactions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-nexus-500/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Transacciones Recientes
                </h2>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 pr-4 py-2 rounded-xl bg-white/50 dark:bg-dark-600/50 border border-nexus-500/20 focus:border-nexus-500/50 outline-none text-sm w-full sm:w-48"
                    />
                  </div>
                  
                  {/* Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white/50 dark:bg-dark-600/50 border border-nexus-500/20 focus:border-nexus-500/50 outline-none text-sm"
                    >
                      <option value="all">Todos</option>
                      <option value="approved">Aprobados</option>
                      <option value="pending">Pendientes</option>
                      <option value="rejected">Rechazados</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-nexus-500/10">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      ID / Cliente
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                      Método
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Monto
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                      Fecha
                    </th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-nexus-500/10">
                  {filteredTransactions.map((txn, index) => {
                    const status = statusConfig[txn.status];
                    return (
                      <motion.tr
                        key={txn.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-nexus-500/5 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {txn.customer}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {txn.id}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {txn.method}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            ${txn.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.className}`}>
                            <status.icon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {txn.date}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <button className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredTransactions.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No se encontraron transacciones
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="px-5 py-4 border-t border-nexus-500/10 flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Mostrando {filteredTransactions.length} de {transactions.length} transacciones
              </span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="ghost" size="sm">
                  Siguiente
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
