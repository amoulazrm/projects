"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createProject, updateProject } from "@/lib/api"
import { toast } from "sonner"
import type { Project, ProjectFormData } from "@/lib/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProjectFormProps {
  project?: Project
  isEditing?: boolean
}

export function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: project?.title || "",
    description: project?.description || "",
    start_date: project?.start_date || "",
    end_date: project?.end_date || "",
    status: project?.status || "not_started",
    progress: project?.progress || 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing && project) {
        await updateProject(project.id, formData)
        toast.success("Project updated successfully")
      } else {
        await createProject(formData)
        toast.success("Project created successfully")
      }
      router.push("/dashboard/projects")
      router.refresh()
    } catch (error) {
      toast.error(
        isEditing
          ? "Failed to update project. Please try again."
          : "Failed to create project. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-secondary border-border">
      <CardHeader>
        <CardTitle className="text-primary">{isEditing ? "Edit Project" : "Create New Project"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Project Title"
              className="bg-input text-foreground border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your project"
              rows={5}
              className="bg-input text-foreground border-border"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
              <Label htmlFor="start_date" className="text-foreground">Start Date</Label>
            <Input
                id="start_date"
                name="start_date"
                type="date"
                value={formData.start_date}
                onChange={handleChange}
                required
                className="bg-input text-foreground border-border"
            />
          </div>
          <div className="space-y-2">
              <Label htmlFor="end_date" className="text-foreground">End Date</Label>
              <Input
                id="end_date"
                name="end_date"
                type="date"
                value={formData.end_date}
                onChange={handleChange}
                required
                className="bg-input text-foreground border-border"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-foreground">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger className="bg-input text-foreground border-border">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not_started">Not Started</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="progress" className="text-foreground">Progress</Label>
            <Input
                id="progress"
                name="progress"
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={handleChange}
                required
                className="bg-input text-foreground border-border"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading} className="border-border text-foreground hover:bg-secondary">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {isLoading ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Project" : "Create Project"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
