// Theme Switcher System
// Allows live preview of different color schemes

const themes = {
    current: {
        name: "Current (Gold & Cream)",
        colors: {
            '--color-gold': '#C5A059',
            '--color-gold-hover': '#B08D45',
            '--bg-cream': '#F9F9F7',
            '--bg-cream-dark': '#EFECE5',
            '--color-text': '#1a1a1a',
            '--color-text-light': '#555555',
            '--color-muted': '#666'
        }
    },
    softBlue: {
        name: "Soft Blue & Amber",
        colors: {
            '--color-gold': '#F5A623',
            '--color-gold-hover': '#E09612',
            '--bg-cream': '#F8FAFB',
            '--bg-cream-dark': '#EDF2F7',
            '--color-text': '#2D3748',
            '--color-text-light': '#4A5568',
            '--color-muted': '#718096'
        }
    },
    sageGreen: {
        name: "Sage Green & Cream",
        colors: {
            '--color-gold': '#8BA888',
            '--color-gold-hover': '#7A9677',
            '--bg-cream': '#FAF9F6',
            '--bg-cream-dark': '#EAE7DC',
            '--color-text': '#3A4A3A',
            '--color-text-light': '#4B5B4B',
            '--color-muted': '#6B7B6B'
        }
    },
    navyPeach: {
        name: "Navy & Soft Peach",
        colors: {
            '--color-gold': '#2C5F88',
            '--color-gold-hover': '#234A6B',
            '--bg-cream': '#FEFEFE',
            '--bg-cream-dark': '#F5F5F5',
            '--color-text': '#1A202C',
            '--color-text-light': '#2D3748',
            '--color-muted': '#718096'
        }
    },
    slateMint: {
        name: "Slate & Mint",
        colors: {
            '--color-gold': '#10B981',
            '--color-gold-hover': '#059669',
            '--bg-cream': '#F9FAFB',
            '--bg-cream-dark': '#E5E7EB',
            '--color-text': '#1F2937',
            '--color-text-light': '#374151',
            '--color-muted': '#6B7280'
        }
    },
    lavenderGold: {
        name: "Lavender & Gold",
        colors: {
            '--color-gold': '#9B8FBF',
            '--color-gold-hover': '#8A7DAE',
            '--bg-cream': '#FDFCFA',
            '--bg-cream-dark': '#F3F1F9',
            '--color-text': '#2D2A3E',
            '--color-text-light': '#3E3B4F',
            '--color-muted': '#6B6580'
        }
    },
    warmNeutrals: {
        name: "Warm Neutrals",
        colors: {
            '--color-gold': '#7C9070',
            '--color-gold-hover': '#6A7D60',
            '--bg-cream': '#FAF9F6',
            '--bg-cream-dark': '#FFFFFF',
            '--color-text': '#3A3A3A',
            '--color-text-light': '#5A5A5A',
            '--color-muted': '#8A8A8A'
        },
        special: {
            secondaryAccent: '#D4A373',
            borderRadius: '12px',
            innerGlow: true,
            paperTexture: true
        }
    }
};

// Apply theme
function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    const root = document.documentElement;

    // Apply all color variables
    Object.entries(theme.colors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });

    // Extract RGB values for gradient effects
    const goldColor = theme.colors['--color-gold'];
    const rgb = hexToRgb(goldColor);
    if (rgb) {
        root.style.setProperty('--theme-accent-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    }

    // Apply special theme properties for Warm Neutrals
    if (theme.special) {
        if (theme.special.secondaryAccent) {
            root.style.setProperty('--secondary-accent', theme.special.secondaryAccent);
        }
        if (theme.special.borderRadius) {
            root.style.setProperty('--radius-lg', theme.special.borderRadius);
        }
    }

    // Apply visual enhancements to sections
    applyVisualEnhancements(themeName, theme.special);

    // Save preference
    localStorage.setItem('suryojasvi-theme', themeName);

    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-theme="${themeName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Show notification
    showThemeNotification(theme.name);
}

// Convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Apply visual enhancements based on theme
function applyVisualEnhancements(themeName, special) {
    // Remove previous special classes
    document.body.classList.remove('paper-texture-theme', 'inner-glow-theme');

    // Add textures to hero
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.classList.add('texture-noise', 'hero-enhanced');
    }

    // Add mesh gradient to alternating sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index % 2 === 0 && !section.classList.contains('hero-section')) {
            section.classList.add('mesh-gradient', 'texture-noise');
        }
    });

    // Enhance service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.add('premium-card', 'hover-lift');
    });

    // Enhance director/company cards
    document.querySelectorAll('.director-card, .company-item').forEach(card => {
        card.classList.add('glass-card', 'depth-shadow-md');
    });

    // Frosted navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.add('navbar-frosted');
    }

    // Add patterns to specific backgrounds
    document.querySelectorAll('.bg-cream-dark').forEach(el => {
        el.classList.add('pattern-dots');
    });

    // Enhance buttons
    document.querySelectorAll('.btn-luxury').forEach(btn => {
        btn.classList.add('btn-3d', 'glow-accent');
    });

    // Apply Warm Neutrals special effects
    if (special) {
        if (special.paperTexture) {
            document.body.classList.add('paper-texture-theme');
        }
        if (special.innerGlow) {
            document.body.classList.add('inner-glow-theme');
        }
    }
}

// Show notification
function showThemeNotification(themeName) {
    const notification = document.getElementById('theme-notification');
    if (!notification) return;

    notification.textContent = `✓ Theme: ${themeName}`;
    notification.style.display = 'block';
    notification.style.opacity = '1';

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 2000);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function () {
    // Load saved theme or use current
    const savedTheme = localStorage.getItem('suryojasvi-theme') || 'current';

    // Small delay to ensure DOM is ready
    setTimeout(() => {
        applyTheme(savedTheme);
    }, 100);

    // Add click handlers to theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const themeName = this.getAttribute('data-theme');
            applyTheme(themeName);
        });
    });

    // Toggle theme panel
    const toggleBtn = document.getElementById('theme-toggle');
    const panel = document.getElementById('theme-panel');

    if (toggleBtn && panel) {
        toggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            panel.classList.toggle('open');
            this.classList.toggle('active');
        });

        // Close panel when clicking outside
        document.addEventListener('click', function (e) {
            if (!panel.contains(e.target) && !toggleBtn.contains(e.target)) {
                panel.classList.remove('open');
                toggleBtn.classList.remove('active');
            }
        });
    }
});
