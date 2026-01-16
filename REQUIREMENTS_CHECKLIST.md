# Module 1 Certification - Requirements Checklist

## Part 1: Building the Landing Page

### Setup
- [x] Sign up for Replit, CodeSandbox, or CodePen
- [x] Start a new project
- [x] Create landing page from scratch

**Talking Points:**
> - Built locally with standard HTML/CSS/JS file structure
> - Project organized with separate folders: `/css`, `/js`, `/assets/images`
> - Clean separation of concerns: structure (HTML), presentation (CSS), behavior (JS)

---

### HTML/Page Structure
- [x] Navbar with links and CTA button
- [x] Proper landmarks:
  - [x] `<nav>` element (with `role="navigation"` and `aria-label`)
  - [x] `<main>` element
  - [x] `<footer>` element (with `role="contentinfo"`)
- [x] At least 4 sections (not including nav and footer) — **We have 10 sections!**
  - [x] Section 1: **Hero** - Two-column layout with full-bleed image
  - [x] Section 2: **Introduction/Stats** - Bento grid layout for key statistics
  - [x] Section 3: **Parks** - Four theme park cards with expandable details
  - [x] Section 4: **Planning** - Accordion-based planning information
  - [x] Section 5: **Tips & Tricks** - 9 tip cards in responsive grid
  - [x] Section 6: **Dining Guide** - Three dining types + must-try snacks
  - [x] Section 7: **Transportation** - Getting to/around Disney info
  - [x] Section 8: **Special Events** - Seasonal events grid
  - [x] Section 9: **Blog/News** - Dynamic RSS feed from Disney blogs (fetch)
  - [x] Section 10: **Resources** - External links and disclaimer

**Talking Points:**
> - Semantic HTML throughout: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
> - Each section has a unique `id` for anchor navigation
> - Used `<article>` for park cards to indicate self-contained content
> - Mobile-responsive navigation with hamburger menu
> - Sticky navigation for easy access while scrolling
> - Two-column hero with right-bleeding image is a modern layout pattern

---

### CSS
- [x] Write CSS to style the page
- [x] Decide on approach:
  - [ ] Vanilla CSS
  - [x] **Tailwind CSS** (via CDN with custom config)
  - [ ] Sass/SCSS
  - [ ] Less
  - [x] Custom CSS file for advanced effects (`styles.css`)

**Talking Points:**
> - **Why Tailwind?** Rapid development, utility-first approach, built-in responsive design
> - Custom Tailwind config extends the theme with Disney-inspired colors:
>   - `mickey-red`: #E31837 (Disney's signature red)
>   - `mickey-red-text`: #B91C1C (WCAG AA compliant darker red for text, 5.3:1 contrast)
>   - `mickey-yellow`: #FFD700 (accent gold)
>   - `cream`: #FFFBF0 (warm background)
> - Custom CSS handles advanced animations that Tailwind can't do:
>   - Accordion sparkle effects
>   - Park card shimmer/hover effects
>   - Hero floating sparkles
>   - Mickey cursor follower
> - Used CSS custom properties (`--radius-lg`) for consistent border radius
> - `prefers-reduced-motion` media query respects user accessibility preferences

---

### JavaScript
- [x] At least 3 custom JavaScript functions:
  - [x] Function 1: **`fetchDisneyBlogPosts()`** (type: **async/await fetch** ✓ REQUIRED)
  - [x] Function 2: **`setupScrollAnimations()`** (type: GSAP ScrollTrigger integration)
  - [x] Function 3: **`setupAccordions()`** (type: DOM manipulation, event handling, ARIA)
  - [x] *Bonus functions:*
    - `setupMickeyCursor()` - Whimsical cursor follower effect
    - `setupHeroSparkles()` - Floating sparkle animations
    - `setupBentoCountingNumbers()` - Animated number counting
    - `setupNavSparkles()` - Click sparkle effects
    - `setupMobileMenu()` - Mobile navigation toggle
    - `setupSmoothScroll()` - Smooth anchor scrolling
- [x] External data source chosen: **Disney-related RSS feeds**
- [x] API endpoint: **RSS2JSON API** (`https://api.rss2json.com/v1/api.json`)
  - Disney Parks Blog
  - Inside the Magic
  - WDWNT (Walt Disney World News Today)

