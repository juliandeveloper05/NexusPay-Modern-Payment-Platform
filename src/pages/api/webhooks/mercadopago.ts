// ============================================
// MercadoPago Webhook API Endpoint
// Receives and processes payment notifications
// ============================================

import type { NextApiRequest, NextApiResponse } from 'next';
import { getPayment, verifyWebhookSignature } from '@/lib/mercadopago';
import { WebhookEvent, ApiResponse } from '@/types';

// Store for recently processed events (in production, use Redis or database)
const processedEvents = new Set<string>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ received: boolean }>>
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const event: WebhookEvent = req.body;
    
    // Log incoming webhook
    console.log('📨 Webhook received:', {
      type: event.type,
      action: event.action,
      dataId: event.data?.id,
      timestamp: new Date().toISOString(),
    });

    // Verify webhook signature (if configured)
    const signature = req.headers['x-signature'] as string;
    const secret = process.env.WEBHOOK_SECRET || '';
    
    if (secret && signature) {
      const isValid = verifyWebhookSignature(
        JSON.stringify(req.body),
        signature,
        secret
      );
      
      if (!isValid) {
        console.error('❌ Invalid webhook signature');
        return res.status(401).json({
          success: false,
          error: 'Invalid signature',
        });
      }
    }

    // Check for duplicate events (idempotency)
    const eventKey = `${event.id}-${event.action}`;
    if (processedEvents.has(eventKey)) {
      console.log('⚠️ Duplicate event ignored:', eventKey);
      return res.status(200).json({
        success: true,
        data: { received: true },
        message: 'Event already processed',
      });
    }

    // Process the event based on type
    switch (event.action) {
      case 'payment.created':
        await handlePaymentCreated(event.data.id);
        break;
        
      case 'payment.updated':
        await handlePaymentUpdated(event.data.id);
        break;
        
      default:
        console.log('ℹ️ Unhandled event type:', event.action);
    }

    // Mark event as processed
    processedEvents.add(eventKey);
    
    // Clean old events (keep only last 1000)
    if (processedEvents.size > 1000) {
      const entries = Array.from(processedEvents);
      entries.slice(0, 500).forEach(e => processedEvents.delete(e));
    }

    return res.status(200).json({
      success: true,
      data: { received: true },
    });
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}

/**
 * Handle payment.created event
 */
async function handlePaymentCreated(paymentId: string) {
  console.log('💳 Processing payment.created:', paymentId);
  
  const result = await getPayment(paymentId);
  
  if (!result.success || !result.data) {
    console.error('Failed to fetch payment details:', result.error);
    return;
  }

  const payment = result.data;
  
  console.log('📋 Payment details:', {
    id: payment.id,
    status: payment.status,
    amount: payment.transaction_amount,
    currency: payment.currency_id,
    paymentMethod: payment.payment_method_id,
  });

  // TODO: Save to database
  // await savePaymentToDatabase(payment);

  // TODO: Send notification to user
  // if (payment.status === 'approved') {
  //   await sendPaymentNotification(payment);
  // }
}

/**
 * Handle payment.updated event
 */
async function handlePaymentUpdated(paymentId: string) {
  console.log('🔄 Processing payment.updated:', paymentId);
  
  const result = await getPayment(paymentId);
  
  if (!result.success || !result.data) {
    console.error('Failed to fetch payment details:', result.error);
    return;
  }

  const payment = result.data;
  
  console.log('📋 Updated payment:', {
    id: payment.id,
    status: payment.status,
    statusDetail: payment.status_detail,
  });

  // TODO: Update payment in database
  // await updatePaymentInDatabase(payment);

  // Handle status changes
  switch (payment.status) {
    case 'approved':
      console.log('✅ Payment approved!');
      // await handleApprovedPayment(payment);
      break;
      
    case 'rejected':
      console.log('❌ Payment rejected');
      // await handleRejectedPayment(payment);
      break;
      
    case 'refunded':
      console.log('💸 Payment refunded');
      // await handleRefundedPayment(payment);
      break;
  }
}

// Disable body parsing - we need raw body for signature verification
export const config = {
  api: {
    bodyParser: true,
  },
};
