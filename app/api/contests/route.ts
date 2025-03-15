import { NextResponse } from "next/server"
import type { Contest } from "@/lib/types"

/**
 * GET handler for /api/contests
 * Fetches contests from all platforms (Codeforces, CodeChef, LeetCode)
 */
export async function GET() {
  try {
    // Fetch contests from all platforms
    const [codeforcesContests, codechefContests, leetcodeContests] = await Promise.all([
      fetchCodeforcesContests(),
      fetchCodechefContests(),
      fetchLeetcodeContests(),
    ])

    // Combine all contests
    const allContests = [...codeforcesContests, ...codechefContests, ...leetcodeContests]

    return NextResponse.json(allContests)
  } catch (error) {
    console.error("Error fetching contests:", error)
    return NextResponse.json({ error: "Failed to fetch contests" }, { status: 500 })
  }
}

/**
 * Fetches contests from Codeforces API
 */
async function fetchCodeforcesContests(): Promise<Contest[]> {
  try {
    const response = await fetch("https://codeforces.com/api/contest.list")
    const data = await response.json()

    if (data.status !== "OK") {
      throw new Error("Codeforces API error")
    }

    return data.result
      .filter(
        (contest: any) =>
          !contest.phase.includes("FINISHED") ||
          new Date(contest.startTimeSeconds * 1000) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      )
      .map((contest: any) => ({
        id: `cf-${contest.id}`,
        name: contest.name,
        url: `https://codeforces.com/contest/${contest.id}`,
        platform: "Codeforces",
        startTime: new Date(contest.startTimeSeconds * 1000).toISOString(),
        endTime: new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000).toISOString(),
        duration: contest.durationSeconds / 3600,
      }))
  } catch (error) {
    console.error("Error fetching Codeforces contests:", error)
    return []
  }
}

/**
 * Fetches contests from CodeChef
 * Note: CodeChef doesn't have a public API, so we would need to scrape their website
 * For demonstration purposes, we'll return mock data
 */
async function fetchCodechefContests(): Promise<Contest[]> {
  // In a real application, you would implement web scraping here
  // For demonstration, returning mock data
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const nextWeek = new Date(now)
  nextWeek.setDate(nextWeek.getDate() + 7)

  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)

  return [
    {
      id: "cc-start42",
      name: "CodeChef Starters 42",
      url: "https://www.codechef.com/START42",
      platform: "CodeChef",
      startTime: nextWeek.toISOString(),
      endTime: new Date(nextWeek.getTime() + 3 * 60 * 60 * 1000).toISOString(),
      duration: 3,
    },
    {
      id: "cc-start41",
      name: "CodeChef Starters 41",
      url: "https://www.codechef.com/START41",
      platform: "CodeChef",
      startTime: yesterday.toISOString(),
      endTime: new Date(yesterday.getTime() + 3 * 60 * 60 * 1000).toISOString(),
      duration: 3,
    },
  ]
}

/**
 * Fetches contests from LeetCode
 * Note: LeetCode doesn't have a public API for contests, so we would need to scrape their website
 * For demonstration purposes, we'll return mock data
 */
async function fetchLeetcodeContests(): Promise<Contest[]> {
  // In a real application, you would implement web scraping here
  // For demonstration, returning mock data
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 3)

  const lastWeek = new Date(now)
  lastWeek.setDate(lastWeek.getDate() - 7)

  return [
    {
      id: "lc-weekly345",
      name: "LeetCode Weekly Contest 345",
      url: "https://leetcode.com/contest/weekly-contest-345",
      platform: "LeetCode",
      startTime: tomorrow.toISOString(),
      endTime: new Date(tomorrow.getTime() + 1.5 * 60 * 60 * 1000).toISOString(),
      duration: 1.5,
    },
    {
      id: "lc-weekly344",
      name: "LeetCode Weekly Contest 344",
      url: "https://leetcode.com/contest/weekly-contest-344",
      platform: "LeetCode",
      startTime: lastWeek.toISOString(),
      endTime: new Date(lastWeek.getTime() + 1.5 * 60 * 60 * 1000).toISOString(),
      duration: 1.5,
      solutionLink: "https://www.youtube.com/watch?v=example2",
    },
  ]
}

