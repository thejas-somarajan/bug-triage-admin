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
import { issueService } from "@/lib/api/services/issue.service"
import type { TriageResult } from "@/lib/api/types"

interface TriageDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
}

export function TriageDialog({ open, onOpenChange, onSuccess }: TriageDialogProps) {
    const [owner, setOwner] = useState("")
    const [repo, setRepo] = useState("")
    const [token, setToken] = useState("")
    const [limit, setLimit] = useState(5)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [results, setResults] = useState<TriageResult[] | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setResults(null)

        if (!owner || !repo) {
            setError("Owner and repository are required")
            return
        }

        setIsLoading(true)

        try {
            const response = await issueService.triageIssues({
                owner,
                repo,
                token: token || undefined,
                limit,
            })

            if (response.error) {
                setError(response.error.description)
            } else if (response.data) {
                setResults(response.data)
                setTimeout(() => {
                    onSuccess()
                    handleClose()
                }, 2000)
            }
        } catch (err: any) {
            setError(err.message || "Failed to triage issues")
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        setOwner("")
        setRepo("")
        setToken("")
        setLimit(5)
        setError(null)
        setResults(null)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-[#1e293b] border-[#334155]">
                <DialogHeader>
                    <DialogTitle className="text-white">Triage GitHub Issues</DialogTitle>
                    <DialogDescription className="text-[#94a3b8]">
                        Automatically fetch, classify, and assign issues from a GitHub repository using AI.
                    </DialogDescription>
                </DialogHeader>

                {results ? (
                    <div className="space-y-4">
                        <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
                            <p className="text-green-500 font-medium">
                                ✓ Successfully triaged {results.length} issues!
                            </p>
                        </div>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {results.map((result, idx) => (
                                <div key={idx} className="bg-[#0f172a] rounded p-3 text-sm">
                                    <p className="text-white font-medium mb-1">{result.issue.title}</p>
                                    <p className="text-[#94a3b8] text-xs">
                                        Assigned to: {result.assigned_to.name} ({result.reason})
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="owner" className="text-white">
                                    Repository Owner *
                                </Label>
                                <Input
                                    id="owner"
                                    placeholder="e.g., facebook"
                                    value={owner}
                                    onChange={(e) => setOwner(e.target.value)}
                                    className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="repo" className="text-white">
                                    Repository Name *
                                </Label>
                                <Input
                                    id="repo"
                                    placeholder="e.g., react"
                                    value={repo}
                                    onChange={(e) => setRepo(e.target.value)}
                                    className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="token" className="text-white">
                                GitHub Token (Optional)
                            </Label>
                            <Input
                                id="token"
                                type="password"
                                placeholder="ghp_xxxxxxxxxxxx"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
                                disabled={isLoading}
                            />
                            <p className="text-xs text-[#64748b]">Required for private repositories</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="limit" className="text-white">
                                Number of Issues
                            </Label>
                            <Input
                                id="limit"
                                type="number"
                                min="1"
                                max="20"
                                value={limit}
                                onChange={(e) => setLimit(parseInt(e.target.value) || 5)}
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
                            <Button
                                type="submit"
                                className="bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? "Triaging..." : "Start Triage"}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}
