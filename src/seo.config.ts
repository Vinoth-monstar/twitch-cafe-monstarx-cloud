// Search and AI-answer-engine settings for this app, written by MonstarX's SEO/GEO settings.
//
// Change them in Preview → SEO/GEO or through the authorized builder SEO tools, not here: every save replaces this file. The managed helper
// src/lib/monstarx/seo.ts turns them into the <head> of every page, /robots.txt, /sitemap.xml and /llms.txt.

import type { SeoConfig } from '@/lib/monstarx/seo'

export const seo: SeoConfig = {
  "siteUrl": "",
  "siteName": "Twitch Cafe Monstarx · Cloud",
  "defaultTitle": "Twitch Cafe Monstarx · Cloud",
  "titleTemplate": "%s · Twitch Cafe Monstarx · Cloud",
  "defaultDescription": "",
  "keywords": [],
  "locale": "en",
  "themeColor": "",
  "image": null,
  "imageAlt": "",
  "twitterSite": "",
  "twitterCard": "summary_large_image",
  "indexable": false,
  "robots": {
    "mode": "allow",
    "disallow": [],
    "aiCrawlers": "allow",
    "custom": ""
  },
  "sitemap": {
    "enabled": true,
    "exclude": [],
    "extra": []
  },
  "llms": {
    "enabled": true,
    "summary": "",
    "notes": ""
  },
  "organization": {
    "name": "Twitch Cafe Monstarx · Cloud",
    "type": "Organization",
    "logo": null,
    "sameAs": [],
    "email": "",
    "phone": "",
    "address": ""
  },
  "verification": {
    "google": "",
    "bing": "",
    "yandex": "",
    "pinterest": ""
  },
  "faq": [],
  "pages": [
    {
      "path": "/",
      "title": "Twitch Cafe"
    },
    {
      "path": "/account",
      "title": "My account",
      "noindex": true
    },
    {
      "path": "/atelier",
      "title": "Atelier"
    },
    {
      "path": "/forgot-password",
      "title": "Forgot password",
      "noindex": true
    },
    {
      "path": "/gather",
      "title": "Gather here"
    },
    {
      "path": "/llms.txt"
    },
    {
      "path": "/login",
      "title": "Sign in",
      "noindex": true
    },
    {
      "path": "/menu",
      "title": "The menu"
    },
    {
      "path": "/nocturne",
      "title": "Nocturne"
    },
    {
      "path": "/reset-password",
      "title": "Reset password",
      "noindex": true
    },
    {
      "path": "/robots.txt"
    },
    {
      "path": "/signup",
      "title": "Create an account",
      "noindex": true
    },
    {
      "path": "/sitemap.xml"
    },
    {
      "path": "/story",
      "title": "Our story"
    },
    {
      "path": "/visit",
      "title": "Visit us"
    }
  ],
  "paths": [
    "/",
    "/account",
    "/atelier",
    "/forgot-password",
    "/gather",
    "/llms.txt",
    "/login",
    "/menu",
    "/nocturne",
    "/reset-password",
    "/robots.txt",
    "/signup",
    "/sitemap.xml",
    "/story",
    "/visit"
  ],
  "privatePaths": [
    "/account",
    "/gather"
  ]
}

export default seo
