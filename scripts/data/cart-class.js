import { products } from '../data/productsModel.js';

class Cart {
    // class fields
    cartItems;
    localStorage;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    }

    updateCartStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId, quantity, checked) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        })

        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({
                productId,
                quantity,
                checked
            })
        };
        this.updateCartStorage();
    }

    removeFromCart(productId) {
        this.cartItems.forEach((cartItem, index) =>
            cartItem.productId === productId && this.cartItems.splice(index, 1)
        )
        this.updateCartStorage();
    }

    toggleCartItemCheckStatus(productId) {
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                cartItem.checked ? cartItem.checked = false : cartItem.checked = true;
            }
        })
        this.updateCartStorage();
    }

    updateCartItemQuantity(productId, action, value) {
        let cartItemQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                if (action === 'increase') {
                    cartItem.quantity += value
                } else {
                    cartItem.quantity -= value
                }
                cartItemQuantity = cartItem.quantity;
            }
        })
        this.updateCartStorage();
        return cartItemQuantity;
    }

    selectAllCartItems() {
        this.cartItems.forEach((cartItem) => {
            cartItem.checked = true;

        })
        this.updateCartStorage()
    }

    unselectAllCartItems() {
        this.cartItems.forEach((cartItem) => {
            cartItem.checked = false;
        })
        this.updateCartStorage()
    }

    calculateSelectedCartItems() {
        let totalCartQuantity = 0;
        let totalCartPriceCents = 0;

        this.cartItems.forEach((cartItem) => {
            if (cartItem.checked) {
                totalCartQuantity += cartItem.quantity;
            }
        })

        this.cartItems.forEach((cartItem) => {
            const product = products.find(productItem => productItem.id === cartItem.productId)
            if (!product) return;

            totalCartPriceCents += product.priceCents * cartItem.quantity;
        })

        return { totalCartQuantity, totalCartPriceCents };
    }
};

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart)
console.log(businessCart)