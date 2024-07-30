import { cart } from "./cart.js";
import { products, initXHR } from "./products.js";
import { cartQuantity } from "./amazon.js";

let placedOrder = [];




let productsHTML = '';
let matchingProduct;

document.querySelector('.cart-quantity').innerHTML = cartQuantity;

export let viewedProductId;

initXHR(() => {
    loadProducts();
    loadTrackPackageButton();
});


function loadProducts() {
    placedOrder = JSON.parse(localStorage.getItem('placed-order'));
    placedOrder.forEach((cartItem) => {

        products.forEach((product) => {

            if (product.id === cartItem.id) {
                matchingProduct = product;
            }

        });

        productsHTML += `
        <div class="product-container flex-container">
            <div class="product-image-container">
                <img src=${matchingProduct.image} width="120">
            </div>

            <div class="product-info-container">
                <div class="product-name-container">
                    <b>${matchingProduct.name}</b>
                </div>

                <div class="arrival-date-container">
                    Arriving on: August 15
                </div>

                <div class="product-quantity-container">
                    Quantity: ${cartItem.quantity}
                </div>

                <div class="buy-it-again-button-container">
                    <button class="buy-it-again-button">Buy it again</button>
                </div>
            </div>

            <div class="track-package-button-container">
                <a href="track-order.html"><button class="track-package-button" data-product-id="${matchingProduct.id}">Track Package</button></a>
            </div>
        </div>
    `;

    });
    document.querySelector('.products-order-body-container').innerHTML = productsHTML;
}


function loadTrackPackageButton() {
    document.querySelectorAll('.track-package-button').forEach((button) => {
        button.addEventListener('click', () => {
            viewedProductId = button.dataset.productId;
            localStorage.setItem('viewed-product-id', viewedProductId);

            console.log(typeof viewedProductId);

        })
    });
}



