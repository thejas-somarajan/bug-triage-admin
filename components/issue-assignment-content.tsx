"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Github } from "lucide-react"
import { issueService } from "@/lib/api/services/issue.service"
import type { Issue, AssignedIssue } from "@/lib/api/types"
import { TriageDialog } from "@/components/dialogs/triage-dialog"

export function IssueAssignmentContent() {
  const [unassignedIssues, setUnassignedIssues] = useState<Issue[]>([])
  const [assignedIssues, setAssignedIssues] = useState<AssignedIssue[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showTriageDialog, setShowTriageDialog] = useState(false)
  const [expandedAssignments, setExpandedAssignments] = useState<Set<number>>(new Set())

  useEffect(() => {
    loadIssues()
  }, [])

  const loadIssues = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [unassignedResponse, assignedResponse] = await Promise.all([
        issueService.getUnassignedIssues(),
        issueService.getAssignedIssues(),
      ])

      if (unassignedResponse.error) {
        setError(unassignedResponse.error.description)
      } else if (unassignedResponse.data) {
        setUnassignedIssues(unassignedResponse.data)
      }

      if (assignedResponse.data) {
        setAssignedIssues(assignedResponse.data)
      }
    } catch (err: any) {
      setError(err.message || "Failed to load issues")
    } finally {
      setIsLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-[#ef4444]"
      case "MAJOR":
        return "bg-[#f59e0b]"
      case "MINOR":
        return "bg-[#3b82f6]"
      default:
        return "bg-[#22c55e]"
    }
  }

  const filteredUnassigned = unassignedIssues.filter(
    (issue) =>
      searchQuery === "" ||
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.labels.some((label) => label.toLowerCase().includes(searchQuery.toLowerCase()))
  )
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Issue Assignment</h1>
          <p className="text-[#94a3b8]">Manage and distribute GitHub tasks across the engineering team</p>
        </div>
        <Button
          onClick={() => setShowTriageDialog(true)}
          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white flex items-center gap-2"
        >
          <Github size={18} />
          Triage Issues
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" size={18} />
            <Input
              placeholder="Search issues, tags, or assignees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              {filteredUnassigned.length}
            </span>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-[#0f172a] animate-pulse rounded-lg" />
                ))}
              </div>
            ) : filteredUnassigned.length === 0 ? (
              <div className="text-center py-8 text-[#64748b]">
                {searchQuery ? `No issues matching "${searchQuery}"` : "No unassigned issues"}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUnassigned.map((issue) => (
                  <div
                    key={issue.id}
                    className="bg-[#0f172a] border border-[#334155] rounded-lg p-4 hover:border-[#475569] transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-1 h-12 rounded-full ${getPriorityColor(issue.priority)}`}></div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[#94a3b8] text-sm mb-1">#{issue.github_issue_number}</p>
                            <p className="text-white font-medium text-sm">{issue.title}</p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold text-white ${getPriorityColor(issue.priority)} flex-shrink-0`}
                          >
                            {issue.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 flex-wrap">
                        {issue.labels.map((label) => (
                          <span key={label} className="bg-[#334155] text-[#94a3b8] px-2 py-1 rounded text-xs">
                            {label}
                          </span>
                        ))}
                      </div>
                      <span className="text-[#64748b] text-xs">
                        {new Date(issue.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <Button className="w-full mt-3 text-[#3b82f6] bg-transparent hover:bg-[#334155] text-xs font-medium">
                      Assign
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Assignments */}
        <Card className="lg:col-span-2 bg-[#1e293b] border-[#334155]">
          <CardHeader>
            <CardTitle className="text-white">Active Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-[#0f172a] animate-pulse rounded-lg" />
                ))}
              </div>
            ) : assignedIssues.length === 0 ? (
              <div className="text-center py-8 text-[#64748b]">No assigned issues yet</div>
            ) : (
              <div className="space-y-4">
                {assignedIssues.map((assignment, idx) => (
                  <div key={idx} className="border-b border-[#334155] pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ background: "#3b82f6" }}
                        >
                          {assignment.employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{assignment.employee.name}</p>
                          <p className="text-[#94a3b8] text-xs">{assignment.issues.length} issues</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{assignment.employee.workload}% Load</p>
                        <div className="bg-[#0f172a] h-2 rounded-full mt-1 w-20">
                          <div
                            className="h-2 rounded-full"
                            style={{ width: `${assignment.employee.workload}%`, background: "#3b82f6" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    {assignment.issues.length > 0 ? (
                      <div className="space-y-2">
                        {(expandedAssignments.has(idx) ? assignment.issues : assignment.issues.slice(0, 2)).map((issue) => (
                          <div key={issue.id} className="bg-[#0f172a] rounded p-3 text-sm">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[#3b82f6]">✓</span>
                              <span className="text-[#94a3b8] font-medium">#{issue.github_issue_number}</span>
                              <span className="text-[#3b82f6]">{issue.status || "ASSIGNED"}</span>
                            </div>
                            <p className="text-white">{issue.title}</p>
                          </div>
                        ))}
                        {assignment.issues.length > 2 && (
                          <button
                            onClick={() => {
                              const newExpanded = new Set(expandedAssignments)
                              if (newExpanded.has(idx)) {
                                newExpanded.delete(idx)
                              } else {
                                newExpanded.add(idx)
                              }
                              setExpandedAssignments(newExpanded)
                            }}
                            className="text-[#3b82f6] hover:text-[#2563eb] text-xs text-center w-full py-2 hover:bg-[#0f172a] rounded transition-colors"
                          >
                            {expandedAssignments.has(idx)
                              ? "Show Less"
                              : `+${assignment.issues.length - 2} more issues`}
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="border border-dashed border-[#334155] rounded p-4 text-center text-[#64748b] text-sm">
                        No issues assigned
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Triage Dialog */}
      <TriageDialog open={showTriageDialog} onOpenChange={setShowTriageDialog} onSuccess={loadIssues} />
    </div>
  )
}
