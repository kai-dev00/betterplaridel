import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "../root";
import { ContactsPage } from "@/features/contacts/contacts-page";

export const contactsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contacts",
  // ?q= prefills the search, e.g. from the home page's search box.
  validateSearch: (search: Record<string, unknown>): { q?: string } => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  component: ContactsPage,
});

// Old addresses: the page used to be /hotlines, and before that /contact.
export const hotlinesRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hotlines",
  validateSearch: (search: Record<string, unknown>): { q?: string } => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  beforeLoad: ({ search, location }) => {
    throw redirect({ to: "/contacts", search, hash: location.hash || undefined });
  },
});

export const contactRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  beforeLoad: () => {
    throw redirect({ to: "/contacts" });
  },
});
