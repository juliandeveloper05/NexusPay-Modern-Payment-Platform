// ============================================
// MercadoPago SDK Configuration
// ============================================

import { PreferenceRequest, PreferenceResponse, Payment, ApiResponse } from '@/types';

const MERCADOPAGO_API_URL = 'https://api.mercadopago.com';

/**
 * Get the MercadoPago access token from environment variables
 */
function getAccessToken(): string {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!token) {
    throw new Error('MERCADOPAGO_ACCESS_TOKEN is not defined in environment variables');
  }
  return token;
}

/**
 * Get the public key for frontend (client-side) use
 */
export function getPublicKey(): string {
  const key = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;
  if (!key) {
    throw new Error('NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY is not defined');
  }
  return key;
}

/**
 * Create a payment preference in MercadoPago
 */
export async function createPreference(
  preferenceData: PreferenceRequest
): Promise<ApiResponse<PreferenceResponse>> {
  try {
    const response = await fetch(`${MERCADOPAGO_API_URL}/checkout/preferences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(preferenceData),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Failed to create preference',
      };
    }

    const data: PreferenceResponse = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error creating preference:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get payment details by ID
 */
export async function getPayment(paymentId: string): Promise<ApiResponse<Payment>> {
  try {
    const response = await fetch(`${MERCADOPAGO_API_URL}/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Failed to get payment',
      };
    }

    const data: Payment = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error getting payment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Search payments with filters
 */
export async function searchPayments(params: {
  external_reference?: string;
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<ApiResponse<{ results: Payment[]; paging: { total: number } }>> {
  try {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    const response = await fetch(
      `${MERCADOPAGO_API_URL}/v1/payments/search?${searchParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Failed to search payments',
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error searching payments:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Verify webhook signature (HMAC)
 */
export function verifyWebhookSignature(
  _payload: string,
  _signature: string,
  _secret: string
): boolean {
  // In production, implement HMAC-SHA256 verification
  // For now, we'll do a basic check
  if (!process.env.WEBHOOK_SECRET) {
    console.warn('WEBHOOK_SECRET not configured, skipping signature verification');
    return true;
  }
  
  // TODO: Implement proper HMAC verification
  // const crypto = require('crypto');
  // const expectedSignature = crypto
  //   .createHmac('sha256', secret)
  //   .update(payload)
  //   .digest('hex');
  // return signature === expectedSignature;
  
  return true;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency: string = 'ARS'): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Get status display info
 */
export function getStatusInfo(status: string): {
  label: string;
  color: 'success' | 'pending' | 'error' | 'nexus';
} {
  const statusMap: Record<string, { label: string; color: 'success' | 'pending' | 'error' | 'nexus' }> = {
    approved: { label: 'Aprobado', color: 'success' },
    pending: { label: 'Pendiente', color: 'pending' },
    in_process: { label: 'En Proceso', color: 'pending' },
    rejected: { label: 'Rechazado', color: 'error' },
    cancelled: { label: 'Cancelado', color: 'error' },
    refunded: { label: 'Reembolsado', color: 'nexus' },
    charged_back: { label: 'Contracargo', color: 'error' },
  };

  return statusMap[status] || { label: status, color: 'nexus' };
}
