"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, CheckSquare, MessageSquare, Settings, LogOut, HelpCircle, FolderKanban } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/employees", label: "Employees", icon: Users },
    { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
    { href: "/dashboard/issues", label: "Issue Assignment", icon: CheckSquare },
    { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="w-64 bg-[#1e293b] border-r border-[#334155] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#334155]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#3b82f6] to-[#1e40af] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <div>
            <p className="text-white font-semibold">Admin Portal</p>
            <p className="text-[#94a3b8] text-xs">Manage Team</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive ? "bg-[#3b82f6] text-white" : "text-[#94a3b8] hover:bg-[#0f172a] hover:text-white"
                    }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#334155]">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#0f172a] cursor-pointer transition-colors mb-2">
          <HelpCircle size={20} className="text-[#94a3b8]" />
          <span className="text-[#94a3b8] font-medium">Help & Support</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#0f172a] cursor-pointer transition-colors text-[#ef4444]">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-[#334155]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#dc2626]"></div>
          <div>
            <p className="text-white text-sm font-medium">Alex Morgan</p>
            <p className="text-[#94a3b8] text-xs">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  )
}
