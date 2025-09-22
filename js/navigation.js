// Navigation JavaScript - Reusable across all pages

class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupNavigation();
            });
        } else {
            this.setupNavigation();
        }
    }

    setupNavigation() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupActiveNavigation();
        this.setupDropdownEnhancement();
        this.setupLoadingAnimation();
    }

    // Professional navbar scroll effect
    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 30) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        });
    }

    // Enhanced mobile menu toggle
    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            // Toggle menu on hamburger click
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            // Close menu when clicking nav links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    }

    // Enhanced smooth scroll for anchor links
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
    }

    // Active navigation highlight
    setupActiveNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        if (sections.length > 0) {
            window.addEventListener('scroll', () => {
                const scrollPosition = window.scrollY + 100;

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');

                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        navLinks.forEach(link => {
                            link.parentElement.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.parentElement.classList.add('active');
                            }
                        });
                    }
                });
            });
        }
    }

    // Dropdown hover enhancement
    setupDropdownEnhancement() {
        const dropdownItems = document.querySelectorAll('.has-dropdown');
        dropdownItems.forEach(item => {
            let timeoutId;
            
            item.addEventListener('mouseenter', () => {
                clearTimeout(timeoutId);
            });
            
            item.addEventListener('mouseleave', () => {
                timeoutId = setTimeout(() => {
                    // Dropdown will hide via CSS
                }, 300);
            });
        });
    }

    // Enhanced loading animation
    setupLoadingAnimation() {
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    }

    // Method to highlight current page in navigation
    setActivePage(pageName) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.textContent.toLowerCase().includes(pageName.toLowerCase()) ||
                link.getAttribute('href').includes(pageName.toLowerCase())) {
                link.parentElement.classList.add('active');
            }
        });
    }

    // Method to update navigation for different pages
    updateNavigation(currentPage) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to current page
        const currentNavItem = document.querySelector(`[href*="${currentPage}"]`);
        if (currentNavItem) {
            currentNavItem.parentElement.classList.add('active');
        }
    }
}

// Particle Animation System (for pages that need it)
class ParticleSystem {
    constructor(containerId, particleCount = null) {
        this.containerId = containerId;
        this.particleCount = particleCount || (window.innerWidth < 768 ? 15 : 30);
        this.container = document.getElementById(this.containerId);
        
        if (this.container) {
            this.createParticles();
            this.setupResize();
        }
    }

    createParticles() {
        // Clear existing particles
        this.container.innerHTML = '';
        
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            this.container.appendChild(particle);
        }
    }

    setupResize() {
        window.addEventListener('resize', () => {
            this.particleCount = window.innerWidth < 768 ? 15 : 30;
            this.createParticles();
        });
    }
}

// Animation Observer System
class AnimationObserver {
    constructor() {
        this.setupObserver();
    }

    setupObserver() {
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

        // Observe all cards and sections for animation
        document.querySelectorAll('.card, .section h2').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Initialize navigation when script loads
const navigationManager = new NavigationManager();

// Export for use in other scripts
window.NavigationManager = NavigationManager;
window.ParticleSystem = ParticleSystem;
window.AnimationObserver = AnimationObserver;

