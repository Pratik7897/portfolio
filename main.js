gsap.registerPlugin(ScrollTrigger);

// 1. LIQUID CURSOR
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(follower, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.6,
        ease: "power2.out"
    });
});

// 2. HERO ZOOM TIMELINE
const heroTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true
    }
});

heroTimeline
    .to(".zoom-text", { scale: 80, opacity: 0, filter: "blur(20px)" }, 0)
    .to(".objective-box", { opacity: 1, y: -30 }, 0.2);

// 3. ABOUT SECTION ENTRANCE
gsap.from(".about-grid > div", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 60%"
    }
});

// 4. HORIZONTAL GALLERY ENGINE
const panels = gsap.utils.toArray(".panel");
let scrollTween = gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: ".horizontal-wrapper",
        pin: true,
        scrub: 1,
        end: () => "+=" + document.querySelector(".horizontal-content").offsetWidth
    }
});

// 5. CINEMATIC PANEL ANIMATIONS (Image Zoom + Text Reveal)
panels.forEach((panel) => {
    const details = panel.querySelector(".project-details");
    const img = panel.querySelector("img");
    const title = panel.querySelector("h2");

    // Text Reveal synced with horizontal scroll
    gsap.from(details, {
        y: 80,
        opacity: 0,
        filter: "blur(10px)",
        scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left 70%",
            toggleActions: "play none none reverse"
        }
    });

    // Suble Image Zoom-in Parallax
    gsap.fromTo(img, 
        { scale: 1.3 }, 
        { 
            scale: 1, 
            ease: "none",
            scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                scrub: true
            }
        }
    );

    // Magnetic Cursor reaction for titles (does NOT change color)
    title.addEventListener("mouseenter", () => {
        follower.classList.add("cursor-active");
        gsap.to(title, { x: 10, duration: 0.3 });
    });
    title.addEventListener("mouseleave", () => {
        follower.classList.remove("cursor-active");
        gsap.to(title, { x: 0, duration: 0.3 });
    });
});

// 6. FLOATING SKILL TAGS (Background Layer)
const tags = document.querySelectorAll('.skill-tag');
tags.forEach((tag, i) => {
    gsap.set(tag, { 
        x: Math.random() * window.innerWidth, 
        y: Math.random() * window.innerHeight 
    });
    
    gsap.to(tag, {
        x: "+=120",
        y: "+=60",
        rotation: i % 2 === 0 ? 10 : -10,
        duration: 4 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

// 7. MAGNETIC CONTACT BAR
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(link, { x: x * 0.4, y: y * 0.4, duration: 0.3 });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(link, { x: 0, y: 0, duration: 0.3 });
    });
});

// 8. FOOTER REVEAL
gsap.from(".footer-content", {
    scale: 0.7,
    opacity: 0,
    scrollTrigger: {
        trigger: ".footer-reveal",
        start: "top 90%",
        end: "top 40%",
        scrub: 1
    }
});