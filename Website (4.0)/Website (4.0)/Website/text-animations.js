// Text Animation on Scroll - Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    // Create intersection observer for fade-in text animations
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation to improve performance
                // textObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    });

    // Observe all elements with fade-in-text class
    const fadeInElements = document.querySelectorAll('.fade-in-text');
    fadeInElements.forEach(element => {
        textObserver.observe(element);
    });
});
