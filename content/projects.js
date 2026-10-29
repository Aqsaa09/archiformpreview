/**
 * Portfolio projects. The first one is shown as the featured project.
 * Each image: { src, alt, wide } – wide images span the full width on the project page.
 */
export const projects = [
  {
    slug: 'seaside-villa',
    name: 'Seaside Villa',
    sub: 'Interior renovation & styling',
    type: 'Villa renovation',
    location: 'Dubai, UAE',
    did: 'Interior Design, Project Management, Joinery Design, Styling',
    cover: '/m/bed.jpg',
    intro: 'A complete renovation of a private villa, shaped around light, sea air and slow evenings.',
    text: 'A custom upholstered headboard in a botanical toile anchors the primary bedroom, layered with linen cushions, a waffle-knit throw and soft, low lighting. Taupe bedside chests with sculpted handles and a simple round mirror keep the walls calm and uncluttered.',
    images: [
      { src: '/m/bed.jpg', alt: 'Upholstered toile headboard with linen cushions and a striped bolster' },
      { src: '/m/nightstand.jpg', alt: 'Taupe bedside chest with sculpted handles and a round mirror' },
      { src: '/m/bed-evening.jpg', alt: 'The bedroom at dusk lit by a folding book lamp' },
      { src: '/m/nightstand-sun.jpg', alt: 'Afternoon sun across the bedside wall' },
    ],
  },
  {
    slug: 'bespoke-joinery',
    name: 'Bespoke Joinery',
    sub: 'Furniture and joinery designed in the studio and made to measure',
    type: 'Furniture & joinery',
    location: 'Dubai, UAE',
    did: 'Joinery Design, Project Management',
    cover: '/m/vanity.jpg',
    intro: 'Pieces drawn to the centimetre and built with trusted local workshops.',
    text: 'A sculpted dressing wall with a backlit mirror and floating shelves, a scalloped chest of drawers, upholstered wall panelling and full-height wardrobes. Each piece is detailed in the studio and followed through the workshop to installation.',
    images: [
      { src: '/m/vanity.jpg', alt: 'Sculpted dressing wall with backlit round mirror', wide: true },
      { src: '/m/dresser.jpg', alt: 'Scalloped six-drawer chest in soft lilac grey', wide: true },
      { src: '/m/panels.jpg', alt: 'Upholstered wall panels behind a bed' },
      { src: '/m/wardrobe.jpg', alt: 'Full-height wardrobes in a dressing room' },
      { src: '/m/workshop.jpg', alt: 'The chest of drawers being finished in the workshop', wide: true },
    ],
  },
  {
    slug: 'stone-bathrooms',
    name: 'Stone Bathrooms',
    sub: 'Warm, spa-like bathrooms in limestone-look stone and oak',
    type: 'Residential renovation',
    location: 'Dubai, UAE',
    did: 'Interior Design, Renovation, Project Management',
    cover: '/m/bath-1.jpg',
    intro: 'A daily routine made quieter through warm stone, oak and soft light.',
    text: 'Limestone-look tiles, ribbed feature walls, oak vanities and backlit mirrors give each bathroom a calm, spa-like feel. Wall-hung fittings and frameless glass keep the floor clear and easy to clean.',
    images: [
      { src: '/m/bath-2.jpg', alt: 'Bathroom with ribbed stone wall, walk-in shower and long oak vanity', wide: true },
      { src: '/m/bath-1.jpg', alt: 'Bathroom with oak vanity, backlit mirror and walk-in shower', wide: true },
    ],
  },
  {
    slug: 'kitchen-entrance',
    name: 'Kitchen & Entrance',
    sub: 'Chequered marble, cream cabinetry and solid oak',
    type: 'Residential renovation',
    location: 'Dubai, UAE',
    did: 'Interior Design, Renovation, Styling',
    cover: '/m/kitchen.jpg',
    intro: 'A classic black and white floor that carries from the front door into the kitchen.',
    text: 'Cream shaker cabinetry, a dark marble splashback and worktops, and a solid oak dining table make a warm everyday kitchen. At the entrance, a slim black console and a round brass mirror set the tone.',
    images: [
      { src: '/m/kitchen.jpg', alt: 'Kitchen with cream cabinets, dark marble and an oak dining table' },
      { src: '/m/entry.jpg', alt: 'Entrance with a black console, round brass mirror and chequered floor' },
    ],
  },
  {
    slug: 'dining-room',
    name: 'Dining Room',
    sub: 'A soft, tonal room for long dinners',
    type: 'Residential',
    location: 'Dubai, UAE',
    did: 'Interior Design, Furnishing, Lighting',
    cover: '/m/dining.jpg',
    intro: 'Grasscloth, linen and bouclé under a sculptural crystal pendant.',
    text: 'Full-height linen curtains and grasscloth walls soften the room, while bouclé chairs gather around an oval timber table on a pedestal base. A long crystal pendant adds a quiet sparkle in the evening.',
    images: [{ src: '/m/dining.jpg', alt: 'Dining room with bouclé chairs and a crystal pendant' }],
  },
  {
    slug: 'garden-terrace',
    name: 'Garden Terrace',
    sub: 'An outdoor room under a lit pergola',
    type: 'Outdoor living',
    location: 'Dubai, UAE',
    did: 'Design Concept, Lighting Design, Furnishing',
    cover: '/m/pergola.jpg',
    intro: 'A garden made for long evenings outdoors.',
    text: 'A slatted pergola with integrated warm lighting shelters the dining table, with a lounge beyond and an outdoor kitchen to one side. Travertine paving, floating steps and olive trees tie the terrace to the garden.',
    images: [{ src: '/m/pergola.jpg', alt: 'Garden terrace at dusk with a lit pergola and outdoor dining', wide: true }],
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
