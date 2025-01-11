import { products } from '../data/productsModel.js';

function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,

        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        },

        updateCartStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

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
        },


        removeFromCart(productId) {
            this.cartItems.forEach((cartItem, index) =>
                cartItem.productId === productId && this.cartItems.splice(index, 1)
            )
            this.updateCartStorage();
        },

        toggleCartItemCheckStatus(productId) {
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    cartItem.checked ? cartItem.checked = false : cartItem.checked = true;
                }
            })
            this.updateCartStorage();
        },

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
        },

        selectAllCartItems() {
            this.cartItems.forEach((cartItem) => {
                cartItem.checked = true;

            })
            this.updateCartStorage()
        },

        unselectAllCartItems() {
            this.cartItems.forEach((cartItem) => {
                cartItem.checked = false;
            })
            this.updateCartStorage()
        },

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
    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
cart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add', 1, false);

businessCart.loadFromStorage();

console.log(cart)
console.log(businessCart)