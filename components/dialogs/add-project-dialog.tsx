"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { projectService } from "@/lib/api/services/project.service"

interface AddProjectDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
}

export function AddProjectDialog({ open, onOpenChange, onSuccess }: AddProjectDialogProps) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [githubOwner, setGithubOwner] = useState("")
    const [githubRepo, setGithubRepo] = useState("")
    const [deadline, setDeadline] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!name || !githubOwner || !githubRepo || !deadline) {
            setError("Name, GitHub owner, repository, and deadline are required")
            return
        }

        setIsLoading(true)

        try {
            const response = await projectService.createProject({
                name,
                description: description || undefined,
                github_owner: githubOwner,
                github_repo: githubRepo,
                status: "ON TRACK",
                progress: 0,
                deadline,
            })

            if (response.error) {
                setError(response.error.description)
            } else {
                handleClose()
                onSuccess()
            }
        } catch (err: any) {
            setError(err.message || "Failed to create project")
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        setName("")
        setDescription("")
        setGithubOwner("")
        setGithubRepo("")
        setDeadline("")
        setError(null)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-[#1e293b] border-[#334155]">
                <DialogHeader>
                    <DialogTitle className="text-white">Add New Project</DialogTitle>
                    <DialogDescription className="text-[#94a3b8]">
                        Create a new project linked to a GitHub repository.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">
                            Project Name *
                        </Label>
                        <Input
                            id="name"
                            placeholder="e.g., Admin Dashboard"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-white">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Brief description of the project..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b] min-h-[80px]"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="owner" className="text-white">
                                GitHub Owner *
                            </Label>
                            <Input
                                id="owner"
                                placeholder="e.g., facebook"
                                value={githubOwner}
                                onChange={(e) => setGithubOwner(e.target.value)}
                                className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="repo" className="text-white">
                                Repository *
                            </Label>
                            <Input
                                id="repo"
                                placeholder="e.g., react"
                                value={githubRepo}
                                onChange={(e) => setGithubRepo(e.target.value)}
                                className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="deadline" className="text-white">
                            Deadline *
                        </Label>
                        <Input
                            id="deadline"
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="bg-[#0f172a] border-[#334155] text-white"
                            disabled={isLoading}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            className="border-[#334155] text-[#94a3b8] hover:bg-[#0f172a] bg-transparent"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-[#3b82f6] hover:bg-[#2563eb] text-white" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create Project"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
