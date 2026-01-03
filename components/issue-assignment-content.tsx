"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Github } from "lucide-react"

const unassignedIssues = [
  {
    id: 124,
    title: "API Rate limiting updates causing timeout in production",
    priority: "CRITICAL",
    color: "bg-[#ef4444]",
    tags: ["backend", "bug"],
    time: "2d ago",
  },
  {
    id: 128,
    title: "Update User Avatar component to support GIFs",
    priority: "LOW",
    color: "bg-[#22c55e]",
    tags: ["frontend", "enhancement"],
    time: "5h ago",
  },
  {
    id: 132,
    title: "Refactor Authentication Middleware",
    priority: "MED",
    color: "bg-[#f59e0b]",
    tags: ["security", "backend"],
    time: "1d ago",
  },
]

const activeAssignments = [
  {
    name: "Jane Doe",
    role: "Senior Frontend Engineer",
    load: 75,
    color: "from-[#e97316] to-[#ca8a04]",
    tasks: [{ id: 119, title: "Database Migration for V2", status: "IN PROGRESS" }],
  },
  {
    name: "John Smith",
    role: "Product Designer",
    load: 50,
    color: "from-[#eab308] to-[#ca8a04]",
    tasks: [{ id: 115, title: "Search Bar Styling & Animation", status: "REVIEW" }],
  },
  {
    name: "Sarah Connor",
    role: "DevOps Engineer",
    load: 25,
    color: "from-[#22c55e] to-[#16a34a]",
    tasks: [],
  },
]

export function IssueAssignmentContent() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Issue Assignment</h1>
          <p className="text-[#94a3b8]">Manage and distribute GitHub tasks across the engineering team</p>
        </div>
        <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white flex items-center gap-2">
          <Github size={18} />
          Sync with GitHub
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" size={18} />
            <Input
              placeholder="Search issues, tags, or assignees..."
              className="w-full pl-10 bg-[#1e293b] border-[#334155] text-white placeholder:text-[#64748b]"
            />
          </div>
        </div>
        <Button variant="outline" className="border-[#334155] text-[#94a3b8] hover:bg-[#0f172a] bg-transparent">
          Priority
        </Button>
        <Button variant="outline" className="border-[#334155] text-[#94a3b8] hover:bg-[#0f172a] bg-transparent">
          Repository
        </Button>
        <Button variant="outline" className="border-[#334155] text-[#94a3b8] hover:bg-[#0f172a] bg-transparent">
          Status
        </Button>
        <Button variant="outline" className="border-[#334155] text-[#94a3b8] hover:bg-[#0f172a] bg-transparent">
          My Issues
        </Button>
      </div>

      {/* Issues and Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unassigned Issues */}
        <Card className="lg:col-span-1 bg-[#1e293b] border-[#334155]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Unassigned Issues</CardTitle>
            <span className="bg-[#334155] text-[#94a3b8] rounded px-2 py-1 text-xs font-medium">
              {unassignedIssues.length}
            </span>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {unassignedIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="bg-[#0f172a] border border-[#334155] rounded-lg p-4 hover:border-[#475569] transition-colors"
                >
                  <div className={`flex items-start gap-3 mb-3`}>
                    <div className={`w-1 h-12 rounded-full ${issue.color}`}></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[#94a3b8] text-sm mb-1">#{issue.id}</p>
                          <p className="text-white font-medium text-sm">{issue.title}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold text-white ${issue.color} flex-shrink-0`}
                        >
                          {issue.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {issue.tags.map((tag) => (
                        <span key={tag} className="bg-[#334155] text-[#94a3b8] px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[#64748b] text-xs">{issue.time}</span>
                  </div>
                  <Button className="w-full mt-3 text-[#3b82f6] bg-transparent hover:bg-[#334155] text-xs font-medium">
                    Assign
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Assignments */}
        <Card className="lg:col-span-2 bg-[#1e293b] border-[#334155]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Active Assignments</CardTitle>
            <a href="#" className="text-[#3b82f6] text-sm hover:text-[#2563eb]">
              View All Employees →
            </a>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAssignments.map((assignment, idx) => (
                <div key={idx} className="border-b border-[#334155] pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${assignment.color}`}></div>
                      <div>
                        <p className="text-white font-medium">{assignment.name}</p>
                        <p className="text-[#94a3b8] text-xs">{assignment.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{assignment.load}% Load</p>
                      <div className="bg-[#0f172a] h-2 rounded-full mt-1 w-20">
                        <div
                          className={`bg-gradient-to-r ${assignment.color} h-2 rounded-full`}
                          style={{ width: `${assignment.load}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  {assignment.tasks.length > 0 ? (
                    <div className="bg-[#0f172a] rounded p-3 text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#3b82f6]">✓</span>
                        <span className="text-[#94a3b8] font-medium">#{assignment.tasks[0].id}</span>
                        <span className="text-[#3b82f6]">{assignment.tasks[0].status}</span>
                      </div>
                      <p className="text-white">{assignment.tasks[0].title}</p>
                    </div>
                  ) : (
                    <div className="border border-dashed border-[#334155] rounded p-4 text-center text-[#64748b] text-sm">
                      Drag unassigned issues here
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
