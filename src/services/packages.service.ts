import { supabase } from '@/lib/supabase'

export async function getPackages() {
  const { data, error } = await supabase
    .from('packages')
    .select('id, title, image, rating, price, duration, desc')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Supabase packages error:', error)
    throw error
  }

  return data ?? []
}