"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authService } from "@/lib/api/services/auth.service"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Please enter both username and password")
      return
    }

    setIsLoading(true)

    try {
      const response = await authService.login(username, password)

      if (response.error) {
        setError(response.error.description || "Login failed. Please try again.")
        return
      }

      if (response.data?.access_token) {
        // Store session info for compatibility
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userEmail", username)
        router.push("/dashboard")
      } else {
        setError("Invalid response from server")
      }
    } catch (error: any) {
      setError(error.message || "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#1e293b] border border-[#334155] rounded-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#3b82f6] to-[#1e40af] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">⬚</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-[#94a3b8]">Please enter your credentials to access the employee management dashboard.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-500 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white mb-2">Username</label>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94a3b8]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 bg-[#0f172a] border border-[#334155] rounded" />
                <span className="text-sm text-[#94a3b8]">Keep me signed in</span>
              </label>
              <a href="#" className="text-sm text-[#3b82f6] hover:text-[#2563eb]">
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 h-auto"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-[#334155] text-center text-xs text-[#64748b]">
            Protected by reCAPTCHA and subject to the Privacy Policy and Terms of Service.
          </div>
        </div>

        {/* Company branding */}
        <div className="text-center mt-8 flex items-center justify-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-[#9333ea] to-[#7e22ce] rounded"></div>
          <span className="text-[#94a3b8]">EmpowerHR Systems</span>
        </div>
      </div>
    </div>
  )
}
