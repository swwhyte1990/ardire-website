import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fontsource/cinzel/400.css";
import "@fontsource/cinzel/500.css";
import "@fontsource/cinzel/600.css";
import "@fontsource/cinzel/700.css";
import "@fontsource/raleway/300.css";
import "@fontsource/raleway/300-italic.css";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/400-italic.css";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/600.css";

createRoot(document.getElementById("root")!).render(<App />);
