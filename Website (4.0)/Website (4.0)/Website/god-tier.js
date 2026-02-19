// God Tier Visuals - Powered by Shery.js & Three.js
document.addEventListener("DOMContentLoaded", function () {
    // Wait a brief moment to ensure everything is loaded
    setTimeout(() => {
        if (typeof Shery !== 'undefined') {

            // 1. Mouse Follower (The "Magnetic" Cursor)
            // DISABLED: User reported visibility issues
            /*
            Shery.mouseFollower({
                skew: true,
                ease: "cubic-bezier(0.23, 1, 0.320, 1)",
                duration: 1,
            });
            */

            // 2. Magnetic Buttons
            // Target all luxury buttons and nav links
            Shery.makeMagnet(".btn-luxury, .nav-link, .navbar-brand, .signature-img", {
                ease: "cubic-bezier(0.23, 1, 0.320, 1)",
                duration: 1,
            });

            // 3. Image Effects (Liquid Distortion)
            // DISABLED: User reported images missing (likely canvas rendering issue or conflict)
            /*
            Shery.imageEffect(".director-img", {
                style: 5, // Gooey Effect
                config: {
                    "a": { "value": 2, "range": [0, 30] },
                    "b": { "value": -0.9, "range": [-1, 1] },
                    "zindex": { "value": -9996999, "range": [-9999999, 9999999] },
                    "aspect": { "value": 0.7272695760684946 },
                    "ignoreShapeAspect": { "value": true },
                    "shapePosition": { "value": { "x": 0, "y": 0 } },
                    "shapeScale": { "value": { "x": 0.5, "y": 0.5 } },
                    "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] },
                    "shapeRadius": { "value": 0, "range": [0, 2] },
                    "currentScroll": { "value": 0 },
                    "scrollLerp": { "value": 0.07 },
                    "gooey": { "value": true },
                    "infiniteGooey": { "value": true },
                    "growSize": { "value": 4, "range": [1, 15] },
                    "durationOut": { "value": 1, "range": [0.1, 5] },
                    "durationIn": { "value": 1.5, "range": [0.1, 5] },
                    "displaceAmount": { "value": 0.5 },
                    "masker": { "value": true },
                    "maskVal": { "value": 1, "range": [1, 5] },
                    "scrollType": { "value": 0 },
                    "geoVertex": { "range": [1, 64], "value": 1 },
                    "noEffectGooey": { "value": true },
                    "onMouse": { "value": 1 },
                    "noise_speed": { "value": 0.2, "range": [0, 10] },
                    "metaball": { "value": 0.2, "range": [0, 2] },
                    "discard_threshold": { "value": 0.5, "range": [0, 1] },
                    "antialias_threshold": { "value": 0.002, "range": [0, 0.1] },
                    "noise_height": { "value": 0.5, "range": [0, 2] },
                    "noise_scale": { "value": 10, "range": [0, 100] }
                },
                gooey: true,
                debug: false,
            });
            */

            // 4. Text Mask Effect (Cinematic Reveal)
            Shery.textAnimate(".hero-title" /* Target element */, {
                style: 1,
                y: 10,
                delay: 0.1,
                duration: 2,
                ease: "cubic-bezier(0.23, 1, 0.320, 1)",
                multiplier: 0.1,
            });

            Shery.textAnimate(".hero-subtitle" /* Target element */, {
                style: 2,
                y: 10,
                delay: 0.3,
                duration: 2,
                ease: "cubic-bezier(0.23, 1, 0.320, 1)",
                multiplier: 0.1,
            });

        } else {
            console.warn("Shery.js not loaded.");
        }
    }, 1000); // 1s delay to be safe with resource loading
});
