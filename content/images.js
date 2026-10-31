/**
 * Pixel size (width, height) of each photo in public/m, used by next/image to reserve space and pick a resolution.
 * Add a line when you add a photo; if you replace one with a different shape, update its size here.
 */
const SIZES = {
  '/m/bath-1.jpg': [1600, 959],
  '/m/bath-2.jpg': [1600, 719],
  '/m/bed-evening.jpg': [1066, 1600],
  '/m/bed.jpg': [852, 1280],
  '/m/dining.jpg': [1086, 1448],
  '/m/dresser.jpg': [1448, 1086],
  '/m/entry.jpg': [900, 1600],
  '/m/fabrics.jpg': [468, 838],
  '/m/kitchen.jpg': [1086, 1448],
  '/m/nightstand-sun.jpg': [720, 1280],
  '/m/nightstand.jpg': [1066, 1600],
  '/m/panels.jpg': [1200, 1600],
  '/m/pergola.jpg': [1536, 1024],
  '/m/pm.jpg': [1024, 1024],
  '/m/roula.jpg': [980, 1600],
  '/m/vanity.jpg': [1448, 1086],
  '/m/vase.jpg': [584, 892],
  '/m/wardrobe.jpg': [1024, 1280],
  '/m/workshop.jpg': [1280, 960],
};

// Falls back to a 4:3 frame so a missing entry still renders; the CSS crops every photo to its frame anyway
export function imageSize(src) {
  return SIZES[src] || [1600, 1200];
}
