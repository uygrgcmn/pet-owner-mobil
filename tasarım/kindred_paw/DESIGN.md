# Design System Strategy: The Tactile Pet Companion

## 1. Overview & Creative North Star
Most pet care apps fall into the trap of looking like medical portals or generic e-commerce sites. This design system rejects the "utilitarian grid" in favor of a **Creative North Star: The Warm Editorial.** 

We are moving away from flat, boxed-in layouts. Instead, we treat the UI as a series of soft, organic layers that mimic the physical comfort of a home. We use **Intentional Asymmetry**—placing images of pets slightly off-grid or overlapping container boundaries—to create a sense of life and playfulness. The system feels premium through its restraint: heavy use of whitespace, sophisticated type scales, and a complete absence of harsh structural lines.

## 2. Colors & Surface Philosophy
The palette is rooted in a "Sun-Drenched Morning" aesthetic—warm oranges for energy, deep blues for trust, and forest greens for growth.

### The "No-Line" Rule
**Standard 1px borders are strictly prohibited.** To section content, designers must use background shifts. 
*   **Example:** A featured "Pet Health" section should be a `surface-container-low` (#fff1e7) block sitting directly on the `surface` (#fff8f4) background. 
*   **The Transition:** Use the `surface-container` tiers to define hierarchy. An element of high importance (like an urgent medical reminder) should sit on `surface-container-highest` (#ffdcbc) to naturally draw the eye through tonal contrast rather than a stroke.

### Surface Hierarchy & Nesting
Treat the screen as a physical stack of fine paper. 
*   **Base Layer:** `surface` (#fff8f4).
*   **Sectioning Layer:** `surface-container-low` (#fff1e7).
*   **Interactive Cards:** `surface-container-lowest` (#ffffff) to provide a "lifted" feel.
*   **Active Overlays:** Use `surface-bright` for elements that need to pop against darker secondary backgrounds.

### The Glass & Gradient Rule
To achieve a signature, high-end feel, use **Glassmorphism** for bottom navigation bars and floating action buttons.
*   **Effect:** Apply `surface` at 80% opacity with a `20px` backdrop-blur. 
*   **Signature Textures:** For primary CTAs, do not use a flat hex. Apply a subtle linear gradient from `primary` (#944c00) to `primary-container` (#ffaf72) at a 135-degree angle. This adds "soul" and depth to the interaction.

## 3. Typography
We utilize a dual-font system to balance authority with approachability.

*   **Display & Headline (Plus Jakarta Sans):** This is our "Editorial Voice." Large-scale type (`display-lg` at 3.5rem) should be used with tight letter-spacing (-2%) for hero moments. It feels modern, clean, and confident.
*   **Body & Label (Be Vietnam Pro):** This is our "Utility Voice." It is highly legible even at small scales (`label-sm`). 
*   **Hierarchy Tip:** Use `on-surface-variant` (#7f5629) for secondary body text to reduce visual noise, reserving `on-surface` (#4c2b01) for primary headlines and critical information.

## 4. Elevation & Depth
We eschew traditional material shadows for **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` card placed on a `surface-container-low` background creates a soft, natural lift without the need for shadows.
*   **Ambient Shadows:** If a floating element (like a "Book Now" FAB) requires a shadow, use a `12px` blur with 6% opacity. The shadow color must be a tint of `on-surface` (#4c2b01), never pure black.
*   **The Ghost Border Fallback:** If a border is required for accessibility (e.g., in high-contrast modes), use `outline-variant` (#dca873) at **15% opacity**. 100% opaque borders are forbidden.

## 5. Components

### Buttons
*   **Primary:** Gradient (Primary to Primary-Container), `full` roundedness, `body-lg` bold text.
*   **Secondary:** `secondary-container` (#d4e3ff) background with `on-secondary-container` (#005396) text. No border.
*   **Tertiary:** Ghost style. `on-surface` text with a `surface-container-lowest` hover state.

### Cards & Lists
*   **The "No-Divider" Rule:** Never use a horizontal line to separate list items. Use `spacing-4` (1.4rem) of vertical whitespace or alternate between `surface` and `surface-container-low` backgrounds.
*   **Pet Profile Cards:** Use `rounded-xl` (3rem) for image containers to reinforce the "friendly/soft" brand identity.

### Input Fields
*   **State:** Background should be `surface-container-highest` (#ffdcbc) with `rounded-md`.
*   **Focus:** Transition the background to `surface-container-lowest` (#ffffff) and add a `2px` "Ghost Border" of `primary` at 20% opacity.

### Signature Component: The "Community Pulse" Carousel
An asymmetric carousel where cards have varying widths (e.g., 280px followed by 160px). This breaks the "template" look and encourages exploration.

## 6. Do's and Don'ts

### Do
*   **Do** use the `lg` (2rem) and `xl` (3rem) roundedness for large containers to maintain the "friendly" vibe.
*   **Do** allow pet photography to "break the container"—have a dog’s ear or paw overlap a text block to create depth.
*   **Do** use `tertiary` (#126d3a) for health-related success states (e.g., "Vaccination Up to Date").

### Don't
*   **Don't** use pure black (#000000) for text. Always use `on-surface` (#4c2b01) to keep the warmth.
*   **Don't** use standard "Drop Shadows." Use tonal shifts first, and ambient blurs only when necessary.
*   **Don't** cram content. If a screen feels full, increase the spacing using the `8` (2.75rem) or `10` (3.5rem) tokens. Breathing room is a premium feature.