'use strict';

// ── Nav: transparent → dark backdrop on scroll ──
const nav = document.getElementById('nav');

function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Mobile menu toggle ──
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu on nav link click
navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
    });
});

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('[data-reveal]').forEach(el => {
    revealObserver.observe(el);
});

// ── Subtle hero parallax (desktop only) ──
const heroImage = document.querySelector('.hero-image');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (heroImage && !prefersReducedMotion) {
    const heroSection = heroImage.closest('.hero');

    function onHeroScroll() {
        if (!heroSection) return;
        const scrolled = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        if (scrolled < heroHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.12}px)`;
        }
    }

    // Only run on wider screens
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', onHeroScroll, { passive: true });
    }
}
