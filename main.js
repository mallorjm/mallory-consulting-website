/* ============================================
   Mallory Consulting — Main JavaScript
   ============================================ */

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('.site-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.style.boxShadow = '0 1px 12px rgba(0, 0, 0, 0.06)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Contact form handling via Netlify Forms
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                const wrapper = contactForm.closest('.contact-form-wrapper');
                wrapper.innerHTML = `
                    <div style="text-align: center; padding: 40px 0;">
                        <div style="font-size: 48px; margin-bottom: 16px;">✓</div>
                        <h3 style="font-family: 'DM Serif Display', serif; font-size: 1.5rem; margin-bottom: 12px;">Message Sent</h3>
                        <p style="color: #6b6b82; font-size: 16px;">Thank you, ${data.name}. We'll be in touch within one business day.</p>
                    </div>
                `;
            })
            .catch((error) => {
                alert('There was an error sending your message. Please try emailing us directly at info@mallory.consulting');
                console.error('Form error:', error);
            });
        });
    }

    // Simple scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animation
    const animateElements = document.querySelectorAll(
        '.value-item, .service-card, .service-detail-card, .method-step, .blog-card'
    );

    animateElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
        observer.observe(el);
    });
});
