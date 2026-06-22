import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fontsource/cinzel/latin-400.css";
import "@fontsource/cinzel/latin-500.css";
import "@fontsource/cinzel/latin-700.css";
import "@fontsource/raleway/latin-300.css";
import "@fontsource/raleway/latin-300-italic.css";
import "@fontsource/raleway/latin-400.css";
import "@fontsource/raleway/latin-500.css";
import "@fontsource/raleway/latin-600.css";

createRoot(document.getElementById("root")!).render(<App />);
