import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimateIcon } from "@animate-ui/react/icons";
import { cn } from "cn";
import { chipClass } from "@/components/shared/chip";
import { ScrollRow } from "@/components/shared/scroll-row";
import { isStuck, navbarHeight, useShowSubNavbar } from "@/components/layout/sub-navbar";
import { servicesPage } from "../services-content";
import { services } from "../services-data";

// Every service: a scrolling row of chips on phones (stuck under the navbar), a grid of tiles from tablets up.
// Once the tiles scroll out of view, the same chips slide in as a bar under the navbar.
export function ServicePicker({ current, className }: { current: string; className?: string }) {
  const nav = useRef<HTMLElement>(null);
  const tiles = useRef<HTMLUListElement>(null);
  // Whether the chips sit right under the navbar: the bar (tablets and up, once the tiles have scrolled up under
  // the navbar) or the stuck chip row (phones).
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    function update() {
      const grid = tiles.current;
      const row = nav.current;
      if (!grid || !row) return;
      const tablet = grid.offsetParent !== null; // the tiles are hidden on phones
      setStuck(tablet ? grid.getBoundingClientRect().bottom <= navbarHeight() : isStuck(row));
    }
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // While stuck, the navbar names the page beside its logo and drops its shadow.
  useShowSubNavbar(servicesPage.title, stuck);

  return (
    <nav ref={nav} aria-label="Services" className={className}>
      <ServiceChips current={current} className="-mx-4 sm:hidden" listClassName="px-4 pb-1" />

      <ul ref={tiles} className="hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ id, icon: Icon, title, tone, locations }) => {
          const active = id === current;
          return (
            <li key={id}>
              <AnimateIcon animateOnHover asChild>
                <Link
                  to="/services"
                  search={{ service: id }}
                  resetScroll={false}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border bg-background p-3 transition",
                    active ? "border-brand ring-4 ring-brand/15" : "border-line hover:border-brand/40 hover:shadow-sm",
                  )}
                >
                  <span className={cn("grid size-10 shrink-0 place-items-center rounded-lg", tone)}>
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className={cn("block truncate text-sm font-semibold", active && "text-brand")}>{title}</span>
                    {/* How many places offer it, or "Coming soon" while none are listed. */}
                    <span className="block text-xs text-muted-foreground">
                      {locations.length === 0
                        ? "Coming soon"
                        : `${locations.length} ${locations.length === 1 ? "location" : "locations"}`}
                    </span>
                  </span>
                </Link>
              </AnimateIcon>
            </li>
          );
        })}
      </ul>

      {/* Slides down from behind the navbar, which sits above it. Its solid background reaches up behind the
          see-through navbar, so the two read as one piece with no page showing between them. Kept mounted so it
          can slide out as well as in; `inert` keeps it out of the tab order while hidden. */}
      <div
        inert={!stuck}
        className={cn(
          "fixed inset-x-0 top-0 z-40 hidden border-b border-line bg-background pt-10 shadow-xs transition-transform duration-300 ease-out sm:block motion-reduce:transition-none",
          !stuck && "-translate-y-full",
        )}
      >
        <ServiceChips current={current} compact className="container-page pt-0.5 pb-2" />
      </div>
    </nav>
  );
}

// A row of chips, one per service. `compact` makes smaller chips with icons, for the bar under the navbar.
function ServiceChips({
  current,
  compact,
  className,
  listClassName,
}: {
  current: string;
  compact?: boolean;
  className?: string;
  listClassName?: string;
}) {
  return (
    <ScrollRow
      active={current}
      label="services"
      bleed={!compact}
      className={className}
      listClassName={cn(compact && "gap-1.5", listClassName)}
    >
      {services.map(({ id, icon: Icon, title }) => (
        <li key={id} className="shrink-0">
          <Link
            to="/services"
            search={{ service: id }}
            resetScroll={false}
            aria-current={id === current ? "page" : undefined}
            className={cn(chipClass(id === current), compact && "h-8 gap-1.5 px-2.5 text-[13px]")}
          >
            {compact && <Icon size={14} />}
            {title}
          </Link>
        </li>
      ))}
    </ScrollRow>
  );
}
