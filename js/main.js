// Main JavaScript file for Disney World site
// Contains all three required custom functions

// ============================================
// FUNCTION 1: FETCH - Disney Blog RSS Feeds
// ============================================

// RSS to JSON API (better at extracting images)
const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';

// Disney-related RSS feeds
const DISNEY_RSS_FEEDS = [
    {
        url: 'https://disneyparks.disney.go.com/blog/feed/',
        source: 'Disney Parks Blog'
    },
    {
        url: 'https://insidethemagic.net/feed/',
        source: 'Inside the Magic'
    },
    {
        url: 'https://wdwnt.com/feed/',
        source: 'WDWNT'
    }
];

/**
 * Wrapper for fetch with timeout
 */
function fetchWithTimeout(url, options = {}, timeout = 10000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), timeout)
        )
    ]);
}

/**
 * Fetches Disney blog posts from RSS feeds using RSS2JSON API
 * This is the REQUIRED fetch function
 */
async function fetchDisneyBlogPosts() {
    const container = document.getElementById('blog-container');
    const loadingEl = document.getElementById('blog-loading');
    const errorEl = document.getElementById('blog-error');
    
    if (!container) {
        console.error('Blog container not found');
        return;
    }

    // Show loading state
    if (loadingEl) loadingEl.classList.remove('hidden');
    if (errorEl) errorEl.classList.add('hidden');
    container.innerHTML = '';

    try {
        const allPosts = [];
        
        // Fetch from each RSS feed using RSS2JSON API
        for (const feed of DISNEY_RSS_FEEDS) {
            try {
                console.log(`Fetching RSS from ${feed.source}...`);
                const apiUrl = RSS2JSON_API + encodeURIComponent(feed.url);
                
                const response = await fetchWithTimeout(apiUrl, {}, 10000);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log(`[${feed.source}] API response:`, data.status);
                    
                    if (data.status === 'ok' && data.items && data.items.length > 0) {
                        // Take first 5 posts from each feed
                        const posts = data.items.slice(0, 5).map(item => {
                            // Extract image from thumbnail, enclosure, or content
                            let image = item.thumbnail || item.enclosure?.link || null;
                            
                            // If no image, try to extract from content
                            if (!image && item.content) {
                                const imgMatch = item.content.match(/<img[^>]+src=["']([^"']+)["']/i);
                                if (imgMatch) {
                                    image = imgMatch[1];
                                }
                            }
                            
                            // If still no image, try description
                            if (!image && item.description) {
                                const imgMatch = item.description.match(/<img[^>]+src=["']([^"']+)["']/i);
                                if (imgMatch) {
                                    image = imgMatch[1];
                                }
                            }
                            
                            console.log(`[${feed.source}] "${item.title.substring(0, 30)}..." - Image: ${image ? 'YES' : 'NO'}`);
                            
                            return {
                                title: item.title,
                                link: item.link,
                                description: cleanDescription(item.description || item.content || ''),
                                pubDate: item.pubDate,
                                image: image,
                                source: feed.source
                            };
                        });
                        
                        console.log(`Found ${posts.length} posts from ${feed.source}`);
                        allPosts.push(...posts);
                    }
                }
            } catch (feedError) {
                console.warn(`Failed to fetch ${feed.source}:`, feedError);
            }
        }
        
        if (allPosts.length === 0) {
            throw new Error('No blog posts could be loaded');
        }
        
        // Sort by date (newest first)
        allPosts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        
        // Take the first 9 posts for display
        const displayPosts = allPosts.slice(0, 9);
        
        // Render blog cards
        renderBlogPosts(displayPosts);
        
        // Hide loading
        if (loadingEl) loadingEl.classList.add('hidden');
        
        // Announce to screen readers
        announceToScreenReader(`Loaded ${displayPosts.length} blog posts`);
        
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        
        // Show error state
        if (loadingEl) loadingEl.classList.add('hidden');
        if (errorEl) errorEl.classList.remove('hidden');
        
        announceToScreenReader('Error loading blog posts');
    }
}


/**
 * Cleans HTML from description and truncates
 */
function cleanDescription(html) {
    if (!html) return '';
    
    // Remove HTML tags
    const div = document.createElement('div');
    div.innerHTML = html;
    let text = div.textContent || div.innerText || '';
    
    // Truncate to ~150 characters
    if (text.length > 150) {
        text = text.substring(0, 150).trim() + '...';
    }
    
    return text;
}

/**
 * Renders blog posts to the DOM
 */
function renderBlogPosts(posts) {
    const container = document.getElementById('blog-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    posts.forEach(post => {
        const card = createBlogCard(post);
        container.appendChild(card);
    });
}

