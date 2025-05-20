"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { NewTeamModal } from "@/components/new-team-modal"
import { getTeams, createTeam } from "@/lib/api"

export default function TeamsPage() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [isNewTeamModalOpen, setIsNewTeamModalOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchTeams()
  }, [])

  const fetchTeams = async () => {
    try {
      const response = await getTeams()
      setTeams(response.results)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch teams",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleNewTeam = async (team: {
    name: string
    description: string
  }) => {
    try {
      await createTeam(team)
      toast({
        title: "Success",
        description: "Team created successfully",
      })
      fetchTeams() // Refresh the teams list
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create team",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading teams...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl text-primary">
            Portfolio
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link href="/dashboard/projects" className="nav-link">
              Projects
            </Link>
            <Link href="/dashboard/tasks" className="nav-link">
              Tasks
            </Link>
            <Link href="/dashboard/teams" className="nav-link active">
              Teams
            </Link>
            <Link href="/dashboard/profile" className="nav-link">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Teams</h1>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => setIsNewTeamModalOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Team
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teams.length}</div>
              <p className="text-xs text-muted-foreground">
                All teams
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Your Teams</CardTitle>
          </CardHeader>
          <CardContent>
            {teams.length === 0 ? (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No teams yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Create a new team to start collaborating with others.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {teams.map((team: any) => (
                  <div key={team.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{team.name}</h3>
                      <p className="text-sm text-muted-foreground">{team.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <NewTeamModal
        isOpen={isNewTeamModalOpen}
        onClose={() => setIsNewTeamModalOpen(false)}
        onSubmit={handleNewTeam}
      />
    </div>
  )
} 