"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { addSolutionLink } from "@/lib/api"

export default function AdminPage() {
  const router = useRouter()
  const [contestId, setContestId] = useState("")
  const [platform, setPlatform] = useState("")
  const [youtubeLink, setYoutubeLink] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!contestId || !platform || !youtubeLink) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      await addSolutionLink(contestId, platform, youtubeLink)

      toast({
        title: "Success",
        description: "Solution link added successfully",
      })

      // Reset form
      setContestId("")
      setPlatform("")
      setYoutubeLink("")
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to add solution link",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Add Solution Link</CardTitle>
            <CardDescription>Add YouTube solution links to past contests</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="codeforces">Codeforces</SelectItem>
                    <SelectItem value="codechef">CodeChef</SelectItem>
                    <SelectItem value="leetcode">LeetCode</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contestId">Contest ID</Label>
                <Input
                  id="contestId"
                  value={contestId}
                  onChange={(e) => setContestId(e.target.value)}
                  placeholder="Enter contest ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtubeLink">YouTube Solution Link</Label>
                <Input
                  id="youtubeLink"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Adding..." : "Add Solution Link"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