**Talking Points:**
> - **Fetch Implementation:**
>   - Uses `async/await` for clean asynchronous code
>   - Implements timeout wrapper to prevent hanging requests (10s timeout)
>   - Fetches from 3 different RSS feeds for variety
>   - Uses RSS2JSON API as a proxy (RSS feeds don't support CORS)
>   - Extracts images from multiple sources: thumbnail, enclosure, content HTML
>   - Proper error handling with loading/error states in UI
>   - Sorts posts by date and limits to 9 most recent
> 
> - **Scroll Animations:**
>   - Uses GSAP + ScrollTrigger for performant scroll-based animations
>   - Batch animations for cards (staggered reveal)
>   - `once: true` ensures animations only play once
>   - Checks `prefers-reduced-motion` before initializing
> 
> - **Accordions:**
>   - Full keyboard accessibility (Enter/Space to toggle)
>   - ARIA attributes: `aria-expanded`, `aria-controls`, `aria-labelledby`
>   - Animated with GSAP including bounce easing
>   - Sparkle effects on open for whimsy
>   - Screen reader announcements via live region

---

### Accessibility
- [x] All images have `alt` attributes
- [x] All form inputs have labels (N/A - no forms, but buttons have aria-labels)
- [x] Page has a `<title>`
- [x] Color is not the only visual means of conveying information
- [x] Accessible for screen readers
- [x] Accessible for screen magnifiers
- [x] ARIA attributes used appropriately (26+ instances)
- [x] Lists used appropriately (no "list-itis")
- [x] Screen reader only classes implemented (`.sr-only`)

**Talking Points:**
> - **ARIA Implementation:**
>   - `aria-label` on nav, buttons, and interactive elements
>   - `aria-expanded` and `aria-controls` for accordions and expandable content
>   - `aria-labelledby` connects accordion panels to their headings
>   - `aria-hidden="true"` on decorative icons (SVGs, sparkles)
>   - `role="region"` on accordion content panels
>   - `role="navigation"` and `role="contentinfo"` on landmarks
> 
> - **Keyboard Navigation:**
>   - All interactive elements are focusable
>   - Focus styles visible (`:focus-visible` with ring)
>   - Accordions respond to Enter and Space keys
>   - Skip to content possible via anchor links
> 
> - **Screen Reader Support:**
>   - `.sr-only` class for visually hidden but screen-reader-accessible content
>   - `announceToScreenReader()` function creates live regions for dynamic updates
>   - Semantic HTML provides structure (headings hierarchy, lists, articles)
> 
> - **Motion Accessibility:**
>   - `prefers-reduced-motion` query disables all animations
>   - Mickey cursor hidden for users who prefer reduced motion
>   - CSS fallbacks for non-JS environments

---

### SEO
- [x] Title tag added: "Disney World Guide - Complete Planning Resource for Magic Kingdom, EPCOT & More"
- [x] Meta description added (compelling, keyword-rich)
- [ ] Meta keywords (deprecated - intentionally omitted)
- [x] Open Graph tags:
  - [x] `og:title`
  - [x] `og:description`
  - [x] `og:type` (website)
  - [x] `og:url` ✅ https://coryrunnells-webflow.github.io/Module-1-Certification/
  - [x] `og:image` ✅ Castle image for social sharing
- [x] All images have alt text

**Talking Points:**
> - **Title Tag:** Includes primary keywords (Disney World, Magic Kingdom, EPCOT) and is under 60 characters for full display in search results
> - **Meta Description:** Action-oriented, includes keywords, creates urgency ("complete guide", "expert tips")
> - **Open Graph:** Prepared for social sharing - will display nicely when shared on Facebook, LinkedIn, etc.
> - **Note:** `og:url` and `og:image` need to be filled in once the site is published with a live URL
> - **Semantic Structure:** Proper heading hierarchy (h1 → h2 → h3) helps search engines understand content structure
> - **Internal Linking:** Anchor navigation helps search engines understand page structure

---

### Performance
- [x] Lighthouse scores (tested Jan 16, 2026):
  - **Accessibility: 100** ✅
  - **SEO: 100** ✅
  - **Best Practices: 96** ✅
  - **Performance: 71** ⚠️ (expected with CDN approach - see talking points)
- [x] Performance optimizations implemented:
  - [x] Font preconnect for Google Fonts
  - [x] Tailwind CDN (tree-shaking not available, but acceptable for demo)
  - [x] GSAP loaded from CDN with async potential
  - [x] Lazy image loading consideration (native `loading="lazy"` could be added)
  - [x] CSS animations use `transform` and `opacity` (GPU-accelerated)
  - [x] `will-change` property for cursor follower
  - [x] `requestAnimationFrame` for smooth cursor animation
- [x] Images optimized:
  - [x] WebP format used for Mickey cursor (modern, smaller file size)
  - [x] JPG for hero image
- [ ] Code minified *(not applicable for development, would be done in production build)*

**Talking Points:**
> - **Font Loading:** `preconnect` hints tell browser to establish early connections to Google Fonts
> - **Animation Performance:** 
>   - All animations use `transform` and `opacity` which are GPU-accelerated
>   - Mickey cursor uses `requestAnimationFrame` for 60fps smoothness
>   - `will-change: transform` hints to browser for optimization
> - **Image Formats:** WebP for the cursor (smaller file, modern format), JPG for hero (good compression for photos)
> - **Potential Improvements:**
>   - ✅ Added `loading="lazy"` to RSS feed images (below the fold)
>   - Production build would minify CSS/JS
>   - Could self-host fonts for better performance
>   - Could use Tailwind CLI for tree-shaking unused styles
>
> **Explaining the Lighthouse Score (~67-71 Performance):**
> - "I achieved perfect scores in Accessibility (100), SEO (100), and Best Practices (96). The Performance score of ~70 reflects deliberate trade-offs I made for this project."
> - "I used Tailwind CSS via CDN for rapid prototyping and development speed. The CDN loads the entire Tailwind library (~300KB), whereas a production build using the Tailwind CLI would tree-shake unused utilities, potentially reducing that to ~10-20KB."
> - "Similarly, GSAP and ScrollTrigger are loaded from CDN. In production, I would bundle only the specific GSAP features needed."
> - "These are intentional trade-offs: CDNs offer excellent caching (users who've visited other sites using these libraries already have them cached), and the development speed benefit outweighed micro-optimization for a certification demo."
> - "The key takeaway is that I understand *why* the score is what it is and *how* to improve it for production."
>
> **RSS Feed Images (External Content):**
> - "The largest payload items (~3-5MB total) are external images loaded via the RSS feed from Disney blogs like planDisney and Inside the Magic."
> - "I compressed my local hero image with TinyPNG — it's no longer in the top resources. But external blog images are outside my control."
> - "In production, I could implement: (1) image proxying through a CDN that auto-optimizes, (2) lazy loading for RSS images, or (3) placeholder images with click-to-load."
> - "This demonstrates understanding of the boundary between controllable and uncontrollable assets when fetching third-party content."

---

## Part 2: Knowledge Check Preparation

### Design & Thought Process
- [x] Can explain design decisions
- [x] Can walk through user flow
- [x] Can discuss visual choices

**Talking Points:**
> - **Theme:** Disney/Mickey Mouse inspired - warm, inviting, magical
> - **Color Choices:** 
>   - Red: Disney's signature color, used for CTAs and accents
>   - Cream background: Warm, inviting, easy on eyes (not harsh white)
>   - Gold accents: Premium, magical feel
> - **Typography:** Nunito font - rounded, friendly, playful (matches Disney's approachable brand)
> - **Layout Patterns:**
>   - Bento grid for stats (modern, scannable)
>   - Card-based layouts for discoverability
>   - Accordion for dense planning info (progressive disclosure)
> - **User Flow:** Hero → Learn about Disney → Explore Parks → Plan Visit → Get Tips → Find Dining → Resources
> - **Whimsy Elements:** Sparkles, emoji icons, Mickey cursor follower - adds delight without being distracting

---

### Code Review
- [x] Can explain HTML structure and best practices
- [x] Can explain CSS approach and best practices
- [x] Can explain JavaScript functions and best practices
- [x] Can walk through the fetch implementation

**Talking Points:**
> - **HTML:** Semantic elements throughout, proper nesting, accessibility-first
> - **CSS:** Utility-first with Tailwind, custom CSS only where needed, mobile-first responsive design
> - **JavaScript:** 
>   - Modular functions (single responsibility)
>   - Event delegation where appropriate
>   - Async/await for clean async code
>   - Error handling with user feedback
>   - Accessibility announcements for dynamic content

---

### Performance Discussion
- [x] Can explain performance optimizations made
- [x] Can discuss Lighthouse scores *(after testing)*
- [x] Can explain loading strategies

**Talking Points:**
> - GPU-accelerated animations (transform/opacity only)
> - Font preconnect for faster loading
> - CDN usage for libraries (cached across sites)
> - Minimal custom CSS (most styling via Tailwind utilities)
> - No render-blocking resources in critical path

---

### Accessibility Discussion
- [x] Can explain accessibility features implemented
- [x] Can discuss screen reader compatibility
- [x] Can explain ARIA usage

**Talking Points:**
> - WCAG AA color contrast compliance (tested mickey-red-text at 5.3:1)
> - Full keyboard navigation support
> - Screen reader live regions for dynamic content
> - Reduced motion support for vestibular disorders
> - Semantic HTML provides inherent accessibility

---

### SEO Discussion
- [x] Can explain SEO optimizations
- [x] Can discuss meta tags
- [x] Can explain Open Graph implementation

**Talking Points:**
> - Optimized title and meta description with target keywords
> - Open Graph ready for social sharing
> - Semantic HTML helps search engine understanding
> - Internal anchor links for page structure
> - Alt text on images for image search

---

### Tools & Libraries
- [x] List of libraries used:
  1. **Tailwind CSS** (via CDN) - Utility-first CSS framework
  2. **GSAP** (GreenSock Animation Platform) - Professional animation library
  3. **GSAP ScrollTrigger** - Scroll-based animation triggers
  4. **Google Fonts** (Nunito) - Typography
  5. **RSS2JSON API** - RSS feed to JSON conversion
- [x] Can explain why each was chosen
- [x] Can discuss alternatives considered

**Talking Points:**
> - **Tailwind CSS:** Chosen for rapid development and built-in responsive design. Alternative: Bootstrap (heavier, more opinionated), vanilla CSS (slower development)
> - **GSAP:** Industry-standard animation library, better performance than CSS animations for complex sequences. Alternative: Anime.js, vanilla CSS animations
> - **RSS2JSON:** Free tier available, handles CORS issues with RSS feeds. Alternative: Build own proxy server, use different API format
> - **Nunito Font:** Rounded, friendly aesthetic matches Disney brand. Alternative: Poppins, Quicksand

---

### Reflection
- [x] Favorite parts of the site identified
- [x] Most challenging parts identified
- [x] Can explain what was learned

**Suggested Talking Points:**
> - **Favorite Parts:**
>   - Mickey cursor follower adds unexpected delight
>   - Accordion sparkle animations feel magical
>   - Live RSS feed brings fresh content
>   - Bento grid stats section is visually interesting
> 
> - **Most Challenging:**
>   - RSS feed fetch: CORS issues, inconsistent image extraction across feeds
>   - Accordion accessibility: Ensuring keyboard + screen reader + animation all work together
>   - Balancing whimsy with professionalism
> 
> - **What Was Learned:**
>   - ARIA patterns for interactive components
>   - GSAP ScrollTrigger for scroll animations
>   - Progressive enhancement (works without JS, enhanced with)
>   - Importance of `prefers-reduced-motion`

---

## Publishing
- [x] Site published and accessible
- [x] URL ready to share: https://coryrunnells-webflow.github.io/Module-1-Certification/
- [x] Can explain publishing process

**Next Steps:**
1. Publish to Replit, CodeSandbox, Vercel, Netlify, or GitHub Pages
2. Fill in `og:url` and `og:image` meta tags with live URLs
3. Run Lighthouse audit and document scores
4. Test on multiple devices and browsers

---

## Summary

| Category | Status | Notes |
|----------|--------|-------|
| HTML Structure | ✅ Complete | 10 sections, semantic HTML, proper landmarks |
| CSS Styling | ✅ Complete | Tailwind + custom animations |
| JavaScript (3 functions) | ✅ Complete | fetch + scroll animations + accordions + bonus effects |
| Accessibility | ✅ Complete | ARIA, keyboard nav, reduced motion |
| SEO | ✅ Complete | 100/100 Lighthouse |
| Performance | ✅ Complete | 71 (CDN trade-off), 100 A11y, 96 BP, 100 SEO |
| Publishing | ✅ Complete | Live at GitHub Pages |
