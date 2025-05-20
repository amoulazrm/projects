import { 
  User, 
  Project, 
  Task, 
  Comment,
  Notification,
  ApiResponse, 
  PaginatedResponse,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  ProjectFormData,
  TaskFormData,
  ProfileFormData,
  Team,
  DashboardStats
} from './types'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Auth functions
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/api/auth/login/`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to login')
  }

  const data = await response.json()
  if (data.token) {
    Cookies.set('auth_token', data.token, { expires: 7 }) // Token expires in 7 days
  }
  return data
}

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/api/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      username: email.split('@')[0],
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to register')
  }

  const data = await response.json()
  if (data.token) {
    Cookies.set('auth_token', data.token, { expires: 7 }) // Token expires in 7 days
  }
  return data
}

export const logout = async (): Promise<void> => {
  Cookies.remove('auth_token')
  const response = await fetch(`${API_URL}/api/auth/logout/`, {
    method: 'POST',
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Logout failed')
  }
}

// User profile functions
export const getUserProfile = async (): Promise<User> => {
  const response = await fetch(`${API_URL}/api/users/profile/`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user profile')
  }

  return response.json()
}

export const updateUserProfile = async (data: Partial<User>): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/api/users/profile/`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      console.error('Failed to update user profile:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
        url: response.url,
        headers: Object.fromEntries(response.headers.entries())
      })
      throw new Error(errorData?.detail || `Failed to update user profile: ${response.status} ${response.statusText}`)
  }

    return response.json()
  } catch (error) {
    console.error('Error in updateUserProfile:', error)
    throw error
  }
}

export const uploadProfileImage = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await fetch(`${API_URL}/api/users/profile/image/`, {
      method: 'POST',
      headers: {
        Authorization: getAuthHeaders().Authorization,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      console.error('Failed to upload profile image:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
        url: response.url,
        headers: Object.fromEntries(response.headers.entries())
      })
      throw new Error(errorData?.detail || `Failed to upload profile image: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    if (!data.url) {
      throw new Error('No image URL returned from server')
    }
    return { url: data.url }
  } catch (error) {
    console.error('Error in uploadProfileImage:', error)
    throw error
  }
}

// Project functions
export const getProjects = async (params?: { limit?: number }): Promise<PaginatedResponse<Project>> => {
  const queryParams = new URLSearchParams()
  if (params?.limit) queryParams.append('limit', params.limit.toString())

  const response = await fetch(`${API_URL}/api/projects/?${queryParams}`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch projects')
  }

  return response.json()
}

export const getProject = async (id: number): Promise<Project> => {
  const response = await fetch(`${API_URL}/api/projects/${id}/`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch project')
  }

  return response.json()
}

export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> => {
  console.log('Creating project with data:', project);
  const response = await fetch(`${API_URL}/api/projects/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(project),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Failed to create project:', {
      status: response.status,
      statusText: response.statusText,
      errorData,
      headers: Object.fromEntries(response.headers.entries())
    });
    throw new Error('Failed to create project');
  }

  const result = await response.json();
  console.log('Project created successfully:', result);
  return result;
}

export const updateProject = async (id: number, data: Partial<Project>): Promise<Project> => {
  const response = await fetch(`${API_URL}/api/projects/${id}/`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to update project')
  }

  return response.json()
}

export const deleteProject = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/projects/${id}/`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to delete project')
  }
}

// Task functions
export const getTasks = async (params?: { limit?: number }): Promise<PaginatedResponse<Task>> => {
  const queryParams = new URLSearchParams()
  if (params?.limit) queryParams.append('limit', params.limit.toString())

  try {
    const response = await fetch(`${API_URL}/api/tasks/?${queryParams}`, {
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      console.error('Failed to fetch tasks:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      })
      throw new Error('Failed to fetch tasks')
    }

    const data = await response.json()
    
    // Ensure each task has the required project data
    const tasksWithDefaults = data.results.map((task: Task) => ({
      ...task,
      project: task.project || {
        id: 0,
        title: "Unassigned Project",
        description: "",
        start_date: "",
        end_date: "",
        status: "not_started",
        progress: 0,
        user: task.assigned_to,
        created_at: "",
        updated_at: ""
      },
      assigned_to: task.assigned_to || {
        id: 0,
        email: "",
        first_name: "Unassigned",
        last_name: "User",
        created_at: "",
        updated_at: ""
      }
    }))

    return {
      ...data,
      results: tasksWithDefaults
    }
  } catch (error) {
    console.error('Error in getTasks:', error)
    throw error
  }
}

export const getTask = async (id: number): Promise<Task> => {
  const response = await fetch(`${API_URL}/api/tasks/${id}/`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch task')
  }

  return response.json()
}

export const createTask = async (data: {
  title: string
  description: string
  due_date: string
  priority: "low" | "medium" | "high"
  status: "todo" | "in_progress" | "completed"
  project_id: number
}): Promise<Task> => {
  console.log('Creating task with data:', JSON.stringify(data, null, 2));
  try {
    const response = await fetch(`${API_URL}/api/tasks/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Failed to create task:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
        headers: Object.fromEntries(response.headers.entries())
      });
      throw new Error(`Failed to create task: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Task created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error in createTask:', error);
    throw error;
  }
}

export const updateTask = async (id: number, data: Partial<Task>): Promise<Task> => {
  const response = await fetch(`${API_URL}/api/tasks/${id}/`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to update task')
  }

  return response.json()
}

export const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/tasks/${id}/`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to delete task')
  }
}

// Comment functions
export const getTaskComments = async (taskId: number): Promise<Comment[]> => {
  const response = await fetch(`${API_URL}/api/tasks/${taskId}/comments/`, {
    headers: getAuthHeaders(),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch comments')
  }

  return data
}

export const createComment = async (taskId: number, content: string): Promise<Comment> => {
  const response = await fetch(`${API_URL}/api/tasks/${taskId}/comments/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ content }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create comment')
  }

  return data
}

// Team functions
export const getTeams = async (): Promise<PaginatedResponse<Team>> => {
  const response = await fetch(`${API_URL}/api/teams/`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch teams')
  }

  return response.json()
}

export const getTeam = async (id: number): Promise<Team> => {
  const response = await fetch(`${API_URL}/api/teams/${id}/`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch team')
  }

  return response.json()
}

export async function createTeam(team: {
  name: string
  description: string
}): Promise<any> {
  const response = await fetch(`${API_URL}/api/teams/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(team),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Failed to create team")
  }

  return response.json()
}

// Dashboard functions
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const headers = getAuthHeaders()
    console.log('Making request to dashboard stats with headers:', headers)
    console.log('API URL:', `${API_URL}/api/users/dashboard_stats/`)
    
    const response = await fetch(`${API_URL}/api/users/dashboard_stats/`, {
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      console.error('Dashboard stats request failed:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
        url: response.url,
        headers: Object.fromEntries(response.headers.entries())
      })
      throw new Error(`Failed to fetch dashboard stats: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('Dashboard stats response:', data)
    return data
  } catch (error) {
    console.error('Error in getDashboardStats:', error)
    throw error
  }
}

// Notification functions
export const getNotifications = async (): Promise<PaginatedResponse<Notification>> => {
  const response = await fetch(`${API_URL}/api/notifications/`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch notifications')
  }

  return response.json()
}

export const markNotificationAsRead = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/notifications/${id}/read/`, {
    method: 'POST',
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to mark notification as read')
  }
}

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = Cookies.get('auth_token')
  console.log('Auth token from cookies:', token ? 'Present' : 'Missing')
  
  if (!token) {
    console.warn('No auth token found in cookies')
  }
  
  return {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  }
}
