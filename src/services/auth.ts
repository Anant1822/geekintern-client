import { supabase } from '@/lib/supabase'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'

export const authService = {
  /** Sign up a new user with email and password */
  async signUp(email: string, password: string, fullName: string) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${import.meta.env.VITE_APP_URL}/dashboard`,
      },
    })
  },

  /** Sign in with email and password */
  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password })
  },

  /** Sign out the current user */
  async signOut() {
    return supabase.auth.signOut()
  },

  /** Get current session */
  async getSession() {
    return supabase.auth.getSession()
  },

  /** Get current user */
  async getUser() {
    return supabase.auth.getUser()
  },

  /** Subscribe to auth state changes */
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback)
  },

  /** Send password reset email */
  async resetPassword(email: string) {
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${import.meta.env.VITE_APP_URL}/reset-password`,
    })
  },

  /** Update user password (call after reset redirect) */
  async updatePassword(newPassword: string) {
    return supabase.auth.updateUser({ password: newPassword })
  },

  /** Update user email */
  async updateEmail(newEmail: string) {
    return supabase.auth.updateUser({ email: newEmail })
  },

  /** Send OTP to email using Supabase Auth */
  async sendOtp(email: string) {
    const siteUrl = import.meta.env.VITE_APP_URL || 'https://geekintern.com'
    return supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${siteUrl}/student-portal`,
      },
    })
  },

  /** Verify Email OTP with Supabase Auth */
  async verifyOtp(email: string, token: string) {
    // 1. Try 'email'
    const resEmail = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    })
    if (!resEmail.error) return resEmail

    // 2. Try 'signup' (if user was created via signup/admin)
    const resSignup = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup',
    })
    if (!resSignup.error) return resSignup

    // 3. Fallback to 'magiclink'
    return supabase.auth.verifyOtp({
      email,
      token,
      type: 'magiclink',
    })
  },
}
