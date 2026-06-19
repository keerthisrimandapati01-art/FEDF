type SkyLineErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type SkyLineEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: SkyLineErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __skylineEvents?: SkyLineEvents;
  }
}

export function reportSkyLineError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.__skylineEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
