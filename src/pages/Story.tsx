import { useDesign } from "../hooks/use-design";
import { Eyebrow, PageLink, Photo, Reveal } from "../components/ui";

export function StoryPage() {
  const design = useDesign();
  return (
    <main id="main" className="story-page">
      <section className="page-title page-wrap">
        <Eyebrow>The people. The places. The beginnings.</Eyebrow>
        <h1>
          A café with
          <br />a little more <em>heart.</em>
        </h1>
        <p>
          Good coffee brought us here.
          <br />
          Connection is what makes it home.
        </p>
      </section>
      <div className="story-cover page-wrap">
        <Photo
          image="storefront"
          alt="The welcoming glass storefront of Twitch Cafe in Petaling Jaya"
          priority
        />
        <div>
          <span>OUR STORY</span>
          <p>
            Inspired by the world.
            <br />
            Rooted right here.
          </p>
        </div>
      </div>
      <section className="story-chapter page-wrap section-space">
        <Reveal className="chapter-label">
          <span>01 / THE BEGINNING</span>
          <h2>
            A little of Australia,
            <br />
            here in <em>PJ.</em>
          </h2>
        </Reveal>
        <Reveal className="prose" delay={0.1}>
          <p>
            Our love for coffee deepened during five years in Brisbane, where
            café visits became part of everyday life. Working as a barista in
            cafés and at day markets gave us hands-on experience in preparing
            coffee and welcoming people.
          </p>
          <p>
            Travelling introduced us to different roasters, brewing traditions,
            and the small details that make a café memorable. Eventually, we
            wanted a space of our own.
          </p>
          <p>
            Twitch brings those experiences home: carefully prepared coffee,
            Australian-inspired comforts, Malaysian favourites, and a warm
            welcome.
          </p>
        </Reveal>
      </section>
      <section className="story-pair page-wrap">
        <Reveal>
          <Photo
            image="coffee-and-chocolate"
            alt="Coffee and chocolate drinks on a sunlit wooden table"
          />
          <p className="photo-caption">
            A little inspiration from the places we’ve called home.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <Photo
            image="nasi-lemak"
            alt="Nasi lemak wrapped in banana leaf alongside a coffee"
          />
          <p className="photo-caption">
            And familiar flavours we love to share.
          </p>
        </Reveal>
      </section>
      <section className="story-name section-space">
        <div className="page-wrap story-chapter">
          <Reveal className="chapter-label">
            <span>02 / WHY TWITCH</span>
            <h2>
              A name born
              <br />
              from <em>resilience.</em>
            </h2>
          </Reveal>
          <Reveal className="prose" delay={0.1}>
            <p>
              Both founders experienced difficulties with their hands, beginning
              with nerve twitching. It became a chapter of recovery, patience,
              and perseverance.
            </p>
            <p>
              Today, those same hands prepare and brew coffee every day. Twitch
              turns that difficult memory into a reminder of progress,
              gratitude, and possibility.
            </p>
            <p className="story-quote">
              “Something meaningful can grow from a difficult beginning.”
            </p>
          </Reveal>
        </div>
      </section>
      <section className="story-community page-wrap section-space">
        <Reveal className="community-photo">
          <Photo
            image="slide9-shaped-family-2"
            alt="An owner’s mother creating the artwork that makes the café feel personal"
          />
        </Reveal>
        <Reveal className="community-copy" delay={0.12}>
          <Eyebrow>03 / The hands behind the details</Eyebrow>
          <h2>
            Made personal.
            <br />
            <em>Made together.</em>
          </h2>
          <p>
            The artwork on our walls was created by an owner’s mother. Our
            plants came from our families. And some of the food you enjoy comes
            from local women running businesses from home.
          </p>
          <p>
            Their skill, generosity, and care are part of Twitch. Supporting
            their work is part of ours.
          </p>
          <PageLink to="/gather" design={design} secondary>
            Be part of our community
          </PageLink>
        </Reveal>
      </section>
      <section className="beliefs page-wrap section-space">
        <Eyebrow>What we believe</Eyebrow>
        <div className="belief-grid">
          {[
            [
              "01",
              "Coffee",
              "Thoughtfully balanced cups, prepared with beans from roasters we admire.",
            ],
            [
              "02",
              "Culture",
              "Inspired by global café experiences and the growing KL/PJ coffee scene.",
            ],
            [
              "03",
              "Connection",
              "A welcoming place for people of every background to meet or unwind.",
            ],
            [
              "04",
              "Community",
              "An independent café supporting women-led home businesses and makers.",
            ],
          ].map(([number, title, copy]) => (
            <Reveal className="belief" key={title}>
              <span>{number}</span>
              <h3>
                {title}
                <span>.</span>
              </h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
