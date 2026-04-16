// src/app/api/paket-wisata/bookings/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { package_id, full_name, phone, email, travel_date, participants, notes, price_per_person } = body

  if (!package_id || !full_name || !phone || !email || !travel_date || !participants) {
    return NextResponse.json({ message: 'Semua field wajib diisi' }, { status: 400 })
  }

  const total_price = price_per_person * participants

  const { data, error } = await supabase
    .from('package_bookings')
    .insert([{ package_id, full_name, phone, email, travel_date, participants, notes, total_price, status: 'pending' }])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}