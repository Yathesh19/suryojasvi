
// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {

    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 0.8, // Reduced from 1.2 for snappier feel
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false, // Reverting to false to use native touch scroll on mobile (often smoother)
        touchMultiplier: 2,
        infinite: false,
    });

    // Connect GSAP ScrollTrigger to Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // A. Horizontal Scroll for Companies
    const raceContainer = document.querySelector(".horizontal-scroll-container");
    if (raceContainer) {
        gsap.to(raceContainer, {
            x: () => -(raceContainer.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: ".horizontal-scroll-wrapper",
                pin: true,
                scrub: 1,
                end: () => "+=" + raceContainer.scrollWidth,
                invalidateOnRefresh: true,
            }
        });
    }

    // Use GSAP ticker for Lenis for perfect sync
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 1. Initial Loader Reveal
    // Reveal body after a slight delay to ensure fonts load
    setTimeout(() => {
        document.body.classList.add('loaded');
        runHeroAnimation();
    }, 500);

    // 2. Hero Section Entrance Animation
    function runHeroAnimation() {
        const tl = gsap.timeline();

        tl.to(".line", {
            y: 0,
            duration: 1.5,
            ease: "power4.out",
            stagger: 0.2
        })
            .from(".hero-subtitle", {
                y: 20,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=1")
            .from(".hero-actions", {
                y: 20,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");
    }

    // 3. Scroll Animations for Sections
    // Fade Up Titles & Text
    gsap.utils.toArray(".section-title, .section-text, .section-label").forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // 4. About Image Parallax / Reveal
    const revealImg = document.querySelector(".reveal-image");
    if (revealImg) {
        gsap.to(revealImg, {
            scrollTrigger: {
                trigger: ".image-reveal-wrapper",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            y: -50, // Move image slightly up as we scroll down (Parallax)
            ease: "none"
        });

        gsap.from(revealImg, {
            scrollTrigger: {
                trigger: ".image-reveal-wrapper",
                start: "top 80%",
            },
            scale: 1.2,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out"
        });
    }

    // ==========================================
    // 13. REDESIGN 2.0: LOGIC REMOVED (Reverted to Stability)
    // ==========================================

    /*
    // A. Horizontal Scroll for Companies
    const raceContainer = document.querySelector(".horizontal-scroll-container");
    if (raceContainer) {
        gsap.to(raceContainer, {
            x: () => -(raceContainer.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: ".horizontal-scroll-wrapper",
                pin: true,
                scrub: 1,
                end: () => "+=" + raceContainer.scrollWidth,
                invalidateOnRefresh: true,
            }
        });
    }

    // C. Advanced Text Reveals (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-text');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: Unobserve if you want it to trigger only once
                    // revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            // Simple wrap for effect if not already wrapped
            if (!el.querySelector('span')) {
                const text = el.innerText;
                el.innerHTML = `<span>${text}</span>`;
            }
            revealObserver.observe(el);
        });
    }
    */

    // 5. Service Cards Stagger (Using Batch for better reliability)
    gsap.set(".service-card", { y: 50, opacity: 0 });

    ScrollTrigger.batch(".service-card", {
        onEnter: batch => gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            overwrite: true
        }),
        start: "top 85%",
        once: true
    });

    // 6. Company Items Stagger
    gsap.from(".company-item", {
        scrollTrigger: {
            trigger: ".companies-grid",
            start: "top 80%"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    });

    // D. Navbar Glassmorphism on Scroll (Enhanced)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(255, 245, 238, 0.95)'; // Matches --bg-cream
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(255, 245, 238, 0.75)';
        }
    });

    // ==========================================
    // 12. GOD TIER FOOTER LOGIC
    // ==========================================

    // Live Clocks
    function updateClocks() {
        const now = new Date();

        // Bangalore (IST)
        const optionsBLR = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const timeBLR = new Intl.DateTimeFormat('en-US', optionsBLR).format(now);
        const clockBLR = document.getElementById('clock-blr');
        if (clockBLR) clockBLR.textContent = timeBLR;

        // Noida (Same timezone, but good for expansion)
        const clockNoida = document.getElementById('clock-noida');
        if (clockNoida) clockNoida.textContent = timeBLR;
    }
    setInterval(updateClocks, 1000);
    updateClocks(); // Init

    // Dynamic Footer Spacing (Curtain Reveal) - DISABLED
    /*
    function adjustFooterSpacing() {
        const footer = document.querySelector('footer');
        const main = document.querySelector('main');
        
        if (footer && main && window.innerWidth > 991) {
            const footerHeight = footer.offsetHeight;
            main.style.marginBottom = `${footerHeight}px`;
        } else if (main) {
            main.style.marginBottom = '0px';
        }
    }
    
    // Run on load and resize
    window.addEventListener('load', adjustFooterSpacing);
    window.addEventListener('resize', adjustFooterSpacing);
    // Recalculate after a short delay in case of image loads
    setTimeout(adjustFooterSpacing, 1000);
    */

});