import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/passes"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) return NextResponse.redirect(`${origin}${next}`)
  }

  // Return user to error page or login with error message if verification fails
  return NextResponse.redirect(`${origin}/login?error=Failed to verify your email. Please try logging in again.`)
}