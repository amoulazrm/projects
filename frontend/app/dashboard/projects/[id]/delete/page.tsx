"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { deleteProject, getProject } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import type { Project } from "@/lib/types"

export default function DeleteProjectPage({
  params,
}: {
  params: { id: string }
}) {
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingProject, setIsLoadingProject] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProject(params.id)
        setProject(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load project. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoadingProject(false)
      }
    }

    fetchProject()
  }, [params.id, toast])

  const handleDelete = async () => {
    setIsLoading(true)

    try {
      await deleteProject(params.id)
      toast({
        title: "Success",
        description: "Project deleted successfully.",
      })
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingProject) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="font-bold text-xl">
              Portfolio
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/projects">
                <Button variant="ghost">Projects</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/api/auth/logout">
                <Button variant="outline">Logout</Button>
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 container py-12 flex items-center justify-center">
          <p>Loading...</p>
        </main>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="font-bold text-xl">
              Portfolio
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/projects">
                <Button variant="ghost">Projects</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/api/auth/logout">
                <Button variant="outline">Logout</Button>
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 container py-12 flex items-center justify-center">
          <Card>
            <CardHeader>
              <CardTitle>Project Not Found</CardTitle>
              <CardDescription>The project you are trying to delete does not exist.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            Portfolio
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/projects">
              <Button variant="ghost">Projects</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/api/auth/logout">
              <Button variant="outline">Logout</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-12">
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center text-sm hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Delete Project</CardTitle>
              <CardDescription>
                Are you sure you want to delete &quot;{project.title}&quot;? This action cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">This will permanently delete the project and all associated data.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()} disabled={isLoading}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                {isLoading ? "Deleting..." : "Delete Project"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              About
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
