import React from "react";
import Image from "next/image";

interface PlatformLogoProps {
  platform: string;
  className?: string;
}

export function PlatformLogo({ platform, className = "h-4 w-4" }: PlatformLogoProps) {
  const platformLower = platform.toLowerCase();
  
  // Map platform names to their image paths
  const logoMap: Record<string, string> = {
    "leetcode": "/images/leetcode-logo.png",
    "codeforces": "/images/codeforces-logo.png",
    "codechef": "/images/codechef-logo.png",
    // Add more platforms as needed
  };
  
  const logoPath = logoMap[platformLower];
  
  if (!logoPath) {
    return null;
  }
  
  return (
    <Image
      src={logoPath}
      alt={`${platform} logo`}
      width={16}
      height={16}
      className={className}
    />
  );
}