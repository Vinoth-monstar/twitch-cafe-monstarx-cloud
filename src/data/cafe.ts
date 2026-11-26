import assetManifest from "./assets.json";

export type PhotoKey = keyof typeof assetManifest;
export const assets = assetManifest;
export type Design = "forest" | "atelier" | "nocturne";

export const designs = [
  {
    id: "forest",
    number: "01",
    name: "Forest",
    title: "The everyday ritual",
    path: "/",
  },
  {
    id: "atelier",
    number: "02",
    name: "Atelier",
    title: "A slower kind of beautiful",
    path: "/atelier",
  },
  {
    id: "nocturne",
    number: "03",
    name: "Nocturne",
    title: "A little everyday escape",
    path: "/nocturne",
  },
] as const;

export const cafe = {
  name: "Twitch Cafe",
  tagline: "Coffee. Culture. Connection.",
  address: [
    "A-05-LG2, 3 Two Square",
    "Section 19, Petaling Jaya",
    "Selangor, Malaysia",
  ],
  instagram: "https://www.instagram.com/twitchcafe.pj/",
  facebook: "https://www.facebook.com/p/Twitch-Cafe-PJ-61586643704147/",
  maps: "https://share.google/NOzkYfbMFNRJclFLX",
  // Confirm these with the owner before publishing. Never infer them from old listings.
  phone: null as string | null,
  email: null as string | null,
  hours: null as string[] | null,
  delivery: { grabFood: null, beep: null, shopeeFood: null },
};

export const navigation = [
  { label: "Our story", to: "/story" },
  { label: "The menu", to: "/menu" },
  { label: "Gather here", to: "/gather" },
] as const;

export const featured = [
  {
    name: "Tiramisu Latte",
    category: "A little indulgence",
    image: "tiramisu-latte",
    alt: "Tiramisu latte topped with a biscuit and cocoa",
  },
  {
    name: "Strawberry Matcha",
    category: "Something a little different",
    image: "strawberry-matcha",
    alt: "Layered strawberry and matcha drink in the café",
  },
  {
    name: "Butter Cake",
    category: "A familiar favourite",
    image: "butter-cake",
    alt: "Golden homemade butter cake on a wooden board",
  },
] satisfies { name: string; category: string; image: PhotoKey; alt: string }[];

export const menu = [
  {
    id: "espresso",
    label: "Espresso & filter",
    image: "pour-over",
    intro:
      "Your daily ritual, thoughtfully prepared. We choose beans from The Hub Coffee Roasters, exploring the character of every cup.",
    items: [
      "Espresso",
      "Americano",
      "Latte",
      "Cappuccino",
      "Flat White",
      "Piccolo",
      "Mocha",
      "Spanish Latte",
      "On the Rocks",
      "V60 Pour-over",
    ],
    note: "V60 pour-over is available on selected days, with rotating coffee selections.",
  },
  {
    id: "signature",
    label: "Signature drinks",
    image: "tiramisu-latte",
    intro:
      "A familiar cup, with a little Twitch character. Come curious and find a new favourite.",
    items: [
      "Dirty Latte",
      "Daddy’s Skull",
      "The Tapis",
      "Tiramisu Latte",
      "Twitch Mojito",
      "Dark Orange",
    ],
    note: "",
  },
  {
    id: "matcha",
    label: "Matcha & more",
    image: "strawberry-matcha",
    intro:
      "Matcha moments, warming chai, Australian-sourced dark chocolate, and something refreshing.",
    items: [
      "Matcha Latte",
      "Strawberry Matcha",
      "Iced Dirty Matcha",
      "Matcha Usucha",
      "Hot Chocolate",
      "Spiced Chai Latte",
      "Strawberry Splash",
      "Hot Tea in Pot",
    ],
    note: "Hot chocolate is made with Australian-sourced dark chocolate. Hot tea is available in five flavours.",
  },
  {
    id: "savoury",
    label: "Savoury favourites",
    image: "nasi-lemak",
    intro:
      "Local comforts and satisfying bites, from a quick breakfast to a slower lunch.",
    items: [
      "Nasi Lemak Bungkus",
      "Fried Mee Hoon",
      "Fried Kuey Teow with Egg & Shrimps",
      "Shepherd’s Pie",
      "Mac & Cheese",
      "Chicken Lasagna",
      "Skin-on Fries",
    ],
    note: "Our food line-up changes with demand and availability. Selected items are available while stocks last.",
  },
  {
    id: "bakes",
    label: "Bakes & sweet treats",
    image: "butter-cake",
    intro:
      "The perfect reason to stay for another cup. Simple, comforting bakes made with care.",
    items: [
      "Brownies",
      "Toasted Banana Bread with Butter",
      "Butter Cake",
      "Shio Pan · Japanese Salt Bun",
      "Cranberry Bagel with Cream Cheese",
      "Cinnamon Bagel with Butter",
    ],
    note: "Selections and availability may vary. Ask us what’s fresh today.",
  },
] satisfies {
  id: string;
  label: string;
  image: PhotoKey;
  intro: string;
  items: string[];
  note: string;
}[];

export const spacePhotos = [
  {
    image: "sunlit-interior",
    alt: "Sunlight falling across the wooden tables and window seats at Twitch Cafe",
  },
  {
    image: "family-corner",
    alt: "A comfortable corner with family artwork, plants, and green walls",
  },
  {
    image: "community-table",
    alt: "The café’s wooden community table beneath a warm pendant light",
  },
  {
    image: "cafe-interior",
    alt: "A view through the relaxed interior of Twitch Cafe",
  },
  {
    image: "window-seat",
    alt: "A guest enjoying a quiet moment at the window",
  },
] satisfies { image: PhotoKey; alt: string }[];
