import { LocalizedMain } from '@/components/LocalizedMain';
import { MapPin, Sun } from "lucide-react";
import { cafe } from "../data/cafe";
import { Eyebrow, ExternalLink, Photo, Reveal } from "../components/ui";
import { Gallery } from "../components/Gallery";
import { useLanguage } from "../components/LanguageProvider";

export function VisitPage() {
  const { t } = useLanguage();
  return (
    <LocalizedMain id="main" className="visit-page">
      <section className="page-title page-wrap">
        <Eyebrow>{t('Your little corner of Petaling Jaya')}</Eyebrow>
        <h1>
          {t('Come for a cup.')}
          <br />
          {t('Stay for the')} <em>{t('feeling.')}</em>
        </h1>
      </section>
      <section className="visit-location page-wrap">
        <div className="visit-storefront">
          <Photo
            image="storefront"
            alt="Twitch Cafe storefront at 3 Two Square, Section 19, Petaling Jaya"
            priority
          />
          <span className="storefront-location">
            <MapPin size={16} /> 3 TWO SQUARE · SECTION 19
          </span>
        </div>
        <div className="visit-details">
          <Eyebrow>{t('A warm welcome awaits')}</Eyebrow>
          <h2>
            {t('Find us')}
            <br />
            {t('in')} <em>Section 19.</em>
          </h2>
          <address>
            {cafe.address.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </address>
          <ExternalLink href={cafe.maps} button>
            {t('Get directions')}
          </ExternalLink>
          <div className="visit-hours">
            <Sun size={20} strokeWidth={1.3} />
            <div>
              <h3>{t('Planning your visit?')}</h3>
              {cafe.hours ? (
                cafe.hours.map((line) => <p key={line}>{line}</p>)
              ) : (
                <p>
                  {t('For current opening hours and café updates, check our Instagram before you head over.')}
                </p>
              )}
              <ExternalLink href={cafe.instagram}>@twitchcafe.pj</ExternalLink>
            </div>
          </div>
        </div>
      </section>
      <section className="inside-section page-wrap section-space" id="space">
        <Reveal className="section-heading">
          <div>
            <Eyebrow>{t('Take a little look around')}</Eyebrow>
            <h2>
              Find your
              <br />
              <em>favourite spot.</em>
            </h2>
          </div>
          <p>
            Sunlit windows. Family artwork.
            <br />A little green. Plenty of heart.
          </p>
        </Reveal>
        <Gallery />
      </section>
      <section className="delivery-section section-space">
        <div className="page-wrap delivery-grid">
          <Reveal>
            <Eyebrow>{t('A little Twitch, delivered')}</Eyebrow>
            <h2>
              Your favourites.
              <br />
              <em>Your place.</em>
            </h2>
            <p>
              A daily coffee, a comforting meal, or a sweet treat. Bring a
              little Twitch to your home or workday.
            </p>
            <div className="delivery-platforms">
              <span>GrabFood</span>
              <span>Beep Delivery</span>
              <span>ShopeeFood</span>
            </div>
            <ExternalLink href={cafe.instagram}>
              {t('Ask us about delivery')}
            </ExternalLink>
          </Reveal>
          <Reveal className="delivery-photo" delay={0.1}>
            <Photo
              image="delivery-boxes"
              alt="Twitch Cafe takeaway boxes ready for delivery"
            />
          </Reveal>
        </div>
      </section>
    </LocalizedMain>
  );
}
