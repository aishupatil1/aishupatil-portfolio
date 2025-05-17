document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return; // Exit if target doesn't exist
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        history.pushState(null, null, this.getAttribute('href')); // Update URL
    });
});

// Fade-in
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return; // Exit if not intersecting
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => observer.observe(section));


// Debounce function
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};