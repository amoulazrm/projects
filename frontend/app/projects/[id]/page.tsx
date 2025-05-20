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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl text-primary">
            Portfolio
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/projects">
              <Button variant="ghost" className="text-foreground hover:bg-secondary">Projects</Button>
            </Link>
            <Link href="/auth/login">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Login</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-12">
        <Link href="/projects" className="flex items-center text-sm mb-6 hover:text-accent">
          ← Back to projects
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-primary">{project.title}</h1>
            <p className="text-muted-foreground mb-4">Created on {formatDate(project.created_at)}</p>
            <div className="prose dark:prose-invert max-w-none">
              <p>{project.description}</p>
            </div>
            {project.url && (
              <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
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
              <div className="bg-secondary rounded-lg w-full aspect-video flex items-center justify-center">
                <p className="text-muted-foreground">No image available</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="w-full border-t border-border py-6 bg-secondary">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-accent">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-accent">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
