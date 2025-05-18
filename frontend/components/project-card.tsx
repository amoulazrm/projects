import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import type { Project } from "@/lib/types"

interface ProjectCardProps {
  project: Project
  actions?: React.ReactNode
}

export function ProjectCard({ project, actions }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        {project.image ? (
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <p className="text-gray-500">No image</p>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-2">{formatDate(project.created_at)}</p>
        <p className="line-clamp-3">{project.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Link href={`/projects/${project.id}`} className="text-primary hover:underline">
          View details
        </Link>
        {actions}
      </CardFooter>
    </Card>
  )
}
