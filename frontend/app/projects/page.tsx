import { getProjects } from "@/lib/api"
import { ProjectCard } from "@/components/project-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function ProjectsPage() {
  const projects = await getProjects()

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
        <h1 className="text-3xl font-bold mb-8 text-primary">All Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
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
