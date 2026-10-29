# AURA Parfums — Liquid Glass Fragrance Atelier

A complete, production-quality perfume e-commerce web application designed with an ethereal **"liquid glass"** design system: calm, luminous, editorial, and expensive.

Built with **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**, featuring mock product data in local JSON files.

---

## ✨ Visual Direction & Liquid Glass System

The aesthetic evokes **soft morning light through a heavy glass perfume flacon**: airy, tactile, editorial, and minimal with generous whitespace.

- **Translucent Surfaces**: `rgba(255, 255, 255, 0.12–0.26)` with `backdrop-filter: blur(28px) saturate(160%)`.
- **Specular Highlights**: 1px gradient borders (`linear-gradient(135deg, white 60% -> white 5%)`) with an inner specular edge highlight (`inset 0 1px 0 rgba(255,255,255,0.55)`).
- **Refraction Orbs**: Slow-drifting blurred gradient orbs (blush `#F2C9D0`, lavender `#CFC3F0`, champagne `#E8D3A8`, mist blue `#CFE0D4`) that pass behind the page to provide refraction for all glass surfaces.
- **Micro-Interactions**: Glass surfaces lift 4px on hover with an animated specular light sweep across the surface.
- **Editorial Typography**: 
  - **Display**: *Instrument Serif* / *Cormorant Garamond* with italicized emphasis in headlines.
  - **Body / UI**: *Manrope* (clean geometric readability).
  - **Micro-Labels**: *Geist Mono* (uppercase, wide letter-spacing for notes and prices).
- **Dual-Mode System**: Instant toggle between Warm Ivory (`#F7F3EE` with subtle 3% grain) and Aubergine Night (`#14101A` deep violet base with illuminated glass flacons).

---

## 🏛️ Pages & Features Included

