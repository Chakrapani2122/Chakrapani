// JavaScript for interactive and dynamic content

// Function to toggle visibility of sections (projects or experience)
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.style.display = section.style.display === "none" ? "block" : "none";
}

// Function to dynamically load project cards
function loadContent() {
    const projectsContainer = document.getElementById("projects-container");

    const projects = [
        {
            title: "VIVIDTONES",
            description: "Implemented CNNs with pre-trained deep learning models to colorize grayscale images, achieving realistic color outputs.",
            link: "https://link-to-vividtones-project.com",  // Replace with the actual link
            image: "images/vividtones.jpg"  // Replace with the actual image URL
        },
        {
            title: "PRECISION OBJECT COUNTING SYSTEM",
            description: "Built a computer vision-based tool for real-time object and people counting using OpenCV.",
            link: "https://link-to-object-counting-project.com",  // Replace with the actual link
            image: "images/object-counting.jpg"  // Replace with the actual image URL
        },
        {
            title: "IRIS FLOWER SPECIES DETECTION",
            description: "Achieved 97% accuracy using Support Vector Classifier (SVC) to classify flower species based on petal and sepal dimensions.",
            link: "https://link-to-iris-project.com",  // Replace with the actual link
            image: "assets/images/iris.jpg"  // Replace with the actual image URL
        },
        {
            title: "EMAIL SPAM DETECTION",
            description: "Improved spam email classification accuracy to 98% using Logistic Regression and feature extraction from text data.",
            link: "https://link-to-email-spam-project.com",  // Replace with the actual link
            image: "images/email-spam.jpg"  // Replace with the actual image URL
        },
        {
            title: "ADVERTISING SALES PREDICTION",
            description: "Forecasted sales with 98% accuracy using Random Forest models, optimizing features for better prediction reliability.",
            link: "https://link-to-sales-prediction-project.com",  // Replace with the actual link
            image: "assets/images/Projects/advertising-sales.jpg"  // Replace with the actual image URL
        },
        {
            title: "GUI-BASED WEATHER FORECASTING APPLICATION",
            description: "Developed a Python app integrated with OpenWeatherMap API to deliver real-time weather forecasts with 95% accuracy.",
            link: "https://link-to-weather-app-project.com",  // Replace with the actual link
            image: "images/weather-forecasting.jpg"  // Replace with the actual image URL
        },
    ];

    projects.forEach(project => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("card");

        // Create an anchor tag wrapping the card content
        const anchor = document.createElement("a");
        anchor.href = project.link;
        anchor.target = "_blank";  // Opens the link in a new tab
        anchor.classList.add("project-link");  // Optional: Add a class for styling

        // Set the background image of the card
        projectElement.style.backgroundImage = `url(${project.image})`;
        projectElement.style.backgroundSize = "cover";  // Ensures the image covers the entire card
        projectElement.style.backgroundPosition = "center";  // Centers the image

        // Insert content inside the card
        projectElement.innerHTML = `
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;

        // Append the card inside the anchor tag
        anchor.appendChild(projectElement);

        // Append the anchor-wrapped card to the projects container
        projectsContainer.appendChild(anchor);
    });

    // Load certification cards
    const certificationsContainer = document.getElementById("certifications-container");

    const certifications = [
        {
            title: "Data Analysis with Python - Coursera",
            link: "https://www.coursera.org",
            image: "assets/images/certificates/Data_Analysis_Coursera.png"  // Replace with the actual image URL
        },
        {
            title: "Introduction to Data Science - Infosys Springboard",
            link: "https://www.infosys.com",
            image: "images/infosys.jpg"  // Replace with the actual image URL
        },
        {
            title: "Python (OOPs) - LinkedIn",
            link: "https://www.linkedin.com/learning",
            image: "images/linkedin.jpg"  // Replace with the actual image URL
        },
        {
            title: "Structured Query Language - LinkedIn",
            link: "https://www.linkedin.com/learning",
            image: "images/linkedin.jpg"  // Replace with the actual image URL
        },
        {
            title: "C Programming - LinkedIn",
            link: "https://www.linkedin.com/learning",
            image: "images/linkedin.jpg"  // Replace with the actual image URL
        },
        {
            title: "Introduction to AI - SkillUp",
            link: "https://www.skillup.com",
            image: "images/skillup.jpg"  // Replace with the actual image URL
        },
    ];

    certifications.forEach(certification => {
        const certificationElement = document.createElement("div");
        certificationElement.classList.add("card");

        // Create an anchor tag wrapping the card content
        const anchor = document.createElement("a");
        anchor.href = certification.link;
        anchor.target = "_blank";  // Opens the link in a new tab
        anchor.classList.add("certification-link");  // Optional: Add a class for styling

        // Set the background image of the card
        certificationElement.style.backgroundImage = `url(${certification.image})`;
        certificationElement.style.backgroundSize = "cover";  // Ensures the image covers the entire card
        certificationElement.style.backgroundPosition = "center";  // Centers the image

        // Insert content inside the card
        certificationElement.innerHTML = `
            <div class="card-content">
                <h3>${certification.title}</h3>
            </div>
        `;

        // Append the card inside the anchor tag
        anchor.appendChild(certificationElement);

        // Append the anchor-wrapped card to the certifications container
        certificationsContainer.appendChild(anchor);
    });
}

// Initialize content on page load
document.addEventListener("DOMContentLoaded", function () {
    loadContent(); // Load projects and certifications dynamically

    // Example: Add event listeners for smooth scrolling
    const projectSectionLink = document.getElementById("projects-link");
    if (projectSectionLink) {
        projectSectionLink.addEventListener("click", function (event) {
            event.preventDefault();
            document.getElementById("projects").scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Handle contact form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
        alert("Thank you for your message! We will get back to you soon.");
    } else {
        alert("Please fill out all fields before submitting.");
    }
}

// Attach event listener to the form
const form = document.getElementById("contact-form");
if (form) {
    form.addEventListener("submit", handleFormSubmit);
}

// Get the button element
const goToTopButton = document.getElementById('goToTop');

// Show the button when the user scrolls down 100px
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        goToTopButton.style.display = 'block';
    } else {
        goToTopButton.style.display = 'none';
    }
};

// Scroll to the top when the button is clicked
goToTopButton.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};