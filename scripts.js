document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartTableBody = document.querySelector('#cart-table tbody');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const searchInput = document.getElementById('search-input');
    const productContainer = document.getElementById('product-container');
    const productCards = document.querySelectorAll('.product-card');
    
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
    
    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Gracias por su compra!');
        cart.length = 0;
        updateCart();
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
