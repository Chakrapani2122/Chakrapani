// World-Class Data Science Portfolio JavaScript
class Portfolio {
    constructor() {
        this.isLoading = true;
        this.scrollProgress = 0;
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupContactForm();
        this.setupScrollToTop();
        this.setupSkillBars();
        this.setupTypewriter();
        this.setupLazyLoading();
        this.setupParallaxEffects();
        this.setupScrollProgress();
        this.setupInteractiveElements();
        this.setupPerformanceOptimizations();
        this.hideLoadingScreen();
    }

    // Loading Screen
    showLoadingScreen() {
        const loadingHTML = `
            <div class="loading-overlay" id="loadingOverlay">
                <div class="loading-spinner"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', loadingHTML);
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                loadingOverlay.classList.add('hidden');
                setTimeout(() => loadingOverlay.remove(), 500);
            }
            this.isLoading = false;
        }, 1000);
    }

    // Navigation System
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section, .hero-section');

        // Smooth scroll navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav
                    this.updateActiveNav(link);
                    
                    // Close mobile menu
                    this.closeMobileMenu();
                }
            });
        });

        // Update active nav on scroll
        window.addEventListener('scroll', this.debounce(() => {
            this.updateActiveNavOnScroll();
        }, 10));
    }

    updateActiveNav(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('.section, .hero-section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Mobile Menu
    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });

            // Close menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    }

    closeMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuToggle && navLinks) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    // Scroll Effects
    setupScrollEffects() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Enhanced Animations
    setupAnimations() {
        // Intersection Observer for staggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerElementAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.section-header, .skill-category, .timeline-item, .project-card, .expertise-item, .cert-card, .publication-item'
        );
        animateElements.forEach(el => observer.observe(el));
    }

    triggerElementAnimation(element) {
        // Add staggered animation classes
        if (element.classList.contains('timeline-item')) {
            element.classList.add('visible');
        } else if (element.classList.contains('skill-category')) {
            element.classList.add('fade-in');
            this.animateSkillBars(element);
        } else if (element.classList.contains('project-card')) {
            element.classList.add('scale-in');
            this.setupProjectHoverEffects(element);
        } else {
            // Determine animation type based on position
            const rect = element.getBoundingClientRect();
            const centerX = window.innerWidth / 2;
            
            if (rect.left < centerX) {
                element.classList.add('fade-in-left');
            } else {
                element.classList.add('fade-in-right');
            }
        }
    }

    // Parallax Effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        window.addEventListener('scroll', this.debounce(() => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            // Hero background parallax
            const heroBackground = document.querySelector('.hero-bg');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }, 10));
    }

    // Scroll Progress Indicator
    setupScrollProgress() {
        const progressHTML = `
            <div class="scroll-progress">
                <div class="scroll-progress-bar" id="scrollProgressBar"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', progressHTML);
        
        const progressBar = document.getElementById('scrollProgressBar');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = scrollPercent + '%';
            this.scrollProgress = scrollPercent;
        });
    }

    // Lazy Loading
    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            img.classList.add('lazy-image');
            imageObserver.observe(img);
        });
    }

    // Interactive Elements
    setupInteractiveElements() {
        // Enhanced project cards
        document.querySelectorAll('.project-card').forEach(card => {
            this.setupProjectHoverEffects(card);
        });
        
        // Interactive timeline
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(10px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
            });
        });
        
        // Enhanced form interactions
        this.setupEnhancedFormInteractions();
    }

    setupProjectHoverEffects(card) {
        // Removed expand button and project insights overlay
    }

    expandProjectCard(card) {
        // Create modal or expanded view
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h2>Project Deep Dive</h2>
                <p>Detailed project information would go here...</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
    }

    setupEnhancedFormInteractions() {
        const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        
        formInputs.forEach(input => {
            // Add floating labels
            const label = document.createElement('label');
            label.className = 'form-label';
            label.textContent = input.placeholder;
            input.placeholder = '';
            input.parentNode.appendChild(label);
            
            // Add focus effects
            input.addEventListener('focus', () => {
                input.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentNode.classList.remove('focused');
                }
            });
        });
    }

    // Skill Bars Animation
    setupSkillBars() {
        // This will be triggered by intersection observer
    }

    animateSkillBars(skillCategory) {
        const skillItems = skillCategory.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                const progressBar = item.querySelector('.skill-progress');
                const skillFill = document.createElement('div');
                skillFill.className = 'skill-progress-fill';
                
                // Get skill level from data attribute
                const skillLevel = item.dataset.skill || 85;
                
                progressBar.appendChild(skillFill);
                
                // Animate the fill
                setTimeout(() => {
                    skillFill.style.width = skillLevel + '%';
                }, 100);
            }, index * 150);
        });
    }

    // Typewriter Effect
    setupTypewriter() {
        const typewriterElement = document.querySelector('.hero-subtitle');
        if (typewriterElement) {
            const text = typewriterElement.textContent;
            typewriterElement.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    typewriterElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            // Start typewriter after a delay
            setTimeout(typeWriter, 1000);
        }
    }

    // Contact Form
    setupContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });

            // Enhanced form validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', (e) => this.validateField(e.target));
                input.addEventListener('input', (e) => this.clearValidation(e.target));
            });
        }
    }

    async handleFormSubmission(form) {
        const submitBtn = form.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        const successMessage = document.getElementById('form-success');
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(form);
            
            const response = await fetch('https://formspree.io/f/myzedaon', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                successMessage.style.display = 'block';
                successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                successMessage.className = 'form-message form-success';
                form.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            successMessage.style.display = 'block';
            successMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
            successMessage.className = 'form-message form-error';
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Clear previous validation
        this.clearValidation(field);

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }

        if (!isValid) {
            field.style.borderColor = 'var(--danger)';
            this.showValidationMessage(field, message);
        } else {
            field.style.borderColor = 'var(--success)';
        }

        return isValid;
    }

    clearValidation(field) {
        field.style.borderColor = 'var(--gray-200)';
        const existingMessage = field.parentNode.querySelector('.validation-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }

    showValidationMessage(field, message) {
        const messageEl = document.createElement('div');
        messageEl.className = 'validation-message';
        messageEl.textContent = message;
        messageEl.style.color = 'var(--danger)';
        messageEl.style.fontSize = '0.875rem';
        messageEl.style.marginTop = '0.5rem';
        
        field.parentNode.appendChild(messageEl);
    }

    // Scroll to Top
    setupScrollToTop() {
        const scrollTopBtn = document.getElementById('scrollTop');
        
        if (scrollTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            });

            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Utility Functions
    debounce(func, wait) {
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

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Preload critical images
        this.preloadImages();
        
        // Add GPU acceleration to animated elements
        document.querySelectorAll('.project-card, .skill-progress, .timeline-item').forEach(el => {
            el.classList.add('gpu-accelerated');
        });
        
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduce-motion');
        }
        
        // Optimize scroll performance
        this.optimizeScrollPerformance();
    }

    preloadImages() {
        const criticalImages = [
            'assets/photo.jpg',
            'assets/Projects/food_prices.jpeg',
            'assets/Projects/vividtones.jpg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    optimizeScrollPerformance() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            // Update scroll-dependent effects here
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }

    // Initialize smooth scrolling for all internal links
    initSmoothScrolling() {
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

    // Add ripple effect to buttons
    addRippleEffect() {
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Setup Tooltips
    setupTooltips() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.classList.add('tooltip');
        });
    }

    // Keyboard Navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key closes modals
            if (e.key === 'Escape') {
                const modal = document.querySelector('.project-modal');
                if (modal) modal.remove();
            }
            
            // Arrow keys for navigation
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const direction = e.key === 'ArrowDown' ? 1 : -1;
                this.navigateWithKeyboard(direction);
            }
        });
    }

    navigateWithKeyboard(direction) {
        const sections = document.querySelectorAll('.section');
        const currentSection = Math.floor(this.scrollProgress / (100 / sections.length));
        const nextSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
        
        if (sections[nextSection]) {
            sections[nextSection].scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Enhanced Loading and Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize portfolio with loading state
    const portfolio = new Portfolio();
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Initialize additional features
    portfolio.initSmoothScrolling();
    portfolio.addRippleEffect();
    
    // Add tooltips
    portfolio.setupTooltips();
    
    // Setup keyboard navigation
    portfolio.setupKeyboardNavigation();
});

// Enhanced CSS for all interactive effects
const enhancedCSS = `
.btn-primary, .btn-secondary {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

body {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

body.loaded {
    opacity: 1;
}

.validation-message {
    animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.project-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    max-width: 80%;
    max-height: 80%;
    overflow-y: auto;
    position: relative;
    animation: scaleIn 0.3s ease;
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
}

.form-group.focused .form-label {
    top: -0.5rem;
    left: 0.75rem;
    font-size: 0.75rem;
    color: var(--primary);
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes scaleIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}
`;

// Inject Enhanced CSS
const style = document.createElement('style');
style.textContent = enhancedCSS;
document.head.appendChild(style);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Portfolio loaded in ${loadTime}ms`);
    });
}

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}