"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { UserAccount, PassType, ClaimedPass } from "./pass-types"

interface AuthContextType {
  user: UserAccount | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  claimPass: (passType: PassType, formData: Record<string, any>) => ClaimedPass | null
  updatePass: (passId: string, updatedFormData: Record<string, any>) => boolean
  cancelPass: (passId: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USERS_DB_KEY = "opfbex_users_db"
const CREDS_DB_KEY = "opfbex_creds_db"
const SESSION_KEY = "opfbex_current_session"

async function hashPassword(password: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const getUsersDB = (): Record<string, UserAccount> => {
    try {
      const data = localStorage.getItem(USERS_DB_KEY)
      return data ? JSON.parse(data) : {}
    } catch {
      return {}
    }
  }

  const getCredsDB = (): Record<string, string> => {
    try {
      const data = localStorage.getItem(CREDS_DB_KEY)
      return data ? JSON.parse(data) : {}
    } catch {
      return {}
    }
  }

  const saveCredsDB = (db: Record<string, string>) => localStorage.setItem(CREDS_DB_KEY, JSON.stringify(db))
  const saveUsersDB = (db: Record<string, UserAccount>) => localStorage.setItem(USERS_DB_KEY, JSON.stringify(db))

  useEffect(() => {
    try {
      const activeEmail = localStorage.getItem(SESSION_KEY)
      if (activeEmail) {
        const db = getUsersDB()
        if (db[activeEmail]) {
          setUser(db[activeEmail])
        }
      }
    } catch (e) {
      console.error("Failed to load user session", e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const usersDb = getUsersDB()
    const credsDb = getCredsDB()
    const normalizedEmail = email.toLowerCase().trim()

    const account = usersDb[normalizedEmail]
    if (!account) throw new Error("No account found with this email. Please register first.")

    const hashedInput = await hashPassword(password)
    const storedHash = credsDb[normalizedEmail]

    if (storedHash && storedHash !== hashedInput) throw new Error("Invalid password. Please try again.")

    localStorage.setItem(SESSION_KEY, normalizedEmail)
    setUser(account)
    return true
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const usersDb = getUsersDB()
    const credsDb = getCredsDB()
    const normalizedEmail = email.toLowerCase().trim()

    if (usersDb[normalizedEmail]) throw new Error("An account with this email already exists. Please sign in instead.")

    const newAccount: UserAccount = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      email: normalizedEmail,
      role: "member",
      passes: [],
    }

    usersDb[normalizedEmail] = newAccount
    credsDb[normalizedEmail] = await hashPassword(password)
    saveUsersDB(usersDb)
    saveCredsDB(credsDb)

    localStorage.setItem(SESSION_KEY, normalizedEmail)
    setUser(newAccount)
    return true
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  const claimPass = (passType: PassType, formData: Record<string, any>): ClaimedPass | null => {
    if (!user) return null

    const newPass: ClaimedPass = {
      id: "pass_" + Math.random().toString(36).substring(2, 9),
      passType,
      claimedAt: new Date().toISOString(),
      ticketCode: `OPFBEX-2026-${passType.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: passType === "visitor" ? "active" : "pending_verification",
      formData,
    }

    const updatedUser: UserAccount = {
      ...user,
      passes: [newPass, ...user.passes],
    }

    const db = getUsersDB()
    db[user.email.toLowerCase()] = updatedUser
    saveUsersDB(db)
    setUser(updatedUser)

    return newPass
  }

  const updatePass = (passId: string, updatedFormData: Record<string, any>): boolean => {
    if (!user) return false

    const updatedPasses = user.passes.map((p) =>
      p.id === passId ? { ...p, formData: updatedFormData } : p
    )

    const updatedUser: UserAccount = {
      ...user,
      passes: updatedPasses,
    }

    const db = getUsersDB()
    db[user.email.toLowerCase()] = updatedUser
    saveUsersDB(db)
    setUser(updatedUser)

    return true
  }

  const cancelPass = (passId: string): boolean => {
    if (!user) return false

    const updatedPasses = user.passes.map((p) =>
      p.id === passId ? { ...p, status: "cancelled" as const } : p
    )

    const updatedUser: UserAccount = {
      ...user,
      passes: updatedPasses,
    }

    const db = getUsersDB()
    db[user.email.toLowerCase()] = updatedUser
    saveUsersDB(db)
    setUser(updatedUser)

    return true
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, claimPass, updatePass, cancelPass }}
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