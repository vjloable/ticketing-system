"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { UserAccount, PassType, ClaimedPass } from "./pass-types"

interface AuthContextType {
  user: UserAccount | null
  isLoading: boolean
  login: (email: string, password?: string) => Promise<boolean>
  register: (name: string, email: string, password?: string) => Promise<boolean>
  logout: () => void
  claimPass: (passType: PassType, formData: Record<string, any>) => ClaimedPass | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = "opfbex_auth_user"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch (e) {
      console.error("Failed to load user session", e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const saveUser = (updatedUser: UserAccount | null) => {
    setUser(updatedUser)
    if (updatedUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const login = async (email: string): Promise<boolean> => {
    // Member authentication (defaults role to 'member')
    const existing: UserAccount = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: email.split("@")[0],
      email,
      role: "member",
      passes: user?.passes || [],
    }
    saveUser(existing)
    return true
  }

  const register = async (name: string, email: string): Promise<boolean> => {
    const newUser: UserAccount = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name,
      email,
      role: "member",
      passes: [],
    }
    saveUser(newUser)
    return true
  }

  const logout = () => {
    saveUser(null)
  }

  const claimPass = (passType: PassType, formData: Record<string, any>): ClaimedPass | null => {
    if (!user) return null

    const newPass: ClaimedPass = {
      id: "pass_" + Math.random().toString(36).substring(2, 9),
      passType,
      claimedAt: new Date().toISOString(),
      ticketCode: `OPFBEX-2026-${passType.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      formData,
    }

    const updatedUser: UserAccount = {
      ...user,
      passes: [newPass, ...user.passes],
    }

    saveUser(updatedUser)
    return newPass
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, claimPass }}>
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