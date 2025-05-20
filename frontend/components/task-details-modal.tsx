"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Task } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, AlertCircle, CheckCircle, Folder } from "lucide-react"
import { useEffect } from "react"

interface TaskDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
}

export function TaskDetailsModal({ isOpen, onClose, task }: TaskDetailsModalProps) {
  useEffect(() => {
    console.log('TaskDetailsModal state:', { isOpen, task })
  }, [isOpen, task])

  if (!task) {
    console.log('TaskDetailsModal: No task provided')
    return null
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "todo":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy")
    } catch (error) {
      console.error('Error formatting date:', dateString, error)
      return "Invalid date"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{task.title || "Untitled Task"}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {task.description || "No description provided"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Due Date</span>
              </div>
              <p className="font-medium">
                {formatDate(task.due_date)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Created</span>
              </div>
              <p className="font-medium">
                {formatDate(task.created_at)}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span>Priority</span>
            </div>
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : "Not set"}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4" />
              <span>Status</span>
            </div>
            <Badge className={getStatusColor(task.status)}>
              {task.status === "in_progress" ? "In Progress" : 
               task.status ? task.status.charAt(0).toUpperCase() + task.status.slice(1) : "Not set"}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Folder className="h-4 w-4" />
              <span>Project</span>
            </div>
            <p className="font-medium">
              {task.project?.title || "Unassigned Project"}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Assigned To</span>
            </div>
            <p className="font-medium">
              {task.assigned_to?.first_name && task.assigned_to?.last_name
                ? `${task.assigned_to.first_name} ${task.assigned_to.last_name}`
                : "Unassigned"}
            </p>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 