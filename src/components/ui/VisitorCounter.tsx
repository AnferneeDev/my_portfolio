'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export default function VisitorCounter() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
          console.warn("VisitorCounter: NEXT_PUBLIC_API_URL is not set in environment variables.");
          return;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        if (data.visits !== undefined && data.visits !== null) {
          setVisits(data.visits);
        }
      } catch (error) {
        console.error("Failed to fetch visitor count", error);
      }
    };

    fetchVisits();
  }, []);

  if (visits === null) return null;

  return (
    <div className="inline-flex items-center gap-2 text-xs md:text-sm text-muted-foreground border border-border/40 rounded-full px-3 py-1.5 bg-background/50 backdrop-blur-sm shadow-sm transition-all hover:bg-muted/50 hover:text-foreground">
      <Eye className="w-4 h-4" />
      <span>{visits.toLocaleString()} profile views</span>
    </div>
  );
}
