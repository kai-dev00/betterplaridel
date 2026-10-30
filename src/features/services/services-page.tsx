import { useEffect, useMemo, useRef, useState } from "react";
import { getRouteApi, Link } from "@tanstack/react-router";
import { cn } from "cn";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { LocationCard } from "./components/location-card";
import { LocationFilters } from "./components/location-filters";
import { ServicePicker } from "./components/service-picker";
import { ServicesMap } from "./components/services-map";
import { servicesPage } from "./services-content";
import { filterLocations, serviceById, services } from "./services-data";

const route = getRouteApi("/services");

export function ServicesPage() {
  const { service: id } = route.useSearch();
  const service = serviceById(id) ?? services[0];
  const { icon: Icon, locations, pins, places } = service;

  // The search and building filter, kept with their service so that switching services clears them.
  const [filters, setFilters] = useState({ service: "", query: "", place: "all" });
  const query = filters.service === service.id ? filters.query : "";
  const place = filters.service === service.id ? filters.place : "all";
  const setQuery = (q: string) => setFilters({ service: service.id, query: q, place });
  const setPlace = (p: string) => setFilters({ service: service.id, query, place: p });

  // The offices that pass the filters (with their index in the full list, which ids and selection use), and their
  // pins. Memoised so the map only refits when the filters change.
  const { visible, visiblePins } = useMemo(() => filterLocations(service, query, place), [service, query, place]);

  // The selected card, kept with its service so that switching services clears it.
  const [selection, setSelection] = useState<{ service: string; index: number }>();
  const selected = selection?.service === service.id ? selection.index : undefined;
  const selectedPin =
    selected !== undefined && visible.some((v) => v.index === selected) ? locations[selected].pin : undefined;
  // The card under the pointer, whose pin the map highlights.
  const [hovered, setHovered] = useState<{ service: string; index: number }>();
  const hoveredPin = hovered?.service === service.id ? locations[hovered.index]?.pin : undefined;
  const mapRef = useRef<HTMLDivElement>(null);
  const cardId = (i: number) => `location-${service.id}-${i}`;

  // A service picked from the bar under the navbar, while scrolled down the list, starts back at its map. The jump
  // is instant: the list changing length at the same moment would cut a smooth scroll short.
  useEffect(() => {
    const map = mapRef.current;
    if (map && map.getBoundingClientRect().top < 0) map.scrollIntoView({ block: "start", behavior: "instant" });
  }, [service.id]);

  // Selecting an office brings the map, which sits above the list, into view.
  function selectCard(i: number) {
    if (i === selected) return setSelection(undefined);
    setSelection({ service: service.id, index: i });
    mapRef.current?.scrollIntoView({ block: "nearest" });
  }

  // A pin selects the first card shown in its building.
  function selectPin(pin?: number) {
    const i = visible.find((v) => v.location.pin === pin)?.index ?? -1;
    setSelection(pin === undefined || i < 0 ? undefined : { service: service.id, index: i });
  }

  return (
    <>
      <PageHeader title={servicesPage.title} subtitle={servicesPage.subtitle} />
      {/* One column within the page margins: the services, the map of the selected one, then its offices. Scrolled
          down, the services stay in reach as chips under the navbar. The map's scroll margin clears both. */}
      <section className="container-page pb-24">
        <ServicePicker
          current={service.id}
          className={cn(
            "sticky top-10 z-10 -mx-4 border-b border-line bg-background px-4 pt-1 pb-3 sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0",
            // Fills in behind the see-through navbar while stuck, so no page shows between the two.
            "before:absolute before:inset-x-0 before:bottom-full before:h-10 before:bg-background sm:before:hidden",
          )}
        />

        <div ref={mapRef} className="mt-6 scroll-mt-28 sm:mt-8">
          <ServicesMap
            pins={visiblePins}
            selected={selectedPin}
            highlighted={hoveredPin}
            onSelect={selectPin}
            className="h-72 sm:h-96 lg:h-[28rem]"
          />
        </div>

        <header key={service.id} className="mt-10 flex animate-in items-start gap-4 duration-300 fade-in-0">
          <span className={cn("grid size-14 shrink-0 place-items-center rounded-2xl", service.tone)}>
            <Icon size={28} />
          </span>
          <div className="min-w-0">
            <h2 className="text-2xl font-bold tracking-tight">{service.title}</h2>
            <p className="mt-1 text-muted-foreground">{service.body}</p>
            {locations.length > 0 && (
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="font-semibold text-brand">
                  {locations.length} {locations.length === 1 ? "location" : "locations"}
                </span>
                {pins.length > 0 && ` · ${servicesPage.hint}`}
              </p>
            )}
          </div>
        </header>

        <div className="mt-6">
          {locations.length > 0 ? (
            <>
              <LocationFilters
                locations={locations}
                places={places}
                query={query}
                onQuery={setQuery}
                place={place}
                onPlace={setPlace}
                shown={visible.length}
                className="mb-4"
              />
              {visible.length > 0 ? (
                <ul key={service.id} className="grid animate-in gap-4 duration-300 fade-in-0 lg:grid-cols-2">
                  {visible.map(({ location: l, index: i }) => (
                    <li key={`${l.place.id}-${l.name}`}>
                      <LocationCard
                        id={cardId(i)}
                        location={l}
                        service={service}
                        selected={i === selected}
                        onSelect={() => selectCard(i)}
                        onHover={(on) => setHovered(on ? { service: service.id, index: i } : undefined)}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState
                  art="no-results"
                  heading="h3"
                  title={servicesPage.noMatches.title}
                  className="py-6"
                  actions={
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => setFilters({ service: service.id, query: "", place: "all" })}
                    >
                      Clear search and filter
                    </Button>
                  }
                >
                  {servicesPage.noMatches.body}
                </EmptyState>
              )}
            </>
          ) : (
            <EmptyState
              key={service.id}
              art="coming-soon"
              heading="h3"
              title={servicesPage.noLocations.title}
              className="py-6"
              actions={
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/contacts" hash="directory">
                    Open the Municipal Hall directory
                  </Link>
                </Button>
              }
            >
              {servicesPage.noLocations.body}
            </EmptyState>
          )}
        </div>
      </section>
    </>
  );
}
