import { cart } from '../data/cartModel.js';
import { products, loadProductsFetch } from '../data/productsModel.js';
import { renderCartItems, updateTotalsDisplay, cartQuantityDisplay } from './cartView.js';
import { addOrder } from '../data/orders.js'

async function loadPage() {
    try {
        const cartItemsElement = document.querySelector('.cart-items');
        await loadProductsFetch();
        cartItemsElement.innerHTML = renderCartItems(cart.cartItems, products);
        attachCartEventListeners();
    } catch (error) {
        console.log('Unexpected error. Please try again later.')
    }
}
loadPage();


// Update Header Cart Count
cartQuantityDisplay(cart.cartItems.length);

// Initial Render
// loadProductsFetch().then(() => {
//     const cartItemsElement = document.querySelector('.cart-items');
//     cartItemsElement.innerHTML = renderCartItems(cart.cartItems, products);
//     attachCartEventListeners();
// });

// callback
// loadProducts(() => {
//     const cartItemsElement = document.querySelector('.cart-items');
//     cartItemsElement.innerHTML = renderCartItems(cart.cartItems, products);
//     attachCartEventListeners();
// })


// Attach Event Listeners
function attachCartEventListeners() {
    const decreaseBtns = document.querySelectorAll('.cart-item__quantity-decrease');
    const increaseBtns = document.querySelectorAll('.cart-item__quantity-increase');
    const deleteBtns = document.querySelectorAll('.cart-item__delete');
    const selectAllBtns = document.querySelector('.cart-list__select-all');
    const checkBoxes = document.querySelectorAll('.cart-item__checkbox');
    const btnCheckout = document.querySelector('.button__checkout');

    decreaseBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const cartItemElement = btn.closest('.cart-item');
            const deleteBtns = cartItemElement.querySelector('.cart-item__delete');
            const buttonDecreaseCartItem = cartItemElement.querySelector('.cart-item__quantity-decrease');
            const cartItemQuantityElement = cartItemElement.querySelector('.cart-item__quantity-value');
            const productId = cartItemElement.dataset.productId;
            const cartItemQuantity = cart.updateCartItemQuantity(productId, 'decrease', 1);
            cartItemQuantityElement.innerText = cartItemQuantity;

            if (cartItemQuantity > 1) {
                buttonDecreaseCartItem.classList.remove('cart-item__quantity-decrease--hidden');
                deleteBtns.classList.add('cart-item__delete--hidden');
            } else {
                buttonDecreaseCartItem.classList.add('cart-item__quantity-decrease--hidden');
                deleteBtns.classList.remove('cart-item__delete--hidden');
            }

            updateTotalsDisplay(cart.calculateSelectedCartItems());
        })
    })

    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const cartItemElement = btn.closest('.cart-item');
            const cartItemQuantityElement = cartItemElement.querySelector('.cart-item__quantity-value');
            const productId = cartItemElement.dataset.productId;
            cart.removeFromCart(productId);
            cartItemElement.remove();
            cartItemQuantityElement.innerText = cartItem.quantity;

            updateTotalsDisplay(cart.calculateSelectedCartItems());
        })

    })

    increaseBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const cartItemElement = btn.closest('.cart-item');
            const deleteBtns = cartItemElement.querySelector('.cart-item__delete');
            const buttonDecreaseCartItem = cartItemElement.querySelector('.cart-item__quantity-decrease');
            const cartItemQuantityElement = cartItemElement.querySelector('.cart-item__quantity-value');
            const productId = cartItemElement.dataset.productId;
            const cartItemQuantity = cart.updateCartItemQuantity(productId, 'increase', 1);
            cartItemQuantityElement.innerText = cartItemQuantity;

            if (cartItemQuantity > 1) {
                buttonDecreaseCartItem.classList.remove('cart-item__quantity-decrease--hidden');
                deleteBtns.classList.add('cart-item__delete--hidden');
            } else {
                buttonDecreaseCartItem.classList.add('cart-item__quantity-decrease--hidden');
                deleteBtns.classList.remove('cart-item__delete--hidden');
            }

            updateTotalsDisplay(cart.calculateSelectedCartItems());
        })

    })


    checkBoxes.forEach((checkbox) => {
        checkbox.addEventListener('click', () => {
            const cartItemElement = checkbox.closest('.cart-item');
            const productId = cartItemElement.dataset.productId;
            cart.toggleCartItemCheckStatus(productId);
            updateTotalsDisplay(cart.calculateSelectedCartItems());
        })
    })

    let allChecked = cart.cartItems.every(cartItem => cartItem.checked)
    allChecked ? selectAllBtns.innerText = 'Deselecte all items' : selectAllBtns.innerText = 'Select all items'

    selectAllBtns.addEventListener('click', () => {
        if (allChecked) {
            allChecked = false;
            selectAllBtns.innerText = 'Select all items';
            checkBoxes.forEach((checkbox) => {
                checkbox.checked = false;
            })
            cart.unselectAllCartItems();
        } else {
            allChecked = true;
            selectAllBtns.innerText = 'Deselecte all items';
            checkBoxes.forEach((checkbox) => {
                checkbox.checked = true;
            })
            cart.selectAllCartItems();
        }
        updateTotalsDisplay(cart.calculateSelectedCartItems());
    })

    btnCheckout.addEventListener('click', async () => {
        try {
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart
                })
            })

            const order = await response.json();
            addOrder(order);
        } catch (error) {
            console.log('Unexpected error. Please try again later.')
        }

        window.location.href = 'order.html';


    });
}

updateTotalsDisplay(cart.calculateSelectedCartItems());
attachCartEventListeners();
