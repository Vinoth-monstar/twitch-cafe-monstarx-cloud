import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu as MenuIcon, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cafe, designs, navigation } from "@/data/cafe";
import type { Design } from "@/data/cafe";
import { ExternalLink, PageLink, Photo } from "./ui";
import { useAppearance, useDesign, useDesignSearch } from "@/hooks/use-design";

export function Site({ children }: { children: ReactNode }) {
  const design = useDesign();
  return (
    <div className="site" data-design={design}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header design={design} />
        {children}
        <Footer design={design} />
        <DesignSwitcher design={design} />
    </div>
  );
}

function AppearanceToggle() {
  const { design, ready, setMode } = useAppearance();
  const dark = design === "nocturne";
  return (
    <button
      type="button"
      className="appearance-toggle icon-button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      title={
        dark
          ? "Switch to light mode · Forest"
          : "Switch to dark mode · Nocturne"
      }
      disabled={!ready}
      onClick={() => setMode(dark ? "light" : "dark")}
    >
      {dark ? (
        <Sun size={19} strokeWidth={1.5} aria-hidden="true" />
      ) : (
        <Moon size={19} strokeWidth={1.5} aria-hidden="true" />
      )}
    </button>
  );
}

function Header({ design }: { design: Design }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const designSearch = useDesignSearch();
  const home = design === "atelier" ? "/atelier" : "/";
  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () =>
      drawer.current?.querySelectorAll<HTMLElement>("a,button:not(:disabled)");
    focusable()?.[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (event.key !== "Tab") return;
      const elements = focusable();
      if (!elements?.length) return;
      const first = elements[0],
        last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          to={home}
          search={designSearch}
          className="brand"
          aria-label="Twitch Cafe home"
        >
          <Photo
            image="slide4-twitchcafe-logo"
            alt=""
            className="brand-mark"
            priority
          />
          <span className="wordmark">
            twitch<span>COFFEE. CULTURE. CONNECTION.</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              search={designSearch}
              activeProps={{ className: "is-active" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link to="/account" search={designSearch} className="account-link">
            My account
          </Link>
          <AppearanceToggle />
          <Link to="/visit" search={designSearch} className="header-visit">
            Come on over <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <button
          ref={trigger}
          type="button"
          className="mobile-toggle icon-button"
          aria-label="Open navigation"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(true)}
        >
          <MenuIcon size={25} />
        </button>
      </div>
      {open && (
        <div
          className="mobile-navigation"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          ref={drawer}
        >
          <button
            type="button"
            className="icon-button close-navigation"
            aria-label="Close navigation"
            onClick={() => {
              setOpen(false);
              trigger.current?.focus();
            }}
          >
            <X />
          </button>
          <span className="eyebrow">Coffee. Culture. Connection.</span>
          {[
            { label: "Home", to: home },
            ...navigation,
            { label: "Visit us", to: "/visit" as const },
            { label: "My account", to: "/account" as const },
          ].map((item, index) => (
            <Link
              to={item.to}
              search={designSearch}
              key={item.to}
              onClick={() => {
                setOpen(false);
                trigger.current?.focus();
              }}
            >
              <span>0{index + 1}</span>
              {item.label}
              <ArrowUpRight size={24} />
            </Link>
          ))}
          <div className="mobile-appearance">
            <span>Make yourself at home</span>
            <AppearanceToggle />
          </div>
          <p>3 Two Square · Petaling Jaya</p>
        </div>
      )}
    </header>
  );
}

function Footer({ design }: { design: Design }) {
  return (
    <footer className="site-footer">
      <div className="footer-invitation page-wrap">
        <div>
          <p className="eyebrow">Your next coffee is waiting</p>
          <h2>
            See you at <em>Twitch.</em>
          </h2>
        </div>
        <PageLink to="/visit" design={design}>
          Find your way here
        </PageLink>
      </div>
      <div className="footer-main page-wrap">
        <div className="footer-signature">
          <span>twitch café</span>
          <p>
            Good coffee. Familiar faces.
            <br />A little place to call your own.
          </p>
        </div>
        <div>
          <span className="footer-label">Find us</span>
          <address>
            {cafe.address.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </address>
        </div>
        <div>
          <span className="footer-label">Stay connected</span>
          <ExternalLink href={cafe.instagram}>Instagram</ExternalLink>
          <ExternalLink href={cafe.facebook}>Facebook</ExternalLink>
        </div>
      </div>
      <div className="footer-bottom page-wrap">
        <span>© Twitch Cafe</span>
        <span>Independent. Locally rooted. Made with heart.</span>
        <a href="#main">Back to top ↑</a>
      </div>
    </footer>
  );
}

function DesignSwitcher({ design }: { design: Design }) {
  const { notice } = useAppearance();
  return (
    <>
      <nav
        className="design-switcher"
        aria-label="Explore website design directions"
      >
        <span className="switcher-label">THE COLLECTION</span>
        {designs.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            search={{ design: item.id }}
            aria-current={design === item.id ? "page" : undefined}
            className={design === item.id ? "selected" : ""}
            title={item.title}
          >
            <span className={`design-dot dot-${item.id}`} />
            <span className="design-number">{item.number}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      {notice && (
        <p className="appearance-notice" role="status">
          {notice}
        </p>
      )}
    </>
  );
}
