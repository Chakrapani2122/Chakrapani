// Portfolio JavaScript Functionality

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    // Initialize all components
    initNavigation();
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    initAnimations();
    initParallax();
    initLucideIcons();
    initThemeHandling();
    initKeyboardNavigation();
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            navbar.className = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-navy-900/80 backdrop-blur-md border-white/10 py-4 shadow-lg';
        } else {
            navbar.className = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-transparent border-transparent py-6';
        }
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-teal-400');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-teal-400');
                    }
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    if (!mobileMenuToggle || !mobileMenu) return;

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenuToggle.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenuToggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
            document.body.style.overflow = '';
        }
        
        // Reinitialize icons after DOM change
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // Close mobile menu when clicking nav links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuToggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
            isMenuOpen = false;
            document.body.style.overflow = '';
            
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMobileMenu();
        }
    });
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 100; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', handleContactSubmit);

    async function handleContactSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        const submitBtn = document.getElementById('submit-btn');
        const submitText = document.getElementById('submit-text');
        const submitLoading = document.getElementById('submit-loading');
        
        submitBtn.disabled = true;
        submitText.classList.add('hidden');
        submitLoading.classList.remove('hidden');

        try {
            // Submit to Formspree
            const response = await fetch(e.target.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Reset form and show success message
                e.target.reset();
                showNotification('Thank you! Your message has been sent successfully.', 'success');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitText.classList.remove('hidden');
            submitLoading.classList.add('hidden');
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Animation functionality
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    document.querySelectorAll('.skill-card, .project-card').forEach(el => {
        el.classList.add('lazy-load');
        observer.observe(el);
    });

    // Staggered animation for skill cards
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Staggered animation for project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
}

// Parallax scrolling effect
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Parallax for background blobs
        const blobs = document.querySelectorAll('.animate-blob');
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.1;
            blob.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize Lucide icons
function initLucideIcons() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Theme handling
function initThemeHandling() {
    // Check for system preference changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
        mediaQuery.addEventListener('change', handleThemeChange);
    }

    function handleThemeChange(e) {
        // Portfolio is designed for dark theme, but we can add light theme handling here
        console.log('Theme preference changed:', e.matches ? 'light' : 'dark');
    }
}

// Keyboard navigation
function initKeyboardNavigation() {
    // Tab navigation enhancement
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Alt + H = Home/About
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        }

        // Alt + E = Experience
        if (e.altKey && e.key === 'e') {
            e.preventDefault();
            document.querySelector('#experience').scrollIntoView({ behavior: 'smooth' });
        }

        // Alt + P = Projects
        if (e.altKey && e.key === 'p') {
            e.preventDefault();
            document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
        }

        // Alt + R = Certifications
        if (e.altKey && e.key === 'r') {
            e.preventDefault();
            document.querySelector('#certifications').scrollIntoView({ behavior: 'smooth' });
        }

        // Alt + U = Publications
        if (e.altKey && e.key === 'u') {
            e.preventDefault();
            document.querySelector('#publications').scrollIntoView({ behavior: 'smooth' });
        }

        // Alt + C = Contact
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
        type === 'success' ? 'bg-green-600 text-white' :
        type === 'error' ? 'bg-red-600 text-white' :
        'bg-blue-600 text-white'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@500;700&display=swap'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Analytics and tracking (placeholder)
function initAnalytics() {
    // Add analytics tracking here if needed
    console.log('Portfolio loaded successfully');
    
    // Track page views
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID');
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
    // Add error reporting here if needed
});

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Initialize analytics
document.addEventListener('DOMContentLoaded', initAnalytics);

// Export functions for global access if needed
window.portfolioFunctions = {
    showNotification,
    debounce,
    throttle
};
