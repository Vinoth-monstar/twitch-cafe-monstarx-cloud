import { LocalizedMain } from "@/components/LocalizedMain";
import { ArrowDown, ArrowUpRight, Sun } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useDesign, useDesignSearch } from "../hooks/use-design";
import { Eyebrow, PageLink, Photo, Reveal } from "../components/ui";
import { featured } from "../data/cafe";
import { CoffeeFocus } from "@/components/CoffeeFocus";
import { useLanguage } from "../components/LanguageProvider";

export function HomePage() {
  const { t } = useLanguage();
  const design = useDesign();
  const designSearch = useDesignSearch();
  return (
    <LocalizedMain id="main">
      <NocturneHero />
      <div className="brand-strip">
        <span>{t("Thoughtfully brewed.")}</span>
        <span className="strip-flower">✳</span>
        <span>{t("Locally rooted.")}</span>
        <span className="strip-flower">✳</span>
        <span>{t("Always a warm welcome.")}</span>
      </div>
      <CoffeeFocus />
      <section className="introduction page-wrap section-space">
        <Reveal>
          <Eyebrow>{t("A café with a story")}</Eyebrow>
          <h2>
            A little Brisbane.
            <br />A lot of <em>heart.</em>
          </h2>
        </Reveal>
        <Reveal className="introduction-copy" delay={0.12}>
          <p>Some of the best things begin with a simple cup of coffee.</p>
          <p>
            Inspired by our years in Australia and the flavours of home, Twitch
            is our little corner of Petaling Jaya. A place for thoughtfully
            prepared coffee, comforting food, and the people who make a day feel
            good.
          </p>
          <PageLink to="/story" design={design} secondary>
            Get to know us
          </PageLink>
        </Reveal>
      </section>
      <section
        className="featured-section page-wrap section-space"
        id="favourites"
      >
        <Reveal className="section-heading">
          <div>
            <Eyebrow>{t("Made for your everyday")}</Eyebrow>
            <h2>
              Find your
              <br />
              <em>new usual.</em>
            </h2>
          </div>
          <div className="section-heading-aside">
            <p>
              A familiar favourite.
              <br />
              Or a happy little discovery.
            </p>
            <PageLink to="/menu" design={design} secondary>
              The whole menu
            </PageLink>
          </div>
        </Reveal>
        <div className="featured-grid">
          {featured.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.1}>
              <Link to="/menu" search={designSearch} className="feature-item">
                <div className="feature-image">
                  <Photo image={item.image} alt={item.alt} />
                  <span className="feature-number">0{index + 1}</span>
                  <span className="feature-arrow">
                    <ArrowUpRight size={21} />
                  </span>
                </div>
                <div className="feature-caption">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="space-feature section-space">
        <div className="page-wrap space-feature-grid">
          <Reveal className="space-feature-image">
            <Photo
              image="sunlit-interior"
              alt="Warm sunlight across the tables and green walls of Twitch Cafe"
            />
            <span className="image-note">A little corner of Section 19.</span>
          </Reveal>
          <Reveal className="space-feature-copy" delay={0.15}>
            <Eyebrow>{t("Make yourself at home")}</Eyebrow>
            <h2>
              Your <br />
              favourite
              <br />
              <em>corner.</em>
            </h2>
            <p>
              Morning coffee at the window. An afternoon with your laptop.
              Conversations that turn into another cup.
            </p>
            <p>
              With family artwork on the walls and a little green in every
              corner, there’s room to settle in and simply be.
            </p>
            <PageLink to="/visit" design={design} secondary>
              Step inside Twitch
            </PageLink>
            <div className="space-qualities">
              <span>Slow mornings</span>
              <span>Quiet moments</span>
              <span>Good company</span>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="gather-preview page-wrap section-space">
        <Reveal className="gather-preview-copy">
          <Eyebrow>{t("More than a coffee stop")}</Eyebrow>
          <h2>
            Bring your people.
            <br />
            Make a <em>moment.</em>
          </h2>
          <p>
            Small celebrations, creative workshops, team catch-ups. Good things
            happen when people come together.
          </p>
          <PageLink to="/gather" design={design}>
            Gather at Twitch
          </PageLink>
        </Reveal>
        <Reveal className="gather-preview-image" delay={0.12}>
          <Photo
            image="gathering"
            alt="A small group gathering over food and drinks at Twitch Cafe"
          />
          <span className="image-note">Room for your next good idea.</span>
        </Reveal>
      </section>
      <section className="takeaway-note page-wrap">
        <span className="takeaway-icon">
          <Sun size={29} strokeWidth={1.1} />
        </span>
        <div>
          <h3>A little Twitch, wherever you are.</h3>
          <p>
            Your favourites are also available through GrabFood, Beep Delivery,
            and ShopeeFood.
          </p>
        </div>
        <PageLink to="/visit" design={design} secondary>
          Plan your next cup
        </PageLink>
      </section>
    </LocalizedMain>
  );
}

function NocturneHero() {
  const { t, language } = useLanguage();
  const designSearch = useDesignSearch();
  return (
    <LocalizedMain as="section" className="hero-nocturne">
      <Photo
        image="cafe-interior"
        alt="The intimate green interior and warm lighting of Twitch Cafe"
        priority
        className="nocturne-background"
      />
      <div className="nocturne-shade" />
      <div className="nocturne-hero-content page-wrap">
        <div>
          <Eyebrow light>{t("Good coffee, good company · Section 19")}</Eyebrow>
          <h1>
            {language === "en" ? (
              <>
                Your daily
                <br />
                <em>escape.</em>
              </>
            ) : (
              t("Your daily escape.")
            )}
          </h1>
          <p>
            {t(
              "Step out of the rush. Into a good cup, a familiar face, and a little time for yourself.",
            )}
          </p>
          <PageLink to="/menu" design="nocturne">
            {t("Discover your usual")}
          </PageLink>
        </div>
        <div className="nocturne-drink">
          <Photo
            image="client-iced-coffee"
            alt="Iced coffee on a sunlit wooden table at Twitch Cafe"
            priority
          />
          <div>
            <span className="eyebrow">Care in every cup</span>
            <span>
              The usual,
              <br />
              <em>made special.</em>
            </span>
            <Link
              to="/menu"
              search={designSearch}
              aria-label="Explore the drinks menu"
            >
              <ArrowUpRight size={25} />
            </Link>
          </div>
        </div>
        <div className="nocturne-hero-bottom">
          <span>COFFEE. CULTURE. CONNECTION.</span>
          <a href="#coffee">
            A little more to discover <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </LocalizedMain>
  );
}
