import { createClient } from '@supabase/supabase-js'

function getSupabaseClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

export async function getPackages() {
  const supabase = getSupabaseClient()

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