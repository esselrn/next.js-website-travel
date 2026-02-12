import { supabase } from '@/lib/supabase'

export async function getTestimonials() {
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