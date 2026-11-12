/**
 * Pixel size (width, height) of each photo in public/m, used by next/image to reserve space and pick a resolution.
 * Add a line when you add a photo; if you replace one with a different shape, update its size here.
 */
const SIZES = {
  '/m/bath-1.jpg': [1600, 959],
  '/m/bath-2.jpg': [1600, 719],
  '/m/bed-evening.jpg': [1066, 1600],
  '/m/bed-sunlight.jpg': [720, 1280],
  '/m/bed.jpg': [852, 1280],
  '/m/dining.jpg': [1086, 1448],
  '/m/dresser.jpg': [1448, 1086],
  '/m/entry.jpg': [900, 1600],
  '/m/fabrics.jpg': [468, 838],
  '/m/kitchen.jpg': [1086, 1448],
  '/m/kitchen-marble.jpg': [809, 1470],
  '/m/materials-board.jpg': [1200, 1493],
  '/m/nightstand-sun.jpg': [720, 1280],
  '/m/nightstand.jpg': [1066, 1600],
  '/m/panels.jpg': [1200, 1600],
  '/m/pergola.jpg': [1536, 1024],
  '/m/pm-materials.jpg': [1024, 1536],
  '/m/approach-skyline.jpg': [941, 1672],
  '/m/she-means-business-p14.jpg': [1482, 1061],
  '/m/reno-before-after.jpg': [1536, 1024],
  '/m/roula.jpg': [980, 1600],
  '/m/vanity.jpg': [1448, 1086],
  '/m/vanity-clean.webp': [1447, 1087],
  '/m/wardrobe.jpg': [1024, 1280],
  '/m/workshop.jpg': [1280, 960],
  '/m/wardrobe-corridor.webp': [1122, 1402],
  '/m/dresser-studio.webp': [1448, 1086],
  '/m/panelled-bedroom.jpg': [1086, 1448],
  // Portfolio images (Nov 2026)
  '/m/pf/courtyard-bistro.jpg': [1024, 1536],
  '/m/pf/courtyard-lounge.jpg': [1086, 1448],
  '/m/pf/courtyard-planters.jpg': [1086, 1448],
  '/m/pf/courtyard-plate.jpg': [1086, 1448],
  '/m/pf/courtyard-pot.jpg': [1086, 1448],
  '/m/pf/courtyard-seating.jpg': [1024, 1536],
  '/m/pf/courtyard-tiles.jpg': [1024, 1536],
  '/m/pf/courtyard-tree.jpg': [1081, 1341],
  '/m/pf/courtyard-wall.jpg': [1024, 1536],
};

// Falls back to a 4:3 frame so a missing entry still renders; the CSS crops every photo to its frame anyway
export function imageSize(src) {
  return SIZES[src] || [1600, 1200];
}
