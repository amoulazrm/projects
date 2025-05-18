import { redirect, notFound } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getProject } from "@/lib/api"
import { ProjectForm } from "@/components/project-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function EditProjectPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login")
  }

  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  // In a real app, you would check if the project belongs to the current user
  // if (project.user_id !== session.user.id) {
  //   redirect("/dashboard")
  // }

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
          <h1 className="text-3xl font-bold mt-4">Edit Project</h1>
        </div>
        <div className="max-w-2xl mx-auto">
          <ProjectForm project={project} isEditing />
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
