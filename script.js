// carosal
document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".carousel-track");

    const slides = document.querySelectorAll(".hero-img");

    const prevBtn = document.querySelector(".left");

    const nextBtn = document.querySelector(".right");

    const thumbs = document.querySelectorAll(".thumb");

    let currentIndex = 0;

    function updateCarousel() {

        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;

        thumbs.forEach((thumb, index) => {

            thumb.classList.toggle(
                "active",
                index === currentIndex
            );
        });
    }

    nextBtn.addEventListener("click", () => {

        currentIndex++;

        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }

        updateCarousel();
    });

    prevBtn.addEventListener("click", () => {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }

        updateCarousel();
    });

    thumbs.forEach((thumb, index) => {

        thumb.addEventListener("click", () => {

            currentIndex = index;

            updateCarousel();
        });
    });

});

// Accordian Code
document.addEventListener("DOMContentLoaded", () => {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {

        const button = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".faq-icon");

        /* Open default active accordion */
        if (item.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        }

        button.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            faqItems.forEach((faq) => {

                faq.classList.remove("active");

                const faqAnswer = faq.querySelector(".faq-answer");
                const faqIcon = faq.querySelector(".faq-icon");

                faqAnswer.style.maxHeight = "0px";
                faqIcon.src = "images/accordian-close.svg";
            });

            if (!isActive) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

                icon.src = "images/accordian-open.svg";
            }
        });
    });
});

// Card scroll
const slider = document.querySelector(".applications-slider");
const nextBtn = document.querySelector(".industry-next-btn");
const prevBtn = document.querySelector(".industry-prev-btn");

const cards = document.querySelectorAll(".application-card");

let currentIndex = 0;

function getCardWidth() {
    const card = cards[0];
    const gap = 28;

    return card.offsetWidth + gap;
}

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * getCardWidth()
        }px)`;
}

nextBtn.addEventListener("click", () => {
    const maxIndex = cards.length - 1;

    if (currentIndex < maxIndex) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlider();
});

prevBtn.addEventListener("click", () => {
    const maxIndex = cards.length - 1;
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = maxIndex;
    }
    updateSlider();
});

window.addEventListener("resize", updateSlider);

// arrow scroll session
const processTabs = document.querySelectorAll(".process-tab");
processTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        processTabs.forEach((item) =>
            item.classList.remove("active")
        );
        tab.classList.add("active");
    });
});


// auto scroll testimonials
window.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("sliderTrack");
    if (!track) return;

    // Clone all cards for seamless infinite loop
    const originalCards = [...track.children];
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    const cards = document.querySelectorAll(".testimonial-card");
    let currentIndex = 0;
    function autoSlide() {
        const cardWidth = cards[0].offsetWidth + 24;
        currentIndex++;
        track.style.transition = "transform 0.7s ease-in-out";
        track.style.transform =
            `translateX(-${currentIndex * cardWidth}px)`;
        // When reached cloned section
        if (currentIndex >= originalCards.length) {
            setTimeout(() => {
                track.style.transition = "none";
                currentIndex = 0;
                track.style.transform = `translateX(0px)`;
            }, 700);
        }
    }

    setInterval(autoSlide, 2000);
});

// download button popup
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("downloadModal");
    const closeModalBtn = document.getElementById("closeModal");
    const form = document.getElementById("brochureForm");
    const successAlert = document.getElementById("successAlert");
    const downloadButtons = document.querySelectorAll(".download-btn");

    // Form fields
    const emailInput = document.getElementById("email");
    const contactInput = document.getElementById("contact");
    const submitBtn = form.querySelector(".submit-btn");

    /* =========================
       BUTTON ENABLE / DISABLE
    ========================= */
    function validateForm() {
        const emailValue = emailInput.value.trim();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(emailValue);

        if (isValidEmail) {
            submitBtn.disabled = false;
            submitBtn.classList.add("active");

            // Enable button styles
            submitBtn.style.backgroundColor = "#2B3990";
            submitBtn.style.color = "#ffffff";
            submitBtn.style.cursor = "pointer";
            submitBtn.style.opacity = "1";
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove("active");

            // Disabled button styles
            submitBtn.style.backgroundColor = "#DCE3F0";
            submitBtn.style.color = "#ffffff";
            submitBtn.style.cursor = "not-allowed";
            submitBtn.style.opacity = "0.8";
        }
    }

    /* =========================
       OPEN MODAL
    ========================= */
    downloadButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            // Reset form
            form.reset();

            // Hide alert
            successAlert.classList.remove("show");

            // Disable button initially
            validateForm();

            // Show modal
            modal.classList.add("show");

            // Focus email field
            emailInput.focus();
        });
    });

    /* =========================
       CLOSE MODAL
    ========================= */
    closeModalBtn.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    // Close on outside click
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });

    /* =========================
       EMAIL VALIDATION
    ========================= */
    emailInput.addEventListener("input", validateForm);

    /* =========================
       CONTACT INPUT
       ONLY NUMBERS ALLOWED
    ========================= */
    contactInput.addEventListener("input", function () {
        // Keep only digits
        let numbersOnly = this.value.replace(/\D/g, "");

        // Limit to 10 digits (change if needed)
        numbersOnly = numbersOnly.slice(0, 10);

        // Add +91 prefix if user entered digits
        this.value = numbersOnly ? `+91-${numbersOnly}` : "";

        // Keep button validation updated
        validateForm();
    });

    /* =========================
       FORM SUBMIT
    ========================= */
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Extra safety
        if (emailInput.value.trim() === "") return;

        // Show success message
        successAlert.classList.add("show");

        // Clear form fields
        form.reset();

        // Disable button again
        validateForm();

        // Close modal after 3 seconds
        setTimeout(() => {
            successAlert.classList.remove("show");
            modal.classList.remove("show");
        }, 1000);
    });

    // Initial state
    validateForm();
});