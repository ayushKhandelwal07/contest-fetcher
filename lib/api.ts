import type { Contest } from "./types"

// Base URL for the API
const API_BASE_URL = "/api"

/**
 * Fetches all contests from the backend
 * @returns Promise<Contest[]> Array of contests
 */
export async function fetchContests(): Promise<Contest[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/contests`)

    if (!response.ok) {
      throw new Error(`Error fetching contests: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch contests:", error)
    // Return mock data for demonstration purposes
    return getMockContests()
  }
}

/**
 * Adds a solution link to a contest
 * @param contestId The ID of the contest
 * @param platform The platform of the contest
 * @param youtubeLink The YouTube solution link
 * @returns Promise<void>
 */
export async function addSolutionLink(contestId: string, platform: string, youtubeLink: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/contests/solution`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contestId,
        platform,
        youtubeLink,
      }),
    })

    if (!response.ok) {
      throw new Error(`Error adding solution link: ${response.statusText}`)
    }
  } catch (error) {
    console.error("Failed to add solution link:", error)
    throw error
  }
}

/**
 * Fetches YouTube videos from the backend
 * @returns Promise<any[]> Array of YouTube videos
 */
export async function fetchYoutubeVideos(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/youtube`)

    if (!response.ok) {
      throw new Error(`Error fetching YouTube videos: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch YouTube videos:", error)
    throw error
  }
}

/**
 * Returns mock contest data for demonstration purposes
 * In a real application, this would be replaced with actual API calls
 */
function getMockContests(): Contest[] {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const nextWeek = new Date(now)
  nextWeek.setDate(nextWeek.getDate() + 7)

  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)

  const lastWeek = new Date(now)
  lastWeek.setDate(lastWeek.getDate() - 7)

  return [
    {
      id: "cf-1234",
      name: "Codeforces Round #789 (Div. 2)",
      url: "https://codeforces.com/contests/1234",
      platform: "Codeforces",
      startTime: tomorrow.toISOString(),
      endTime: new Date(tomorrow.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      duration: 2,
    },
    {
      id: "cc-5678",
      name: "CodeChef Starters 42",
      url: "https://www.codechef.com/START42",
      platform: "CodeChef",
      startTime: nextWeek.toISOString(),
      endTime: new Date(nextWeek.getTime() + 3 * 60 * 60 * 1000).toISOString(),
      duration: 3,
    },
    {
      id: "lc-9012",
      name: "LeetCode Weekly Contest 345",
      url: "https://leetcode.com/contest/weekly-contest-345",
      platform: "LeetCode",
      startTime: new Date(tomorrow.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(tomorrow.getTime() + 3 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000).toISOString(),
      duration: 1.5,
    },
    {
      id: "cf-1111",
      name: "Codeforces Round #788 (Div. 1)",
      url: "https://codeforces.com/contests/1111",
      platform: "Codeforces",
      startTime: yesterday.toISOString(),
      endTime: new Date(yesterday.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      duration: 2,
      solutionLink: "https://www.youtube.com/watch?v=example1",
    },
    {
      id: "cc-2222",
      name: "CodeChef Starters 41",
      url: "https://www.codechef.com/START41",
      platform: "CodeChef",
      startTime: lastWeek.toISOString(),
      endTime: new Date(lastWeek.getTime() + 3 * 60 * 60 * 1000).toISOString(),
      duration: 3,
    },
    {
      id: "lc-3333",
      name: "LeetCode Weekly Contest 344",
      url: "https://leetcode.com/contest/weekly-contest-344",
      platform: "LeetCode",
      startTime: new Date(lastWeek.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(lastWeek.getTime() - 3 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000).toISOString(),
      duration: 1.5,
      solutionLink: "https://www.youtube.com/watch?v=example2",
    },
  ]
}

