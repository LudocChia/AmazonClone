import { products } from '../data/productsModel.js';

export let cart;

loadFromStorage();

export function loadFromaStorage() {
    cart = JSON.parse(localStorage.getItem('cartItems')) || [];
}

export function addToCart(productId, quantity, checked) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    })

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity,
            checked
        })
    };
    updateCartStorage();
}

export function removeFromCart(productId) {
    cart.forEach((cartItem, index) =>
        cartItem.productId === productId && cart.splice(index, 1)
    )
    updateCartStorage();
}

export function toggleCartItemCheckStatus(productId) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.checked ? cartItem.checked = false : cartItem.checked = true;
        }
    })
    updateCartStorage();
}

export function updateCartItemQuantity(productId, action, value) {
    let cartItemQuantity = 0;
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            if (action === 'increase') {
                cartItem.quantity += value
            } else {
                cartItem.quantity -= value
            }
            cartItemQuantity = cartItem.quantity;
        }
    })
    updateCartStorage();
    return cartItemQuantity;
}

export function selectAllCartItems() {
    cart.forEach((cartItem) => {
        cartItem.checked = true;

    })
    updateCartStorage()
}
export function unselectAllCartItems() {
    cart.forEach((cartItem) => {
        cartItem.checked = false;
    })
    updateCartStorage()
}

export function updateCartStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cart));
    // console.log(cart);
}

export function calculateSelectedCartItems() {
    let totalCartQuantity = 0;
    let totalCartPriceCents = 0;

    cart.forEach((cartItem) => {
        if (cartItem.checked) {
            totalCartQuantity += cartItem.quantity;
        }
    })

    cart.forEach((cartItem) => {
        const product = products.find(productItem => productItem.id === cartItem.productId)
        if (!product) return;

        totalCartPriceCents += product.priceCents * cartItem.quantity;
    })

    return { totalCartQuantity, totalCartPriceCents };
}