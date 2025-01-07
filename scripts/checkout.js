import { cart, removeFromCart, updateCartItemQuantity, toggleCartItemCheckStatus, selectAllCartItems, unselectAllCartItems } from '../data/cart.js';
import { products } from '../data/products.js';
import formatCurrency from './utils/currency.js';

const cartQuantity = document.querySelector('.header__cart-quantity');
cartQuantity.innerHTML = cart.length;


const cartItemsTotalQuantityElement = document.querySelector('.cart-list__total-quantity');
const cartItemsTotalPriceElement = document.querySelector('.cart-list__total-price');
const cartListTotalLabelElement = document.querySelector('.cart-list__total-label');
const checkoutSummaryPriceElement = document.querySelector('.checkout-summary__price');
const checkoutSummaryLabelElement = document.querySelector('.checkout-summary__label');
const checkoutSummaryQuantityElement = document.querySelector('.checkout-summary__quantity');

const selectAllItemsButton = document.querySelector('.cart-list__select-all');

const cartItemsElement = document.querySelector('.cart-items');
let cartItemsElementHtml = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId
    let matchingProductItem;

    products.forEach((productItem) => {
        if (productItem.id === productId) {
            matchingProductItem = productItem;
        }
    })

    if (matchingProductItem) {
        let checkboxStatus = '';
        let decreaseButtonClass = '';
        let deleteButtonClass = '';
        if (cartItem.quantity === 1) {
            decreaseButtonClass = 'cart-item__quantity-decrease--hidden'
        } else {
            deleteButtonClass = 'cart-item__delete--hidden';
        }

        cartItem.checked ? checkboxStatus = 'checked' : checkboxStatus = '';
        cartItemsElementHtml += `
        <div class="cart-item" data-product-id="${cartItem.productId}">
        <input class="cart-item__checkbox" type="checkbox" ${checkboxStatus}>
            <div class="cart-item__image">
                <img src="../${matchingProductItem.image}">
            </div>
            <div class="cart-item__details">
                <h2 class="cart-item__title">${matchingProductItem.name}</h2>
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
                <span class="cart-item__price-symbol">$</span><span class="cart-item__price-whote">${Math.floor(matchingProductItem.priceCents / 100)}</span><span
                    class="cart-item__price-fraction">${matchingProductItem.priceCents % 100}</span>
            </div>
        </div>
        `
    }
});

cartItemsElement.innerHTML = cartItemsElementHtml;

const buttonDecreaseCartItemQuantity = document.querySelectorAll('.cart-item__quantity-decrease');
const buttonIncreaseCartItemQuantity = document.querySelectorAll('.cart-item__quantity-increase');
const buttonDeleteCartItem = document.querySelectorAll('.cart-item__delete');

buttonDeleteCartItem.forEach((button) => {
    button.addEventListener('click', () => {
        const cartItemElement = button.closest('.cart-item');
        const cartItemQuantityElement = cartItemElement.querySelector('.cart-item__quantity-value');
        const productId = cartItemElement.dataset.productId;
        removeFromCart(productId);
        cartItemElement.remove();
        cartItemQuantityElement.innerText = cartItem.quantity;
    })
})

buttonIncreaseCartItemQuantity.forEach((button) => {
    button.addEventListener('click', () => {
        const cartItemElement = button.closest('.cart-item');
        const buttonDeleteCartItem = cartItemElement.querySelector('.cart-item__delete');
        const buttonDecreaseCartItem = cartItemElement.querySelector('.cart-item__quantity-decrease');
        const cartItemQuantityElement = cartItemElement.querySelector('.cart-item__quantity-value');
        const productId = cartItemElement.dataset.productId;
        const cartItemQuantity = updateCartItemQuantity(productId, 'increase', 1);
        cartItemQuantityElement.innerText = cartItemQuantity;

        if (cartItemQuantity > 1) {
            buttonDecreaseCartItem.classList.remove('cart-item__quantity-decrease--hidden');
            buttonDeleteCartItem.classList.add('cart-item__delete--hidden');
        } else {
            buttonDecreaseCartItem.classList.add('cart-item__quantity-decrease--hidden');
            buttonDeleteCartItem.classList.remove('cart-item__delete--hidden');
        }
    })
})

