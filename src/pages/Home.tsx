import { ArrowDown, ArrowUpRight, Sun } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useDesign, useDesignSearch } from "../hooks/use-design";
import { Eyebrow, PageLink, Photo, Reveal } from "../components/ui";
import { featured } from "../data/cafe";

export function HomePage() {
  const design = useDesign();
  const designSearch = useDesignSearch();
  return (
    <main id="main">
      {design === "atelier" ? (
        <AtelierHero />
      ) : design === "nocturne" ? (
        <NocturneHero />
      ) : (
        <ForestHero />
      )}
      <div className="brand-strip">
        <span>Thoughtfully brewed.</span>
        <span className="strip-flower">✳</span>
        <span>Locally rooted.</span>
        <span className="strip-flower">✳</span>
        <span>Always a warm welcome.</span>
      </div>
      <section className="introduction page-wrap section-space">
        <Reveal>
          <Eyebrow>A café with a story</Eyebrow>
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
            <Eyebrow>Made for your everyday</Eyebrow>
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
            <Eyebrow>Make yourself at home</Eyebrow>
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
          <Eyebrow>More than a coffee stop</Eyebrow>
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
    </main>
  );
}

function ForestHero() {
  return (
    <section className="hero-forest page-wrap">
      <div className="hero-copy">
        <Eyebrow>Your neighbourhood café · Petaling Jaya</Eyebrow>
        <h1 className="hero-headline">
          <span>Good coffee.</span>
          <span>Better</span>
          <span>
            <em>company.</em>
          </span>
        </h1>
        <div className="hero-description">
          <span className="small-rule" />
          <p>
            A little Australia. A little Malaysia.
            <br />A place to feel right at home.
          </p>
        </div>
        <div className="hero-actions">
          <PageLink to="/menu" design="forest">
            Explore the menu
          </PageLink>
          <PageLink to="/story" design="forest" secondary>
            Our story
          </PageLink>
        </div>
        <a className="scroll-note" href="#favourites">
          <ArrowDown size={13} /> Take a little look around
        </a>
      </div>
      <div className="hero-visual">
        <div className="hero-main-photo">
          <Photo
            image="pour-over"
            alt="Hand-poured filter coffee in the morning sunlight at Twitch Cafe"
            priority
          />
        </div>
        <div className="hero-small-photo">
          <Photo
            image="window-seat"
            alt="A quiet window seat in the café"
            priority
          />
          <span>STAY A LITTLE LONGER.</span>
        </div>
        <div className="coffee-seal">
          <Sun size={24} strokeWidth={1.2} />
          <span>
            Good things
            <br />
            <em>brew here.</em>
          </span>
        </div>
        <span className="hero-side-caption">COFFEE. CULTURE. CONNECTION.</span>
      </div>
    </section>
  );
}

function AtelierHero() {
  return (
    <section className="hero-atelier page-wrap">
      <div className="atelier-heading">
        <Eyebrow>An independent café in Petaling Jaya</Eyebrow>
        <h1>
          Stay a little
          <br />
          <em>longer.</em>
          <span className="atelier-asterisk">✳</span>
        </h1>
        <p>
          A good cup. Something comforting.
          <br />A moment that’s entirely yours.
        </p>
      </div>
      <div className="atelier-pictures">
        <figure className="atelier-picture-small">
          <Photo
            image="morning-latte"
            alt="A latte with a heart in the morning sunlight"
            priority
          />
          <figcaption>01 — THE FIRST SIP</figcaption>
        </figure>
        <figure className="atelier-picture-main">
          <Photo
            image="window-seat"
            alt="A relaxed moment in the light-filled café window"
            priority
          />
          <figcaption>YOUR LITTLE CORNER OF PETALING JAYA.</figcaption>
        </figure>
        <figure className="atelier-picture-side">
          <Photo
            image="butter-cake"
            alt="A slice of homemade butter cake"
            priority
          />
          <figcaption>02 — SOMETHING SWEET</figcaption>
        </figure>
      </div>
      <div className="atelier-bottom">
        <span>
          Australian inspiration.
          <br />
          Malaysian soul.
        </span>
        <PageLink to="/menu" design="atelier">
          Find your favourite
        </PageLink>
        <span className="atelier-bottom-right">
          Coffee. Culture.
          <br />
          Connection.
        </span>
      </div>
    </section>
  );
}

function NocturneHero() {
  const designSearch = useDesignSearch();
  return (
    <section className="hero-nocturne">
      <Photo
        image="cafe-interior"
        alt="The intimate green interior and warm lighting of Twitch Cafe"
        priority
        className="nocturne-background"
      />
      <div className="nocturne-shade" />
      <div className="nocturne-hero-content page-wrap">
        <div>
          <Eyebrow light>Good coffee, good company · Section 19</Eyebrow>
          <h1>
            Your daily
            <br />
            <em>escape.</em>
          </h1>
          <p>
            Step out of the rush.
            <br />
            Into a good cup, a familiar face,
            <br />
            and a little time for yourself.
          </p>
          <PageLink to="/menu" design="nocturne">
            Discover your usual
          </PageLink>
        </div>
        <div className="nocturne-drink">
          <Photo
            image="spanish-latte"
            alt="A layered Spanish latte served in a glass"
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
          <a href="#favourites">
            A little more to discover <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
