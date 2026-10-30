import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "cn";

// A sideways-scrolling row of chips (pass <li>s). While more of it is hidden past either end, an arrow button
// appears there on a fade. Whenever `active` changes, the item marked aria-current is scrolled to the middle.
// `label` names what the arrows scroll ("services"); `bleed` means the row runs to the screen's edges (phones), so
// the arrows sit a little in from them.
export function ScrollRow({
  active,
  label,
  bleed,
  className,
  listClassName,
  children,
}: {
  active: string;
  label: string;
  bleed?: boolean;
  className?: string;
  listClassName?: string;
  children: ReactNode;
}) {
  const row = useRef<HTMLUListElement>(null);
  const [more, setMore] = useState({ left: false, right: false });

  useEffect(() => {
    const item = row.current?.querySelector<HTMLElement>("[aria-current]");
    if (row.current && item) row.current.scrollLeft = item.offsetLeft - (row.current.clientWidth - item.offsetWidth) / 2;
  }, [active]);

  // Tracks whether items are hidden past either end, as the row scrolls or resizes.
  useEffect(() => {
    const list = row.current;
    if (!list) return;
    const update = () =>
      setMore({
        left: list.scrollLeft > 1,
        right: list.scrollLeft + list.clientWidth < list.scrollWidth - 1,
      });
    list.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(list);
    return () => {
      list.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  // Moves the row most of its width, keeping an item or two in view for context.
  function scroll(direction: -1 | 1) {
    const list = row.current;
    if (!list) return;
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollBy({ left: direction * list.clientWidth * 0.7, behavior: smooth ? "smooth" : "auto" });
  }

  return (
    <div className={className}>
      <div className="relative">
        <ul ref={row} className={cn("relative flex gap-2 overflow-x-auto [scrollbar-width:none]", listClassName)}>
          {children}
        </ul>
        {(["left", "right"] as const).map(
          (side) =>
            more[side] && (
              <div
                key={side}
                className={cn(
                  "pointer-events-none absolute inset-y-0 flex animate-in items-center from-background from-40% to-transparent duration-150 fade-in-0",
                  side === "left" ? "left-0 bg-linear-to-r pr-8" : "right-0 bg-linear-to-l pl-8",
                  bleed && (side === "left" ? "pl-2" : "pr-2"),
                )}
              >
                <button
                  type="button"
                  aria-label={`Scroll ${label} ${side}`}
                  onClick={() => scroll(side === "left" ? -1 : 1)}
                  className="pointer-events-auto grid size-8 place-items-center rounded-full border border-line bg-background text-foreground shadow-sm transition-colors hover:bg-muted"
                >
                  {side === "left" ? (
                    <ChevronLeftIcon aria-hidden className="size-4" />
                  ) : (
                    <ChevronRightIcon aria-hidden className="size-4" />
                  )}
                </button>
              </div>
            ),
        )}
      </div>
    </div>
  );
}
