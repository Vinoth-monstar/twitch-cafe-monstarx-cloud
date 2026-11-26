import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { menu } from "@/data/cafe";
import { Eyebrow, Photo } from "@/components/ui";
import { useLanguage } from "@/components/LanguageProvider";
export function MenuPage() {
  const { t } = useLanguage();
  const { category: selected } = useSearch({ from: "/menu" });
  const navigate = useNavigate({ from: "/menu" });
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const visible =
    selected === "all"
      ? menu
      : menu.filter((category) => category.id === selected);
  return (
    <main id="main" className="menu-page">
      <section className="menu-intro page-wrap">
        <div>
          <Eyebrow>{t('Your usual, or something new')}</Eyebrow>
          <h1>
            {t('Good things,')}
            <br />
            <em>{t('by the cup.')}</em>
            <br />
            {t('And the plate.')}
          </h1>
          <p>
            {t('From your first coffee to one more slice.')}
            <br />
            {t('Find something that feels like you.')}
          </p>
          <Link
            to="/menu"
            search={(previous) => previous}
            hash="menu-selection"
            className="text-link"
          >
            {t('Take a look')} <ArrowDown size={15} />
          </Link>
        </div>
        <div className="menu-intro-photo">
          <Photo
            image="tiramisu-latte"
            alt="Our Tiramisu Latte with cocoa and a biscuit"
            priority
          />
          <span className="image-note">A little indulgence never hurt.</span>
        </div>
      </section>
      <section
        className="menu-selection page-wrap section-space"
        id="menu-selection"
      >
        <div className="menu-filter" role="group" aria-label="Filter the menu">
          {[{ id: "all", label: "The whole menu" }, ...menu].map((category) => (
            <button
              disabled={!ready}
              key={category.id}
              onClick={() =>
                void navigate({
                  search: (previous) => ({
                    ...previous,
                    category: category.id,
                  }),
                  hash: true,
                  resetScroll: false,
                })
              }
              aria-pressed={selected === category.id}
            >
              {t(category.label)}
            </button>
          ))}
        </div>
        <p className="menu-availability">
          {t('Prepared with care. Selections vary with the day — ask us what’s available.')}
        </p>
        <div aria-live="polite" className="sr-only">
          {selected === "all"
            ? "Showing all menu categories"
            : `Showing ${visible[0]?.label}`}
        </div>
        <div key={selected} className="menu-category-reveal">
          {visible.map((category) => (
            <section
              className="menu-category"
              key={category.id}
              aria-labelledby={`category-${category.id}`}
            >
              <div className="menu-category-intro">
                <span className="eyebrow">0{menu.indexOf(category) + 1}</span>
                <h2 id={`category-${category.id}`}>{t(category.label)}</h2>
                <p>{t(category.intro)}</p>
                <Photo
                  image={category.image}
                  alt={`${t(category.label)} at Twitch Cafe`}
                />
              </div>
              <div className="menu-items">
                <div className="menu-item-grid">
                  {category.items.map((item) => (
                    <div className="menu-item" key={item}>
                      <span>{item}</span>
                      <span className="menu-item-dot" aria-hidden="true">
                        ·
                      </span>
                    </div>
                  ))}
                </div>
                {category.note && (
                  <p className="menu-category-note">{t(category.note)}</p>
                )}
              </div>
            </section>
          ))}
        </div>
        <p className="menu-closing">
          Something caught your eye? Come by and make it your usual.
        </p>
      </section>
    </main>
  );
}
