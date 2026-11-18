import { createRoot } from "react-dom/client";
import App from "./App";
// Fonts are served from this site rather than Google Fonts, so no visitor data
// goes to a third party. Only the Latin subset and the weights in use are loaded.
import "@fontsource/cinzel/latin-400.css";
import "@fontsource/cinzel/latin-500.css";
import "@fontsource/raleway/latin-300.css";
import "@fontsource/raleway/latin-400.css";
import "@fontsource/raleway/latin-600.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
