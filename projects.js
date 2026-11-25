
// SECTION 07: PORTFOLIO SCROLL, FILTER & MODAL

const workTrack = document.getElementById("workTrack");
const workPrevBtn = document.getElementById("workPrevBtn");
const workNextBtn = document.getElementById("workNextBtn");
const workFilterBtns = document.querySelectorAll(".work-filter-btn");
const workCards = document.querySelectorAll(".work-card");

// Modal elements
const workModal = document.getElementById("workModal");
const workModalBackdrop = document.getElementById("workModalBackdrop");
const workModalClose = document.getElementById("workModalClose");
const modalProjectImg = document.getElementById("modalProjectImg");
const modalProjectCategory = document.getElementById("modalProjectCategory");
const modalProjectYear = document.getElementById("modalProjectYear");
const modalProjectTitle = document.getElementById("modalProjectTitle");
const modalProjectClient = document.getElementById("modalProjectClient");
const modalProjectDesc = document.getElementById("modalProjectDesc");
const modalProjectDeliverables = document.getElementById("modalProjectDeliverables");
const modalProjectImpact = document.getElementById("modalProjectImpact");
const modalInquiryBtn = document.getElementById("modalInquiryBtn");

function getScrollStep() {
  if (!workTrack) return 300;
  const visibleCard = workTrack.querySelector(".work-card:not(.is-hidden)");
  if (!visibleCard) return 300;
  const gap = parseFloat(getComputedStyle(workTrack).gap) || 20;
  return visibleCard.getBoundingClientRect().width + gap;
}

function updateWorkNavState() {
  if (!workTrack || !workPrevBtn || !workNextBtn) return;
  const maxScroll = workTrack.scrollWidth - workTrack.clientWidth - 2;
  workPrevBtn.disabled = workTrack.scrollLeft <= 2;
  workNextBtn.disabled = maxScroll <= 2 || workTrack.scrollLeft >= maxScroll;
}

if (workPrevBtn && workTrack) {
  workPrevBtn.addEventListener("click", () => {
    workTrack.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
  });
}

if (workNextBtn && workTrack) {
  workNextBtn.addEventListener("click", () => {
    workTrack.scrollBy({ left: getScrollStep(), behavior: "smooth" });
  });
}

if (workTrack) {
  workTrack.addEventListener("scroll", updateWorkNavState, { passive: true });
  window.addEventListener("resize", updateWorkNavState);
}

// Category filter logic
workFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedCategory = btn.getAttribute("data-filter");

    workFilterBtns.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");

    workCards.forEach((card) => {
      const cardCat = card.getAttribute("data-category");
      const matches = selectedCategory === "all" || cardCat === selectedCategory;
      card.classList.toggle("is-hidden", !matches);
    });

    if (workTrack) {
      workTrack.scrollTo({ left: 0, behavior: "smooth" });
    }
    setTimeout(updateWorkNavState, 120);
  });
});

// Open Project Detail Modal
function openProjectModal(card) {
  if (!workModal || !card) return;

  const imgEl = card.querySelector(".work-thumb-wrap img");
  modalProjectImg.src = imgEl ? imgEl.src : "";
  modalProjectImg.alt = imgEl ? imgEl.alt : card.dataset.title || "";
  modalProjectCategory.textContent = card.dataset.category || "";
  modalProjectYear.textContent = card.dataset.year || "2026";
  modalProjectTitle.textContent = card.dataset.title || "";
  modalProjectClient.textContent = card.dataset.client || "";
  modalProjectDesc.textContent = card.dataset.fullDesc || "";
  modalProjectDeliverables.textContent = card.dataset.deliverables || "";
  modalProjectImpact.textContent = card.dataset.impact || "";

  workModal.removeAttribute("hidden");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  if (!workModal) return;
  workModal.setAttribute("hidden", "");
  document.body.style.overflow = "";
}

document.querySelectorAll(".work-view-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".work-card");
    openProjectModal(card);
  });
});

if (workModalClose) {
  workModalClose.addEventListener("click", closeProjectModal);
}
if (workModalBackdrop) {
  workModalBackdrop.addEventListener("click", closeProjectModal);
}
if (modalInquiryBtn) {
  modalInquiryBtn.addEventListener("click", closeProjectModal);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && workModal && !workModal.hasAttribute("hidden")) {
    closeProjectModal();
  }
});

// Initialize nav buttons
updateWorkNavState();
