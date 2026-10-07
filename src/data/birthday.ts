/**
 * THE ONLY FILE YOU NEED TO EDIT for a new invitation.
 * (Then replace the images in /public/images and the music in /public/music.)
 */
export const birthday = {
  person: {
    name: "Adrik",
    age: 1,
    photo: "/images/person.jpg",
    photoAlt: "Adrik — Our Little Prince turns ONE",
  },

  invitation: {
    title: "Our Little Prince",
    subtitle: "Little Moments · Big Joys",
    cta: "Tap To Open",
  },

  welcome: {
    eyebrow: "A Royal Celebration",
    lines: [
      "Join us as we celebrate Adrik's 1st Birthday!",
      "Your presence and blessings will make our celebration extra special!",
    ],
  },

  reveal: { lead: "Celebrating", caption: "Our Little Prince Turns ONE!" },

  scratch: {
    eyebrow: "A Little Surprise",
    hint: "Scratch to reveal the invitation",
    cover: "Scratch Here",
    after: "Keep scratching… a birthday surprise awaits!",
  },

  /** Birthday date (YYYY-MM-DD) and start time (24h HH:mm) — drives countdown, calendar & text everywhere */
  date: "2026-10-25",
  time: "17:30",
  endTime: "20:30",

  countdown: {
    eyebrow: "Counting Down",
    title: "Until The Big Day",
    today: "Today is the day!",
    past: "Celebrated with so much love",
  },

  venue: {
    eyebrow: "Join The Celebration",
    name: "Thennaisolai Restaurant",
    address: "Chinnavedampatti",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Thennaisolai+Restaurant+Chinnavedampatti",
  },

  events: [
    {
      title: "Adrik's 1st Birthday",
      date: "2026-10-25",
      time: "17:30",
      venue: "Thennaisolai Restaurant, Chinnavedampatti",
      description: "Join us as we celebrate Adrik's 1st Birthday!",
      details: [
        { label: "Time", value: "5.30 PM – 8.30 PM" },
        { label: "Theme", value: "Our Little Prince" },
      ],
    },
  ],

  story: [
    {
      year: "Day 1",
      title: "Hello, Little Prince",
      description: "Tiny fingers, sleepy smiles — Adrik arrived and filled our world with joy.",
    },
    {
      year: "Firsts",
      title: "Giggles & Milestones",
      description: "First laughs, first crawls, and endless curious adventures every day.",
    },
    {
      year: "Growing",
      title: "Little Moments",
      description: "Teddy hugs, toy trains, and big joys in the smallest of moments.",
    },
    {
      year: "Today",
      title: "Turns ONE!",
      description: "Surrounded by love — ready for the sweetest birthday celebration yet.",
    },
  ],

  gallery: {
    eyebrow: "Little Moments",
    title: "Big Joys",
    photos: [
      { src: "/images/gallery/01.svg", alt: "Adrik smiling", caption: "Sweet smiles" },
      { src: "/images/gallery/02.svg", alt: "Family moment", caption: "With love" },
      { src: "/images/gallery/03.svg", alt: "Playtime", caption: "Play & joy" },
      { src: "/images/gallery/04.svg", alt: "Birthday fun", caption: "Celebration" },
      { src: "/images/gallery/05.svg", alt: "Quiet moment", caption: "Cozy days" },
      { src: "/images/gallery/06.svg", alt: "Happy memories", caption: "Treasured" },
    ],
  },

  final: {
    title: ["Your presence & blessings", "make this day extra special!"],
    thanks: "We can't wait to celebrate Adrik turning ONE with you.",
    signoff: "With love",
    hosts: "Karthik & Helen",
    closing: "See You There!",
  },

  rsvp: {
    whatsapp: "919999999999",
    message: "Hi! I'll be at Adrik's 1st birthday celebration.",
  },

  music: "/music/birthday.mp3",

  seo: {
    title: "Adrik's 1st Birthday — Our Little Prince",
    description:
      "Join us on 25th October at Thennaisolai Restaurant, Chinnavedampatti to celebrate Adrik turning ONE!",
    image: "/images/invitation.jpg",
  },

  theme: {
    background: "#E3F2FD",
    surface: "#FFFFFF",
    primary: "#1E4D8C",
    accent: "#FFC107",
    rose: "#FF6B6B",
    sage: "#43A047",
    text: "#1A3A5C",
    muted: "#5A7A9A",
  },
};

export type Birthday = typeof birthday;

/* ---------- helpers (no need to edit) ---------- */
const D = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const M = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const p2 = (n: number) => String(n).padStart(2, "0");
export const toDate = (d: string, t = "00:00") => new Date(`${d}T${t}:00`);
export const formatDate = (d: string) => {
  const x = toDate(d, "12:00");
  return `${D[x.getDay()]}, ${x.getDate()} ${M[x.getMonth()]} ${x.getFullYear()}`;
};
export const weekday = (d: string) => D[toDate(d, "12:00").getDay()];
export const dayMonth = (d: string) => {
  const x = toDate(d, "12:00");
  return `${x.getDate()} ${M[x.getMonth()]} ${x.getFullYear()}`;
};
export const formatTime = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}.${p2(m)} ${h >= 12 ? "PM" : "AM"}`;
};
export const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
export const calendarUrl = (b: Birthday) => {
  const s = toDate(b.date, b.time);
  const e = b.endTime ? toDate(b.date, b.endTime) : new Date(s.getTime() + 3 * 3600e3);
  const f = (x: Date) =>
    `${x.getFullYear()}${p2(x.getMonth() + 1)}${p2(x.getDate())}T${p2(x.getHours())}${p2(x.getMinutes())}00`;
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: `${b.person.name}'s ${ordinal(b.person.age)} Birthday`,
    dates: `${f(s)}/${f(e)}`,
    location: `${b.venue.name}, ${b.venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${q}`;
};
