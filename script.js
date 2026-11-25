
// SECTION 01: NAVBAR INTERACTIVITY

const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Toggle mobile/tablet drawer
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close drawer when a nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");

      navMenu.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close drawer when clicking outside the navbar
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Add elevation shadow on scroll
window.addEventListener("scroll", () => {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  }
});



// SECTION 03: ABOUT US SCROLL REVEAL & STORY MODAL

const aboutSection = document.getElementById("about");

if (aboutSection) {
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutSection.classList.add("is-visible");
          aboutObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  aboutObserver.observe(aboutSection);
}

const discoverStoryBtn = document.getElementById("discoverStoryBtn");
const storyModal = document.getElementById("storyModal");
const storyModalBackdrop = document.getElementById("storyModalBackdrop");
const closeStoryModalBtn = document.getElementById("closeStoryModalBtn");
const storyExploreServicesBtn = document.getElementById("storyExploreServicesBtn");

function openStoryModal() {
  if (!storyModal) return;
  storyModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeStoryModal() {
  if (!storyModal) return;
  storyModal.hidden = true;
  document.body.style.overflow = "";
}

discoverStoryBtn?.addEventListener("click", openStoryModal);
closeStoryModalBtn?.addEventListener("click", closeStoryModal);
storyModalBackdrop?.addEventListener("click", closeStoryModal);
storyExploreServicesBtn?.addEventListener("click", closeStoryModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && storyModal && !storyModal.hidden) {
    closeStoryModal();
  }
});


// SECTION 04: SERVICES SCROLL REVEAL

const servicesSection = document.getElementById("services");

if (servicesSection) {
  const servicesObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          servicesSection.classList.add("is-visible");
          servicesObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  servicesObserver.observe(servicesSection);
}


const skillsSection = document.getElementById("skills");

if (skillsSection) {
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillsSection.classList.add("is-visible");
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  skillsObserver.observe(skillsSection);
}

// SECTION 06: TEAM SCROLL REVEAL

const teamSection = document.getElementById("team");

if (teamSection) {
  const teamObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          teamSection.classList.add("is-visible");
          teamObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  teamObserver.observe(teamSection);
}

// SECTION 08: WORK PROCESS TILT & SCROLL REVEAL

const processSection = document.getElementById("process");
const tiltCards = document.querySelectorAll("[data-tilt-card]");

if (processSection) {
  const processObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          processSection.classList.add("is-visible");
          processObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  processObserver.observe(processSection);
}

// Smooth cursor-tracking 3D tilt on hover
tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});


// SECTION 09: TESTIMONIALS SCROLL REVEAL

const testimonialsSection = document.getElementById("testimonials");

if (testimonialsSection) {
  const testimonialsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          testimonialsSection.classList.add("is-visible");
          testimonialsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  testimonialsObserver.observe(testimonialsSection);
}

// SECTION 10 & 11: CONTACT FORM, REVEAL & FOOTER

const contactSection = document.getElementById("contact");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const footerYear = document.getElementById("footerYear");

if (footerYear) {
  footerYear.textContent = String(new Date().getFullYear());
}

if (contactSection) {
  const contactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          contactSection.classList.add("is-visible");
          contactObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  contactObserver.observe(contactSection);
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName")?.value.trim() || "";
    const emailAddress = document.getElementById("emailAddress")?.value.trim() || "";
    const serviceRequired = document.getElementById("serviceRequired")?.value || "";
    const projectDetails = document.getElementById("projectDetails")?.value.trim() || "";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName || !emailPattern.test(emailAddress) || !serviceRequired || !projectDetails) {
      formStatus.textContent = "Please fill out all required fields with a valid email.";
      formStatus.classList.add("is-error");
      return;
    }

    formStatus.classList.remove("is-error");
    formStatus.textContent = `Thanks, ${fullName}! Your inquiry for ${serviceRequired} is ready to send.`;
    contactForm.reset();
  });
}