import { products } from '../data/productsModel.js';
import { formatAsMYR } from '../utils/currency.js';

export function renderProductsList() {
    let html = '';

    products.forEach((product) => {
        html +=
            `<div class="product-list__card">
                <div class="product-list__image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <h2 class="product-list__name">
                    ${product.name}
                </h2>
                <div class="product-list__rating">
                    <img src="${product.getStarsUrl()}"
                    <span class="product-list__rating-count">(${product.rating.count})</span>
                </div>
                <p class="product-list__price">
                    ${product.getPrice()}
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

    return html;
}

export function cartQuantityDisplay(cartLength) {
    const cartQuantity = document.querySelector('.header__cart-quantity');
    cartQuantity.innerHTML = cartLength;
}