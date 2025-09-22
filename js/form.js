// Create dynamic particles for quantum background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return; // Exit if particles container doesn't exist

    const particleCount = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Optimized SPA-like Hash Navigation
function handleHashNavigation() {
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Smooth scroll for anchor links (excluding nav-links handled by navigation.js)
document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Timeline animation for seminar items
const timelineObserverOptions = {
    threshold: 0.2
};

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, timelineObserverOptions);

// Observe elements for animation
function observeElements() {
    // General animations for cards and section headers
    document.querySelectorAll('.benefit-item, .applications, .section h2, .card, .stat-item, .paper-card, .resource-card, .seminar-content, .contact-item, .inquiry-card, .map-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Stagger animation for publication cards
    const paperCards = document.querySelectorAll('.paper-card');
    paperCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });

    // Timeline animation for seminar items
    const timelineItems = document.querySelectorAll('.seminar-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) scale(0.95)';
        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        timelineObserver.observe(item);
    });
}

// Page load animation
function handlePageLoad() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Initialize scripts
window.addEventListener('load', () => {
    createParticles();
    handleHashNavigation();
    observeElements();
    handlePageLoad();
});

// Recreate particles on window resize
window.addEventListener('resize', () => {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
        createParticles();
    }
});

// Handle hash changes
window.addEventListener('hashchange', handleHashNavigation);