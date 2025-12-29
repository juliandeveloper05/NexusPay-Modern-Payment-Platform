// ============================================
// NexusPay Type Definitions
// ============================================

// MercadoPago Types
export interface Item {
  id: string;
  title: string;
  description?: string;
  picture_url?: string;
  category_id?: string;
  quantity: number;
  currency_id: string;
  unit_price: number;
}

export interface Payer {
  name?: string;
  surname?: string;
  email: string;
  phone?: {
    area_code: string;
    number: string;
  };
  identification?: {
    type: string;
    number: string;
  };
  address?: {
    street_name: string;
    street_number: number;
    zip_code: string;
  };
}

export interface PreferenceBackUrls {
  success: string;
  failure: string;
  pending: string;
}

export interface PreferenceRequest {
  items: Item[];
  payer?: Payer;
  back_urls?: PreferenceBackUrls;
  auto_return?: 'approved' | 'all';
  external_reference?: string;
  notification_url?: string;
  statement_descriptor?: string;
  expires?: boolean;
  expiration_date_from?: string;
  expiration_date_to?: string;
}

export interface PreferenceResponse {
  id: string;
  init_point: string;
  sandbox_init_point: string;
  date_created: string;
  collector_id: number;
}

// Payment Types
export type PaymentStatus = 
  | 'pending' 
  | 'approved' 
  | 'authorized' 
  | 'in_process' 
  | 'in_mediation' 
  | 'rejected' 
  | 'cancelled' 
  | 'refunded' 
  | 'charged_back';

export interface Payment {
  id: number;
  date_created: string;
  date_approved?: string;
  date_last_updated: string;
  money_release_date?: string;
  operation_type: string;
  payment_method_id: string;
  payment_type_id: string;
  status: PaymentStatus;
  status_detail: string;
  currency_id: string;
  description: string;
  collector_id: number;
  payer: Payer;
  transaction_amount: number;
  transaction_amount_refunded: number;
  external_reference?: string;
  statement_descriptor?: string;
}

// Webhook Types
export type WebhookAction = 
  | 'payment.created'
  | 'payment.updated'
  | 'mp-connect.application_deauthorized'
  | 'subscription_preapproval.created'
  | 'subscription_preapproval.updated';

export interface WebhookEvent {
  id: number;
  live_mode: boolean;
  type: WebhookAction;
  date_created: string;
  user_id: number;
  api_version: string;
  action: WebhookAction;
  data: {
    id: string;
  };
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

// Dashboard Types
export interface DashboardStats {
  totalRevenue: number;
  totalTransactions: number;
  successRate: number;
  averageTicket: number;
  revenueChange: number;
  transactionChange: number;
}

export interface Transaction {
  id: string;
  amount: number;
  status: PaymentStatus;
  customer: string;
  email: string;
  date: Date;
  paymentMethod: string;
}

// Form Types
export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  items: Item[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
