"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import { getProjects } from "@/lib/api"
import { Project } from "@/lib/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface NewTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: {
    title: string
    description: string
    due_date: string
    priority: "low" | "medium" | "high"
    status: "todo" | "in_progress" | "completed"
    project_id: number
  }) => void
}

export function NewTaskModal({ isOpen, onClose, onSubmit }: NewTaskModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState<Date>()
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [isLoading, setIsLoading] = useState(false)

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setTitle("")
      setDescription("")
      setDueDate(undefined)
      setPriority("medium")
      setIsLoading(false)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title || !dueDate) {
      console.log('Missing required fields:', { title, dueDate })
      return
    }

    setIsLoading(true)
    try {
      const taskData = {
        title,
        description,
        due_date: dueDate.toISOString().split('T')[0],
        priority,
        status: "todo" as const,
        project_id: 1 // Default to first project for now
      }
      
      console.log('Submitting task:', taskData)
      await onSubmit(taskData)
      onClose()
    } catch (error) {
      console.error('Error creating task:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const canSubmit = Boolean(title && dueDate && !isLoading)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  disabled={isLoading}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  disabled={isLoading}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>Priority</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={priority === "low" ? "default" : "outline"}
                onClick={() => setPriority("low")}
                className="flex-1"
                disabled={isLoading}
              >
                Low
              </Button>
              <Button
                type="button"
                variant={priority === "medium" ? "default" : "outline"}
                onClick={() => setPriority("medium")}
                className="flex-1"
                disabled={isLoading}
              >
                Medium
              </Button>
              <Button
                type="button"
                variant={priority === "high" ? "default" : "outline"}
                onClick={() => setPriority("high")}
                className="flex-1"
                disabled={isLoading}
              >
                High
              </Button>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={!canSubmit}
            >
              {isLoading ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 