import { cart } from '../data/cartModel.js';
import { cartQuantityDisplay } from './homeView.js';

cartQuantityDisplay(cart.cartItems.length);

const buttonAddToCart = document.querySelectorAll('.button--add-to-cart');
let timeoutId;

buttonAddToCart.forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const productCard = button.closest('.product-list__card');
        const selectElement = productCard.querySelector('.product-list__quantity-selector');
        const quantity = parseInt(selectElement.value);
        const messageElement = productCard.querySelector('.product-list__message');

        cart.addToCart(productId, quantity, false);
        cartQuantityDisplay(cart.cartItems.length);

        messageElement.classList.remove('product-list__message--hidden');

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            messageElement.classList.add('product-list__message--hidden');
        }, (5000));
    })
})