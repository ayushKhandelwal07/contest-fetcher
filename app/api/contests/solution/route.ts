import { NextResponse } from "next/server"

/**
 * POST handler for /api/contests/solution
 * Adds a YouTube solution link to a contest
 */
export async function POST(request: Request) {
  try {
    const { contestId, platform, youtubeLink } = await request.json()

    // Validate input
    if (!contestId || !platform || !youtubeLink) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real application, you would update the database here
    // For demonstration purposes, we'll just return success

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error adding solution link:", error)
    return NextResponse.json({ error: "Failed to add solution link" }, { status: 500 })
  }
}

