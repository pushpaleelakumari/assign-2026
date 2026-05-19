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
                faqIcon.src = "./images/accordian-close.svg";
            });

            if (!isActive) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

                icon.src = "./images/accordian-open.svg";
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