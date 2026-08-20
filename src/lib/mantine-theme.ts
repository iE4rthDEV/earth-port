import { createTheme } from "@mantine/core";

export const mantineTheme = createTheme({
  primaryColor: "brand",
  fontFamily:
    'var(--font-noto-thai), var(--font-sarabun), -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
  colors: {
    brand: [
      "#eff6ff",
      "#dbeafe",
      "#bfdbfe",
      "#93c5fd",
      "#60a5fa",
      "#3b82f6",
      "#2563eb",
      "#1d4ed8",
      "#0284c7",
      "#0369a1",
    ],
  },
});
