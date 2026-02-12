import { supabase } from '@/lib/supabase'

export type Blog = {
  id: number
  title: string
  category: string
  date: string
  description: string
  image: string
}

export async function getBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase.from('blogs').select('*').order('date', { ascending: false })

  if (error) {
    console.error('Error fetching blogs:', error)
    return []
  }

  return data as Blog[]
}