// --------------- Scroll Animation for Sections -----------------
const sections = document.querySelectorAll("section");

function revealSections() {
  const triggerBottom = window.innerHeight * 0.8;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add("show");
    } else {
      section.classList.remove("show");
    }
  });
}

window.addEventListener("scroll", revealSections);
revealSections(); // Run on page load

// ------------ Project Cards Animation ---------------
const projectCards = document.querySelectorAll(".projects-box");

projectCards.forEach((card, index) => {
  // Staggered appearance delay
  card.style.transitionDelay = '${index * 0.2}s';
});

// Hover effect
projectCards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.03)";
    card.style.boxShadow = "0 8px 25px rgba(0,0,0,0.5)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
    card.style.boxShadow = "0 0 15px rgba(0,0,0,0.3)";
  });
});

// ------------------- Skills Progress Bar Animation ----------
const skillSection = document.querySelector(".skills");
const progressBars = document.querySelectorAll(".skills .bar span");

function fillProgressBars() {
  if (skillSection.getBoundingClientRect().top < window.innerHeight * 0.8) {
    progressBars.forEach(bar => {
      let percentage = bar.parentElement.previousElementSibling.querySelector("span").innerText;
      bar.style.width = percentage;
    });
    window.removeEventListener("scroll", fillProgressBars); // Run only once
  }
}

window.addEventListener("scroll", fillProgressBars);