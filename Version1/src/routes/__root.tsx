import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AuroraBackdrop } from "../components/layout/AuroraBackdrop";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="glass-strong max-w-md rounded-3xl p-10 text-center">
        <h1 className="font-display text-7xl text-gradient-sky">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Off the flight path</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This route isn't on our schedule. Let's get you back on board.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky to-cyan-glow px-4 py-2 text-sm font-semibold text-[oklch(0.12_0.04_260)]"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="glass-strong max-w-md rounded-3xl p-10 text-center">
        <h1 className="font-display text-xl font-semibold">Turbulence detected</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went sideways. You can try again or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-xl bg-gradient-to-r from-sky to-cyan-glow px-4 py-2 text-sm font-semibold text-[oklch(0.12_0.04_260)]"
          >
            Try again
          </button>
          <a href="/" className="rounded-xl glass px-4 py-2 text-sm">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SkyLine Airways — Soar Beyond" },
      { name: "description", content: "Premium futuristic airline platform: check-in, seat selection, baggage, meals, boarding pass and live alerts." },
      { property: "og:title", content: "SkyLine Airways — Soar Beyond" },
      { property: "og:description", content: "Premium futuristic airline platform: check-in, seat selection, baggage, meals, boarding pass and live alerts." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "SkyLine Airways — Soar Beyond" },
      { name: "twitter:description", content: "Premium futuristic airline platform: check-in, seat selection, baggage, meals, boarding pass and live alerts." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ad354cfb-d5de-4573-a81a-08568ff6aa18/id-preview-44630c4f--d59757d8-ed43-4116-9a06-24bc49ebf2ae.lovable.app-1780478871563.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ad354cfb-d5de-4573-a81a-08568ff6aa18/id-preview-44630c4f--d59757d8-ed43-4116-9a06-24bc49ebf2ae.lovable.app-1780478871563.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuroraBackdrop />
      <Navbar />
      <main className="min-h-[60vh]"><Outlet /></main>
      <Footer />
    </QueryClientProvider>
  );
}
