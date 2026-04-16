// src/app/api/destinasi/excludes/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const destinationId = searchParams.get('destination_id')

  if (!destinationId) {
    return NextResponse.json({ message: 'destination_id is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('destination_includes')
    .select('*')
    .eq('destination_id', destinationId)
    .eq('is_included', false)
    .order('sort_order', { ascending: true })

  if (error) {
    return NextResponse.json([], { status: 500 })
  }

  return NextResponse.json(data)
}