1. **Home (`/`)**:
   - **Floating Glass Announcement Pill**: Auto-scrolling ticker with marquee animation: *"Festive edit: engrave a name on the bottle, 15% off ✦ Pick any 3, the cheapest is on us ✦ Free delivery over ₹599"*.
   - **Floating Glass Pill Navbar**: Shrinks on scroll, includes glass mega-menu with visual tiles (Fresh / Floral / Woody), instant search modal, dark mode toggle, and cart badge.
   - **Full Viewport Hero**: Headline *"Smell like \*your\* best memory."*, 3D floating flacon with caustic glow, and rotating 3-card promo carousel.
   - **Find Your Family**: 3 large glass cards with gradient glows (Fresh: mist blue + sage, Floral: blush + lavender, Woody: champagne + amber) with interactive floating note chips on hover.
   - **Bestsellers Grid**: 8 invented fragrances (*Velvet Peony, Smoked Amber, Salt & Fig, Midnight Orchid, Citrus Haze, Cedar Hour, Rose Static, Moonlit Vanilla*) with dual-image hover transitions, pill size selectors (50ml / 100ml / Engraved), and quick view.
   - **City Collection**: Darker smoked glass cards for *Kyoto Mist, Marrakech Dusk, Lisbon Light,* and *Seoul Neon* with mini notes pyramids.
   - **Make It Yours Spotlight**: Live bottle-label preview where typing a name updates the flacon in real time.
   - **Shop by Person**: Masonry-style tiles for *For Him, For Her, and For Everyone*.
   - **Scent Quiz Teaser**: Banner with animated progress dots.
   - **Atelier Story**: Pull quote over distillation photography with small-batch & 28% Extrait claims.
   - **Store Sanctuaries**: Overlapping flagship & conservatory photos with city selector.
   - **As Featured In**: Infinite grayscale editorial marquee (*Vogue, Elle, Harper's Bazaar, GQ, Monocle, Architectural Digest*).
   - **The Olfactory Journal**: 2x2 editorial article cards.
   - **Trust Row**: Free delivery over ₹599, Sample-First guarantee, 28% Extrait concentration.
   - **Footer**: Giant faded brand wordmark, glass newsletter input, and navigation links.

2. **Shop Catalog (`/shop`)**:
   - Filter chips by Olfactory Family, Silhouette/Gender, Occasion, and Wishlist.
   - Live search input for notes and ingredients.
   - Sort by Featured, Price Low-High, Price High-Low, and Star Rating.

3. **Product Detail Page (`/product/[slug]`)**:
   - Multi-angle visual gallery with macro botanical shots.
   - Volume selector (50ml ₹2,450 / 100ml ₹3,850 / Engraved ₹2,850).
   - Real-time bottle engraving preview directly onto the flacon.
   - Notes pyramid (Top 0–30m, Heart 2–4h, Base 6–12h).
   - Longevity (10–12h) and Sillage projection meters.
   - Layering pairing guide.

4. **City Collection (`/city-collection`)**:
   - Dedicated geographical showcase with city coordinates, climate performance, soundscape toggle, and notes breakdown.

5. **Make It Yours Studio (`/make-it-yours`)**:
   - Full bespoke personalization studio: select fragrance, select volume, type custom name/monogram (up to 16 chars), choose typography style (Classic Serif, Modern Sans, Monogram, Script Cursive), gift note option, and 3D flacon preview.

6. **Scent Finder Quiz (`/quiz`)**:
   - 4-question interactive memory journey with animated progress dots.
   - Algorithmic 98% harmonic match calculation with confetti celebration.
   - One-click "Acquire Flacon" with complimentary discovery vials.

7. **Cart Drawer**:
   - Right-side glass slide-out drawer with free delivery progress bar (threshold: ₹599).
   - Quantity steppers (`+` / `-`), engraving details, promo code field (`FESTIVE15`), complimentary sample picker (pick 2 of 6 vials), and simulated checkout.

8. **Editorial Journal (`/journal` and `/journal/[slug]`)**:
   - 4 complete essays on skin chemistry, fragrance blind-buying, layering rituals, and flacon preservation.

9. **Stores & Sanctuaries (`/stores`)**:
   - Mumbai Colaba Flagship, Bengaluru Glasshouse Pop-Up, New Delhi Heritage Boutique, Hyderabad Sunken Court.
   - Interactive appointment booking modal for 1-on-1 consultations.

10. **Atelier Concierge (`/contact`)**:
    - Concierge inquiry form and FAQ accordion.

---

## 🚀 Running Locally

Ensure you have **Node.js 18+** installed:

```bash
# Navigate to project directory
cd C:\Users\Asus\.gemini\antigravity-ide\scratch\aura-fragrances

# Install dependencies
npm install --legacy-peer-deps

# Start the dev server
npm run dev

# Open your browser
# Navigate to http://localhost:3000
```

---

## 🛠️ How to Customize

### 1. Swapping the Brand Name `[BRAND]`
The brand name is managed centrally via `src/context/StoreContext.tsx`:
```tsx
// src/context/StoreContext.tsx (Line 89)
const [brandName, setBrandName] = useState<string>('AURA'); // Change to your brand name
```
You can also change the default title and metadata in `src/app/layout.tsx`.

### 2. Modifying Products & Inventory
All product data lives in `src/data/products.json`:
- To add or edit a fragrance, update its `name`, `family`, `price`, `notes` (top, heart, base), `meters`, and `images`.
- Images support both local files in `/public/images/` and remote URLs (Unsplash is pre-configured in `next.config.mjs`).

### 3. Replacing Images
- **Product Shots**: Edit the `images.primary`, `images.secondary`, and `images.macro` URLs in `src/data/products.json`.
- **City Collection**: Edit `src/data/cities.json`.
- **Journal Articles**: Edit `src/data/journal.json`.
- **Store Photos**: Edit `src/data/stores.json`.

### 4. Adjusting Liquid Glass Tokens
All liquid glass visual tokens are defined in `src/app/globals.css`:
- `--glass-bg`: Opacity and tint of translucent glass surfaces.
- `--glass-border`: Gradient highlight opacity.
- `--accent-blush`, `--accent-lavender`, `--accent-champagne`, `--accent-sage`: Ambient glow palette.
- `.dark`: Aubergine night mode adjustments.

---

## 💎 Design Tokens & Accessibility
- **WCAG AA Contrast**: High-contrast dark plum text (`#1F1A24`) against ivory (`#F7F3EE`), with tinted glass backing behind text elements.
- **Prefers-Reduced-Motion**: All keyframes and transitions automatically disable for users who prefer reduced motion.
- **Responsive Breakpoints**: Validated across mobile (`360px`), tablet (`768px`), and desktop (`1440px`).
