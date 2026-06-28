import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fontsource-variable/cinzel/wght.css";
import "@fontsource-variable/raleway/wght.css";
import "@fontsource-variable/raleway/wght-italic.css";

createRoot(document.getElementById("root")!).render(<App />);
