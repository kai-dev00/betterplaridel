
"use client";

import { useState } from "react";
import { motion } from "motion/react";

type HistoryEvent = {
  year: string;
  title: string;
  description: string;
  source: string;
  image: string;
};

const COLORS = {
  green: "#047857",
  greenDark: "#065F46",
  greenLight: "#D1FAE5",
  greenGlow: "#04785780",
  greenGlowStrong: "#047857B3",
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#1F2937",
  muted: "#6B7280",
  border: "#E5E7EB",
  white: "#FFFFFF",
  blackOverlay: "#00000099",
  transparent: "#00000000",
};

const history: HistoryEvent[] = [
  {
    year: "1595",
    title: "Earliest Documented Historical Reference",
    description:
      "Historical accounts trace records of the area now known as Plaridel to 1595. The locality was described as a largely undeveloped plain with thick vegetation and cogon grass, crossed by the Angat and Tabang rivers. The exact date of the area's original settlement remains uncertain.",
    source: "https://plaridelbulacanlgu.ph/about-us/history/",
    image: "/images/1595.jpg",
  },
  {
    year: "1602",
    title: "Establishment of St. James the Apostle Parish",
    description:
      "The Diocese of Malolos identifies St. James the Apostle Parish in Plaridel as having been founded by Augustinian missionaries in 1602. The parish became an important center of religious and community life.",
    source:
      "https://dioceseofmalolos.ph/wp-content/uploads/2022/12/THE-JUBILEE-CHURCHES-OF-THE-DIOCESE-OF-MALOLOS-FOR-THE-500-YEARS-OF-CHRISTIANITY-IN-THE-PHILIPPINES.pdf",
    image: "/images/1602.jpg",
  },
  {
    year: "1899",
    title: "Battle of Quingua",
    description:
      "During the Philippine–American War, Filipino revolutionary forces fought American troops in the Battle of Quingua. The encounter became a significant event in the struggle for Philippine independence and remains an important part of Plaridel's historical identity.",
    source:
      "https://philhistoricsites.nhcp.gov.ph/registry_database/labanan-sa-quingua-plaridel-abril-23-1899/",
    image: "/images/1899.jpg",
  },
  {
    year: "1903",
    title: "Quingua and Pulilan Combined",
    description:
      "Act No. 932 reorganized municipalities in Bulacan and combined the territories of Quingua and Pulilan under the municipality of Quingua, with the municipal seat remaining in Quingua.",
    source: "https://ldr.senate.gov.ph/legislative-issuance/act-no-932",
    image: "/images/1903.jpg",
  },
  {
    year: "1936",
    title: "Quingua Renamed Plaridel",
    description:
      "Commonwealth Act No. 26 officially changed the municipality's name from Quingua to Plaridel in honor of Marcelo H. del Pilar, the Filipino patriot and propagandist whose pen name was Plaridel.",
    source:
      "https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/29/24069",
    image: "/images/1936.jpg",
  },
  {
    year: "1954",
    title: "Mayamot Renamed Bagong Silang",
    description:
      "Republic Act No. 1005 changed the name of the sitio of Mayamot, located in Barrio Banga, Plaridel, to Bagong Silang. This is a documented example of a local place-name change during the postwar period.",
    source:
      "https://issuances-library.senate.gov.ph/legislative-issuance/republic-act-no-1005",
    image: "/images/1954.jpg",
  },
  {
    year: "1975",
    title: "Population Reaches 32,613",
    description:
      "Plaridel's recorded population increased to 32,613 in the 1975 census, indicating continued demographic growth during the 1970s.",
    source: "https://www.philatlas.com/luzon/r03/bulacan/plaridel.html",
    image: "/images/1975.jpg",
  },
  {
    year: "1989",
    title: "General Alejo G. Santos Highway",
    description:
      "Republic Act No. 6808 named the Plaridel–Bustos–Angat–Norzagaray–Santa Maria Highway the General Alejo G. Santos Highway. The law formalized the name of an important road corridor in Bulacan.",
    source:
      "https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/7021",
    image: "/images/1989.jpg",
  },
  {
    year: "2000",
    title: "Population Reaches 80,481",
    description:
      "The 2000 census recorded 80,481 residents in Plaridel. This figure provides a useful milestone for measuring population growth at the beginning of the twenty-first century.",
    source: "https://www.philatlas.com/luzon/r03/bulacan/plaridel.html",
    image: "/images/2000.jpg",
  },
  {
    year: "2020",
    title: "Population Reaches 114,432",
    description:
      "The 2020 census recorded 114,432 residents in Plaridel. This reflects the municipality's continuing demographic growth and its development as part of the expanding Bulacan urban and economic area.",
    source: "https://www.philatlas.com/luzon/r03/bulacan/plaridel.html",
    image: "/images/2020.jpg",
  },
  {
    year: "2022",
    title: "Plaridel Bypass Road Classification",
    description:
      "The Department of Public Works and Highways issued an order classifying a 10.25-kilometer segment of the Plaridel Bypass Road as a national secondary road. The order documents an important administrative milestone in the area's road infrastructure.",
    source:
      "https://www.dpwh.gov.ph/dpwh/sites/default/files/issuances/DO_040_s2022.pdf",
    image: "/images/2022.jpg",
  },
  {
    year: "2024",
    title: "Population Reaches 120,939",
    description:
      "The Philippine Statistics Authority's 2024 Census of Population recorded 120,939 residents in Plaridel. This is an important recent demographic milestone in the municipality's continuing development.",
    source:
      "https://psa.gov.ph/content/2024-census-population-popcen-population-counts-declared-official-president",
    image: "/images/2024.jpg",
  },
  {
    year: "2026",
    title: "Plaridel in the Present Day",
    description:
      "Plaridel continues to develop as a municipality in Bulacan, Central Luzon. Its historical identity is closely associated with its former name, Quingua, the Battle of Quingua, and its renaming in honor of Marcelo H. del Pilar. Its present-day story continues through local governance, heritage preservation, transportation, commerce, and community development.",
    source: "https://plaridelbulacanlgu.ph/",
    image: "/images/2026.jpg",
  },
];