/**
 * Creates a blog card element
 */
function createBlogCard(post) {
    const card = document.createElement('a');
    card.href = post.link;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'relative block group blog-card';
    
    // Format date
    let dateStr = '';
    if (post.pubDate) {
        try {
            const date = new Date(post.pubDate);
            dateStr = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
            });
        } catch (e) {
            dateStr = '';
        }
    }
    
    // Placeholder image if none available
    const imageUrl = post.image || 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=400&h=300&fit=crop';
    
    card.innerHTML = `
        <div class="absolute inset-px rounded-lg bg-white shadow-md group-hover:shadow-lg transition-all"></div>
        <div class="relative flex flex-col h-full overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
            <div class="h-48 overflow-hidden bg-gray-700 blog-card-image">
                <img 
                    src="${escapeHtml(imageUrl)}" 
                    alt="" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onerror="this.src='https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=400&h=300&fit=crop'"
                >
            </div>
            <div class="p-5 flex flex-col flex-1">
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs font-bold text-mickey-red-text">${escapeHtml(post.source)}</span>
                    ${dateStr ? `<span class="text-xs text-gray-500">• ${dateStr}</span>` : ''}
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-mickey-red-text transition-colors line-clamp-2">${escapeHtml(post.title)}</h3>
                <p class="text-sm text-gray-600 flex-1 line-clamp-3">${escapeHtml(post.description)}</p>
                <div class="mt-4 flex items-center text-mickey-red-text text-sm font-bold">
                    Read more
                    <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-gray-200 group-hover:ring-mickey-red/30"></div>
    `;
    
    return card;
}

/**
 * Escapes HTML to prevent XSS
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Announces updates to screen readers
 */
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        if (document.body.contains(announcement)) {
            document.body.removeChild(announcement);
        }
    }, 1000);
}

// ============================================
// FUNCTION 2: SCROLL-TRIGGERED ANIMATIONS
// ============================================

/**
 * Sets up scroll-triggered animations with accessibility support
 * Respects prefers-reduced-motion
 */
function setupScrollAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Respect user preference - no animations
        console.log('Reduced motion preference detected - animations disabled');
        return;
    }
    
    // Make sure GSAP is loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP not loaded - animations disabled');
        return;
    }
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Set default ease for all animations
    gsap.defaults({ ease: 'power2.out', duration: 0.8 });
    
    // Animate park cards with stagger
    const parkCards = document.querySelectorAll('.park-card');
    if (parkCards.length > 0) {
        gsap.set(parkCards, { opacity: 0, y: 40 });
        
        ScrollTrigger.batch(parkCards, {
            onEnter: (batch) => {
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.6
                });
            },
            start: 'top 85%',
            once: true
        });
    }
    
    // Animate tip cards
    const tipCards = document.querySelectorAll('.tip-card');
    if (tipCards.length > 0) {
        gsap.set(tipCards, { opacity: 0, y: 30 });
        
        ScrollTrigger.batch(tipCards, {
            onEnter: (batch) => {
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.5
                });
            },
            start: 'top 85%',
            once: true
        });
    }
    
    // Animate section headers
    const sectionHeaders = document.querySelectorAll('section h2, section > div > p.text-4xl, section > div > p.text-5xl');
    if (sectionHeaders.length > 0) {
        gsap.set(sectionHeaders, { opacity: 0, y: 20 });
        
        sectionHeaders.forEach(header => {
            ScrollTrigger.create({
                trigger: header,
                start: 'top 90%',
                once: true,
                onEnter: () => {
                    gsap.to(header, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6
                    });
                }
            });
        });
    }
    
    // Animate bento grid items
    const bentoItems = document.querySelectorAll('.lg\\:grid-cols-3 > div');
    if (bentoItems.length > 0) {
        gsap.set(bentoItems, { opacity: 0, scale: 0.95 });
        
        ScrollTrigger.batch(bentoItems, {
            onEnter: (batch) => {
                gsap.to(batch, {
                    opacity: 1,
                    scale: 1,
                    stagger: 0.1,
                    duration: 0.5
                });
            },
            start: 'top 85%',
            once: true
        });
    }
    
    // Hero section entrance animation (immediate, not scroll-triggered)
    const heroContent = document.querySelector('#hero .max-w-lg');
    if (heroContent) {
        const heroElements = heroContent.children;
        gsap.from(heroElements, {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.8,
            delay: 0.2
        });
    }
    
    console.log('GSAP scroll animations initialized');
}

// ============================================
// FUNCTION 3: INTERACTIVE ELEMENTS - ACCORDION
// With Whimsical Animations
// ============================================

