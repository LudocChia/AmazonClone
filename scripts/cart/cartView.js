import { formatAsMYR, getCentPart, getRinggitPart } from "../utils/currency.js";

export function renderCartItems(cart, products) {
    let html = '';
    cart.forEach(cartItem => {
        const product = products.find(productItem =>
            productItem.id === cartItem.productId
        )

        if (!product) return;

        const checkboxStatus = cartItem.checked ? 'checked' : '';
        const decreaseButtonClass = cartItem.quantity === 1 ? 'cart-item__quantity-decrease--hidden' : '';
        const deleteButtonClass = cartItem.quantity > 1 ? 'cart-item__delete--hidden' : '';

        html +=
            `
                <div class="cart-item" data-product-id="${cartItem.productId}">
                    <input class="cart-item__checkbox" type="checkbox" ${checkboxStatus}>
                    <div class="cart-item__image">
                        <img src="../${product.image}">
                    </div>
                    <div class="cart-item__details">
                        <h2 class="cart-item__title">${product.name}</h2>
                        <p class="cart-item__availabiltiy">In Stock</p>
                        <div class="text__shipping">
                            <span class="text__shipping text--bold">FREE Shipping</span> to
                            Malaysia when you spend over
                            <span class="text__shipping text--highlighted">$49.00</span> on
                            eligible items.
                            <span class="text__shipping-link text--bold">&amp;</span>
                            <a href="#" class="text__shipping-link">FREE International Returns<i
                                    class="bi bi-chevron-down"></i></a>
                        </div>
                        <div class="cart-item__actions">
                            <div class="cart-item__quantity-control">
                                <button class="cart-item__quantity-decrease ${decreaseButtonClass}">
                                    <i class="bi bi-dash-lg"></i>
                                </button>
                                <button class="cart-item__delete ${deleteButtonClass}">
                                    <i class="bi bi-trash3"></i>
                                </button>
                                <span class="cart-item__quantity-value">${cartItem.quantity}</span>
                                <button class="cart-item__quantity-increase">
                                    <i class="bi bi-plus-lg"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="cart-item__price">
                        <span class="cart-item__price-symbol">$</span><span class="cart-item__price-whote">${getRinggitPart(product.priceCents)}</span><span
                            class="cart-item__price-fraction">${getCentPart(product.priceCents)}</span>
                    </div>
                </div>
            `
    });

    return html;
}

export function updateTotalsDisplay({ totalCartQuantity, totalCartPriceCents }) {

    const cartItemstotalCartQuantityElement = document.querySelector('.cart-list__total-quantity');
    const cartItemsTotalPriceElement = document.querySelector('.cart-list__total-price');
    const cartListTotalLabelElement = document.querySelector('.cart-list__total-label');
    const checkoutSummaryPriceElement = document.querySelector('.checkout-summary__price');
    const checkoutSummaryLabelElement = document.querySelector('.checkout-summary__label');
    const checkoutSummaryQuantityElement = document.querySelector('.checkout-summary__quantity');

    checkoutSummaryLabelElement.innerText = 'Subtotal (';
    cartListTotalLabelElement.innerText = 'Subtotal (';

    if (totalCartQuantity === 1) {
        cartItemstotalCartQuantityElement.innerText = totalCartQuantity + ' item )'
        checkoutSummaryQuantityElement.innerText = totalCartQuantity + ' item )';
    } else if (totalCartQuantity === 0) {
        cartItemstotalCartQuantityElement.innerText = '';
        checkoutSummaryQuantityElement.innerText = '';
    } else {
        cartItemstotalCartQuantityElement.innerText = totalCartQuantity + ' items )'
        checkoutSummaryQuantityElement.innerText = totalCartQuantity + ' items )';
    }

    if (totalCartQuantity === 0) {
        checkoutSummaryLabelElement.innerText = 'No Items Selected';
        cartListTotalLabelElement.innerText = 'No Items Selected';
        cartItemsTotalPriceElement.innerText = '';
        checkoutSummaryPriceElement.innerText = '';
    } else {
        console.log(cartItemsTotalPriceElement.innerText = formatAsMYR(totalCartPriceCents));
        checkoutSummaryPriceElement.innerText = formatAsMYR(totalCartPriceCents);
    }
}

export function cartQuantityDisplay(cartLength) {
    const cartQuantity = document.querySelector('.header__cart-quantity');
    cartQuantity.innerHTML = cartLength;
}