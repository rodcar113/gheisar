document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const body = document.body;
    const ua = navigator.userAgent || "";

    // Clases de plataforma para ajustes finos por sistema operativo/dispositivo.
    body.classList.toggle("is-ios", /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
    body.classList.toggle("is-android", /Android/.test(ua));
    body.classList.toggle("is-windows", /Windows/.test(ua));
    body.classList.toggle("is-touch", window.matchMedia("(pointer: coarse)").matches);

    // 1. Lógica del Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        if (!preloader) return;
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 500);
    });

    // 2. Navbar Sticky Dinámico + menú responsive
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('primaryNav');

    const setScrollState = () => {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    setScrollState();
    window.addEventListener('scroll', setScrollState, { passive: true });

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = body.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                body.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Abrir menú');
            });
        });
    }

    // 3. Intersection Observer para Animaciones de Impacto
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.16
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 4. Corrección de alto real en móviles iOS/Android.
    const setViewportHeight = () => {
        root.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight, { passive: true });
    window.addEventListener('orientationchange', setViewportHeight, { passive: true });
});
