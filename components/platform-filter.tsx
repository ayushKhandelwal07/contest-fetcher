"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface PlatformFilterProps {
  selectedPlatforms: string[]
  onChange: (platforms: string[]) => void
}

export default function PlatformFilter({ selectedPlatforms, onChange }: PlatformFilterProps) {
  const platforms = [
    { id: "codeforces", name: "Codeforces" },
    { id: "codechef", name: "CodeChef" },
    { id: "leetcode", name: "LeetCode" },
  ]

  const handleToggle = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      // Don't allow deselecting all platforms
      if (selectedPlatforms.length > 1) {
        onChange(selectedPlatforms.filter((p) => p !== platform))
      }
    } else {
      onChange([...selectedPlatforms, platform])
    }
  }

  return (
    <div className="bg-muted/40 p-4 rounded-lg">
      <h2 className="font-medium mb-3">Filter Platforms</h2>
      <div className="flex flex-wrap gap-4">
        {platforms.map((platform) => (
          <div key={platform.id} className="flex items-center space-x-2">
            <Checkbox
              id={platform.id}
              checked={selectedPlatforms.includes(platform.id)}
              onCheckedChange={() => handleToggle(platform.id)}
            />
            <Label htmlFor={platform.id}>{platform.name}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

