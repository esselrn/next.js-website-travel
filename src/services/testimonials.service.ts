import { createClient } from '@supabase/supabase-js'

function getSupabaseClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

export async function getTestimonials() {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('testimonials')
    .select('quote, name, location, image')
    .order('created_at', { ascending: true })

  if (error) {
    console.error(error)
    throw error
  }

  return data ?? []
}