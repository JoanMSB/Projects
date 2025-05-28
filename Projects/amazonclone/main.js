document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountSpan = document.getElementById('cart-count');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalPriceSpan = document.getElementById('cart-total-price');
    const checkoutButton = document.getElementById('checkout-btn');

    let cart = [];

    
    function updateCartUI() {
        cartItemsDiv.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <span>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item-btn" data-product-id="${item.id}">Remove</button>
                `;
                cartItemsDiv.appendChild(itemElement);
                total += item.price * item.quantity;
            });
        }

        cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotalPriceSpan.textContent = total.toFixed(2);
    }

   
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            const productName = event.target.dataset.productName;
            const productPrice = parseFloat(event.target.dataset.productPrice);

            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }
            updateCartUI();
        });
    });

    
    cartItemsDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item-btn')) {
            const productIdToRemove = event.target.dataset.productId;
            cart = cart.filter(item => item.id !== productIdToRemove);
            updateCartUI();
        }
    });

    
    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Proceeding to checkout with a total of $' + cartTotalPriceSpan.textContent);
            cart = [];
            updateCartUI();
        } else {
            alert('Your cart is empty. Please add items before checking out.');
        }
    });

    
    updateCartUI();
});