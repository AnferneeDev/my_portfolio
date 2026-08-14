'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export default function VisitorCounter() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchVisits = async () => {
      const isDev = process.env.NODE_ENV === 'development';
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        if (isDev && isMounted) {
          setVisits(1240);
        }
        return;
      }

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        if (isMounted && data.visits !== undefined && data.visits !== null) {
          setVisits(data.visits);
        }
      } catch {
        if (isDev && isMounted) {
          // Provide mock count in development to prevent error overlays when remote API isn't accessible locally
          setVisits(1240);
        }
      }
    };

    fetchVisits();

    return () => {
      isMounted = false;
    };
  }, []);

  if (visits === null) return null;

  return (
    <div className="inline-flex items-center gap-2 text-xs md:text-sm text-muted-foreground border border-border/40 rounded-full px-3 py-1.5 bg-background/50 backdrop-blur-sm shadow-sm transition-all hover:bg-muted/50 hover:text-foreground">
      <Eye className="w-4 h-4" />
      <span>{visits.toLocaleString()} profile views</span>
    </div>
  );
}
