// Suryojasvi Website - Advanced Animations & Interactions
// Author: Antigravity AI
// Updated: 2026

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. INTERSECTION OBSERVER - Scroll Animations
    // ==========================================
    /* 
    // CONFLICT RESOLUTION: Commenting out as GSAP in script.js handles these elements with higher fidelity
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target elements for fade-in animations
    const fadeElements = document.querySelectorAll('.service-card, .company-item, .director-card, .culture-card, .gallery-item, .magazine-card, .philosophy-card, .employee-story-card');

    fadeElements.forEach(el => {
        el.classList.add('fade-in-element');
        fadeInObserver.observe(el);
    });
    */

    // ==========================================
    // SCROLL REVEAL - Sections Fade In + Shift Up
    // ==========================================
    /*
    // CONFLICT RESOLUTION: Handled by GSAP in script.js
    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Keep observing in case user scrolls back up
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });

    // Apply to all major sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('scroll-reveal');
        scrollRevealObserver.observe(section);
    });
    */

    // ==========================================
    // 2. ANIMATED COUNTERS
    // ==========================================

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all counter elements
    document.querySelectorAll('[data-counter]').forEach(counter => {
        counterObserver.observe(counter);
    });

    // ==========================================
    // 3. SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 100; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // 4. PARALLAX EFFECT FOR HERO
    // ==========================================
    /*
    // CONFLICT: Handled by GSAP/Lenis in script.js
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            if (scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    */

    // ==========================================
    // 5. NAVBAR SCROLL EFFECT
    // ==========================================
    /*
    // CONFLICT: Handled in script.js to sync with Lenis
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    */

    // ==========================================
    // 6. LAZY LOADING IMAGES
    // ==========================================

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // ==========================================
    // 7. BUTTON RIPPLE EFFECT
    // ==========================================

    document.querySelectorAll('.btn-luxury, .btn-contact').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ==========================================
    // 8. WHATSAPP CHAT BUTTON - Show on scroll
    // ==========================================

    /*
    // OPTIONAL: Can assume this is okay, but to be safe, let's use a simpler check or rely on CSS sticky
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                whatsappButton.classList.add('show');
            } else {
                whatsappButton.classList.remove('show');
            }
        });
    }
    */

    // ==========================================
    // 9. FORM VALIDATION ENHANCEMENT (if forms exist)
    // ==========================================

    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Form submitted');
        });
    }

    // ==========================================
    // 10. ACCESSIBILITY - Focus trap for modals
    // ==========================================

    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    // Add skip-to-content functionality
    const skipLink = document.querySelector('.skip-to-content');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const main = document.querySelector('main');
            if (main) {
                main.tabIndex = -1;
                main.focus();
            }
        });
    }

    // ==========================================
    // 11. PERFORMANCE - Debouncing scroll events
    // ==========================================

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debouncing to heavy scroll handlers
    const debouncedScrollHandler = debounce(() => {
        // Additional scroll logic here if needed
    }, 100);

    window.addEventListener('scroll', debouncedScrollHandler);

});

// ==========================================
// GSAP ENHANCEMENTS (if GSAP is loaded)
// ==========================================

/*
// CONFLICT RESOLUTION: Redundant. GSAP ScrollTrigger logic is centralized in script.js
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Fade in sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}
*/
