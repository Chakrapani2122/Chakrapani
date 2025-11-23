// Optimized Data Science Portfolio JavaScript
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupFloatingNav();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupContactForm();
        this.setupSkillBars();
        this.setupCounters();
    }

    // Navigation System
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link, .nav-menu-item');
        
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
                    
                    this.updateActiveNav(link);
                    this.closeFloatingNav();
                }
            });
        });

        // Update active nav on scroll
        window.addEventListener('scroll', this.debounce(() => {
            this.updateActiveNavOnScroll();
        }, 10));
    }

    updateActiveNav(activeLink) {
        document.querySelectorAll('.nav-link, .nav-menu-item').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
        
        const targetId = activeLink.getAttribute('href');
        document.querySelectorAll('.nav-link, .nav-menu-item').forEach(item => {
            if (item.getAttribute('href') === targetId) {
                item.classList.add('active');
            }
        });
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('.section, .hero-section');
        const navLinks = document.querySelectorAll('.nav-link, .nav-menu-item');
        
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

    // Floating Navigation
    setupFloatingNav() {
        const navToggleBtn = document.getElementById('navToggleBtn');
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        // Floating navigation
        if (navToggleBtn && navMenu) {
            navToggleBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
            
            navMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-menu-item')) {
                    navMenu.querySelectorAll('.nav-menu-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    navMenu.classList.remove('active');
                }
            });
            
            document.addEventListener('click', (e) => {
                if (!navToggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            });
            
            navToggleBtn.addEventListener('dblclick', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Mobile menu toggle
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navLinks.classList.toggle('open');
                
                const expanded = menuToggle.classList.contains('active');
                menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
                
                document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
            });
            
            // Close mobile menu when clicking on a link
            navLinks.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('open');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    closeFloatingNav() {
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            navMenu.classList.remove('active');
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

    // Animations
    setupAnimations() {
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

        const animateElements = document.querySelectorAll(
            '.section-header, .skill-category, .timeline-item, .project-card, .expertise-item, .cert-category, .publication-item'
        );
        animateElements.forEach(el => observer.observe(el));
    }

    triggerElementAnimation(element) {
        if (element.classList.contains('timeline-item')) {
            element.classList.add('visible');
        } else if (element.classList.contains('skill-category')) {
            element.classList.add('fade-in');
            this.animateSkillBars(element);
        } else if (element.classList.contains('project-card')) {
            element.classList.add('scale-in');
        } else {
            const rect = element.getBoundingClientRect();
            const centerX = window.innerWidth / 2;
            
            if (rect.left < centerX) {
                element.classList.add('fade-in-left');
            } else {
                element.classList.add('fade-in-right');
            }
        }
    }

    // Skill Bars Animation
    setupSkillBars() {
        // Triggered by intersection observer
    }

    animateSkillBars(skillCategory) {
        if (skillCategory.dataset.animated) {
            return;
        }
        skillCategory.dataset.animated = true;

        const skillItems = skillCategory.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                const progressBar = item.querySelector('.skill-progress');
                if (!progressBar) {
                    console.debug('[animateSkillBars] no .skill-progress found for item', item, index);
                    return;
                }
                
                let skillLevel = item.dataset.skill;

                if (!skillLevel) {
                    skillLevel = '85%'; // Fallback
                }

                // normalize skillLevel (ensure ends with %)
                if (/^[0-9.]+$/.test(skillLevel)) {
                    skillLevel = skillLevel + '%';
                }
                
                progressBar.style.width = skillLevel;
                console.debug('[animateSkillBars] animated to', skillLevel, 'for item', index);
            }, index * 150);
        });
    }

    // Contact Form
    setupContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });

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
                successMessage.style.display = 'block';
                successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                successMessage.className = 'form-message form-success';
                form.reset();
                
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
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

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

    // Animated Counter System
    setupCounters() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    this.animateCounter(entry.target);
                    entry.target.dataset.counted = 'true';
                }
            });
        }, observerOptions);

        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const text = element.textContent;
        const hasPercent = text.includes('%');
        const hasPlus = text.includes('+');
        const hasK = text.includes('K');
        
        // Extract the number
        let targetValue = parseFloat(text.replace(/[^\d.]/g, ''));
        
        if (isNaN(targetValue)) {
            return;
        }

        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepDuration = duration / steps;
        const increment = targetValue / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                current = targetValue;
                clearInterval(timer);
            }

            let displayValue = current;
            
            // Format based on original text
            if (hasK) {
                displayValue = (current / 1).toFixed(0) + 'K+';
            } else if (Number.isInteger(targetValue)) {
                displayValue = Math.round(current);
            } else {
                displayValue = current.toFixed(2);
            }

            if (hasPercent && !hasK) {
                displayValue = Math.round(current) + '%';
            }
            
            element.textContent = displayValue;
        }, stepDuration);
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
}

// Initialize Portfolio
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
    
    // Add smooth scrolling for all internal links
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
});

// Add CSS animations
const animationCSS = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-in {
  animation: fadeInUp 0.6s ease-out;
}

.fade-in-left {
  animation: fadeInLeft 0.6s ease-out;
}

.fade-in-right {
  animation: fadeInRight 0.6s ease-out;
}

.scale-in {
  animation: scaleIn 0.5s ease-out;
}

.timeline-item {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.6s ease;
}

.timeline-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.timeline-item:nth-child(even) {
  transform: translateX(50px);
}

.timeline-item:nth-child(even).visible {
  transform: translateX(0);
}

.form-success {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid var(--success);
  color: var(--success);
}

.form-error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid var(--danger);
  color: var(--danger);
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
`;

const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);