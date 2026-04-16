// src/app/api/paket-wisata/excludes/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const packageId = searchParams.get('package_id')

  if (!packageId) {
    return NextResponse.json({ message: 'package_id is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('package_includes')
    .select('*')
    .eq('package_id', packageId)
    .eq('is_included', false)
    .order('sort_order', { ascending: true })

  if (error) {
    return NextResponse.json([], { status: 500 })
  }

  return NextResponse.json(data)
}