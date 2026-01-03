"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bell, Lock, Users } from "lucide-react"
import { settingsService } from "@/lib/api/services/settings.service"
import type { Settings } from "@/lib/api/types"

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    email_notifications: false,
    task_notifications: false,
    team_notifications: false,
  })
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await settingsService.getSettings()

      if (response.error) {
        setError(response.error.description)
      } else if (response.data) {
        setSettings(response.data)
      }
    } catch (err: any) {
      setError(err.message || "Failed to load settings")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await settingsService.updateSettings(settings)

      if (response.error) {
        setError(response.error.description)
      } else {
        setSuccessMessage("Settings saved successfully!")
        setTimeout(() => setSuccessMessage(null), 3000)
      }
    } catch (err: any) {
      setError(err.message || "Failed to save settings")
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsChangingPassword(true)
    setError(null)
    setSuccessMessage(null)

    if (!currentPassword || !newPassword) {
      setError("Both current and new password are required")
      setIsChangingPassword(false)
      return
    }

    try {
      const response = await settingsService.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      })

      if (response.error) {
        setError(response.error.description)
      } else {
        setSuccessMessage("Password changed successfully!")
        setCurrentPassword("")
        setNewPassword("")
        setTimeout(() => setSuccessMessage(null), 3000)
      }
    } catch (err: any) {
      setError(err.message || "Failed to change password")
    } finally {
      setIsChangingPassword(false)
    }
  }

  const toggleNotification = (key: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-[#94a3b8]">Manage your admin portal preferences and security</p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-6 bg-green-500/10 border border-green-500/50 rounded-lg p-4 text-green-500">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-500">{error}</div>
      )}

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Account Settings */}
        <Card className="bg-[#1e293b] border-[#334155]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock size={20} />
              Account Security
            </CardTitle>
            <CardDescription className="text-[#94a3b8]">Manage your password and authentication</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Current Password</label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
                  disabled={isChangingPassword}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">New Password</label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
                  disabled={isChangingPassword}
                />
              </div>
              <Button
                type="submit"
                className="bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                disabled={isChangingPassword}
              >
                {isChangingPassword ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-[#1e293b] border-[#334155]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell size={20} />
              Notifications
            </CardTitle>
            <CardDescription className="text-[#94a3b8]">Control how you receive updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-12 bg-[#0f172a] animate-pulse rounded" />
                ))}
              </div>
            ) : (
              <>
                {[
                  {
                    key: "email_notifications" as keyof Settings,
                    label: "Email notifications",
                    desc: "Get notified about important updates",
                  },
                  {
                    key: "task_notifications" as keyof Settings,
                    label: "Task assignments",
                    desc: "Receive alerts when tasks are assigned",
                  },
                  {
                    key: "team_notifications" as keyof Settings,
                    label: "Team activity",
                    desc: "Get updates on team member activity",
                  },
                ].map((notif) => (
                  <div key={notif.key} className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{notif.label}</p>
                      <p className="text-[#94a3b8] text-sm">{notif.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings[notif.key]}
                      onChange={() => toggleNotification(notif.key)}
                      className="w-4 h-4"
                    />
                  </div>
                ))}
                <Button
                  onClick={handleSaveSettings}
                  className="bg-[#3b82f6] hover:bg-[#2563eb] text-white mt-4"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Preferences"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Team Management */}
        <Card className="bg-[#1e293b] border-[#334155]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users size={20} />
              Team Management
            </CardTitle>
            <CardDescription className="text-[#94a3b8]">Manage team members and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white">+ Invite Team Member</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
