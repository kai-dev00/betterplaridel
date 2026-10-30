import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

// Height of the navbar once the page is scrolled: its `h-10`, 2.5rem, so it grows with the browser's font size
// setting (40px at the default size, 50px at Chrome's "Large").
export const navbarHeight = () => 2.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);

// Whether a sticky element is stuck: sitting at its own `top` (`top-10`, right under the navbar).
export const isStuck = (el: HTMLElement) =>
  Math.abs(el.getBoundingClientRect().top - parseFloat(getComputedStyle(el).top)) < 1;

// The name of a page whose own bar of options sits right under the navbar (the Services chips, the Contacts
// search), or null. The navbar shows it beside the logo and drops its shadow, so the two bars read as one.
let current: string | null = null;
const listeners = new Set<() => void>();

export function setSubNavbar(name: string | null) {
  if (name === current) return;
  current = name;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export const useSubNavbar = () => useSyncExternalStore(subscribe, () => current, () => null);

// Names the page beside the navbar's logo while its bar is `shown` under the navbar.
export function useShowSubNavbar(name: string, shown: boolean) {
  useEffect(() => {
    setSubNavbar(shown ? name : null);
    return () => setSubNavbar(null);
  }, [name, shown]);
}

// Whether a sticky element (`sticky top-10`) is stuck right under the navbar.
export function useStuckUnderNavbar(ref: RefObject<HTMLElement | null>) {
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    function update() {
      if (ref.current) setStuck(isStuck(ref.current));
    }
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);
  return stuck;
}