/**
 * Sets up accordion functionality for Planning section
 * Keyboard accessible with ARIA attributes
 * Enhanced with magical GSAP animations
 */
function setupAccordions() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    accordionButtons.forEach(button => {
        const targetId = button.getAttribute('aria-controls');
        const targetContent = document.getElementById(targetId);
        const wrapper = button.closest('.relative');
        
        // Add wrapper class for styling
        if (wrapper) {
            wrapper.classList.add('accordion-wrapper');
        }
        
        // Add content class and prepare for animation
        if (targetContent) {
            targetContent.classList.add('accordion-content');
            // Ensure initially closed accordions are properly hidden with no extra space
            if (button.getAttribute('aria-expanded') !== 'true') {
                targetContent.style.display = 'none';
                targetContent.style.height = '0';
                targetContent.style.overflow = 'hidden';
            }
        }
        
        // Add click handler
        button.addEventListener('click', () => {
            toggleAccordion(button);
        });

        // Add keyboard handler (Enter and Space)
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion(button);
            }
        });
    });
}

/**
 * Creates magical sparkle particles on accordion open
 */
function createAccordionSparkles(button) {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'accordion-sparkles';
    button.appendChild(sparkleContainer);
    
    const sparkleEmojis = ['✨', '⭐', '💫', '🌟'];
    const sparkleCount = 8;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('span');
        sparkle.className = 'accordion-sparkle';
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.left = `${10 + Math.random() * 80}%`;
        sparkle.style.top = `${20 + Math.random() * 60}%`;
        sparkle.style.animationDelay = `${Math.random() * 0.3}s`;
        sparkleContainer.appendChild(sparkle);
    }
    
    // Remove sparkles after animation
    setTimeout(() => {
        if (sparkleContainer.parentNode) {
            sparkleContainer.parentNode.removeChild(sparkleContainer);
        }
    }, 1000);
}

/**
 * Toggles accordion expand/collapse state with whimsical animations
 */
