import { formatAsMYR } from "../utils/currency.js";

class Product {
    id;
    image;
    name;
    rating;
    priceCents;

    constructor(productDetails) {
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.rating = productDetails.rating;
        this.priceCents = productDetails.priceCents;
    }

    getStarsUrl() {
        return `../images/ratings/rating-${this.rating.stars * 10}.png`;
    }

    getPrice() {
        return `$${formatAsMYR(this.priceCents)}`;

    }

    extraInfoHTML() {
        return '';
    }
}

class Clothing extends Product {
    sizeChartLink;

    constructor(productDetails) {
        super(productDetails);
        this.sizeChartLink = productDetails.sizeChartLink;
    }

    extraInfoHTML() {
        return `
            <a href="${this.sizeChartLink}" target="_blank">Size chart</a>
        `;
    }
}

export let products = [];

export function loadProducts(fun) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        products = JSON.parse(xhr.response).map((productDetails) => {
            if (productDetails.type === 'clothing') {
                return new Clothing(productDetails);
            } else {
                return new Product(productDetails);
            }
        });
        console.log(Clothing)
        console.log(Product)
        fun();
    });

    xhr.open('GET', 'https://supersimplebackend.dev/products');
    xhr.send();
}