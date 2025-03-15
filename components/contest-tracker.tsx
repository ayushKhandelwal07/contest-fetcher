"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import ContestList from "@/components/contest-list"
import PlatformFilter from "@/components/platform-filter"
import type { Contest } from "@/lib/types"
import { fetchContests } from "@/lib/api"

export default function ContestTracker() {
  const [contests, setContests] = useState<Contest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [bookmarkedContests, setBookmarkedContests] = useState<string[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["codeforces", "codechef", "leetcode"])
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const loadContests = async () => {
      try {
        setLoading(true)
        const data = await fetchContests()
        setContests(data)
      } catch (err) {
        setError("Failed to load contests. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadContests()

    // Load bookmarks from localStorage
    if (typeof window !== 'undefined') {
      const savedBookmarks = localStorage.getItem("bookmarkedContests")
      if (savedBookmarks) {
        setBookmarkedContests(JSON.parse(savedBookmarks))
      }
    }
  }, [])

  const toggleBookmark = (contestId: string) => {
    setBookmarkedContests((prev) => {
      const newBookmarks = prev.includes(contestId) ? prev.filter((id) => id !== contestId) : [...prev, contestId]

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem("bookmarkedContests", JSON.stringify(newBookmarks))
      }
      return newBookmarks
    })
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handlePlatformChange = (platforms: string[]) => {
    setSelectedPlatforms(platforms)
  }

  const upcomingContests = contests
    .filter((contest) => new Date(contest.startTime) > new Date())
    .filter((contest) => selectedPlatforms.includes(contest.platform.toLowerCase()))
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())

  const pastContests = contests
    .filter((contest) => new Date(contest.startTime) <= new Date())
    .filter((contest) => selectedPlatforms.includes(contest.platform.toLowerCase()))
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())

  const bookmarked = contests
    .filter((contest) => bookmarkedContests.includes(contest.id))
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-4">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error</h2>
          <p>{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Contest Tracker</h1>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <PlatformFilter selectedPlatforms={selectedPlatforms} onChange={handlePlatformChange} />

      <Tabs defaultValue="upcoming" className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming ({upcomingContests.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastContests.length})</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked ({bookmarked.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <ContestList
            contests={upcomingContests}
            bookmarkedContests={bookmarkedContests}
            toggleBookmark={toggleBookmark}
            type="upcoming"
          />
        </TabsContent>

        <TabsContent value="past">
          <ContestList
            contests={pastContests}
            bookmarkedContests={bookmarkedContests}
            toggleBookmark={toggleBookmark}
            type="past"
          />
        </TabsContent>

        <TabsContent value="bookmarked">
          <ContestList
            contests={bookmarked}
            bookmarkedContests={bookmarkedContests}
            toggleBookmark={toggleBookmark}
            type="bookmarked"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
