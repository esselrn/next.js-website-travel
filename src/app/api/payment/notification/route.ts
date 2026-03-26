import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { order_id, status_code, gross_amount, signature_key, transaction_status, fraud_status } = body

    const serverKey = process.env.MIDTRANS_SERVER_KEY!

    const hash = crypto
      .createHash('sha512')
      .update(order_id + status_code + gross_amount + serverKey)
      .digest('hex')

    if (hash !== signature_key) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const parts = order_id.split('-')
    const bookingType = parts[0]
    const bookingId = parts.slice(1).join('-')

    const table = bookingType === 'PKT' ? 'package_bookings' : 'destination_bookings'

    let newStatus = null

    if (transaction_status === 'capture' && fraud_status === 'accept') {
      newStatus = 'paid'
    } else if (transaction_status === 'settlement') {
      newStatus = 'paid'
    } else if (['cancel', 'deny', 'expire'].includes(transaction_status)) {
      newStatus = 'cancelled'
    }

    if (newStatus) {
      await supabase
        .from(table)
        .update({
          status: newStatus,
          payment_token: order_id,
          paid_at: newStatus === 'paid' ? new Date().toISOString() : null
        })
        .eq('id', bookingId)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('❌ Notification error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}