function toggleAccordion(button) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const targetId = button.getAttribute('aria-controls');
    const targetContent = document.getElementById(targetId);
    const wrapper = button.closest('.accordion-wrapper');
    
    if (!targetContent) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const newExpandedState = !isExpanded;
    
    // Toggle expanded state
    button.setAttribute('aria-expanded', newExpandedState);
    
    // Add/remove expanded class on wrapper
    if (wrapper) {
        if (newExpandedState) {
            wrapper.classList.add('is-expanded');
        } else {
            wrapper.classList.remove('is-expanded');
        }
    }
    
    // Get the chevron icon
    const chevron = button.querySelector('svg');
    
    // Animate with GSAP if available and motion is allowed
    if (!prefersReducedMotion && typeof gsap !== 'undefined') {
        if (newExpandedState) {
            // OPENING - Magical expand animation
            
            // Create sparkle burst
            createAccordionSparkles(button);
            
            // Rotate chevron with bounce
            if (chevron) {
                gsap.to(chevron, {
                    rotation: 180,
                    duration: 0.4,
                    ease: 'back.out(1.7)'
                });
            }
            
            // Make visible and get natural height
            targetContent.classList.remove('hidden');
            targetContent.style.display = 'block';
            gsap.set(targetContent, { height: 'auto', visibility: 'visible' });
            const naturalHeight = targetContent.offsetHeight;
            gsap.set(targetContent, { height: 0, opacity: 0 });
            
            // Animate open with bounce
            gsap.to(targetContent, {
                height: naturalHeight,
                opacity: 1,
                duration: 0.5,
                ease: 'back.out(1.2)',
                onComplete: () => {
                    gsap.set(targetContent, { height: 'auto' });
                }
            });
            
            // Stagger animate the inner content
            const innerElements = targetContent.querySelectorAll('p, li, strong');
            if (innerElements.length > 0) {
                gsap.from(innerElements, {
                    opacity: 0,
                    y: 10,
                    stagger: 0.05,
                    duration: 0.3,
                    delay: 0.2,
                    ease: 'power2.out'
                });
            }
            
            // Subtle button bounce
            gsap.to(button, {
                scale: 1.02,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // Smooth scroll to button
            setTimeout(() => {
                button.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
            
        } else {
            // CLOSING - Graceful collapse animation
            
            // Rotate chevron back with bounce
            if (chevron) {
                gsap.to(chevron, {
                    rotation: 0,
                    duration: 0.35,
                    ease: 'back.out(1.5)'
                });
            }
            
            gsap.to(targetContent, {
                height: 0,
                opacity: 0,
                duration: 0.35,
                ease: 'power2.inOut',
                onComplete: () => {
                    // Fully hide after animation to remove any residual space
                    targetContent.style.display = 'none';
                    targetContent.classList.add('hidden');
                }
            });
        }
    } else {
        // Fallback for reduced motion or no GSAP
        if (chevron) {
            chevron.style.transform = newExpandedState ? 'rotate(180deg)' : 'rotate(0deg)';
        }
        if (newExpandedState) {
            targetContent.classList.remove('hidden');
            targetContent.style.display = 'block';
            targetContent.style.height = 'auto';
            targetContent.style.opacity = '1';
        } else {
            targetContent.style.display = 'none';
            targetContent.classList.add('hidden');
        }
    }
    
    // Announce to screen readers
    const sectionName = button.querySelector('span').textContent;
    const message = newExpandedState 
        ? `${sectionName} section expanded` 
        : `${sectionName} section collapsed`;
    
    announceToScreenReader(message);
}

/**
 * Sets up interactive park cards with expandable content
 */
function setupParkCards() {
    const parkCardButtons = document.querySelectorAll('.park-card button');
    
    parkCardButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('aria-controls');
            const targetContent = document.getElementById(targetId);
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            if (targetContent) {
                const newExpandedState = !isExpanded;
                button.setAttribute('aria-expanded', newExpandedState);
                
                if (newExpandedState) {
                    targetContent.classList.remove('hidden');
                    button.textContent = 'Show Less';
                } else {
                    targetContent.classList.add('hidden');
                    button.textContent = 'Learn More';
                }
            }
        });

        // Keyboard support
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
}

// ============================================
// WHIMSICAL EFFECTS
// ============================================

/**
 * Sets up counting animation for bento grid numbers
 * Respects prefers-reduced-motion
 */
function setupBentoCountingNumbers() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Find all bento number elements and add the class
    const bentoNumbers = document.querySelectorAll('.lg\\:grid-cols-3 .text-5xl, .lg\\:grid-cols-3 .text-4xl');
    
    bentoNumbers.forEach(el => {
        el.classList.add('bento-number');
        // Store original text for counting
        el.dataset.targetText = el.textContent;
    });
    
    if (prefersReducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
    }
    
    // Counting animation data
    const numberData = [
        { selector: '.text-5xl:first-of-type', end: 4, suffix: '', duration: 1.5 },
        { selector: '.text-4xl', end: null, suffix: '', duration: 2 } // Will handle specially
    ];
    
    bentoNumbers.forEach(el => {
        const text = el.textContent.trim();
        
        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                // Parse the number
                let endValue, suffix = '', prefix = '';
                
                if (text === '4') {
                    endValue = 4;
                } else if (text.includes('25,000')) {
                    endValue = 25000;
                    suffix = '+';
                } else if (text.includes('58M')) {
                    endValue = 58;
                    suffix = 'M+';
                } else if (text === '1971') {
                    endValue = 1971;
                } else {
                    return; // Skip if not a recognized number
                }
                
                // Animate counting
                const obj = { value: 0 };
                gsap.to(obj, {
                    value: endValue,
                    duration: 1.5,
                    ease: 'power2.out',
                    onUpdate: () => {
                        let displayValue = Math.round(obj.value);
                        if (text.includes('25,000')) {
                            displayValue = displayValue.toLocaleString();
                        }
                        el.textContent = displayValue + suffix;
                    },
                    onComplete: () => {
                        // Add glow pulse animation
                        el.classList.add('animated');
                    }
                });
            }
        });
    });
}

/**
 * Creates floating sparkles in the hero section
 * Sparkles randomly appear and fade throughout the section
 * Respects prefers-reduced-motion
 */
function setupHeroSparkles() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    const hero = document.getElementById('hero');
    if (!hero) return;
    
    // Create sparkles container
    const sparklesContainer = document.createElement('div');
    sparklesContainer.className = 'hero-sparkles';
    sparklesContainer.setAttribute('aria-hidden', 'true');
    hero.insertBefore(sparklesContainer, hero.firstChild);
    
    const sparkleEmojis = ['✨', '⭐', '💫', '🌟', '✦'];
    
    // Create initial sparkles with staggered timing
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createHeroSparkle(sparklesContainer, sparkleEmojis);
        }, i * 400);
    }
    
    // Continuously create new sparkles at random intervals
    function scheduleNextSparkle() {
        const delay = 800 + Math.random() * 1500; // Random delay between 0.8-2.3 seconds
        setTimeout(() => {
            if (document.hidden) {
                scheduleNextSparkle();
                return;
            }
            createHeroSparkle(sparklesContainer, sparkleEmojis);
            scheduleNextSparkle();
        }, delay);
    }
    
    scheduleNextSparkle();
}

