import { NextRequest, NextResponse } from 'next/server';
import { createDbOrder } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customer, currency = 'EGP' } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Shopping bag is empty' },
        { status: 400 }
      );
    }

    if (!customer || !customer.email || !customer.name) {
      return NextResponse.json(
        { success: false, message: 'Customer information is required' },
        { status: 400 }
      );
    }

    const subtotal = items.reduce(
      (acc: number, item: { product: { price: number }; quantity: number }) =>
        acc + (item.product?.price || 0) * (item.quantity || 1),
      0
    );

    const shipping = subtotal >= 900 ? 0 : 50;
    const total = subtotal + shipping;

    const orderId = 'Q-ORD-' + Math.floor(100000 + Math.random() * 900000);
    const trackingCode = 'Q-TRACK-' + Math.random().toString(36).substring(2, 9).toUpperCase();

    const order = createDbOrder({
      orderId,
      trackingCode,
      customerEmail: customer.email,
      customerName: customer.name,
      customerData: customer,
      items,
      subtotal,
      shipping,
      total,
      currency,
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process checkout and create order' },
      { status: 500 }
    );
  }
}
