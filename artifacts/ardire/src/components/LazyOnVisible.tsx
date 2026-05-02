import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazyOnVisibleProps {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: string | number;
  id?: string;
}

export function LazyOnVisible({
  children,
  rootMargin = "300px",
  minHeight = "600px",
  id,
}: LazyOnVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined" || !id) return false;
    return window.location.hash === `#${id}`;
  });

  useEffect(() => {
    if (visible) return;

    const cleanups: Array<() => void> = [];

    if (id && typeof window !== "undefined") {
      const matchHash = () => {
        if (window.location.hash === `#${id}`) setVisible(true);
      };
      window.addEventListener("hashchange", matchHash);
      cleanups.push(() => window.removeEventListener("hashchange", matchHash));
    }

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
    } else {
      const el = ref.current;
      if (!el) {
        setVisible(true);
      } else {
        const obs = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) setVisible(true);
          },
          { rootMargin },
        );
        obs.observe(el);
        cleanups.push(() => obs.disconnect());
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, [id, rootMargin, visible]);

  return (
    <div ref={ref} id={id} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