/**
 * Creates a single sparkle that fades in and out at a random position
 */
function createHeroSparkle(container, emojis) {
    const sparkle = document.createElement('span');
    sparkle.className = 'hero-sparkle';
    sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Random position throughout the entire hero section
    sparkle.style.left = `${5 + Math.random() * 90}%`;
    sparkle.style.top = `${5 + Math.random() * 90}%`;
    
    // Random size
    sparkle.style.fontSize = `${0.6 + Math.random() * 0.8}rem`;
    
    // Animation duration for fade in/out cycle
    const duration = 2 + Math.random() * 2; // 2-4 seconds
    sparkle.style.animationDuration = `${duration}s`;
    
    container.appendChild(sparkle);
    
    // Remove after animation completes
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, duration * 1000);
}

/**
 * Sets up navigation sparkle effects on click
 * Respects prefers-reduced-motion
 */
function setupNavSparkles() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    const navLinks = document.querySelectorAll('#nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            createNavSparkle(link);
        });
    });
}

/**
 * Creates sparkle burst on nav click
 */
function createNavSparkle(element) {
    const rect = element.getBoundingClientRect();
    const sparkleEmojis = ['✨', '⭐', '💫'];
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'nav-sparkle';
        sparkle.innerHTML = `<span>${sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)]}</span>`;
        sparkle.style.position = 'fixed';
        sparkle.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 30}px`;
        sparkle.style.top = `${rect.top + rect.height / 2}px`;
        sparkle.style.zIndex = '9999';
        
        document.body.appendChild(sparkle);
        
        // Remove after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 600);
    }
}

// ============================================
// MICKEY CURSOR FOLLOWER
// ============================================

/**
 * Sets up the Mickey Mouse cursor follower
 * Creates a playful trailing effect that follows the mouse
 * Respects prefers-reduced-motion and touch devices
 */
function setupMickeyCursor() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    
    // Don't initialize on touch devices or if user prefers reduced motion
    if (prefersReducedMotion || isTouchDevice) {
        console.log('Mickey cursor disabled - touch device or reduced motion preference');
        return;
    }
    
    // Create the Mickey cursor element
    const mickeyCursor = document.createElement('img');
    mickeyCursor.src = './assets/images/EmojiBlitzMickey1.webp';
    mickeyCursor.alt = '';
    mickeyCursor.className = 'mickey-cursor';
    mickeyCursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(mickeyCursor);
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isVisible = false;
    
    // Smooth follow factor (lower = more delay/trail effect)
    const smoothness = 0.15;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show cursor on first movement
        if (!isVisible) {
            isVisible = true;
            mickeyCursor.classList.add('visible');
        }
    });
    
    // Handle mouse leaving the window
    document.addEventListener('mouseleave', () => {
        mickeyCursor.classList.remove('visible');
        isVisible = false;
    });
    
    document.addEventListener('mouseenter', () => {
        if (mouseX !== 0 || mouseY !== 0) {
            mickeyCursor.classList.add('visible');
            isVisible = true;
        }
    });
    
    // Add click effect - little bounce
    document.addEventListener('mousedown', () => {
        mickeyCursor.classList.add('clicking');
    });
    
    document.addEventListener('mouseup', () => {
        mickeyCursor.classList.remove('clicking');
    });
    
    // Smooth animation loop
    function animate() {
        // Ease towards the mouse position
        currentX += (mouseX - currentX) * smoothness;
        currentY += (mouseY - currentY) * smoothness;
        
        // Update position using transform for better performance
        mickeyCursor.style.left = `${currentX}px`;
        mickeyCursor.style.top = `${currentY}px`;
        
        requestAnimationFrame(animate);
    }
    
    // Start the animation loop
    animate();
    
    console.log('Mickey cursor follower initialized');
}


// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all functions when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu
    setupMobileMenu();
    
    // Initialize scroll animations
    setupScrollAnimations();
    
    // Initialize accordions
    setupAccordions();
    
    // Initialize park cards
    setupParkCards();
    
    // Initialize Disney blog feed
    fetchDisneyBlogPosts();
    
    // Smooth scroll for navigation links
    setupSmoothScroll();
    
    // Initialize whimsical effects
    setupBentoCountingNumbers();
    setupHeroSparkles();
    setupNavSparkles();
    setupMickeyCursor();
});

/**
 * Sets up mobile menu toggle
 */
function setupMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            const newExpandedState = !isExpanded;
            
            menuButton.setAttribute('aria-expanded', newExpandedState);
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

/**
 * Sets up smooth scrolling for anchor links
 */
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Check for reduced motion preference
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                
                target.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
