"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface LoginResponse {
  access: string;
  refresh: string;
}

export async function login(email: string, password: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  const data: LoginResponse = await response.json();

  const cookieStore = await cookies();

  cookieStore.set("token", data.access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 1 hour
    path: "/",
  });

  cookieStore.set("refresh_token", data.refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<void> {
  const response = await fetch(`${API_URL}/api/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email,
      email,
      password,
      first_name: name.split(" ")[0],
      last_name: name.split(" ").slice(1).join(" "),
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Registration failed");
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();

  cookies().delete({ name: 'token', path: '/' });
  cookies().delete({ name: 'refresh_token', path: '/' });
}

export async function getSession(): Promise<any | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/api/user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}
