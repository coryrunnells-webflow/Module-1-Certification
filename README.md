# Flowman Personal Site - Module 1 Certification Project

A playful, superhero-themed personal landing page showcasing hobbies and interests.

## Project Overview

This is a personal site for **Flowman** - a Senior Solutions Architect at Webflow. The site features a fun superhero theme and showcases personal hobbies including Golf, LEGO, Disney, Video Games, Movies, and TV.

## Project Structure

```
Module 1 Certification/
├── index.html          # Main HTML file
├── css/
│   └── styles.css     # All CSS styles
├── js/
│   └── main.js        # All JavaScript functions
├── assets/            # Images and other assets (create as needed)
├── README.md          # This file
├── PROJECT_PLAN.md    # Detailed project plan
├── PROMPT_GUIDE.md    # Guide for writing effective prompts
└── REQUIREMENTS_CHECKLIST.md  # Certification requirements checklist
```

## Features

### HTML Structure
- ✅ Semantic HTML with proper landmarks (nav, main, footer)
- ✅ Navbar with links and CTA button
- ✅ 4+ sections (Hero, Origin Story, Hobbies, Contact)
- ✅ Accessible form with labels
- ✅ Proper heading hierarchy

### CSS Styling
- ✅ Custom CSS with superhero theme
- ✅ Responsive design
- ✅ Accessibility considerations
- ✅ Respects `prefers-reduced-motion`

### JavaScript Functions
1. **Fetch Function** - Disney World ride wait times from Queue-Times API
2. **Animation Function** - Scroll-triggered fade-in animations
3. **Interactive Function** - Interactive hobby cards with keyboard navigation

### Accessibility
- ✅ All images have alt attributes
- ✅ Form inputs have labels
- ✅ ARIA attributes
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Respects motion preferences

### SEO
- ✅ Title tag
- ✅ Meta description
- ✅ Open Graph tags
- ✅ Semantic HTML structure

## Setup Instructions

1. Open the project in your code editor (Cursor)
2. Open `index.html` in a browser to view the site
3. Make changes to HTML, CSS, or JS files as needed
4. Test locally before deploying

## Deployment to CodeSandbox

When ready to deploy:

1. Go to [CodeSandbox](https://codesandbox.io)
2. Click "Import Project"
3. Upload the project folder or drag and drop files
4. CodeSandbox will automatically detect the HTML/CSS/JS structure
5. Share the CodeSandbox link for submission

## API Information

The site uses the **Queue-Times API** for Disney World ride wait times:
- Endpoint: `https://queue-times.com/en-US/parks/{parkId}/queue_times.json`
- Park ID 1 = Magic Kingdom
- Updates every 5 minutes
- Free to use with attribution

## Development Notes

- All animations respect `prefers-reduced-motion` media query
- JavaScript is organized into clear functions
- CSS uses CSS custom properties for theming
- Form validation can be added if needed
- Images should be added to `/assets` folder

## Next Steps

1. Add images for hobbies and hero section
2. Customize content and copy
3. Test accessibility with screen readers
4. Run Lighthouse audit
5. Deploy to CodeSandbox
6. Prepare for knowledge check

## Resources

- [Queue-Times API](https://queue-times.com/en-US/pages/api)
- [Web.dev](https://web.dev/) - Performance and best practices
- [Inclusive Components](https://inclusive-components.design/) - Accessibility patterns
- [Tailwind UI](https://tailwindui.com/components) - Design inspiration
