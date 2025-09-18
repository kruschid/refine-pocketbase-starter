import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

// biome-ignore lint/style/noNonNullAssertion: that's fine
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
