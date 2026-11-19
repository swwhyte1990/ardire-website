import { useEffect } from "react";
import pageMeta from "@/data/pageMeta.json";

export type PagePath = keyof typeof pageMeta;

/**
 * Sets the page title and meta description while a page is shown. Every page,
 * the home page included, calls this, and on leaving a page the home page's tags
 * go back (a page loaded directly starts with its own tags in the static HTML, so
 * "whatever was there before" would be the wrong thing to restore). The same file
 * feeds the static HTML in scripts/generate-routes.mjs, so search engines and the
 * live page always agree.
 */
export function usePageMeta(path: PagePath) {
  useEffect(() => {
    const desc = document.querySelector('meta[name="description"]');
    document.title = pageMeta[path].title;
    desc?.setAttribute("content", pageMeta[path].description);
    return () => {
      // Structured data written into the static HTML describes the page it was
      // served with; once the visitor moves on in the browser, it no longer applies.
      document.querySelectorAll("script[data-page-schema]").forEach((el) => el.remove());
      document.title = pageMeta[""].title;
      desc?.setAttribute("content", pageMeta[""].description);
    };
  }, [path]);
}
