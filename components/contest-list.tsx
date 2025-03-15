"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookmarkPlus, BookmarkCheck, ExternalLink, Youtube } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import type { Contest } from "@/lib/types"

interface ContestListProps {
  contests: Contest[]
  bookmarkedContests: string[]
  toggleBookmark: (contestId: string) => void
  type: "upcoming" | "past" | "bookmarked"
}

export default function ContestList({ contests, bookmarkedContests, toggleBookmark, type }: ContestListProps) {
  if (contests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No contests found</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
      {contests.map((contest) => {
        const isBookmarked = bookmarkedContests.includes(contest.id)
        const startDate = new Date(contest.startTime)
        const endDate = new Date(contest.endTime)
        const isPast = startDate <= new Date()
        const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)

        return (
          <Card key={contest.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge
                  variant="outline"
                  className={
                    contest.platform.toLowerCase() === "codeforces"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : contest.platform.toLowerCase() === "codechef"
                        ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                        : contest.platform.toLowerCase() === "leetcode"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-500 dark:text-amber-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                  }
                >
                  {contest.platform}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleBookmark(contest.id)}
                  aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="h-5 w-5 text-primary" />
                  ) : (
                    <BookmarkPlus className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <CardTitle className="line-clamp-2">{contest.name}</CardTitle>
              <CardDescription>
                {format(startDate, "PPP")} at {format(startDate, "p")}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{duration.toFixed(1)} hours</span>
                </div>

                {!isPast && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Starts in:</span>
                    <span className="font-medium text-primary">
                      {formatDistanceToNow(startDate, { addSuffix: true })}
                    </span>
                  </div>
                )}

                {contest.solutionLink && (
                  <div className="flex items-center gap-2 text-sm mt-2">
                    <Youtube className="h-4 w-4 text-red-500" />
                    <span className="text-muted-foreground">Solution available</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex gap-2 w-full">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <a href={contest.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit
                  </a>
                </Button>

                {contest.solutionLink && (
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <a href={contest.solutionLink} target="_blank" rel="noopener noreferrer">
                      <Youtube className="h-4 w-4 mr-2" />
                      Solution
                    </a>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

