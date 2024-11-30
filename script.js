document.getElementById('addButton').addEventListener('click', () => {
    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const category = document.getElementById('category').value;
    const unitPrice = parseFloat(document.getElementById('unitPrice').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const dateAdded = document.getElementById('dateAdded').value;
    const expiryDate = document.getElementById('expiryDate').value;

    // Validate required fields
    if (!productId || !productName || isNaN(unitPrice) || isNaN(quantity) || !dateAdded || !expiryDate) {
        alert('Please fill out all fields.');
        return;
    }

    // Calculate Total Cost
    const totalCost = unitPrice * quantity;

    // Determine Status
    const status = getStatus(expiryDate);

    // Add Row to Table
    const table = document.getElementById('productTable');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${productId}</td>
        <td>${productName}</td>
        <td>${productDescription}</td>
        <td>${category}</td>
        <td>${unitPrice.toFixed(2)}</td>
        <td>${quantity}</td>
        <td>${totalCost.toFixed(2)}</td>
        <td>${dateAdded}</td>
        <td>${expiryDate}</td>
        <td>${status}</td>
    `;

    table.appendChild(row);

    // Clear Input Fields
    clearInputs();
});

// Clear Input Fields Function
function clearInputs() {
    document.getElementById('productId').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('category').value = '';
    document.getElementById('unitPrice').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('dateAdded').value = '';
    document.getElementById('expiryDate').value = '';
}

// Determine Status Based on Expiry Date
function getStatus(expiryDate) {
    const now = new Date();
    const expiry = new Date(expiryDate);

    if (expiry < now) {
        return 'Expired';
    } else if ((expiry - now) / (1000 * 60 * 60 * 24) <= 7) {
        return 'Expiring Soon';
    } else {
        return 'Valid';
    }
}