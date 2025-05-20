export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  profile_image?: string
  phone?: string
  location?: string
  bio?: string
  website?: string
  github?: string
  linkedin?: string
  twitter?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: number
  title: string
  description: string
  start_date: string
  end_date: string
  status: "not_started" | "in_progress" | "completed" | "on_hold"
  progress: number
  user: User
  created_at: string
  updated_at: string
}

export interface Task {
  id: number
  title: string
  description: string
  due_date: string
  priority: "low" | "medium" | "high"
  status: "todo" | "in_progress" | "completed"
  project: Project
  project_id?: number
  assigned_to: User
  created_at: string
  updated_at: string
}

export interface Comment {
  id: number
  content: string
  user: User
  task: Task
  created_at: string
  updated_at: string
}

export interface Team {
  id: number
  name: string
  description: string
  members: User[]
  created_at: string
  updated_at: string
}

export interface Notification {
  id: number
  message: string
  timestamp: string
  read: boolean
  user: User
  created_at: string
  updated_at: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  first_name: string
  last_name: string
}

export interface ProjectFormData {
  title: string
  description: string
  start_date: string
  end_date: string
  status: Project['status']
  progress: number
}

export interface TaskFormData {
  title: string
  description: string
  due_date: string
  priority: Task['priority']
  status: Task['status']
  project_id: number
  assigned_to_id: number
}

export interface ProfileFormData {
  first_name: string
  last_name: string
  email: string
  phone?: string
  location?: string
  bio?: string
  profile_image?: File
}

export interface DashboardStats {
  total_projects: number
  total_tasks: number
  total_team_members: number
  pending_tasks: number
  recent_activities: Notification[]
}
