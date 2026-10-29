import { AnimateIcon } from "@animate-ui/react/icons";
import { Phone } from "@/components/animate-ui/icons/phone";
import { PhoneCall } from "@/components/animate-ui/icons/phone-call";
import { Smartphone } from "@/components/animate-ui/icons/smartphone";
import { formatNumber, tel } from "../format";
import type { Hotline, PhoneNumber } from "../hotlines-data";

const normalize = (n: PhoneNumber) =>
  typeof n === "string" ? { number: n, label: undefined, dial: undefined } : n;

function numberType(number: string) {
  const d = number.replace(/\D/g, "");
  if (/^09\d{9}$/.test(d)) return { type: "Mobile", Icon: Smartphone };
  if (/^0\d{9}$/.test(d)) return { type: "Landline", Icon: Phone };
  return { type: "Hotline", Icon: PhoneCall };
}

// The emergency number everyone should know (911). It gets a full-width featured card.
export const isFeatured = (hotline: Hotline) => hotline.number === "911";

function FeaturedCard({ hotline }: { hotline: Hotline }) {
  const number = typeof hotline.number === "string" ? hotline.number : hotline.number.number;
  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-line bg-background p-5 sm:col-span-2 sm:flex-row sm:items-center lg:col-span-3">
      <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full bg-red-600/10 text-red-600">
        <PhoneCall size={22} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-lg font-semibold">{hotline.name}</p>
        {hotline.note && <p className="text-sm text-muted-foreground">{hotline.note}</p>}
      </div>
      <AnimateIcon animateOnHover asChild>
        <a
          href={tel(number)}
          aria-label={`Call ${hotline.name}: ${formatNumber(number)}`}
          className="flex items-center justify-center gap-2.5 rounded-xl bg-brand px-6 py-3 text-white transition-colors hover:bg-brand/90 sm:min-w-44"
        >
          <PhoneCall size={18} aria-hidden />
          <span className="text-2xl font-bold tracking-tight tabular-nums">{formatNumber(number)}</span>
        </a>
      </AnimateIcon>
    </li>
  );
}

// Emergency numbers are written in red on a neutral pill; every other number is green.
export function HotlineCard({ hotline, emergency = false }: { hotline: Hotline; emergency?: boolean }) {
  if (isFeatured(hotline)) return <FeaturedCard hotline={hotline} />;
  const primary = normalize(hotline.number);
  const numbers = primary.number === "TBA" ? [] : [primary, ...(hotline.otherNumbers ?? []).map(normalize)];
  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-line bg-background p-5">
      <div>
        <p className="font-semibold">{hotline.name}</p>
        {hotline.note && <p className="text-sm text-muted-foreground">{hotline.note}</p>}
      </div>
      <ul className="grid gap-2">
        {numbers.length === 0 && (
          <li className="rounded-xl bg-muted px-3 py-2 text-sm text-muted-foreground">Number to follow</li>
        )}
        {numbers.map(({ number, label, dial }) => {
          const { type, Icon } = numberType(number);
          return (
            <li key={number}>
              <AnimateIcon animateOnHover asChild>
                <a
                  href={dial ? `tel:${dial}` : tel(number)}
                  aria-label={`Call ${hotline.name} (${label ?? type}): ${formatNumber(number)}`}
                  title={type}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-colors ${
                    emergency ? "bg-muted text-red-600 hover:bg-red-600/10" : "bg-brand/10 text-foreground hover:bg-brand/15"
                  }`}
                >
                  <Icon size={16} aria-hidden className={emergency ? "text-red-600" : "text-brand"} />
                  <span className="grid min-w-0">
                    <span className="font-semibold tabular-nums">{formatNumber(number)}</span>
                    {label && <span className="text-xs text-muted-foreground">{label}</span>}
                  </span>
                </a>
              </AnimateIcon>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
