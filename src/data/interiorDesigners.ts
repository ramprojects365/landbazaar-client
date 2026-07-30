export type InteriorDesigner = {
  slug: string;
  name: string;
  role: string;
  companyName: string;
  companyLogo: string;
  profileImage: string;
  phone: string;
  email: string;
  city: string;
  tagline: string;
  bio: string;
  specialties: string[];
  gallery: { src: string; title: string; description: string }[];
  highlights: { title: string; body: string; image: string }[];
};

export const interiorDesigners: InteriorDesigner[] = [
  {
    slug: "aisha-rahman",
    name: "Aisha Rahman",
    role: "Principal Designer",
    companyName: "ARH Interiors",
    companyLogo: "/assets/img/rent/rent-user-4.png",
    profileImage: "/assets/img/rent/rent-thumb-1.jpg",
    phone: "+60123456789",
    email: "hello@arhinteriors.my",
    city: "Kuala Lumpur",
    tagline: "Warm, contemporary homes with Malaysian craft at the centre.",
    bio: "Aisha leads residential and boutique commercial projects across Klang Valley. Her studio focuses on natural materials, daylight, and layouts that age well with growing families.",
    specialties: ["Residential", "Kitchen & wet areas", "Lighting design"],
    gallery: [
      {
        src: "/assets/img/listing/listing-thumb-1.jpg",
        title: "Living — Damansara Heights",
        description: "Open plan with layered lighting and custom joinery.",
      },
      {
        src: "/assets/img/listing/listing-thumb-2.jpg",
        title: "Master suite — Mont Kiara",
        description: "Soft palette with acoustic ceiling and blackout layers.",
      },
      {
        src: "/assets/img/listing/listing-thumb-3.jpg",
        title: "Dry kitchen",
        description: "Stone island and integrated appliances.",
      },
      {
        src: "/assets/img/rent/rent-thumb-2.jpg",
        title: "Study nook",
        description: "Compact workspace with display shelving.",
      },
    ],
    highlights: [
      {
        title: "Full renovation roadmap",
        body: "Concept, tender, site supervision, and defect handover in one coordinated timeline.",
        image: "/assets/img/listing/listing-thumb-1.jpg",
      },
      {
        title: "3D walkthrough before build",
        body: "Clients approve materials and views digitally before orders are placed.",
        image: "/assets/img/listing/listing-thumb-2.jpg",
      },
    ],
  },
  {
    slug: "daniel-ong",
    name: "Daniel Ong",
    role: "Creative Director",
    companyName: "Luma Living Studio",
    companyLogo: "/assets/img/rent/rent-user-4.png",
    profileImage: "/assets/img/rent/rent-thumb-3.jpg",
    phone: "+60198765432",
    email: "projects@lumaliving.my",
    city: "Petaling Jaya",
    tagline: "Minimal lines, maximum function — condos done right.",
    bio: "Daniel specialises in high-rise fit-outs where every centimetre counts. Luma Living delivers storage-first layouts and builder-ready drawings for joint-management compliance.",
    specialties: ["Condominiums", "Built-ins", "Smart storage"],
    gallery: [
      {
        src: "/assets/img/rent/rent-thumb-4.jpg",
        title: "Compact condo living",
        description: "Sliding panels separate lounge and guest zone.",
      },
      {
        src: "/assets/img/rent/rent-thumb-5.jpg",
        title: "Feature wall",
        description: "Fluted panels with concealed TV mount.",
      },
      {
        src: "/assets/img/listing/listing-thumb-3.jpg",
        title: "Dining alcove",
        description: "Banquette seating with under-seat drawers.",
      },
    ],
    highlights: [
      {
        title: "Defect-aware site surveys",
        body: "Design adapts to developer as-built tolerances before cabinetry is fabricated.",
        image: "/assets/img/rent/rent-thumb-4.jpg",
      },
      {
        title: "Fixed-fee packages",
        body: "Transparent tiers for design-only or design + project management.",
        image: "/assets/img/listing/listing-thumb-3.jpg",
      },
    ],
  },
  {
    slug: "priya-devi",
    name: "Priya Devi",
    role: "Founder & Lead Designer",
    companyName: "Southnest Design",
    companyLogo: "/assets/img/rent/rent-user-4.png",
    profileImage: "/assets/img/rent/rent-thumb-6.jpg",
    phone: "+60175551234",
    email: "studio@southnest.my",
    city: "Penang",
    tagline: "Coastal light, heritage textures, modern comfort.",
    bio: "Priya blends Peranakan motifs with contemporary open plans. Southnest is known for colour confidence and artisan collaborations across northern Malaysia.",
    specialties: ["Landed homes", "Heritage refresh", "Outdoor decks"],
    gallery: [
      {
        src: "/assets/img/rent/rent-thumb-7.jpg",
        title: "Courtyard house",
        description: "Ventilated corridor linking old structure to new wing.",
      },
      {
        src: "/assets/img/rent/rent-thumb-8.jpg",
        title: "Kitchen garden view",
        description: "Large openings with deep eaves for shade.",
      },
      {
        src: "/assets/img/listing/listing-thumb-2.jpg",
        title: "Formal living",
        description: "Teak accents with breathable wall finishes.",
      },
    ],
    highlights: [
      {
        title: "Artisan network",
        body: "Direct access to rattan, cement tile, and local stone workshops.",
        image: "/assets/img/rent/rent-thumb-7.jpg",
      },
      {
        title: "Sustainable specs",
        body: "Low-VOC finishes and passive cooling strategies on every brief.",
        image: "/assets/img/listing/listing-thumb-2.jpg",
      },
    ],
  },
  {
    slug: "marcus-tan",
    name: "Marcus Tan",
    role: "Director",
    companyName: "Gridline Architects & Interiors",
    companyLogo: "/assets/img/rent/rent-user-4.png",
    profileImage: "/assets/img/listing/listing-thumb-1.jpg",
    phone: "+60162220011",
    email: "enquiries@gridline.my",
    city: "Johor Bahru",
    tagline: "Precision detailing for executive homes and show units.",
    bio: "Marcus bridges architecture and interior execution. Gridline delivers developer show suites and owner-led bungalows with strict site documentation.",
    specialties: ["Show units", "Bungalows", "Office fit-out"],
    gallery: [
      {
        src: "/assets/img/listing/listing-thumb-1.jpg",
        title: "Show suite — Iskandar",
        description: "Layered ceiling planes and curated art niches.",
      },
      {
        src: "/assets/img/rent/rent-thumb-1.jpg",
        title: "Principal bedroom",
        description: "Walk-in wardrobe with hotel-style lighting scenes.",
      },
      {
        src: "/assets/img/rent/rent-thumb-3.jpg",
        title: "Entertainment lounge",
        description: "Acoustic wall and concealed bar.",
      },
    ],
    highlights: [
      {
        title: "BIM-ready drawings",
        body: "Clash detection before site work reduces costly variations.",
        image: "/assets/img/listing/listing-thumb-1.jpg",
      },
      {
        title: "Aftercare programme",
        body: "Scheduled visits in the first year of occupation.",
        image: "/assets/img/rent/rent-thumb-1.jpg",
      },
    ],
  },
];

export function getInteriorDesignerBySlug(
  slug: string,
): InteriorDesigner | undefined {
  return interiorDesigners.find((d) => d.slug === slug);
}
