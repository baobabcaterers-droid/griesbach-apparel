const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

const modal = document.getElementById("orderModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const totalPrice = document.getElementById("totalPrice");

const nameInput = document.getElementById("nameInput");
const sizeInput = document.getElementById("sizeInput");
const qtyInput = document.getElementById("qtyInput");
const confirmOrder = document.getElementById("confirmOrder");

let currentItem = "";
let currentPrice = 0;

function openOrder(name, price) {
  currentItem = name;
  currentPrice = Number(price);

  modalTitle.textContent = `Pre-Order: ${currentItem}`;
  modalPrice.textContent = `Price: $${currentPrice} CAD`;

  nameInput.value = "";
  sizeInput.value = "";
  qtyInput.value = "1";

  updateTotal();
  modal.setAttribute("aria-hidden", "false");
}

function closeOrder() {
  modal.setAttribute("aria-hidden", "true");
}

function updateTotal() {
  const qty = Math.max(1, Number(qtyInput.value || 1));
  totalPrice.textContent = `$${qty * currentPrice} CAD`;
}

document.querySelectorAll(".product-card").forEach(card => {
  const button = card.querySelector(".order-btn");

  button.addEventListener("click", () => {
    openOrder(card.dataset.name, card.dataset.price);
  });
});

qtyInput.addEventListener("input", updateTotal);

closeModal.addEventListener("click", closeOrder);

modal.addEventListener("click", event => {
  if (event.target === modal) {
    closeOrder();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeOrder();
  }
});

confirmOrder.addEventListener("click", () => {
  const studentName = nameInput.value.trim();
  const size = sizeInput.value;
  const qty = Math.max(1, Number(qtyInput.value || 1));
  const total = qty * currentPrice;

  if (!studentName) {
    alert("Enter your name / homeroom.");
    return;
  }

  if (!size) {
    alert("Choose a size.");
    return;
  }

  alert(
    `ACES Pre-Order\n\n` +
    `Name: ${studentName}\n` +
    `Item: ${currentItem}\n` +
    `Size: ${size}\n` +
    `Quantity: ${qty}\n` +
    `Total: $${total} CAD\n\n` +
    `This is for class presentation only.`
  );

  closeOrder();
});

document.querySelectorAll(".faq-question").forEach(question => {
  question.addEventListener("click", () => {
    question.classList.toggle("faq-item-open");
  });
});

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(element => {
  observer.observe(element);
});

const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 600) {
    toTop.classList.add("show");
  } else {
    toTop.classList.remove("show");
  }
});

toTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