function HistoryCard({
  event,
  index,
  selected,
  onSelect,
}: {
  event: HistoryEvent;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const revealed = hovered || selected;

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: COLORS.card,
        border: `1px solid ${
          selected || hovered ? COLORS.green : COLORS.border
        }`,
        borderRadius: "16px",
        boxShadow:
          selected || hovered
            ? `0 0 12px 2px ${COLORS.greenGlow}, 0 0 24px 3px ${COLORS.greenGlow}`
            : "0 2px 8px #0000000D",
        transition:
          "border-color 300ms ease, box-shadow 300ms ease",
      }}
      className="group relative min-w-0 overflow-hidden"
    >
      <a
        href={event.source}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {}}
        aria-label={`Read the historical source for ${event.year}: ${event.title}`}
        className="relative block h-64 w-full overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] sm:h-72"
        style={{ color: COLORS.white }}
      >
        {!imageFailed && (
          <img
            src={event.image}
            alt={`${event.year}: ${event.title}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
              revealed ? "scale-110" : "scale-100"
            }`}
          />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 transition-colors duration-500"
          style={{
            background: revealed
              ? "#047857F2"
              : imageFailed
                ? "linear-gradient(135deg, #D1D5DB, #D1FAE5, #6B7280)"
                : "linear-gradient(to top, #000000CC, #0000001A, #0000001A)",
          }}
        />

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-5">
          {!revealed ? (
            <>
              <span
                className="mb-2 text-sm font-semibold tracking-[0.2em]"
                style={{ color: "#6EE7B7" }}
              >
                CHAPTER {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className="text-3xl font-bold"
                style={{ color: COLORS.white }}
              >
                {event.year}
              </span>

              <span
                className="mt-2 text-lg font-semibold"
                style={{ color: COLORS.white }}
              >
                {event.title}
              </span>

              <span
                className="mt-3 text-xs"
                style={{ color: "#FFFFFFCC" }}
              >
              
              </span>
            </>
          ) : (
            <div className="overflow-y-auto">
              <span
                className="text-sm font-bold tracking-widest"
                style={{ color: "#A7F3D0" }}
              >
                {event.year}
              </span>

              <h3
                className="mb-3 mt-2 text-xl font-bold"
                style={{ color: COLORS.white }}
              >
                {event.title}
              </h3>

              <p
                className="text-sm leading-6"
                style={{ color: "#ECFDF5" }}
              >
                {event.description}
              </p>

              <p
                className="mt-4 text-sm font-semibold"
                style={{ color: "#A7F3D0" }}
              >
              
              </p>
            </div>
          )}
        </div>
      </a>
    </motion.article>
  );
}

export function HistoryTimeline() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="history-timeline-title"
      className="px-4 py-16 sm:px-6 sm:py-24"
      style={{
        backgroundColor: COLORS.background,
        color: COLORS.text,
      }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p
            className="mb-3 text-sm font-bold uppercase tracking-[0.25em]"
            style={{ color: COLORS.green }}
          >
            Our Heritage · Our Story
          </p>

          <h2
            id="history-timeline-title"
            className="text-3xl font-bold tracking-tight sm:text-5xl"
            style={{ color: COLORS.text }}
          >
            The History of Plaridel
          </h2>

          <p
            className="mt-5 text-base leading-7 sm:text-lg"
            style={{ color: COLORS.muted }}
          >
            Discover the milestones, people, and events that shaped Plaridel,
            Bulacan, from its earliest documented history to the present day.
          </p>
        </motion.header>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-[19px] top-6 w-0.5 md:left-1/2 md:-translate-x-1/2"
            style={{ backgroundColor: "#0478574D" }}
          />

          <ol className="space-y-10 md:space-y-14">
            {history.map((event, index) => {
              const isLeft = index % 2 === 0;

              return (
                <li
                  key={event.year}
                  className="relative grid grid-cols-[48px_minmax(0,1fr)] items-center gap-x-2 md:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)] md:gap-x-4"
                >
                  <div
                    className="relative z-10 col-start-1 row-start-1 flex h-12 w-12 items-center justify-center rounded-full border-4 font-bold shadow-sm md:col-start-2 md:mx-auto md:h-14 md:w-14"
                    style={{
                      backgroundColor: COLORS.green,
                      color: COLORS.white,
                      borderColor: COLORS.background,
                      boxShadow: `0 0 0 2px ${COLORS.greenGlow}`,
                      fontSize: "11px",
                    }}
                    aria-label={`Year ${event.year}`}
                  >
                    {event.year}
                  </div>

                  <div
                    className={`col-start-2 row-start-1 min-w-0 ${
                      isLeft
                        ? "md:col-start-1 md:row-start-1"
                        : "md:col-start-3 md:row-start-1"
                    }`}
                  >
                    <HistoryCard
                      event={event}
                      index={index}
                      selected={selectedId === index}
                      onSelect={() => setSelectedId(index)}
                    />

                    <p
                      className={`mt-2 text-xs font-semibold tracking-wider ${
                        isLeft ? "md:text-right" : "md:text-left"
                      }`}
                      style={{ color: COLORS.greenDark }}
                    >
                      MILESTONE · {event.year}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p
          className="mt-12 text-center text-sm leading-6"
          style={{ color: COLORS.muted }}
        >
          Hover over a milestone to explore it. Click a card to open its
          historical source.
        </p>
      </div>
    </section>
  );
}
