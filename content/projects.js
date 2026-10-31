/**
 * Portfolio projects, in the order they appear in the grid.
 * category is the portfolio filter tab the project sits under.
 * Each image: { src, alt, wide, kind } – wide images span the full width on the project page.
 * kind: leave it out for a photograph of completed work; set 'visualisation' for a render, AI image or design drawing,
 * and the page labels it "Design visualisation" so it is never mistaken for the finished room.
 * All images below are AI-generated placeholders until the real project photos are uploaded: remove kind as each is replaced.
 */
export const projects = [
  {
    slug: 'seaside-villa',
    category: 'Bedrooms',
    name: 'Seaside Villa',
    sub: 'Residential Renovation & Interior Styling',
    type: 'Villa renovation',
    location: 'Dubai, UAE',
    did: 'Interior Design, Project Management, Joinery Design, Styling',
    cover: '/m/bed.jpg',
    intro: 'A serene retreat shaped by warmth, comfort and quiet elegance.',
    text: 'For this private villa, our vision was to create interiors that feel effortlessly connected, combining soft neutral tones, natural textures and timeless details. From bespoke joinery to carefully considered furnishing and styling, the design brings together sophistication and everyday comfort, creating a home that feels calm, personal and beautifully lived in.',
    images: [
      { src: '/m/bed.jpg', alt: 'Upholstered toile headboard with linen cushions and a striped bolster', kind: 'visualisation' },
      { src: '/m/nightstand.jpg', alt: 'Taupe bedside chest with sculpted handles and a round mirror', kind: 'visualisation' },
      { src: '/m/bed-evening.jpg', alt: 'The bedroom at dusk lit by a folding book lamp', kind: 'visualisation' },
      { src: '/m/nightstand-sun.jpg', alt: 'Afternoon sun across the bedside wall', kind: 'visualisation' },
    ],
  },
  {
    slug: 'bespoke-joinery',
    category: 'Details',
    name: 'Bespoke Joinery',
    sub: 'Furniture and joinery designed in the studio and made to measure',
    type: 'Furniture & joinery',
    location: 'Dubai, UAE',
    did: 'Joinery Design, Project Management',
    cover: '/m/vanity.jpg',
    intro: 'Pieces drawn to the centimetre and built with trusted local workshops.',
    text: 'A sculpted dressing wall with a backlit mirror and floating shelves, a scalloped chest of drawers, upholstered wall panelling and full-height wardrobes. Each piece is detailed in the studio and followed through the workshop to installation.',
    images: [
      { src: '/m/vanity.jpg', alt: 'Sculpted dressing wall with backlit round mirror', wide: true, kind: 'visualisation' },
      { src: '/m/dresser.jpg', alt: 'Scalloped six-drawer chest in soft lilac grey', wide: true, kind: 'visualisation' },
      { src: '/m/panels.jpg', alt: 'Upholstered wall panels behind a bed', kind: 'visualisation' },
      { src: '/m/wardrobe.jpg', alt: 'Full-height wardrobes in a dressing room', kind: 'visualisation' },
      { src: '/m/workshop.jpg', alt: 'The chest of drawers being finished in the workshop', wide: true, kind: 'visualisation' },
    ],
  },
  {
    slug: 'stone-bathrooms',
    category: 'Bathrooms',
    name: 'Stone Bathrooms',
    sub: 'Warm, spa-like bathrooms in limestone-look stone and oak',
    type: 'Residential renovation',
    location: 'Dubai, UAE',
    did: 'Interior Design, Renovation, Project Management',
    cover: '/m/bath-1.jpg',
    intro: 'A daily routine made quieter through warm stone, oak and soft light.',
    text: 'Limestone-look tiles, ribbed feature walls, oak vanities and backlit mirrors give each bathroom a calm, spa-like feel. Wall-hung fittings and frameless glass keep the floor clear and easy to clean.',
    images: [
      { src: '/m/bath-2.jpg', alt: 'Bathroom with ribbed stone wall, walk-in shower and long oak vanity', wide: true, kind: 'visualisation' },
      { src: '/m/bath-1.jpg', alt: 'Bathroom with oak vanity, backlit mirror and walk-in shower', wide: true, kind: 'visualisation' },
    ],
  },
  {
    slug: 'kitchen-entrance',
    category: 'Dining & Kitchen',
    name: 'Kitchen & Entrance',
    sub: 'Chequered marble, cream cabinetry and solid oak',
    type: 'Residential renovation',
    location: 'Dubai, UAE',
    did: 'Interior Design, Renovation, Styling',
    cover: '/m/kitchen.jpg',
    intro: 'A classic black and white floor that carries from the front door into the kitchen.',
    text: 'Cream shaker cabinetry, a dark marble splashback and worktops, and a solid oak dining table make a warm everyday kitchen. At the entrance, a slim black console and a round brass mirror set the tone.',
    images: [
      { src: '/m/kitchen.jpg', alt: 'Kitchen with cream cabinets, dark marble and an oak dining table', kind: 'visualisation' },
      { src: '/m/entry.jpg', alt: 'Entrance with a black console, round brass mirror and chequered floor', kind: 'visualisation' },
    ],
  },
  {
    slug: 'dining-room',
    category: 'Dining & Kitchen',
    name: 'Dining Room',
    sub: 'A soft, tonal room for long dinners',
    type: 'Residential',
    location: 'Dubai, UAE',
    did: 'Interior Design, Furnishing, Lighting',
    cover: '/m/dining.jpg',
    intro: 'Grasscloth, linen and bouclé under a sculptural crystal pendant.',
    text: 'Full-height linen curtains and grasscloth walls soften the room, while bouclé chairs gather around an oval timber table on a pedestal base. A long crystal pendant adds a quiet sparkle in the evening.',
    images: [{ src: '/m/dining.jpg', alt: 'Dining room with bouclé chairs and a crystal pendant', kind: 'visualisation' }],
  },
  {
    slug: 'garden-terrace',
    category: 'Outdoor',
    name: 'Garden Terrace',
    sub: 'An outdoor room under a lit pergola',
    type: 'Outdoor living',
    location: 'Dubai, UAE',
    did: 'Design Concept, Lighting Design, Furnishing',
    cover: '/m/pergola.jpg',
    intro: 'A garden made for long evenings outdoors.',
    text: 'A slatted pergola with integrated warm lighting shelters the dining table, with a lounge beyond and an outdoor kitchen to one side. Travertine paving, floating steps and olive trees tie the terrace to the garden.',
    images: [{ src: '/m/pergola.jpg', alt: 'Garden terrace at dusk with a lit pergola and outdoor dining', wide: true, kind: 'visualisation' }],
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

/** The project's entry for its cover image (alt text, kind) */
export function coverImage(p) {
  return p.images.find((im) => im.src === p.cover) || { src: p.cover, alt: '' };
}
