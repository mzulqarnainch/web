/**
 * Muhammad Zulqarnain - Lead Generation & SDR Specialist Portfolio
 * Vanilla JavaScript Implementation
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       CONFIGURABLE CONTACT PLACEHOLDERS
       (Replace values here if needed)
       ========================================================================== */
    const CONFIG = {
        email: 'YOUR_EMAIL@example.com',
        whatsapp: 'YOUR_WHATSAPP_NUMBER',
        linkedin: 'YOUR_LINKEDIN_URL'
    };

    /* ==========================================================================
       1. STICKY HEADER & SCROLL DETECTOR
       ========================================================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       2. MOBILE MENU TOGGLE
       ========================================================================== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking any navigation link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ==========================================================================
       3. ACTIVE NAVIGATION HIGHLIGHTER ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetNavLink = document.querySelector(`.nav-list a[href*="#${sectionId}"]`);

            if (targetNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetNavLink.classList.add('active');
                } else {
                    targetNavLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    /* ==========================================================================
       4. PORTFOLIO JS FILTERING
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    /* ==========================================================================
       5. AUTOMATIC FOOTER YEAR UPDATER
       ========================================================================== */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ==========================================================================
       6. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
       ========================================================================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply inline subtle reveal setup & observe cards
    const animatedElements = document.querySelectorAll('.card, .process-step, .trust-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        revealObserver.observe(el);
    });
});