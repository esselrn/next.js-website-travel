// src/app/api/destinasi/[id]/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data, error } = await supabase.from('destinations').select('*').eq('id', id).single()

  if (error) {
    return NextResponse.json(null, { status: 404 })
  }

  return NextResponse.json(data)
}