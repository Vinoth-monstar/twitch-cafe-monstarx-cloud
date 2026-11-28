import type { ReactNode } from "react";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  Link,
} from "@tanstack/react-router";
import { seoConfig, seoHead } from "@/lib/monstarx/seo";
import { Site } from "@/components/Site";
import { LanguageProvider } from "@/components/LanguageProvider";
import { LocalizedMain } from "@/components/LocalizedMain";
import appCss from "../styles.css?url";
import cloudCss from "../cloud-features.css?url";
export const Route = createRootRoute({
  validateSearch: () => ({}),
  head: (ctx) => {
    const seo = seoHead(ctx);
    return {
      ...seo,
      links: [
        ...seo.links,
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=DM+Sans:wght@400;500;600&display=swap",
        },
        { rel: "stylesheet", href: appCss },
        { rel: "stylesheet", href: cloudCss },
        {
          rel: "icon",
          type: "image/webp",
          href: "/assets/slide4-twitchcafe-logo.webp",
        },
      ],
    };
  },
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});
function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html
      lang={seoConfig.locale || "en"}
      data-design="nocturne"
      style={{ colorScheme: "dark" }}
    >
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
function RootLayout() {
  return (
    <LanguageProvider>
      <Site>
        <Outlet />
      </Site>
    </LanguageProvider>
  );
}
function NotFound() {
  return (
    <LocalizedMain id="main" className="not-found page-wrap section-space">
      <p className="eyebrow">A little detour</p>
      <h1>
        Let’s find your
        <br />
        way <em>back.</em>
      </h1>
      <p>The page you’re looking for isn’t here.</p>
      <Link to="/" className="button">
        Back to Twitch
      </Link>
    </LocalizedMain>
  );
}
