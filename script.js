document.addEventListener('DOMContentLoaded', () => {

    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            triggerHeroAnimations();
        }, 800);
    });

    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursorRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateCursorRing);
    }
    animateCursorRing();

    const hoverTargets = document.querySelectorAll('a, button, .btn, .glass-card, .skill-card, .interest-card, .achievement-card, .goal-card');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorRing.classList.add('hover');
        });
        target.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorRing.classList.remove('hover');
        });
    });

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNav();
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    function updateActiveNav() {
        const sections = document.querySelectorAll('.section');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    function triggerHeroAnimations() {
        const heroElements = document.querySelectorAll('.hero-section .reveal-text, .hero-section .reveal-image');
        heroElements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, i * 150);
        });
    }

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                animateCounter(target, 0, countTo, 1500);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));

    function animateCounter(element, start, end, duration) {
        let startTime = null;
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            element.textContent = Math.floor(eased * (end - start) + start);
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }

    const skillFills = document.querySelectorAll('.skill-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = targetWidth + '%';
                }, 200);
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillFills.forEach(fill => skillObserver.observe(fill));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    document.addEventListener('mousemove', (e) => {
        const orbs = document.querySelectorAll('.floating-orb');
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 8;
            orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    const tiltCards = document.querySelectorAll('.achievement-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    const rings = document.querySelectorAll('.globe-ring');
    rings.forEach((ring, i) => {
        ring.style.transform = `rotateX(${60 + i * 15}deg)`;
    });

});
