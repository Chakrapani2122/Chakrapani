// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Handle navigation and section switching
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Get the target section ID
        const targetId = this.dataset.target;

        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// Highlight the active navigation link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
        // Remove "active" class from all links
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });

        // Add "active" class to the clicked link
        this.classList.add('active');
    });
});

// Toggle navigation menu for mobile view
const menuIcon = document.createElement('div');
menuIcon.classList.add('menu-icon');
menuIcon.innerHTML = '&#9776;'; // Menu icon (hamburger)
document.querySelector('.navbar').appendChild(menuIcon);

menuIcon.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');

    // Adjust sections for better organization in mobile view
    if (navLinks.classList.contains('active')) {
        document.querySelectorAll('.section').forEach(section => {
            section.style.marginBottom = '20px'; // Add spacing between sections
        });
    } else {
        document.querySelectorAll('.section').forEach(section => {
            section.style.marginBottom = ''; // Reset spacing
        });
    }
});

const themeToggleSwitch = document.getElementById('theme-toggle');
const body = document.body;

themeToggleSwitch.addEventListener('change', () => {
    body.classList.toggle('light-theme'); // Toggle the light-theme class
});
