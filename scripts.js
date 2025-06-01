document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const targetRect = target.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (targetRect.height > viewportHeight) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.drop-down');

    function checkVisibility() {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Initial check for elements already in view
});




document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fly-in');

    function checkVisibility() {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Initial check
});


document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.querySelector(".about-section .text-content p");
    const text = textElement.textContent;
    textElement.textContent = "";
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            textElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 25);
        }
    }

    typeWriter();
});
