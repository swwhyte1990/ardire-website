import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Converts the blocking <link rel="stylesheet"> emitted by Vite into an async
// preload so the CSS no longer sits on the critical path. Also injects
// <link rel="preload"> for every WOFF2 font asset so fonts start downloading
// in parallel with the CSS rather than waiting for the CSS to arrive first.
function deferCssAndPreloadFonts(): Plugin {
  const woff2Paths: string[] = [];
  return {
    name: "defer-css-preload-fonts",
    apply: "build",
    generateBundle(_opts, bundle) {
      for (const key of Object.keys(bundle)) {
        if (key.endsWith(".woff2")) woff2Paths.push(`/${key}`);
      }
    },
    transformIndexHtml: {
      order: "post",
      handler(html) {
        const fontPreloads = woff2Paths
          .map(
            (href) =>
              `<link rel="preload" as="font" type="font/woff2" crossorigin href="${href}">`,
          )
          .join("\n    ");
        return html
          .replace(
            /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
            (_, href) =>
              `<link rel="preload" as="style" crossorigin ` +
              `onload="this.onload=null;this.rel='stylesheet'" href="${href}">` +
              `<noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`,
          )
          .replace("</head>", `    ${fontPreloads}\n  </head>`);
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
    deferCssAndPreloadFonts(),
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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils")) {
            return "framer-motion";
          }
          if (
            id.includes("react-hook-form") ||
            id.includes("@hookform") ||
            id.includes("/zod/")
          ) {
            return "forms";
          }
          if (id.includes("@radix-ui")) {
            return "radix";
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
