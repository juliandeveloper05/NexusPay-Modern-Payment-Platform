// ============================================
// Payment Server Actions
// Next.js 15 Server Actions for MercadoPago
// ============================================

'use server';

import { createPreference, getPayment, searchPayments } from '@/lib/mercadopago';
import { 
  Item, 
  PreferenceResponse, 
  Payment, 
  ApiResponse,
  Payer
} from '@/types';

/**
 * Server Action: Create a checkout preference
 * This creates a MercadoPago preference and returns the checkout URL
 */
export async function createCheckoutPreference(
  items: Item[],
  payer?: Partial<Payer>
): Promise<ApiResponse<PreferenceResponse>> {
  try {
    // Validate items
    if (!items || items.length === 0) {
      return {
        success: false,
        error: 'At least one item is required',
      };
    }

    // Validate each item
    for (const item of items) {
      if (!item.title || item.quantity < 1 || item.unit_price <= 0) {
        return {
          success: false,
          error: 'Invalid item data: title, quantity, and unit_price are required',
        };
      }
    }

    // Get base URL for callbacks
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Create the preference
    const result = await createPreference({
      items: items.map(item => ({
        ...item,
        currency_id: item.currency_id || 'ARS',
      })),
      payer: payer ? {
        email: payer.email || '',
        name: payer.name,
        surname: payer.surname,
      } : undefined,
      back_urls: {
        success: `${baseUrl}/success`,
        failure: `${baseUrl}/failure`,
        pending: `${baseUrl}/pending`,
      },
      auto_return: 'approved',
      notification_url: `${baseUrl}/api/webhooks/mercadopago`,
      statement_descriptor: 'NEXUSPAY',
    });

    return result;
  } catch (error) {
    console.error('Server Action Error - createCheckoutPreference:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create checkout',
    };
  }
}

/**
 * Server Action: Get payment status
 * Retrieves current status of a payment by ID
 */
export async function getPaymentStatus(
  paymentId: string
): Promise<ApiResponse<Payment>> {
  try {
    if (!paymentId) {
      return {
        success: false,
        error: 'Payment ID is required',
      };
    }

    const result = await getPayment(paymentId);
    return result;
  } catch (error) {
    console.error('Server Action Error - getPaymentStatus:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get payment status',
    };
  }
}

/**
 * Server Action: List recent payments
 * Get a list of recent payments with optional filters
 */
export async function listPayments(options?: {
  status?: string;
  limit?: number;
  offset?: number;
  externalReference?: string;
}): Promise<ApiResponse<{ payments: Payment[]; total: number }>> {
  try {
    const result = await searchPayments({
      status: options?.status,
      limit: options?.limit || 10,
      offset: options?.offset || 0,
      external_reference: options?.externalReference,
    });

    if (!result.success || !result.data) {
      return {
        success: false,
        error: result.error || 'Failed to list payments',
      };
    }

    return {
      success: true,
      data: {
        payments: result.data.results,
        total: result.data.paging.total,
      },
    };
  } catch (error) {
    console.error('Server Action Error - listPayments:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to list payments',
    };
  }
}

/**
 * Server Action: Process refund
 * Initiate a refund for a payment
 */
export async function processRefund(
  paymentId: string,
  amount?: number
): Promise<ApiResponse<{ refundId: string }>> {
  try {
    if (!paymentId) {
      return {
        success: false,
        error: 'Payment ID is required',
      };
    }

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      return {
        success: false,
        error: 'MercadoPago not configured',
      };
    }

    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}/refunds`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: amount ? JSON.stringify({ amount }) : undefined,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Failed to process refund',
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: { refundId: String(data.id) },
      message: 'Refund processed successfully',
    };
  } catch (error) {
    console.error('Server Action Error - processRefund:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process refund',
    };
  }
}
