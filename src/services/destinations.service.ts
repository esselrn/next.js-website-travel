import { createClient } from '@supabase/supabase-js'

export type Destination = {
  id: number
  image: string
  title: string
  rating: number
  description: string
  price: string
  is_featured: boolean
}

function getSupabaseClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

export async function getDestinations() {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase.from('destinations').select('*').order('created_at', { ascending: true })

  if (error) {
    console.error('Supabase error:', error)
    throw error
  }

  return data as Destination[]
}