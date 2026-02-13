import { createClient } from '@supabase/supabase-js'

export type Blog = {
  id: number
  title: string
  category: string
  date: string
  description: string
  image: string
}

function getSupabaseClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

export async function getBlogs(): Promise<Blog[]> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase.from('blogs').select('*').order('date', { ascending: false })

  if (error) {
    console.error('Error fetching blogs:', error)
    return []
  }

  return data as Blog[]
}