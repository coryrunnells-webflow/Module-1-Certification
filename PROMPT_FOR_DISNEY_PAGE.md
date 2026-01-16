# Prompt for Building Disney World Informational Landing Page

## Context
I'm building a Module 1 Certification project - an informational landing page about Walt Disney World Resort. This is a hand-coded HTML, CSS, and JavaScript project that needs to demonstrate front-end development skills including accessibility, SEO, and performance.

## Project Requirements

### Technical Stack
- **HTML5** - Semantic markup with proper landmarks (nav, main, footer)
- **Tailwind CSS** - Using CDN version, minimal custom CSS
- **Vanilla JavaScript** - Three custom functions required:
  1. Fetch function (will integrate Disney wait times API later)
  2. Scroll-triggered animations
  3. Interactive elements (accordions, tabs, or card interactions)

### Design Requirements
- **Minimal, clean design** - Not cluttered, plenty of white space
- **Disney color palette** - Primary blue (#003d82), white, light grays
- **Responsive** - Mobile-first approach, works on all devices
- **Accessible** - WCAG compliant, keyboard navigation, screen reader support
- **Performance** - Fast loading, optimized images, efficient code

### Content Structure Needed

#### 1. Hero Section
- Large, impactful introduction
- Clear headline about Disney World
- Subheadline explaining the page purpose
- Background image of Main Street in Magic Kingdom
- CTA button to scroll to main content

#### 2. Introduction Section
- What is Disney World?
- Brief overview (2-3 paragraphs)
- Key statistics or facts - Use a Tailwind Bento Box component/layout
- Visual element (image or icon)

#### 3. Four Theme Parks Section
**Grid layout with 4 park cards:**
- Magic Kingdom
- EPCOT
- Hollywood Studios
- Animal Kingdom

**Each card should include:**
- Park name and icon/visual
- Brief description (2-3 sentences)
- Key highlights (3-4 bullet points)
- "Learn More" link or expandable content
- Hover effects for interactivity

#### 4. Planning Your Visit Section
**Organized into subsections or tabs:**
- Best Times to Visit
- Ticket Options (Single park, Park Hopper, etc.)
- Genie+ and Lightning Lane Explained
- How Many Days Needed
- Where to Stay (On-site vs Off-site)

**UI Component:** Could use Tailwind tabs or accordion for organization

#### 5. Tips & Tricks Section
**Grid of tip cards:**
- Arrive Early (Rope Drop)
- Use the Mobile App
- Plan Your Route
- Take Breaks
- Stay Hydrated
- Best Photo Spots
- Hidden Secrets

**Each tip card:**
- Icon or emoji
- Tip title
- Brief explanation
- Hover effect

#### 6. Dining Guide Section
- Quick overview of dining options
- Categories: Quick Service, Table Service, Character Dining
- Must-try snacks
- Best restaurants by park (could be expandable)

#### 7. Transportation Section
- Getting to Disney World (airports, driving)
- Transportation within property
  - Monorail system
  - Buses
  - Boats
  - Disney Skyliner
- Parking information
- Tips for navigating the resort

#### 8. Special Events Section
- Holiday celebrations
- Seasonal events
- Festival information
- Calendar view or list format

#### 9. Wait Times Section (Placeholder)
- Section ready for API integration
- Currently shows: "Wait times coming soon" or similar
- Styled to match the rest of the page
- Will integrate ThemeParks.wiki API later

#### 10. Resources Section
- Additional helpful links
- External resources for planning
- Disclaimer about unofficial site

### Tailwind UI Components to Implement

1. **Navigation Bar**
   - Sticky header
   - Mobile hamburger menu
   - Smooth scroll links
   - Clean, minimal design

2. **Hero Section**
   - Large typography
   - Gradient background (Disney blue)
   - CTA button
   - Responsive padding

3. **Card Components**
   - Park cards with hover effects
   - Tip cards in grid
   - Information cards
   - Shadow and border styling

4. **Grid Layouts**
   - Responsive grid for parks (2x2 on desktop, 1 column on mobile)
   - Grid for tips (3 columns desktop, 1 mobile)
   - Consistent spacing

5. **Accordion or Tabs** (for Planning section)
   - Expandable content
   - Keyboard accessible
   - Smooth animations (respect prefers-reduced-motion)

6. **Footer**
   - Links to resources
   - Copyright/disclaimer
   - Clean, minimal design

### JavaScript Functions Required

#### Function 1: Fetch (Placeholder for now)
- Structure ready for API integration
- Error handling
- Loading states
- Will integrate ThemeParks.wiki API later

#### Function 2: Scroll Animations
- Fade-in animations as sections come into view
- Respects `prefers-reduced-motion`
- Uses Intersection Observer API
- Smooth, subtle effects

#### Function 3: Interactive Elements
- Accordion expand/collapse functionality
- OR tab switching functionality
- OR card hover/click interactions
- Keyboard accessible (Tab, Enter, Space, Escape)
- ARIA attributes for screen readers

### Accessibility Requirements

- All images have alt text
- Proper heading hierarchy (h1, h2, h3)
- ARIA labels where needed
- Keyboard navigation throughout
- Focus indicators visible
- Color not the only means of conveying information
- Screen reader friendly
- Respects `prefers-reduced-motion`

### SEO Requirements

- Proper title tag
- Meta description
- Open Graph tags
- Semantic HTML structure
- Proper heading hierarchy
- Alt text on images

### Performance Goals

- Fast page load
- Optimized images
- Efficient CSS (Tailwind purged)
- Minimal JavaScript
- Lighthouse score 90+ in all categories

## Specific Implementation Requests

1. **Create the HTML structure** with all sections outlined above
2. **Style with Tailwind CSS** - Use utility classes, minimal custom CSS
3. **Implement the three JavaScript functions** as described
4. **Ensure accessibility** - All requirements met
5. **Make it responsive** - Mobile-first, works on all screen sizes
6. **Optimize for performance** - Fast loading, efficient code

## Design Notes

- Keep it minimal and clean
- Use Disney blue (#003d82) as primary color
- White and light gray backgrounds
- Plenty of white space
- Clear typography hierarchy
- Subtle animations (not overwhelming)
- Professional, informative tone

## Deliverables

1. Complete HTML file with semantic structure
2. Tailwind CSS styling (CDN version)
3. Custom CSS file for any additional styles
4. JavaScript file with three required functions
5. All accessibility features implemented
6. SEO meta tags included
7. Responsive design working
8. Ready for API integration later

---

**Use this prompt to guide the development of a comprehensive, informative, and well-designed Disney World landing page that meets all certification requirements.**
