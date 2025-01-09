import { addToCart, cart } from '../../scripts/data/cart.js';

describe('test suit: addToCart', () => {
    it('basic case: adds an existing product to the cart', () => {
        // addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1, false);
    })

    it('edge case: adds a new product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1, false);
        expect(cart.length).toEqual(1);
    })
});