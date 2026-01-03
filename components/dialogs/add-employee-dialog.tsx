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
import { employeeService } from "@/lib/api/services/employee.service"

interface AddEmployeeDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
}

const DEPARTMENTS = ["Engineering", "Product", "Design", "Marketing", "Sales", "HR", "Operations"]
const SPECIALIZATIONS = [
    "Frontend",
    "Backend",
    "Full Stack",
    "DevOps",
    "Mobile",
    "UI/UX",
    "Data Science",
    "QA",
    "Product Management",
    "Project Management",
]

const AVATAR_COLORS = [
    "#3b82f6", // blue
    "#ef4444", // red
    "#10b981", // green
    "#f59e0b", // orange
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#06b6d4", // cyan
    "#f97316", // orange-red
]

export function AddEmployeeDialog({ open, onOpenChange, onSuccess }: AddEmployeeDialogProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [roleTitle, setRoleTitle] = useState("")
    const [department, setDepartment] = useState("")
    const [selectedSpecs, setSelectedSpecs] = useState<string[]>([])
    const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[0])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!name || !email || !roleTitle || !department || selectedSpecs.length === 0) {
            setError("All fields are required and at least one specialization must be selected")
            return
        }

        setIsLoading(true)

        try {
            const response = await employeeService.createEmployee({
                name,
                email,
                role_title: roleTitle,
                department,
                specializations: selectedSpecs,
                avatar_color: avatarColor,
            })

            if (response.error) {
                setError(response.error.description)
            } else {
                handleClose()
                onSuccess()
            }
        } catch (err: any) {
            setError(err.message || "Failed to create employee")
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        setName("")
        setEmail("")
        setRoleTitle("")
        setDepartment("")
        setSelectedSpecs([])
        setAvatarColor(AVATAR_COLORS[0])
        setError(null)
        onOpenChange(false)
    }

    const toggleSpecialization = (spec: string) => {
        setSelectedSpecs((prev) =>
            prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] bg-[#1e293b] border-[#334155] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-white">Add New Employee</DialogTitle>
                    <DialogDescription className="text-[#94a3b8]">
                        Add a new team member to the organization.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-white">
                                Full Name *
                            </Label>
                            <Input
                                id="name"
                                placeholder="e.g., John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">
                                Email *
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john.doe@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-white">
                                Role Title *
                            </Label>
                            <Input
                                id="role"
                                placeholder="e.g., Senior Developer"
                                value={roleTitle}
                                onChange={(e) => setRoleTitle(e.target.value)}
                                className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b]"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="department" className="text-white">
                                Department *
                            </Label>
                            <select
                                id="department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full bg-[#0f172a] border border-[#334155] text-white rounded-md px-3 py-2"
                                disabled={isLoading}
                            >
                                <option value="">Select department</option>
                                {DEPARTMENTS.map((dept) => (
                                    <option key={dept} value={dept}>
                                        {dept}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-white">Specializations * (Select at least one)</Label>
                        <div className="grid grid-cols-3 gap-2">
                            {SPECIALIZATIONS.map((spec) => (
                                <button
                                    key={spec}
                                    type="button"
                                    onClick={() => toggleSpecialization(spec)}
                                    className={`px-3 py-2 rounded text-sm transition-colors ${selectedSpecs.includes(spec)
                                            ? "bg-[#3b82f6] text-white"
                                            : "bg-[#0f172a] text-[#94a3b8] border border-[#334155] hover:border-[#475569]"
                                        }`}
                                    disabled={isLoading}
                                >
                                    {spec}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-white">Avatar Color</Label>
                        <div className="flex gap-2">
                            {AVATAR_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setAvatarColor(color)}
                                    className={`w-10 h-10 rounded-full transition-transform ${avatarColor === color ? "ring-2 ring-white scale-110" : ""
                                        }`}
                                    style={{ backgroundColor: color }}
                                    disabled={isLoading}
                                />
                            ))}
                        </div>
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
                            {isLoading ? "Adding..." : "Add Employee"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
