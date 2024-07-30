import { cart, addToCart } from "./cart.js";
import {products, initXHR} from "./products.js";


let productGridHTML = '';

export let cartQuantity = cart.length;

document.querySelector('.cart-quantity').innerHTML = cartQuantity;

document.querySelector('.all-button').addEventListener('click', () => {
    renderProductsGrid(productGridHTML);
});

document.querySelector('.search-bar').addEventListener('keyup', (event) => {

    let input = document.querySelector('.search-bar').value;
    if(event.key === 'Enter'  && input !== '')
    {

        let productsSearchViewHTML = '';


        products.forEach((product) => {

            product.keywords.forEach((keyword) => {
                if(input === keyword)
                {
                    
                    productsSearchViewHTML += `
                    <div class="product-container">
                        <div class="product-image-container">
                            <img src="${product.image}" alt="" width="150" height="150">
                        </div>
                
                        <div class="product-name-container">
                            ${product.name}
                        </div>
                
                        <div class="product-price-container">
                            <b>$${product.priceCents / 100}</b>
                        </div>
                
                        <div class="product-rating-container">
                            <img src="images/ratings/rating-${product.rating.stars * 10}.png" alt="" width="90">
                        </div>
                        
                        <div class="add-to-cart-button-container">
                            <button class="add-to-cart-button" data-product-id="${product.id}">Add To Cart</button>
                        </div>
                    </div>
                `;

                renderProductsGrid(productsSearchViewHTML);
                loadAddToCartButton();
                }

                
            });

            
            
        });
        if(!productsSearchViewHTML)
        {
            document.body.innerHTML =  '<h1 style="text-align: center; justify-content: center; align-items: center; margin-top: 100px;">NO PRODUCTS FOUND MATCHING WITH YOUR SEARCH</h1>';
        }
    }

});


initXHR(loadProductsGrid);

export function loadProductsGrid()
{

products.forEach((product) => {
    productGridHTML += `
    <div class="product-container">
        <div class="product-image-container">
            <img src="${product.image}" alt="" width="150" height="150">
        </div>

        <div class="product-name-container">
            ${product.name}
        </div>

        <div class="product-price-container">
            <b>$${product.priceCents / 100}</b>
        </div>

        <div class="product-rating-container">
            <img src="images/ratings/rating-${product.rating.stars * 10}.png" alt="" width="90">
        </div>
        
        <div class="add-to-cart-button-container">
            <button class="add-to-cart-button" data-product-id="${product.id}">Add To Cart</button>
        </div>
    </div>
    `;
});




document.querySelector('.products-grid').innerHTML = productGridHTML;


loadAddToCartButton();
}

function renderProductsGrid(viewHTML)
{
    document.querySelector('.products-grid').innerHTML = viewHTML;
}

function loadAddToCartButton()
{

    document.querySelectorAll('.add-to-cart-button').forEach((button) => {
        button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId);
        cartQuantity = cart.length;
        document.querySelector('.cart-quantity').innerHTML = cartQuantity;

        });
    });
}

