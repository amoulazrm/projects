import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getUserProjects } from "@/lib/api"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { PlusIcon } from "lucide-react"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login")
  }

  const projects = await getUserProjects()

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Projects</h1>
          <Link href="/dashboard/projects/new">
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">You don&apos;t have any projects yet</h2>
            <p className="text-gray-500 mb-6">Create your first project to get started</p>
            <Link href="/dashboard/projects/new">
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                actions={
                  <div className="flex gap-2 mt-4">
                    <Link href={`/dashboard/projects/${project.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/dashboard/projects/${project.id}/delete`}>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </Link>
                  </div>
                }
              />
            ))}
          </div>
        )}
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
