import { supabase } from '@/lib/supabase'

export async function getPackages() {
  const { data, error } = await supabase
    .from('packages')
    .select(
      `
      id,
      slug,
      title,
      image,
      rating,
      price,
      duration,
      summary
    `
    )
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    throw error
  }

  return data ?? []
}

export async function getPackageBySlug(slug: string) {
  const { data, error } = await supabase
    .from('packages')
    .select(
      `
      *,
      package_itineraries (
        day,
        title,
        description
      ),
      package_includes ( text ),
      package_excludes ( text )
    `
    )
    .eq('slug', slug)
    .single()

  if (error) {
    console.error(error)
    throw error
  }

  return data
}
