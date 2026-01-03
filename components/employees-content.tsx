"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MessageCircle, Eye } from "lucide-react"
import { employeeService } from "@/lib/api/services/employee.service"
import type { Employee } from "@/lib/api/types"
import { AddEmployeeDialog } from "@/components/dialogs/add-employee-dialog"

export function EmployeesContent() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)

  useEffect(() => {
    loadEmployees()
  }, [])

  const loadEmployees = async (search?: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await employeeService.getEmployees(search)

      if (response.error) {
        setError(response.error.description)
      } else if (response.data) {
        setEmployees(response.data)
      }
    } catch (err: any) {
      setError(err.message || "Failed to load employees")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    if (value.length > 2 || value.length === 0) {
      loadEmployees(value || undefined)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "online":
        return "bg-[#10b981]/20 text-[#10b981]"
      case "in_meeting":
        return "bg-[#f59e0b]/20 text-[#f59e0b]"
      case "away":
        return "bg-[#f59e0b]/20 text-[#f59e0b]"
      default:
        return "bg-[#64748b]/20 text-[#94a3b8]"
    }
  }

  const getStatusLabel = (status: string) => {
    return status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Employees</h1>
          <p className="text-[#94a3b8]">Manage and monitor your team members</p>
        </div>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white"
        >
          + Add Employee
        </Button>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" size={18} />
          <Input
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 bg-[#1e293b] border-[#334155] text-white placeholder:text-[#64748b]"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-500">
          {error}
        </div>
      )}

      {/* Employees Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-[#1e293b] border border-[#334155] rounded-lg animate-pulse" />
          ))}
        </div>
      ) : employees.length === 0 ? (
        <div className="text-center py-12 text-[#64748b]">
          No employees found{searchQuery && ` matching "${searchQuery}"`}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => {
            const initials = employee.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)

            return (
              <Card key={employee.id} className="bg-[#1e293b] border-[#334155] hover:border-[#475569] transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ background: employee.avatar_color || "#3b82f6" }}
                      >
                        {initials}
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{employee.name}</CardTitle>
                        <CardDescription className="text-[#94a3b8]">{employee.role_title}</CardDescription>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                      {employee.status === "online" && "● "}
                      {getStatusLabel(employee.status)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[#94a3b8] text-sm">Efficiency Score</p>
                      <span className="text-white font-semibold">{employee.efficiency_score}%</span>
                    </div>
                    <div className="bg-[#0f172a] h-2 rounded-full overflow-hidden">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${employee.efficiency_score}%`,
                          background: employee.avatar_color || "#3b82f6",
                        }}
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
            )
          })}
        </div>
      )}

      {/* Add Employee Dialog */}
      <AddEmployeeDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSuccess={loadEmployees} />
    </div>
  )
}
