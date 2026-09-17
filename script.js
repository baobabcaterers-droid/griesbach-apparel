// Grab elements from HTML
const modal = document.getElementById('orderModal');
const titleEl = document.getElementById('modalItemTitle');
const priceEl = document.getElementById('modalItemPrice');

// Function to open the pre-order modal
function openOrder(itemName, itemPrice) {
    titleEl.innerText = itemName;
    priceEl.innerText = `$${itemPrice}.00 CAD`;
    modal.style.display = 'flex';
}

// Function to close the modal
function closeOrder() {
    modal.style.display = 'none';
}

// Function when student clicks "Confirm Pre-Order"
function submitOrder() {
    const student = document.getElementById('custName').value;
    const size = document.getElementById('custSize').value;
    
    if (!student) {
        alert('Please enter your name and homeroom!');
        return;
    }

    alert(`Thanks ${student}! Your pre-order for the ${titleEl.innerText} (${size}) has been recorded!`);
    closeOrder();
    
    // Reset the input field
    document.getElementById('custName').value = '';
}
