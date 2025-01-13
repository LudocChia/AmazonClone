import { cart, loadFromStorage, addToCart } from '../../scripts/data/cartModel.js';

// cartModel.spec.js
describe('test suite: addToCart', () => {
    beforeAll(() => {
        // Provide a custom localStorage mock
        let store = {};

        const mockLocalStorage = {
            getItem: jasmine.createSpy('getItem').and.callFake(key => {
                return store[key] || null;
            }),
            setItem: jasmine.createSpy('setItem').and.callFake((key, val) => {
                store[key] = val;
            }),
            clear: jasmine.createSpy('clear').and.callFake(() => {
                store = {};
            })
        };

        // Replace the real localStorage with our mock
        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage,
            writable: true
        });
    });

    beforeEach(() => {
        // Reset the store before each test if desired
        window.localStorage.clear();
    });

    it('adds a new product to the cart', () => {
        // Now cartModel sees an empty store upon load
        loadFromStorage(); // cart = []
        addToCart('fake-product-id', 1, false);

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toBe('fake-product-id');
        expect(localStorage.setItem).toHaveBeenCalled();  // <-- works, it's truly a spy
    });
});
