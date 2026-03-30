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

    // Contact form handling - let Netlify handle submission natively
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);

            fetch(contactForm.action || '/', {
                method: 'POST',
                body: new URLSearchParams(formData).toString(),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(response => {
                if (response.ok) {
                    const data = Object.fromEntries(formData.entries());
                    const wrapper = contactForm.closest('.contact-form-wrapper');
                    wrapper.innerHTML = `
                        <div style="text-align: center; padding: 40px 0;">
                            <div style="font-size: 48px; margin-bottom: 16px;">✓</div>
                            <h3 style="font-family: 'DM Serif Display', serif; font-size: 1.5rem; margin-bottom: 12px;">Message Sent</h3>
                            <p style="color: #6b6b82; font-size: 16px;">Thank you, ${data.name}. We'll be in touch within one business day.</p>
                        </div>
                    `;
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch((error) => {
                alert('There was an error sending your message. Please try emailing us directly at john@mallory.consulting');
                console.error('Form error:', error);
            });
        });
    }

    // Early access signup form for Actu8 landing page
    const earlyAccessForm = document.getElementById('earlyAccessForm');

    if (earlyAccessForm) {
        earlyAccessForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('earlyEmail');

            if (!emailInput || !emailInput.value.trim()) {
                emailInput.focus();
                return;
            }

            const email = emailInput.value.trim();
            const messageWrapper = document.createElement('p');

            messageWrapper.className = 'small-note';
            messageWrapper.style.marginTop = '14px';

            messageWrapper.textContent = `Thanks ${email}! You're on the Actu8 waitlist. We'll email you updates soon.`;
            earlyAccessForm.after(messageWrapper);
            earlyAccessForm.reset();

            // TODO: connect to real API / Mailchimp / product backend
            console.log('Early access request:', email);
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
