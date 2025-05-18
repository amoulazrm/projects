import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AboutPage() {
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
        <h1 className="text-3xl font-bold mb-8">About Me</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=600&width=600" alt="Profile" fill className="object-cover" priority />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">John Doe</h2>
            <p className="text-muted-foreground mb-4">
              I'm a full-stack developer with over 5 years of experience building web applications. I specialize in
              React, Next.js, and Django, creating responsive and user-friendly interfaces backed by robust APIs.
            </p>
            <p className="text-muted-foreground mb-6">
              My journey in web development began during college, where I discovered my passion for creating digital
              experiences. Since then, I've worked with startups and established companies to bring their ideas to life.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/contact">Contact Me</Link>
              </Button>
              <Button asChild variant="outline">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Download Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">My Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-bold mb-3">Frontend Development</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>React / Next.js</li>
                <li>TypeScript / JavaScript</li>
                <li>HTML / CSS</li>
                <li>Tailwind CSS</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-bold mb-3">Backend Development</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Django / Python</li>
                <li>Node.js / Express</li>
                <li>RESTful APIs</li>
                <li>GraphQL</li>
                <li>Authentication & Authorization</li>
              </ul>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-bold mb-3">Database</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>PostgreSQL</li>
                <li>MySQL</li>
                <li>MongoDB</li>
                <li>Redis</li>
                <li>Database Design</li>
              </ul>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-bold mb-3">DevOps & Tools</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Git / GitHub</li>
                <li>Docker</li>
                <li>CI/CD</li>
                <li>AWS / Vercel / Heroku</li>
                <li>Testing (Jest, Pytest)</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          <div className="space-y-8">
            <div className="border-l-2 pl-6 pb-2 relative">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
              <h3 className="font-bold">Senior Developer at Tech Company</h3>
              <p className="text-sm text-muted-foreground mb-2">2021 - Present</p>
              <p className="text-muted-foreground">
                Led the development of multiple web applications, mentored junior developers, and implemented best
                practices for code quality and performance.
              </p>
            </div>
            <div className="border-l-2 pl-6 pb-2 relative">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
              <h3 className="font-bold">Full Stack Developer at Startup</h3>
              <p className="text-sm text-muted-foreground mb-2">2019 - 2021</p>
              <p className="text-muted-foreground">
                Built and maintained web applications using React and Django, collaborated with designers and product
                managers to deliver features on time.
              </p>
            </div>
            <div className="border-l-2 pl-6 pb-2 relative">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
              <h3 className="font-bold">Junior Developer at Agency</h3>
              <p className="text-sm text-muted-foreground mb-2">2018 - 2019</p>
              <p className="text-muted-foreground">
                Developed websites for clients, worked on responsive designs, and learned best practices for web
                development.
              </p>
            </div>
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
