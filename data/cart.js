export const cart = JSON.parse(localStorage.getItem('cartItems')) || [];

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

export function updateCartStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cart));
    console.log(cart);
}

export function updateCartQauntity(productId) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.quantity -= 1;
            cartItemQuantityElement.innerText = cartItem.quantity;
        }
    })
    updateCartStorage();
}
