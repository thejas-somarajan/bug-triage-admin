"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bell, Lock, Users, Palette } from "lucide-react"

export default function Settings() {
  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-[#94a3b8]">Manage your admin portal preferences and security</p>
      </div>

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
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Current Password</label>
              <Input type="password" className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">New Password</label>
              <Input type="password" className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]" />
            </div>
            <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white">Update Password</Button>
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
            {[
              { label: "Email notifications", desc: "Get notified about important updates" },
              { label: "Task assignments", desc: "Receive alerts when tasks are assigned" },
              { label: "Team activity", desc: "Get updates on team member activity" },
            ].map((notif, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{notif.label}</p>
                  <p className="text-[#94a3b8] text-sm">{notif.desc}</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
            ))}
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

        {/* Appearance */}
        {/* <Card className="bg-[#1e293b] border-[#334155]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Palette size={20} />
              Appearance
            </CardTitle>
            <CardDescription className="text-[#94a3b8]">Customize your dashboard theme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-lg mb-2"></div>
                <p className="text-white text-sm">Light</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-[#1e293b] border border-[#334155] rounded-lg mb-2"></div>
                <p className="text-white text-sm font-semibold">Dark (Current)</p>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}
