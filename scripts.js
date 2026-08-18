// Smooth scroll for nav links, plus any in-page card action that jumps to a section
// (the private-repo button sends people to the contact form).
document.querySelectorAll('nav a, a.private-repo').forEach(anchor => {
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

// Mouse drag-to-scroll for horizontal containers on narrow desktop windows
['.certs-grid', '.timeline', '.skills', '.projects-grid'].forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
        let isDown = false;
        let startX;
        let scrollLeft;

        el.addEventListener('mousedown', e => {
            isDown = true;
            el.style.cursor = 'grabbing';
            startX = e.pageX - el.offsetLeft;
            scrollLeft = el.scrollLeft;
        });

        el.addEventListener('mouseleave', () => {
            isDown = false;
            el.style.cursor = '';
        });

        el.addEventListener('mouseup', () => {
            isDown = false;
            el.style.cursor = '';
        });

        el.addEventListener('mousemove', e => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - el.offsetLeft;
            el.scrollLeft = scrollLeft - (x - startX);
        });
    });
});

// Typewriter effect on About Me — every paragraph, typed in order.
//
// This used to call querySelector, which returns only the FIRST match. That was fine
// while About Me was a single <p>, but the moment it became three the effect ran on
// paragraph one and the rest simply appeared. querySelectorAll + a queue keeps the
// effect whole however many paragraphs the section grows to.
document.addEventListener('DOMContentLoaded', function () {
    const paragraphs = document.querySelectorAll('.about-section .text-content p');
    if (!paragraphs.length) return;

    const SPEED_MS = 6;   // ~700 characters of About copy; 12ms made it a 9-second wait

    // Measure each paragraph BEFORE emptying it and pin that height, so the section
    // does not grow line by line and shove the rest of the page down while it types.
    const queue = [];
    paragraphs.forEach(function (p) {
        queue.push({ el: p, text: p.textContent });
        p.style.minHeight = p.offsetHeight + 'px';
        p.textContent = '';
    });

    function typeParagraph(i) {
        if (i >= queue.length) return;
        const job = queue[i];
        let index = 0;

        (function step() {
            if (index < job.text.length) {
                job.el.textContent += job.text.charAt(index);
                index++;
                setTimeout(step, SPEED_MS);
            } else {
                job.el.style.minHeight = '';   // release the reserved space
                typeParagraph(i + 1);
            }
        })();
    }

    typeParagraph(0);
});
