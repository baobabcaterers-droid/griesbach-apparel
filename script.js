// Mobile nav
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// Back to top
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (!toTop) return;
  if (window.scrollY > 700) toTop.classList.add('show');
  else toTop.classList.remove('show');
});
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Order modal
const modal = document.getElementById('orderModal');
const closeModalBtn = document.getElementById('closeModalBtn');

const modalTitle = document.getElementById('modalTitle');
const modalPriceLine = document.getElementById('modalPriceLine');
const totalLine = document.getElementById('totalLine');

const studentName = document.getElementById('studentName');
const sizeSelect = document.getElementById('sizeSelect');
const qtyInput = document.getElementById('qty');

const confirmBtn = document.getElementById('confirmBtn');
const copyBtn = document.getElementById('copyBtn');

let currentItem = { name: '', price: 0 };

function openModal(itemName, itemPrice) {
  currentItem = { name: itemName, price: Number(itemPrice) || 0 };

  modalTitle.textContent = `Pre-Order: ${currentItem.name}`;
  modalPriceLine.textContent = `Price: $${currentItem.price} CAD`;

  studentName.value = '';
  sizeSelect.value = '';
  qtyInput.value = 1;

  updateTotal();
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
}

function updateTotal() {
  const qty = Math.max(1, Number(qtyInput.value || 1));
  const total = qty * currentItem.price;
  totalLine.textContent = `$${total} CAD`;
}

function orderSummaryText() {
  const qty = Math.max(1, Number(qtyInput.value || 1));
  const name = studentName.value.trim() || '(name not entered)';
  const size = sizeSelect.value || '(size not selected)';
  const total = qty * currentItem.price;

  return [
    'Griesbach Apparel Pre-Order (DEMO)',
    `Item: ${currentItem.name}`,
    `Price: $${currentItem.price} CAD`,
    `Qty: ${qty}`,
    `Size: ${size}`,
    `Student/Homeroom: ${name}`,
    `Total: $${total} CAD`,
  ].join('\n');
}

// Connect product buttons
document.querySelectorAll('.product').forEach(card => {
  const btn = card.querySelector('.order-btn');
  btn?.addEventListener('click', () => {
    openModal(card.dataset.name, card.dataset.price);
  });
});

// Live total updates
qtyInput?.addEventListener('input', updateTotal);
sizeSelect?.addEventListener('change', updateTotal);

// Close modal actions
closeModalBtn?.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
});

// Confirm (demo)
confirmBtn?.addEventListener('click', () => {
  const name = studentName.value.trim();
  if (!name) return alert('Please enter your student name / homeroom.');
  if (!sizeSelect.value) return alert('Please select a size.');

  alert('Pre-order recorded (demo)!\n\n' + orderSummaryText());
  closeModal();
});

// Copy summary
copyBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(orderSummaryText());
    alert('Copied order summary!');
  } catch {
    alert('Copy failed in this browser. You can screenshot the confirmation instead.');
  }
});
