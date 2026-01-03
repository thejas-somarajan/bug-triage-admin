"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MessageCircle, Eye } from "lucide-react"

const employees = [
  {
    id: 1,
    name: "Courtney Henry",
    role: "Senior Dev",
    department: "Engineering",
    status: "Online",
    efficiency: 92,
    color: "from-[#e97316] to-[#ca8a04]",
    avatar: "CH",
  },
  {
    id: 2,
    name: "Tom Cook",
    role: "Product Manager",
    department: "Product",
    status: "In Meeting",
    efficiency: 78,
    color: "from-[#3b82f6] to-[#0ea5e9]",
    avatar: "TC",
  },
  {
    id: 3,
    name: "Jane Doe",
    role: "Frontend Engineer",
    department: "Engineering",
    status: "Online",
    efficiency: 88,
    color: "from-[#ec4899] to-[#be185d]",
    avatar: "JD",
  },
  {
    id: 4,
    name: "Mike Ross",
    role: "Backend Engineer",
    department: "Engineering",
    status: "Away",
    efficiency: 75,
    color: "from-[#6366f1] to-[#4c1d95]",
    avatar: "MR",
  },
]

export function EmployeesContent() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Employees</h1>
          <p className="text-[#94a3b8]">Manage and monitor your team members</p>
        </div>
        <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white">+ Add Employee</Button>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" size={18} />
          <Input
            placeholder="Search employees..."
            className="w-full pl-10 bg-[#1e293b] border-[#334155] text-white placeholder:text-[#64748b]"
          />
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <Card key={employee.id} className="bg-[#1e293b] border-[#334155] hover:border-[#475569] transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${employee.color} flex items-center justify-center text-white font-bold`}
                  >
                    {employee.avatar}
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{employee.name}</CardTitle>
                    <CardDescription className="text-[#94a3b8]">{employee.role}</CardDescription>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    employee.status === "Online"
                      ? "bg-[#10b981]/20 text-[#10b981]"
                      : employee.status === "In Meeting"
                        ? "bg-[#f59e0b]/20 text-[#f59e0b]"
                        : "bg-[#64748b]/20 text-[#94a3b8]"
                  }`}
                >
                  {employee.status === "Online" && "● "}
                  {employee.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[#94a3b8] text-sm">Efficiency Score</p>
                  <span className="text-white font-semibold">{employee.efficiency}%</span>
                </div>
                <div className="bg-[#0f172a] h-2 rounded-full overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${employee.color} h-2 rounded-full`}
                    style={{ width: `${employee.efficiency}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-[#94a3b8] text-sm">{employee.department}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-[#334155] text-[#94a3b8] hover:bg-[#0f172a] bg-transparent"
                >
                  <MessageCircle size={16} className="mr-2" />
                  Message
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-[#334155] text-[#94a3b8] hover:bg-[#0f172a] bg-transparent"
                >
                  <Eye size={16} className="mr-2" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
