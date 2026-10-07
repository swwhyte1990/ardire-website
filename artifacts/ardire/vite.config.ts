import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Converts the blocking <link rel="stylesheet"> Vite emits into an async preload,
// so CSS no longer sits on the critical path.
function deferCss(): Plugin {
  return {
    name: "defer-css",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        let rewrote = 0;
        const out = html.replace(
          /<link rel="stylesheet"([^>]*?)href="([^"]+)">/g,
          (_m, attrs, href) => {
            rewrote++;
            return (
              `<link rel="preload" as="style"${attrs}` +
              `onload="this.onload=null;this.rel='stylesheet'" href="${href}">` +
              `<noscript><link rel="stylesheet"${attrs}href="${href}"></noscript>`
            );
          },
        );
        // Silently matching nothing would quietly put CSS back on the critical
        // path with a green build, so require the rewrite instead.
        if (rewrote === 0) {
          throw new Error(
            "defer-css: no <link rel=\"stylesheet\"> found in index.html. Vite's " +
              "emitted markup changed, so CSS is still render-blocking.",
          );
        }
        return out;
      },
    },
  };
}


// index.html still writes plain /images/... paths, but those files now live in
// src/assets and are content-hashed by Vite, so the literal paths would 404.
// Rewrite them to the emitted filenames. An absolute origin is preserved, since
// the JSON-LD and social meta tags need fully-qualified URLs.
function rewriteHtmlImagePaths(): Plugin {
  let hashedByName = new Map<string, string>();
  return {
    name: "rewrite-html-image-paths",
    apply: "build",
    buildStart() {
      hashedByName = new Map();
    },
    generateBundle(_opts, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type !== "asset") continue;
        for (const source of output.originalFileNames) {
          hashedByName.set(path.basename(source), output.fileName);
        }
      }
    },
    transformIndexHtml: {
      order: "post",
      handler(html) {
        return html.replace(
          /(https:\/\/[^/"]+)?\/images\/([a-z0-9-]+\.webp)/g,
          (_match, origin: string | undefined, name: string) => {
            const hashed = hashedByName.get(name);
            if (!hashed) {
              throw new Error(
                `index.html references /images/${name}, which is not an emitted asset. ` +
                  `Import it from src/assets/images/ so it gets hashed, or restore it to public/.`,
              );
            }
            return `${origin ?? ""}${basePath}${hashed}`;
          },
        );
      },
    },
  };
}


const rawPort = process.env.PORT ?? "18439";
const port = Number(rawPort);
const basePath = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
    deferCss(),
    rewriteHtmlImagePaths(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // generate-routes.mjs reads the manifest to resolve hashed hero images.
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils")) {
            return "framer-motion";
          }
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/") ||
            id.includes("/wouter/") ||
            id.includes("/use-sync-external-store/")
          ) {
            return "react-vendor";
          }
        },
      },
    },
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
