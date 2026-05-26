// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const targetRect = target.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        target.scrollIntoView({
            behavior: 'smooth',
            block: targetRect.height > viewportHeight ? 'start' : 'center'
        });
    });
});

// Scroll-triggered section fade-in
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Scroll-triggered heading animations (.fly-in, .drop-down)
const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fly-in, .drop-down').forEach(el => {
    headingObserver.observe(el);
});

// Nav active state based on scroll position
const allNavLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            allNavLinks.forEach(link => link.classList.remove('active'));
            const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => navObserver.observe(section));

// Typewriter effect on About Me
document.addEventListener('DOMContentLoaded', function () {
    const textElement = document.querySelector('.about-section .text-content p');
    if (!textElement) return;
    const text = textElement.textContent;
    textElement.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            textElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 12);
        }
    }

    typeWriter();
});
