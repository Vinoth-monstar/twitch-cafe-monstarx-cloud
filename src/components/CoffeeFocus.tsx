import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { coffeeMoments } from "@/data/cafe";
import { Eyebrow, Photo, Reveal } from "./ui";
import { useLanguage } from "./LanguageProvider";
import { LocalizedMain } from "./LocalizedMain";

export function CoffeeFocus() {
  const { t, language } = useLanguage();
  return (
    <LocalizedMain
      as="section"
      className="coffee-focus page-wrap section-space"
      id="coffee"
      aria-labelledby="coffee-title"
    >
      <Reveal className="section-heading coffee-heading">
        <div>
          <Eyebrow>{t("Coffee, up close")}</Eyebrow>
          <h2 id="coffee-title">
            {language === "en" ? (
              <>
                Your cup.
                <br />
                <em>Our craft.</em>
              </>
            ) : (
              t("Your cup. Our craft.")
            )}
          </h2>
        </div>
        <div className="coffee-heading-copy">
          <p>
            {t(
              "From the beans we choose to the final pour, coffee is what brings us together.",
            )}
          </p>
          <Link
            to="/menu"
            search={{ category: "espresso" }}
            className="text-link"
          >
            <span>{t("Explore our coffee")}</span>
            <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
      <div className="coffee-layout">
        <Reveal className="coffee-lead">
          <figure>
            <div className="coffee-photo">
              <Photo
                image="client-espresso-craft"
                alt="Espresso being prepared in a glass beneath the café’s coffee machine"
              />
            </div>
            <figcaption>
              <span>01 / TWITCH CAFE</span>
              <span>{t("Thoughtfully prepared. Every day.")}</span>
            </figcaption>
          </figure>
        </Reveal>
        <div className="coffee-mosaic">
          {coffeeMoments.map((item, index) => (
            <Reveal key={item.image} delay={index * 0.06}>
              <figure className="coffee-tile">
                <div className="coffee-photo">
                  <Photo image={item.image} alt={item.alt} />
                </div>
                <figcaption>
                  <span>0{index + 2}</span>
                  <span>{t(item.label)}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </LocalizedMain>
  );
}
