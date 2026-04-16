import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { bookingId, bookingType, amount, customerName, customerEmail, customerPhone, itemName } = body

    // 🔥 bikin order_id unik & aman
    const shortBookingId = String(bookingId).slice(0, 10)
    const shortTime = Date.now().toString().slice(-6)

    const orderId = `${bookingType === 'paket' ? 'PKT' : 'DST'}-${shortBookingId}-${shortTime}`

    // 🔥 payload FIX (ini yang bikin SNAP ga abu-abu)
    const payload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: Math.round(Number(amount))
      },
      customer_details: {
        first_name: customerName || 'Pelanggan',
        email: customerEmail || 'test@mail.com',
        phone: customerPhone || '08123456789'
      },
      item_details: [
        {
          id: shortBookingId,
          price: Math.round(Number(amount)),
          quantity: 1,
          name: (itemName || 'Wisata NusaTrip').substring(0, 50)
        }
      ],

      // 🔥 INI WAJIB BANGET (BIAR GA ABU-ABU)
      enabled_payments: ['bca_va', 'bni_va', 'bri_va', 'permata_va', 'gopay', 'shopeepay']
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY

    if (!serverKey) {
      return NextResponse.json({ error: 'MIDTRANS_SERVER_KEY belum di set' }, { status: 500 })
    }

    const auth = Buffer.from(`${serverKey}:`).toString('base64')

    const response = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    // 🔥 DEBUG WAJIB
    console.log('MIDTRANS RESPONSE:', data)

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status })
    }

    // ✅ RETURN TOKEN KE FRONTEND
    return NextResponse.json({
      token: data.token,
      redirect_url: data.redirect_url,
      order_id: orderId
    })
  } catch (err) {
    console.error('❌ Payment error:', err)

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}