buttonDecreaseCartItemQuantity.forEach((button) => {
    button.addEventListener('click', () => {
        const cartItemElement = button.closest('.cart-item');
        const buttonDeleteCartItem = cartItemElement.querySelector('.cart-item__delete');
        const buttonDecreaseCartItem = cartItemElement.querySelector('.cart-item__quantity-decrease');
        const cartItemQuantityElement = cartItemElement.querySelector('.cart-item__quantity-value');
        const productId = cartItemElement.dataset.productId;
        const cartItemQuantity = updateCartItemQuantity(productId, 'decrease', 1);
        cartItemQuantityElement.innerText = cartItemQuantity;

        if (cartItemQuantity > 1) {
            buttonDecreaseCartItem.classList.remove('cart-item__quantity-decrease--hidden');
            buttonDeleteCartItem.classList.add('cart-item__delete--hidden');
        } else {
            buttonDecreaseCartItem.classList.add('cart-item__quantity-decrease--hidden');
            buttonDeleteCartItem.classList.remove('cart-item__delete--hidden');
        }
    })
    updateCartItemsTotal()
})

const cartItemCheckboxes = document.querySelectorAll('.cart-item__checkbox');

cartItemCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        const cartItemElement = checkbox.closest('.cart-item');
        const productId = cartItemElement.dataset.productId;
        toggleCartItemCheckStatus(productId)
        updateCartItemsTotal();
    })
})

function updateCartItemsTotal() {
    let checkedCartItemsQuantities = 0;
    let checkedCartItemsPriceCents = 0;

    cart.forEach((cartItem) => {
        if (cartItem.checked) {
            checkedCartItemsQuantities += cartItem.quantity;
            products.forEach((product) => {
                if (product.id === cartItem.productId) {
                    checkedCartItemsPriceCents += product.priceCents * cartItem.quantity;
                }
            })
        }
    })

    checkoutSummaryLabelElement.innerText = 'Subtotal (';
    cartListTotalLabelElement.innerText = 'Subtotal (';

    if (checkedCartItemsQuantities === 1) {
        cartItemsTotalQuantityElement.innerText = checkedCartItemsQuantities + ' item )'
        checkoutSummaryQuantityElement.innerText = checkedCartItemsQuantities + ' item )';
    } else if (checkedCartItemsQuantities === 0) {
        cartItemsTotalQuantityElement.innerText = '';
        checkoutSummaryQuantityElement.innerText = '';
    } else {
        cartItemsTotalQuantityElement.innerText = checkedCartItemsQuantities + ' items )'
        checkoutSummaryQuantityElement.innerText = checkedCartItemsQuantities + ' items )';
    }

    if (checkedCartItemsQuantities === 0) {
        checkoutSummaryLabelElement.innerText = 'No Items Selected';
        cartListTotalLabelElement.innerText = 'No Items Selected';
        cartItemsTotalPriceElement.innerText = '';
        checkoutSummaryPriceElement.innerText = '';
    } else {
        cartItemsTotalPriceElement.innerText = formatCurrency(checkedCartItemsPriceCents);
        checkoutSummaryPriceElement.innerText = formatCurrency(checkedCartItemsPriceCents);
    }
}

let allChecked = cart.every(cartItem => cartItem.checked)
allChecked ? selectAllItemsButton.innerText = 'Deselecte all items' : selectAllItemsButton.innerText = 'Select all items'

selectAllItemsButton.addEventListener('click', () => {
    if (allChecked) {
        allChecked = false;
        selectAllItemsButton.innerText = 'Select all items';
        cartItemCheckboxes.forEach((checkbox) => {
            checkbox.checked = false;
        })
        unselectAllCartItems()
    } else {
        allChecked = true;
        selectAllItemsButton.innerText = 'Deselecte all items';
        cartItemCheckboxes.forEach((checkbox) => {
            checkbox.checked = true;
        })
        selectAllCartItems()
    }
    updateCartItemsTotal();
})
updateCartItemsTotal();