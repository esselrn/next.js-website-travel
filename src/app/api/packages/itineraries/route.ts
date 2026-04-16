// src/app/api/paket-wisata/itineraries/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const packageId = searchParams.get('package_id')

  if (!packageId) {
    return NextResponse.json([], { status: 400 })
  }

  const { data, error } = await supabase
    .from('package_itineraries')
    .select('*')
    .eq('package_id', packageId)
    .order('day', { ascending: true })

  if (error) {
    return NextResponse.json([], { status: 500 })
  }

  return NextResponse.json(data)
}