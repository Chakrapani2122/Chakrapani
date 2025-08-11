// Ensure default theme is light on page load
window.addEventListener('DOMContentLoaded', function() {
    const themeToggleSwitch = document.getElementById('theme-toggle');
    if (themeToggleSwitch) {
        themeToggleSwitch.checked = false;
        document.body.classList.add('light-theme');
        themeToggleSwitch.addEventListener('change', () => {
            document.body.classList.toggle('light-theme');
        });
    }
});

// Smooth scrolling for navigation links and active nav highlighting
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Improved mobile menu toggle
const menuToggleBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggleBtn && navLinks) {
    menuToggleBtn.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        navLinks.classList.toggle('open');
    });
}

// Accessibility: focus/active states
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('focus', function () {
        this.classList.add('active');
    });
    link.addEventListener('blur', function () {
        this.classList.remove('active');
    });
});

// Navbar shadow on scroll for sticky effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.sticky');
    if (navbar) {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Staggered fade-in for sections
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section').forEach((section, i) => {
        section.style.opacity = '0';
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transition = 'opacity 0.8s cubic-bezier(.77,0,.175,1)';
        }, 200 + i * 150);
    });
});

// Ensure CTA row is always visible at the top of the home section
document.addEventListener('DOMContentLoaded', () => {
    const ctaRow = document.getElementById('ctaRow');
    if (ctaRow) {
        ctaRow.style.display = 'block';
        ctaRow.style.opacity = '1';
        ctaRow.style.visibility = 'visible';
    }
});

// Go to Top Button logic
const goTopBtn = document.getElementById('goTopBtn');
window.addEventListener('scroll', function() {
    if (goTopBtn) {
        if (window.scrollY > 200) {
            goTopBtn.classList.add('show');
        } else {
            goTopBtn.classList.remove('show');
        }
    }
});
if (goTopBtn) {
    goTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Show success message on submit
document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default for instant feedback
        setTimeout(() => {
            const msg = form.querySelector('#form-success');
            if (msg) msg.style.display = 'block';
        }, 500);
    });
});
