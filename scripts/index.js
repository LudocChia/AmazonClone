import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';

const cartQuantity = document.querySelector('.header__cart-quantity');
cartQuantity.innerHTML = cart.length;

const productListCardElement = document.querySelector('.product-list');
let productListCardElementHtml = '';
products.forEach((product) => {
    productListCardElementHtml +=
        `<div class="product-list__card">
            <div class="product-list__image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h2 class="product-list__name">
                ${product.name}
            </h2>
            <div class="product-list__rating">
                <img src="images/ratings/rating-${product.rating.stars * 10}.png" alt="${product.rating.stars}">
                <span class="product-list__rating-count">(${product.rating.count})</span>
            </div>
            <p class="product-list__price">
                $${(product.priceCents / 100).toFixed(2)}
            </p>
            <div class="product-list__quantity">
                <select class="product-list__quantity-selector">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div class="product-list__message product-list__message--hidden" >
            <span class="product-list__message-text"><i
                    class="bi bi-check2-circle"></i>Added</span>
            </div>
            <div class="product-list__control">
                <button data-product-id="${product.id}" class="button button--add-to-cart">Add to Cart</button>
            </div>
        </div>`
});

productListCardElement.innerHTML = productListCardElementHtml;
const buttonAddToCart = document.querySelectorAll('.button--add-to-cart');


let timeoutId;

buttonAddToCart.forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const productCard = button.closest('.product-list__card');
        const selectElement = productCard.querySelector('.product-list__quantity-selector');
        const quantity = parseInt(selectElement.value);
        const messageElement = productCard.querySelector('.product-list__message');

        addToCart(productId, quantity, false);

        messageElement.classList.remove('product-list__message--hidden');
        cartQuantity.innerHTML = cart.length;

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            messageElement.classList.add('product-list__message--hidden');
        }, (5000));

    })
})