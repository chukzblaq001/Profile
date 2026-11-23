
// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// DARK AND LIGHT MODE

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
}

function updateThemeButton() {
    themeToggle.textContent =
        document.body.classList.contains("light") ? "☾" : "☀";
}

updateThemeButton();

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const theme = document.body.classList.contains("light")
        ? "light"
        : "dark";

    localStorage.setItem("portfolio-theme", theme);
    updateThemeButton();
});

// TYPING ANIMATION

const typingElement = document.getElementById("typing");

const roles = [
    "Web Developer",
    "Frontend Developer",
    "Creative Programmer",
    "Tech Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingElement.textContent =
        currentRole.substring(0, charIndex);

    let speed = deleting ? 55 : 100;

    if (!deleting && charIndex === currentRole.length) {
        deleting = true;
        speed = 1300;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// CURRENT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();

// SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(
    ".section-heading, .about-grid, .skill-card, .project-card, .contact-box"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => observer.observe(element));
