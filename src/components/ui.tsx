import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ImageOff } from "lucide-react";
import { assets } from "@/data/cafe";
import type { Design, PhotoKey } from "@/data/cafe";
import { useDesignSearch } from "@/hooks/use-design";

export type PublicPath =
  | "/"
  | "/atelier"
  | "/nocturne"
  | "/story"
  | "/menu"
  | "/gather"
  | "/visit";

export function Photo({
  image,
  alt,
  className = "",
  priority = false,
  position,
  sizes,
}: {
  image: PhotoKey;
  alt: string;
  className?: string;
  priority?: boolean;
  position?: string;
  sizes?: string;
}) {
  const asset = assets[image];
  const [failedSource, setFailedSource] = useState<string | null>(null);
  if (!asset || failedSource === asset.src)
    return (
      <div
        className={`photo photo-placeholder ${className}`}
        role="img"
        aria-label={`Photograph unavailable: ${alt}`}
      >
        <ImageOff size={22} strokeWidth={1} aria-hidden="true" />
        <span>{alt}</span>
      </div>
    );
  return (
    <img
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt={alt}
      className={`photo ${className}`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      sizes={sizes}
      style={position ? { objectPosition: position } : undefined}
      onError={() => setFailedSource(asset.src)}
    />
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow${light ? " eyebrow--light" : ""}`}>
      <span />
      {children}
    </p>
  );
}

export function PageLink({
  to,
  children,
  secondary = false,
  className = "",
}: {
  to: PublicPath;
  design: Design;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  const designSearch = useDesignSearch();
  return (
    <Link
      to={to}
      search={designSearch}
      className={`${secondary ? "text-link" : "button"} ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" />
    </Link>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
  button = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  button?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${button ? "button" : "text-link"} ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
