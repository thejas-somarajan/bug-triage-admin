"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users2, Clock, Smile, Search, FolderKanban, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { dashboardService } from "@/lib/api/services/dashboard.service"
import { activityService } from "@/lib/api/services/activity.service"
import type { DashboardPerformance, Activity } from "@/lib/api/types"

export function DashboardContent() {
  const [performance, setPerformance] = useState<DashboardPerformance | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [perfResponse, activityResponse] = await Promise.all([
        dashboardService.getPerformance(),
        activityService.getActivity(4),
      ])

      if (perfResponse.error) {
        setError(perfResponse.error.description)
      } else if (perfResponse.data) {
        setPerformance(perfResponse.data)
      }

      if (activityResponse.data) {
        setActivities(activityResponse.data)
      }
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data")
    } finally {
      setIsLoading(false)
    }
  }

  // Transform API data for chart
  const chartData = performance
    ? performance.weekly_completed.map((completed, index) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index] || `Day ${index + 1}`,
      completed,
      target: performance.weekly_target[index] || 100,
    }))
    : []

  const employeeData = [
    {
      id: 1,
      name: "Courtney Henry",
      role: "Senior Dev",
      department: "Engineering",
      status: "Online",
      efficiency: 92,
      color: "from-[#e97316] to-[#ca8a04]",
    },
    {
      id: 2,
      name: "Tom Cook",
      role: "Product Manager",
      department: "Product",
      status: "In Meeting",
      efficiency: 78,
      color: "from-[#3b82f6] to-[#0ea5e9]",
    },
  ]
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Performance Dashboard</h1>
          <p className="text-[#94a3b8]">Overview of team metrics and individual employee health.</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-8 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" size={18} />
          <Input
            placeholder="Search..."
            className="w-full pl-10 bg-[#1e293b] border-[#334155] text-white placeholder:text-[#64748b]"
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#1e293b] border-[#334155]">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium text-[#94a3b8]">Total Projects</CardTitle>
            <FolderKanban className="text-[#64748b]" size={20} />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-10 bg-[#0f172a] animate-pulse rounded" />
            ) : (
              <>
                <div className="text-3xl font-bold text-white">12</div>
                <p className="text-sm text-[#22c55e] mt-1">+3 this month</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#1e293b] border-[#334155]">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium text-[#94a3b8]">Total Members</CardTitle>
            <Users2 className="text-[#64748b]" size={20} />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-10 bg-[#0f172a] animate-pulse rounded" />
            ) : (
              <>
                <div className="text-3xl font-bold text-white">48</div>
                <p className="text-sm text-[#94a3b8] mt-1">Active team members</p>
                <p className="text-sm text-[#22c55e] mt-1">+6 this quarter</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#1e293b] border-[#334155]">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium text-[#94a3b8]">Total Active Issues</CardTitle>
            <AlertCircle className="text-[#64748b]" size={20} />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-10 bg-[#0f172a] animate-pulse rounded" />
            ) : (
              <>
                <div className="text-3xl font-bold text-white">{performance?.total_active_issues || 0}</div>
                <p className="text-sm text-[#f87171] mt-1">8 critical</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#1e293b] border-[#334155]">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium text-[#94a3b8]">Team Satisfaction</CardTitle>
            <Smile className="text-[#64748b]" size={20} />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-10 bg-[#0f172a] animate-pulse rounded" />
            ) : (
              <>
                <div className="text-3xl font-bold text-white">
                  {performance?.team_satisfaction?.toFixed(1) || "0.0"}{" "}
                  <span className="text-lg text-[#94a3b8]">/5.0</span>
                </div>
                <div className="bg-[#0f172a] h-2 rounded-full mt-3">
                  <div
                    className="bg-[#22c55e] h-2 rounded-full"
                    style={{ width: `${((performance?.team_satisfaction || 0) / 5) * 100}%` }}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Chart and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 bg-[#1e293b] border-[#334155]">
          <CardHeader>
            <CardTitle className="text-white">Weekly Output vs. Target</CardTitle>
            <CardDescription className="text-[#94a3b8]">Tasks completed across all departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    color: "#fff",
                  }}
                />
                <Legend wrapperStyle={{ color: "#94a3b8" }} />
                <Bar dataKey="completed" fill="#3b82f6" />
                <Bar dataKey="target" fill="#334155" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#1e293b] border-[#334155]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <a href="#" className="text-[#3b82f6] text-sm hover:text-[#2563eb]">
              View All
            </a>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-12 bg-[#0f172a] animate-pulse rounded" />
                ))}
              </div>
            ) : activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ec4899] to-[#db2777] flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-white">
                        <span className="font-semibold">{item.actor_name}</span> {item.action}{" "}
                        <span className="text-[#3b82f6]">{item.target}</span>
                      </p>
                      <p className="text-[#64748b] text-xs mt-1">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#64748b] text-sm">No recent activity</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Employee Performance Table */}
      <Card className="bg-[#1e293b] border-[#334155]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Employee Performance</CardTitle>
          <div className="flex gap-3">
            <Button variant="outline" className="border-[#334155] text-[#94a3b8] hover:bg-[#0f172a] bg-transparent">
              Filter
            </Button>
            <Button variant="outline" className="border-[#334155] text-[#94a3b8] hover:bg-[#0f172a] bg-transparent">
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#334155]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#94a3b8]">Employee</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#94a3b8]">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#94a3b8]">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#94a3b8]">Efficiency Score</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#94a3b8]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((employee) => (
                  <tr key={employee.id} className="border-b border-[#334155] hover:bg-[#0f172a]">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${employee.color}`}></div>
                        <div>
                          <p className="text-white font-medium">{employee.name}</p>
                          <p className="text-[#94a3b8] text-xs">{employee.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-white">{employee.role}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${employee.status === "Online"
                          ? "bg-[#10b981]/20 text-[#10b981]"
                          : "bg-[#f59e0b]/20 text-[#f59e0b]"
                          }`}
                      >
                        {employee.status === "Online" && "● "}
                        {employee.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-[#0f172a] h-2 rounded-full w-20">
                          <div className={`bg-gradient-to-r ${employee.color} h-2 rounded-full w-3/4`}></div>
                        </div>
                        <span className="text-white">{employee.efficiency}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-[#3b82f6] hover:text-[#2563eb] text-sm font-medium">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
