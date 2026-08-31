"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import { UserAccount, PassType, ClaimedPass, PassStatus, UserRole } from "./pass-types"
import { createClient } from "./supabase/client"
import { EVENT_CONFIG } from "./event-config"

interface AuthContextType {
  user: UserAccount | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (
    name: string, 
    email: string, 
    password: string
  ) => Promise<{ success: boolean; needsConfirmation?: boolean }>
  logout: () => Promise<void>
  claimPass: (passType: PassType, formData: Record<string, any>) => Promise<ClaimedPass | null>
  updatePass: (passId: string, updatedFormData: Record<string, any>) => Promise<boolean>
  cancelPass: (passId: string) => Promise<boolean>
  refreshUserPasses: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  // Fetch Profile & Claimed Passes from Supabase
  const loadUserData = useCallback(async (
    userId: string, 
    email: string
  ) => {
    try {
      // 1. Fetch Profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, full_name, email, role")
        .eq("id", userId)
        .single()

      // 2. Fetch Passes
      const { data: passesData } = await supabase
        .from("passes")
        .select("id, event_id, pass_type, ticket_code, status, form_data, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      const mappedPasses: ClaimedPass[] = (passesData || []).map((p) => ({
        id: p.id,
        eventId: p.event_id,
        passType: p.pass_type as PassType,
        ticketCode: p.ticket_code,
        status: p.status as PassStatus,
        formData: p.form_data,
        claimedAt: p.created_at
      }))

      const account: UserAccount = {
        id: userId,
        name: profile?.full_name || email.split("@")[0],
        email: profile?.email || email,
        role: (profile?.role as UserRole) || "member",
        passes: mappedPasses
      }

      setUser(account)
    } catch (err) {
      console.error("Error loading user profile & passes: ", err)
    }
  }, [supabase])

  // Initialize Session and Listener
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, } = await supabase.auth.getSession()

        if (session?.user) {
          await loadUserData(session.user.id, session.user.email || "")
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error("Failed to load user session", err)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    const { data: { subscription }, } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?. user) {
        await loadUserData(session.user.id, session.user.email || "")
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase, loadUserData])

  const refreshUserPasses = async () => {
    if (!user) return
    await loadUserData(user.id, user.email)
  }

  const login = async (
    email: string, 
    password: string
  ): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password
    })

    if (error) throw new Error(error.message)

    return true
  }

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; needsConfirmation?: boolean }> => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          full_name: name.trim()
        }
      }
    })

    if (error) throw new Error(error.message)

    if (!data.session) return { success: true, needsConfirmation: true }

    return { success: true, needsConfirmation: false }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const claimPass = async (
    passType: PassType,
    formData: Record<string, any>
  ): Promise<ClaimedPass | null> => {
    if (!user) return null

    const { data: eventData } = await supabase
      .from("events")
      .select("id")
      .eq("slug", EVENT_CONFIG.slug)
      .single()

    const ticketCode = `${EVENT_CONFIG.codePrefix.toUpperCase()}-${passType.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`

    const initialStatus: PassStatus = passType === "visitor" ? "active" : "pending_verification"

    const { data, error } = await supabase
      .from("passes")
      .insert({
        user_id: user.id,
        event_id: eventData?.id || null,
        pass_type: passType,
        ticket_code: ticketCode,
        status: initialStatus,
        form_data: formData
      })
      .select("id, event_id, pass_type, ticket_code, status, form_data, created_at")
      .single()

    if (error || !data) {
      console.error("Failed to insert pass: ", error)
      return null
    }

    const newPass: ClaimedPass = {
      id: data.id,
      eventId: data.event_id,
      passType: data.pass_type as PassType,
      ticketCode: data.ticket_code,
      status: data.status as PassStatus,
      formData: data.form_data,
      claimedAt: data.created_at
    }

    setUser((prev) => (prev ? { ...prev, passes: [newPass, ...prev.passes] } : null))
    return newPass
  }

  const updatePass = async (
    passId: string,
    updatedFormData: Record<string, any>
  ): Promise<boolean> => {
    if (!user) return false

    const { error } = await supabase
      .from("passes")
      .update({
        form_data: updatedFormData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", passId)
      .eq("user_id", user.id)

    if (error) {
      console.error("Failed to update pass: ", error)
      return false
    }

    setUser((prev) => {
      if (!prev) return null
      return {
        ...prev,
        passes: prev.passes.map((p) => (p.id === passId ? { ...p, formData: updatedFormData } : p))
      }
    })

    return true
  }

  const cancelPass = async (passId: string): Promise<boolean> => {
    if (!user) return false

    const { error } = await supabase
      .from("passes")
      .update({
        status: "cancelled",
        updated_at: new Date().toISOString(),
      })
      .eq("id", passId)
      .eq("user_id", user.id)

    if (error) {
      console.error("Failed to cancel pass: ", error)
      return false
    }

    setUser((prev) => {
      if (!prev) return null
      return {
        ...prev,
        passes: prev.passes.map((p) => p.id === passId ? { ...p, status: "cancelled" as PassStatus } : p)
      }
    })

    return true
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        claimPass,
        updatePass,
        cancelPass,
        refreshUserPasses
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}