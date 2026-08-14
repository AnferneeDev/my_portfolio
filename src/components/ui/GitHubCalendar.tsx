'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { Github } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface CalendarData {
  totalContributions: number;
  weeks: ContributionDay[][];
}

export default function GitHubCalendar({ username = 'AnferneeDev' }: { username?: string }) {
  const [data, setData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredDay, setHoveredDay] = useState<{
    count: number;
    date: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRealGitHubData = async () => {
      const calendarUrl = process.env.NEXT_PUBLIC_GITHUB_CALENDAR_URL;

      try {
        if (calendarUrl) {
          const res = await fetch(calendarUrl);
          if (!res.ok) throw new Error(`Calendar API error ${res.status}`);
          const json = await res.json();
          const calendar = json?.totalContributions !== undefined ? json : null;

          if (calendar && isMounted) {
            const mappedWeeks: ContributionDay[][] = calendar.weeks.map(
              (w: { contributionDays: Array<{ date: string; contributionCount: number; contributionLevel: string }> }) =>
                w.contributionDays.map((d) => {
                  let level: 0 | 1 | 2 | 3 | 4 = 0;
                  if (d.contributionLevel === 'FIRST_QUARTILE') level = 1;
                  else if (d.contributionLevel === 'SECOND_QUARTILE') level = 2;
                  else if (d.contributionLevel === 'THIRD_QUARTILE') level = 3;
                  else if (d.contributionLevel === 'FOURTH_QUARTILE') level = 4;

                  return {
                    date: d.date,
                    count: d.contributionCount,
                    level,
                  };
                })
            );

            setData({
              totalContributions: calendar.totalContributions,
              weeks: mappedWeeks,
            });
            setLoading(false);
            return;
          }
        }

        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        if (!res.ok) throw new Error('Failed to fetch contributions');
        const json = await res.json();
        
        if (isMounted) {
          const days: ContributionDay[] = json.contributions;
          const mappedWeeks: ContributionDay[][] = [];
          for (let i = 0; i < days.length; i += 7) {
            mappedWeeks.push(days.slice(i, i + 7));
          }

          setData({
            totalContributions: json.total?.lastYear ?? 0,
            weeks: mappedWeeks,
          });
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.warn('Could not load live GitHub calendar:', err);
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchRealGitHubData();

    return () => {
      isMounted = false;
    };
  }, [username]);

  const monthLabels = useMemo(() => {
    if (!data?.weeks || data.weeks.length === 0) return [];
    const labels: { month: string; colIndex: number }[] = [];
    let lastMonth = -1;

    data.weeks.forEach((week, colIdx) => {
      if (week.length > 0) {
        const date = new Date(week[0].date);
        const month = date.getMonth();
        if (month !== lastMonth) {
          labels.push({
            month: date.toLocaleDateString(undefined, { month: 'short' }),
            colIndex: colIdx,
          });
          lastMonth = month;
        }
      }
    });

    return labels;
  }, [data]);

  const getLevelColor = (day: ContributionDay) => {
    if (!day || day.count === 0 || day.level === 0) {
      return 'bg-neutral-200/70 dark:bg-white/[0.08] border-neutral-300/40 dark:border-white/[0.08] hover:border-neutral-400 dark:hover:border-white/30';
    }

    switch (day.level) {
      case 1:
        return 'bg-[#9be9a8] dark:bg-[#0e4429] border-[#9be9a8] dark:border-[#0e4429] hover:border-emerald-300';
      case 2:
        return 'bg-[#40c463] dark:bg-[#006d32] border-[#40c463] dark:border-[#006d32] hover:border-emerald-200';
      case 3:
        return 'bg-[#30a14e] dark:bg-[#26a641] border-[#30a14e] dark:border-[#26a641] hover:border-emerald-100';
      case 4:
        return 'bg-[#216e39] dark:bg-[#39d353] border-[#216e39] dark:border-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.5)]';
      default:
        return 'bg-neutral-200/70 dark:bg-white/[0.08] border-neutral-300/40 dark:border-white/[0.08]';
    }
  };

  if (error) return null;

  return (
    <div 
      ref={containerRef}
      className="relative w-full rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm p-4 space-y-3"
    >
      {hoveredDay && (
        <div
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y - 8}px`,
            transform: 'translate(-50%, -100%)',
          }}
          className="pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-neutral-900 px-3 py-2 text-center shadow-2xl border border-neutral-700/80 transition-all duration-100"
        >
          <div className="font-semibold text-[12px] text-white">
            {hoveredDay.count === 0
              ? 'No contributions'
              : `${hoveredDay.count.toLocaleString()} contribution${hoveredDay.count === 1 ? '' : 's'}`}
          </div>
          <div className="text-[10.5px] text-neutral-300 font-mono mt-0.5">
            {new Date(hoveredDay.date).toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
        </div>
      )}

      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono hover:text-foreground transition-colors group"
        >
          <Github className="size-3.5 text-foreground/80 group-hover:text-primary transition-colors" />
          <span>github.com/<strong className="text-foreground">{username}</strong></span>
        </a>
        <span className="font-mono text-[11px]">
          {loading ? 'Fetching live GitHub activity...' : `${data?.totalContributions?.toLocaleString() ?? 0} contributions in the last year`}
        </span>
      </div>

      <div className="overflow-x-auto pb-1 pt-1 scrollbar-none md:overflow-x-visible flex justify-start md:justify-center w-full">
        {loading ? (
          <div className="flex gap-[3px] animate-pulse py-4">
            {Array.from({ length: 45 }).map((_, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, rowIdx) => (
                  <div key={rowIdx} className="size-[10px] rounded-[2px] bg-muted/30" />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="inline-block min-w-max">
            <div className="flex text-[9px] font-mono text-muted-foreground/70 mb-1.5 pl-6 h-3 relative">
              {monthLabels.map((lbl, idx) => (
                <span
                  key={idx}
                  style={{ left: `${lbl.colIndex * 13 + 24}px` }}
                  className="absolute"
                >
                  {lbl.month}
                </span>
              ))}
            </div>

            <div className="flex gap-2 items-start">
              <div className="flex flex-col gap-[3px] text-[8px] font-mono text-muted-foreground/60 select-none pt-[13px]">
                <span className="h-[10px] leading-[10px]">Mon</span>
                <span className="h-[10px] leading-[10px] invisible">Tue</span>
                <span className="h-[10px] leading-[10px]">Wed</span>
                <span className="h-[10px] leading-[10px] invisible">Thu</span>
                <span className="h-[10px] leading-[10px]">Fri</span>
                <span className="h-[10px] leading-[10px] invisible">Sat</span>
              </div>

              <div className="flex gap-[3px]">
                {data?.weeks.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-[3px]">
                    {week.map((day) => {
                      return (
                        <div
                          key={day.date}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const parentRect = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
                            setHoveredDay({
                              count: day.count,
                              date: day.date,
                              x: rect.left - parentRect.left + rect.width / 2,
                              y: rect.top - parentRect.top,
                            });
                          }}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`size-[10px] rounded-[2px] border transition-all duration-150 hover:scale-125 hover:z-20 cursor-pointer ${getLevelColor(
                            day
                          )}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground/80 pt-1 border-t border-border/20">
        <span>Activity in the last year</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="size-[9px] rounded-[2px] bg-neutral-200/70 dark:bg-white/[0.08] border border-neutral-300/40 dark:border-white/[0.08]" />
          <div className="size-[9px] rounded-[2px] bg-[#9be9a8] dark:bg-[#0e4429] border border-[#9be9a8] dark:border-[#0e4429]" />
          <div className="size-[9px] rounded-[2px] bg-[#40c463] dark:bg-[#006d32] border border-[#40c463] dark:border-[#006d32]" />
          <div className="size-[9px] rounded-[2px] bg-[#30a14e] dark:bg-[#26a641] border border-[#30a14e] dark:border-[#26a641]" />
          <div className="size-[9px] rounded-[2px] bg-[#216e39] dark:bg-[#39d353] border border-[#216e39] dark:border-[#39d353]" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
