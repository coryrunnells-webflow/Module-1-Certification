# Flowman Personal Site - Project Plan

## Project Concept
**Flowman** - A playful, superhero-themed personal landing page showcasing hobbies and interests.

## Site Structure

### Sections (4+ required)
1. **Hero/Introduction** - Flowman superhero intro with tagline and CTA
2. **Origin Story** - Journey from freelancer to Webflow, becoming Flowman
3. **Hobbies & Interests** - Showcase 6 hobbies:
   - Golf
   - LEGO
   - Disney
   - Video Games
   - Movies
   - TV
4. **Contact/Connect** - "Call for Help" section with contact form/info

## Technical Stack

### Platform
- **Replit, CodeSandbox, or CodePen** (TBD)

### CSS Approach
- **Tailwind CSS** (recommended for quick styling) OR
- **Vanilla CSS** (if you want more control)

### JavaScript Functions (3 required)

#### 1. Fetch Function (REQUIRED)
**Disney World Ride Wait Times**
- **API Options:**
  - Queue-Times API (https://queue-times.com/en-US/pages/api) - Free, updates every 5 min
  - ThemeParks API (https://marcusdlg.github.io/RideWaitZ/)
  - wdwJS library (https://github.com/magicbear/wdwJS)
- **Functionality:**
  - Fetch current wait times for favorite Disney World rides
  - Display ride name, wait time, and operating status
  - Update every 5 minutes (with caching)
  - Show in a fun, superhero-themed component
- **Accessibility:**
  - Screen reader announcements for wait time updates
  - Clear labels and ARIA live regions
  - Keyboard navigable

#### 2. Animation Function
**Scroll-triggered Animations**
- **Functionality:**
  - Fade-in animations as sections come into view
  - Smooth scroll behavior
  - Hobby cards animate on scroll
  - Hero section entrance animation
- **Accessibility:**
  - Respects `prefers-reduced-motion` media query
  - Animations disabled or simplified for users who prefer reduced motion
  - No animations that could cause motion sickness
  - Focus indicators remain visible during animations

#### 3. Interactive Function
**Interactive Hobby Cards**
- **Functionality:**
  - Hover effects on hobby cards
  - Click/tap to expand hobby details
  - Smooth transitions
  - Maybe a "superpower" reveal on interaction
- **Accessibility:**
  - Keyboard navigable (Tab, Enter, Escape)
  - Focus indicators visible
  - ARIA expanded/collapsed states
  - Screen reader announcements
  - No hover-only interactions (click/tap also works)

## Accessibility Requirements

### Must-Have Features
- [ ] All images have `alt` attributes
- [ ] All form inputs have labels
- [ ] Page has a `<title>`
- [ ] Color is not the only visual means of conveying information
- [ ] Accessible for screen readers
- [ ] Accessible for screen magnifiers
- [ ] ARIA attributes used appropriately
- [ ] Lists used appropriately (no "list-itis")
- [ ] Screen reader only classes implemented
- [ ] `prefers-reduced-motion` respected for all animations
- [ ] Keyboard navigation works throughout
- [ ] Focus indicators visible

## SEO Requirements

### Must-Have Features
- [ ] Title tag
- [ ] Meta description
- [ ] Open Graph tags:
  - [ ] `og:title`
  - [ ] `og:description`
  - [ ] `og:image`
  - [ ] `og:url`
- [ ] All images have alt text
- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy (h1, h2, h3, etc.)

## Performance Goals

### Lighthouse Targets
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### Optimization Strategies
- Optimize images (WebP format, proper sizing)
- Cache API responses
- Minimize JavaScript
- Lazy load below-the-fold content
- Use efficient CSS

## Design Theme

### Superhero Aesthetic
- **Colors:** Bold, vibrant (maybe primary blue/red like classic superhero)
- **Typography:** Strong, confident fonts
- **Icons:** Superhero-themed or power-themed icons
- **Visuals:** Comic book style elements (optional)
- **Tone:** Playful, fun, energetic

## Content Ideas

### Hero Section
- "I am Flowman" or "Meet Flowman"
- Tagline: "By day: Senior Solutions Architect at Webflow. By night: Webflow superhero!"
- CTA: "See My Powers" or "Explore My World"

### Origin Story
- How you started freelancing
- Building the Flowman brand
- Joining Webflow
- Personal touch about what makes you unique

### Hobbies Section
Each hobby card could have:
- Icon/image
- Title
- Brief description
- Maybe a "superpower" related to that hobby

### Contact Section
- "Call for Help" or "Need Flowman?"
- Contact form or contact info
- Social media links

## Next Steps

1. Choose platform (Replit/CodeSandbox/CodePen)
2. Choose CSS approach (Tailwind or Vanilla)
3. Set up project structure
4. Start building HTML structure
5. Add CSS styling
6. Implement JavaScript functions
7. Test accessibility
8. Optimize for performance
9. Test Lighthouse scores
10. Prepare for knowledge check
