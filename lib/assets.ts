/**
 * Helper to resolve static asset URLs.
 * If NEXT_PUBLIC_SUPABASE_URL is set, it points to Supabase Storage.
 * Otherwise, it falls back to the local public folder.
 */
export function getAssetUrl(path: string): string {
  if (!path) return ""
  if (path.startsWith("http://") || path.startsWith("https://")) return path

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const customStorageUrl = process.env.NEXT_PUBLIC_STORAGE_BUCKET_URL

  const baseUrl =
    customStorageUrl ||
    (supabaseUrl ? `${supabaseUrl}/storage/v1/object/public/assets` : "")

  let cleanPath = path.startsWith("/") ? path : `/${path}`
  cleanPath = cleanPath.replace("/business_logos/", "/business-logos/")

  return baseUrl ? `${baseUrl}${cleanPath}` : cleanPath
}