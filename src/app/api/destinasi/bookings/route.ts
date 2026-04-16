// src/app/api/destinasi/bookings/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { destination_id, full_name, phone, email, visit_date, participants, notes, price_per_person } = body

  if (!destination_id || !full_name || !phone || !email || !visit_date || !participants) {
    return NextResponse.json({ message: 'Semua field wajib diisi' }, { status: 400 })
  }

  const total_price = price_per_person * participants

  const { data, error } = await supabase
    .from('destination_bookings')
    .insert([
      {
        destination_id,
        full_name,
        phone,
        email,
        visit_date,
        participants,
        notes,
        total_price,
        status: 'pending'
      }
    ])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}