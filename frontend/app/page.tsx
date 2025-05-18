import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getProjects } from "@/lib/api"
import { ProjectCard } from "@/components/project-card"
import type { Project } from "@/lib/types"
export default async function HomePage() {
  // Tell TS that getProjects returns Project[]
  const allProjects: Project[] = await getProjects()

  // Show only the first 3 projects on the home page
  const featuredProjects = allProjects.slice(0, 3)

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
      <main className="flex-1">
        <section className="w-full py-24 bg-gradient-to-b from-background to-muted">
          <div className="container flex flex-col items-center text-center gap-4">
            <h1 className="text-4xl md:text-5xl font-bold">Welcome to My Portfolio</h1>
            <p className="text-xl text-muted-foreground max-w-[600px]">
              Showcasing my projects and skills in web development, design, and more.
            </p>
            <div className="flex gap-4 mt-4">
              <Button asChild size="lg">
                <Link href="/projects">View All Projects</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Button asChild variant="outline">
                <Link href="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-16 bg-muted">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">About Me</h2>
                <p className="text-muted-foreground mb-4">
                  I'm a passionate developer with expertise in building modern web applications using technologies like
                  React, Next.js, and Django.
                </p>
                <p className="text-muted-foreground mb-6">
                  With a focus on creating clean, user-friendly interfaces and robust backend systems, I strive to
                  deliver high-quality solutions that meet client needs.
                </p>
                <Button asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
              <div className="bg-background rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Frontend</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>React / Next.js</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                      <li>HTML / CSS</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Backend</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>Django / Python</li>
                      <li>Node.js</li>
                      <li>RESTful APIs</li>
                      <li>SQL / NoSQL Databases</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
