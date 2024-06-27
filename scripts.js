document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartTableBody = document.querySelector('#cart-table tbody');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const searchInput = document.getElementById('search-input');
    const productContainer = document.getElementById('product-container');
    const productCards = document.querySelectorAll('.product-card');
    const checkoutButton = document.getElementById('checkout-btn');

    function updateCart() {
        cartTableBody.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="cart-quantity">
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="remove-from-cart" data-index="${index}">Eliminar</button>
                </td>
            `;
            
            cartTableBody.appendChild(row);
            total += item.price * item.quantity;
        });
        
        cartTotalPrice.textContent = total.toFixed(2);
    }
    
    function addToCart(name, price) {
        const existingItemIndex = cart.findIndex(item => item.name === name);
        
        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        
        updateCart();
    }
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            addToCart(name, price);
        });
    });
    
    cartTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            cart.splice(index, 1);
            updateCart();
        }
    });
    
    cartTableBody.addEventListener('change', (e) => {
        if (e.target.classList.contains('cart-quantity')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            const newQuantity = parseInt(e.target.value);
            cart[index].quantity = newQuantity;
            updateCart();
        }
    });

    function generateWhatsAppMessage() {
        const productNames = cart.map(item => `${item.quantity} x ${item.name}`).join(', ');
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
        return `Hola, estas por comprar: ${productNames}. Con un total de: $${total}. Para continuar, realiza una transferencia.`;
    }

    checkoutButton.addEventListener('click', () => {
        const message = generateWhatsAppMessage();
        const phoneNumber = "5493516748115";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });

    function filterProducts() {
        const searchValue = searchInput.value.toLowerCase();
        productCards.forEach(card => {
            const productName = card.getAttribute('data-name').toLowerCase();
            if (productName.includes(searchValue)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('keyup', filterProducts);
});
