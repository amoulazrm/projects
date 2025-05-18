import { getToken } from './auth';
import type { Project } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const getAuthHeaders = async () => {
  const token = await getToken();
  if (!token) throw new Error('User is not authenticated');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
};

// 🔹 Public: Get all projects
export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${API_URL}/api/project/`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.statusText}`);
  }

  return await response.json();
}

// 🔹 Public: Get one project
export async function getProject(id: string): Promise<Project | null> {
  const response = await fetch(`${API_URL}/api/project/${id}/`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch project: ${response.statusText}`);
  }

  return await response.json();
}

// 🔐 Private: Get user-specific projects
export async function getUserProjects(): Promise<Project[]> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/api/project/user_projects/`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user projects: ${response.statusText}`);
  }

  return await response.json();
}

// 🔐 Private: Create a project
export async function createProject(
  project: Omit<Project, 'id' | 'created_at' | 'user_id'>
): Promise<Project> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/api/project/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create project: ${error}`);
  }

  return await response.json();
}

// 🔐 Private: Update a project
export async function updateProject(
  id: string,
  project: Partial<Project>
): Promise<Project> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/api/project/${id}/`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update project: ${error}`);
  }

  return await response.json();
}

// 🔐 Private: Delete a project
export async function deleteProject(id: string): Promise<void> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/api/project/${id}/`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to delete project: ${error}`);
  }
}
