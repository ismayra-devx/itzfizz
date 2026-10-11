/**
 * Deterministic PRNG and Foliage Generator for Verge SVGs
 * Generates ~120 overlapping circles/ellipses in 3 tonal layers plus irregular leaf-litter strip.
 * Runs once deterministically with a seeded PRNG. No SVG filters, no CSS blur.
 */

// Simple, reliable 32-bit PRNG (Mulberry32)
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface FoliageShape {
  id: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fill: string;
  opacity: number;
}

export interface VergeData {
  baseShapes: FoliageShape[];
  midShapes: FoliageShape[];
  highlightShapes: FoliageShape[];
  leafLitterPath: string;
}

// Card exclusion / calming zones in 0-1 coordinate space
// Keeps zones directly behind the cards calmer (darker, fewer highlights)
function isNearCardZone(nx: number, ny: number, isTopVerge: boolean): boolean {
  if (isTopVerge) {
    // Top verge: Card 1 (58% @ left 16%) and Card 3 (27% @ right 16%)
    const inCard1 = nx >= 0.12 && nx <= 0.36 && ny <= 0.70;
    const inCard3 = nx >= 0.64 && nx <= 0.88 && ny <= 0.70;
    return inCard1 || inCard3;
  } else {
    // Bottom verge: Card 2 (23% @ left 10%) and Card 4 (40% @ right 22%)
    const inCard2 = nx >= 0.08 && nx <= 0.32 && ny >= 0.30;
    const inCard4 = nx >= 0.58 && nx <= 0.82 && ny >= 0.30;
    return inCard2 || inCard4;
  }
}

export function generateVergeData(isTopVerge: boolean, seed: number = 42): VergeData {
  const rand = mulberry32(seed);
  const WIDTH = 1440;
  const HEIGHT = 360; // Represents ~36.5svh verge area

  const baseShapes: FoliageShape[] = [];
  const midShapes: FoliageShape[] = [];
  const highlightShapes: FoliageShape[] = [];

  // Tonal layers per spec:
  // base: #1F2316, mid: #2F311A, highlights: #5C6B2A at 35% opacity
  const BASE_COLOR = "#1F2316";
  const MID_COLOR = "#2F311A";
  const HIGHLIGHT_COLOR = "#5C6B2A";

  // Density helper:
  // Heaviest at screen top/bottom edges (ny near 0 for top, ny near 1 for bottom) and corners (nx near 0 or 1),
  // and dense within ~10svh of the road edges (top verge: ny near 1; bottom verge: ny near 0).
  const sampleY = () => {
    const r = rand();
    // 50% chance outer edge/corners, 50% chance near road edge
    if (rand() < 0.5) {
      // Near outer screen edge:
      // For top verge (screen edge is y=0): r^1.8
      // For bottom verge (screen edge is y=HEIGHT): 1 - r^1.8
      const bias = Math.pow(r, 1.8);
      return isTopVerge ? bias * 0.55 : 1 - bias * 0.55;
    } else {
      // Near road edge (within ~10svh = ~0.28 of height):
      // For top verge (road edge is y=HEIGHT): 1 - r * 0.32
      // For bottom verge (road edge is y=0): r * 0.32
      return isTopVerge ? 1 - r * 0.32 : r * 0.32;
    }
  };

  // 1. Layer 1: Base dark foliage blobs (42 shapes)
  for (let i = 0; i < 42; i++) {
    const nx = rand();
    const ny = sampleY();
    const cx = Math.round(nx * WIDTH);
    const cy = Math.round(ny * HEIGHT);

    // Radii: 40 to 110px
    const rx = Math.round(45 + rand() * 65);
    const ry = Math.round(35 + rand() * 55);

    baseShapes.push({
      id: `base-${isTopVerge ? "t" : "b"}-${i}`,
      cx,
      cy,
      rx,
      ry,
      fill: BASE_COLOR,
      opacity: 0.96,
    });
  }

  // 2. Layer 2: Mid-tone foliage clusters (46 shapes)
  for (let i = 0; i < 46; i++) {
    const nx = rand();
    const ny = sampleY();
    const inCalm = isNearCardZone(nx, ny, isTopVerge);

    const cx = Math.round(nx * WIDTH);
    const cy = Math.round(ny * HEIGHT);

    // In calm zones behind cards: darker and slightly smaller
    const rx = Math.round(inCalm ? 24 + rand() * 30 : 32 + rand() * 45);
    const ry = Math.round(inCalm ? 18 + rand() * 24 : 24 + rand() * 38);

    midShapes.push({
      id: `mid-${isTopVerge ? "t" : "b"}-${i}`,
      cx,
      cy,
      rx,
      ry,
      fill: inCalm ? BASE_COLOR : MID_COLOR,
      opacity: inCalm ? 0.95 : 0.88,
    });
  }

  // 3. Layer 3: Highlight speckles (32 shapes, #5C6B2A at 35% opacity)
  for (let i = 0; i < 32; i++) {
    const nx = rand();
    const ny = sampleY();

    // In calm zones behind cards: skip or drastically reduce highlights
    if (isNearCardZone(nx, ny, isTopVerge)) {
      continue;
    }

    const cx = Math.round(nx * WIDTH);
    const cy = Math.round(ny * HEIGHT);

    const rx = Math.round(5 + rand() * 11);
    const ry = Math.round(4 + rand() * 9);

    highlightShapes.push({
      id: `hl-${isTopVerge ? "t" : "b"}-${i}`,
      cx,
      cy,
      rx,
      ry,
      fill: HIGHLIGHT_COLOR,
      opacity: 0.35, // Exact 35% opacity per spec
    });
  }

  // 4. Reddish leaf-litter strip along road edge (#45342F, ~3svh tall, irregular edge)
  // Top verge road edge is at y = HEIGHT (bottom of SVG).
  // Bottom verge road edge is at y = 0 (top of SVG).
  const segments = 48;
  const step = WIDTH / segments;
  const litterHeight = 30; // ~3svh

  const points: [number, number][] = [];

  if (isTopVerge) {
    // Starts at bottom-left corner of SVG (0, HEIGHT)
    points.push([0, HEIGHT]);
    for (let i = 0; i <= segments; i++) {
      const px = Math.round(i * step);
      // Natural irregular wobble
      const wobble = Math.round((rand() - 0.5) * 16);
      const py = Math.round(HEIGHT - litterHeight + wobble);
      points.push([px, py]);
    }
    points.push([WIDTH, HEIGHT]);
  } else {
    // Starts at top-left corner of SVG (0, 0)
    points.push([0, 0]);
    for (let i = 0; i <= segments; i++) {
      const px = Math.round(i * step);
      const wobble = Math.round((rand() - 0.5) * 16);
      const py = Math.round(litterHeight + wobble);
      points.push([px, py]);
    }
    points.push([WIDTH, 0]);
  }

  // Assemble closed SVG path
  let leafLitterPath = `M ${points[0][0]} ${points[0][1]} `;
  for (let i = 1; i < points.length; i++) {
    leafLitterPath += `L ${points[i][0]} ${points[i][1]} `;
  }
  leafLitterPath += "Z";

  return {
    baseShapes,
    midShapes,
    highlightShapes,
    leafLitterPath,
  };
}

// Generate static deterministic datasets once at module init
export const TOP_VERGE_DATA = generateVergeData(true, 1337);
export const BOTTOM_VERGE_DATA = generateVergeData(false, 7331);
