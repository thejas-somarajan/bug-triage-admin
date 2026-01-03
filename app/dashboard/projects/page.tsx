"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus, Github, Calendar, TrendingUp } from "lucide-react"
import { projectService } from "@/lib/api/services/project.service"
import type { Project } from "@/lib/api/types"
import { AddProjectDialog } from "@/components/dialogs/add-project-dialog"

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [showAddDialog, setShowAddDialog] = useState(false)

    useEffect(() => {
        loadProjects()
    }, [])

    const loadProjects = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await projectService.getProjects()

            if (response.error) {
                setError(response.error.description)
            } else if (response.data) {
                setProjects(response.data)
            }
        } catch (err: any) {
            setError(err.message || "Failed to load projects")
        } finally {
            setIsLoading(false)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ON TRACK":
                return "bg-[#22c55e]/20 text-[#22c55e]"
            case "AT RISK":
                return "bg-[#f59e0b]/20 text-[#f59e0b]"
            case "DELAYED":
                return "bg-[#ef4444]/20 text-[#ef4444]"
            default:
                return "bg-[#64748b]/20 text-[#94a3b8]"
        }
    }

    const filteredProjects = projects.filter(
        (project) =>
            searchQuery === "" ||
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.github_repo.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
                    <p className="text-[#94a3b8]">Manage and track GitHub repository projects</p>
                </div>
                <Button
                    onClick={() => setShowAddDialog(true)}
                    className="bg-[#3b82f6] hover:bg-[#2563eb] text-white flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Project
                </Button>
            </div>

            {/* Search */}
            <div className="mb-8 max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" size={18} />
                    <Input
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 bg-[#1e293b] border-[#334155] text-white placeholder:text-[#64748b]"
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-500">{error}</div>
            )}

            {/* Projects Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-64 bg-[#1e293b] border border-[#334155] rounded-lg animate-pulse" />
                    ))}
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-[#64748b] mb-4">
                        {searchQuery ? `No projects matching "${searchQuery}"` : "No projects yet"}
                    </div>
                    {!searchQuery && (
                        <Button
                            onClick={() => setShowAddDialog(true)}
                            className="bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                        >
                            <Plus size={18} className="mr-2" />
                            Create Your First Project
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <Card key={project.id} className="bg-[#1e293b] border-[#334155] hover:border-[#475569] transition-colors">
                            <CardHeader>
                                <div className="flex items-start justify-between mb-2">
                                    <CardTitle className="text-white text-lg">{project.name}</CardTitle>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                        {project.status}
                                    </span>
                                </div>
                                {project.description && (
                                    <CardDescription className="text-[#94a3b8] line-clamp-2">{project.description}</CardDescription>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* GitHub Info */}
                                <div className="flex items-center gap-2 text-sm">
                                    <Github size={16} className="text-[#64748b]" />
                                    <span className="text-[#94a3b8]">
                                        {project.github_owner}/{project.github_repo}
                                    </span>
                                </div>

                                {/* Progress */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp size={16} className="text-[#64748b]" />
                                            <span className="text-[#94a3b8] text-sm">Progress</span>
                                        </div>
                                        <span className="text-white font-semibold">{project.progress}%</span>
                                    </div>
                                    <div className="bg-[#0f172a] h-2 rounded-full overflow-hidden">
                                        <div
                                            className="bg-[#3b82f6] h-2 rounded-full transition-all"
                                            style={{ width: `${project.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Deadline */}
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar size={16} className="text-[#64748b]" />
                                    <span className="text-[#94a3b8]">
                                        Due: {new Date(project.deadline).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 border-[#334155] text-[#94a3b8] hover:bg-[#0f172a] bg-transparent"
                                        onClick={() => window.open(`https://github.com/${project.github_owner}/${project.github_repo}`, '_blank')}
                                    >
                                        <Github size={16} className="mr-2" />
                                        View Repo
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Add Project Dialog */}
            <AddProjectDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSuccess={loadProjects} />
        </div>
    )
}
