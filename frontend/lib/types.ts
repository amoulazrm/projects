export interface Project {
  id: string
  title: string
  description: string
  image?: string
  url?: string
  created_at: string
  user_id: string
}

export interface User {
  id: string
  name: string
  email: string
}
