import { supabase } from '@/lib/supabase'

export type Destination = {
  id: number
  image: string
  title: string
  rating: number
  description: string
  price: string
  is_featured: boolean
}

export async function getDestinations() {
  const { data, error } = await supabase.from('destinations').select('*').order('created_at', { ascending: true })

  if (error) {
    console.error('Supabase error:', error)
    throw error
  }

  return data as Destination[]
}