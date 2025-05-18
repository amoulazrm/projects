import { getProject } from "@/lib/api"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

export default async function ProjectPage({
  params,
}: {
  params: { id: string }
}) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
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
            <Link href="/auth/login">
              <Button>Login</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-12">
        <Link href="/projects" className="flex items-center text-sm mb-6 hover:underline">
          ← Back to projects
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
            <p className="text-gray-500 mb-4">Created on {formatDate(project.created_at)}</p>
            <div className="prose dark:prose-invert max-w-none">
              <p>{project.description}</p>
            </div>
            {project.url && (
              <Button className="mt-6" asChild>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </Button>
            )}
          </div>
          <div>
            {project.image ? (
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-auto"
              />
            ) : (
              <div className="bg-gray-200 dark:bg-gray-800 rounded-lg w-full aspect-video flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>
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
