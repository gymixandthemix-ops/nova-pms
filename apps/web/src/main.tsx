import { createRoot } from "react-dom/client";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Missing application root element");
}

createRoot(rootElement).render(null);
