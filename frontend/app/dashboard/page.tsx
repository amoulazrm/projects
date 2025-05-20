"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { getDashboardStats, getProjects, getTasks } from "@/lib/api"
import { DashboardStats, Project, Task } from "@/lib/types"
import { toast } from "sonner"

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentProjects, setRecentProjects] = useState<Project[]>([])
  const [recentTasks, setRecentTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, projectsData, tasksData] = await Promise.all([
          getDashboardStats(),
          getProjects({ limit: 5 }),
          getTasks({ limit: 5 }),
        ])

        setStats(statsData)
        setRecentProjects(projectsData?.results || [])
        setRecentTasks(tasksData?.results || [])
      } catch (error) {
        toast.error("Failed to load dashboard data")
        console.error(error)
        setRecentProjects([])
        setRecentTasks([])
      } finally {
        setLoading(false)
  }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome back, {user?.first_name}!</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Projects</h3>
          <p className="text-2xl font-bold mt-2">{stats?.total_projects || 0}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Tasks</h3>
          <p className="text-2xl font-bold mt-2">{stats?.total_tasks || 0}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Team Members</h3>
          <p className="text-2xl font-bold mt-2">{stats?.total_team_members || 0}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Pending Tasks</h3>
          <p className="text-2xl font-bold mt-2">{stats?.pending_tasks || 0}</p>
        </Card>
      </div>

      {/* Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
          <div className="space-y-4">
            {(recentProjects || []).map((project) => (
              <div key={project.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  project.status === "completed" ? "bg-green-100 text-green-800" :
                  project.status === "in_progress" ? "bg-blue-100 text-blue-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {project.status}
                </span>
        </div>
            ))}
          </div>
        </Card>

        {/* Recent Tasks */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
          <div className="space-y-4">
            {(recentTasks || []).map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  task.status === "completed" ? "bg-green-100 text-green-800" :
                  task.status === "in_progress" ? "bg-blue-100 text-blue-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {task.status}
                </span>
                  </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {(stats?.recent_activities || []).map((activity, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-1">
                <p className="text-sm">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.timestamp ? new Date(activity.timestamp).toLocaleString() : ''}
                </p>
              </div>
          </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
