const slides = [
    { src: "JBMS%201.jpeg", alt: "School students learning in a bright classroom environment" },
    { src: "JBMS%202.jpeg", alt: "School grounds and joyful learning spaces" },
    { src: "JBMS%203.jpeg", alt: "A vibrant school scene with students and teachers" },
    { src: "JBMS%204.jpeg", alt: "School campus and learning activities" }
];

const slideshowImage = document.querySelector(".hero-image");
const slideStatus = document.querySelector("#slide-status");
const previousButton = document.querySelector("#previous-slide");
const nextButton = document.querySelector("#next-slide");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const contactForm = document.querySelector("#contact-form");

let currentSlide = 0;

function showSlide(index) {
    if (!slideshowImage || !slideStatus) {
        return;
    }

    currentSlide = (index + slides.length) % slides.length;
    slideshowImage.src = slides[currentSlide].src;
    slideshowImage.alt = slides[currentSlide].alt;
    slideStatus.textContent = `${currentSlide + 1} of ${slides.length}`;
}

if (previousButton && nextButton) {
    previousButton.addEventListener("click", () => showSlide(currentSlide - 1));
    nextButton.addEventListener("click", () => showSlide(currentSlide + 1));
    window.setInterval(() => showSlide(currentSlide + 1), 3000);
}

if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const subject = formData.get("subject");
        const message = formData.get("message");

        const mailtoLink = `mailto:admin@jbm.edu.gh?subject=${encodeURIComponent(subject.toString())}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        window.location.href = mailtoLink;
        contactForm.reset();
    });
}

