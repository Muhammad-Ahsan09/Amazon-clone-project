import { cart, updateCart } from "./cart.js";
import { products, initXHR } from "./products.js";


let productSummaryHTML = '';
let matchingProduct;
let totalPrice = 0;
let deliveryCost = 4;
let totalBeforeTax = 0;
export let totalAfterTax = 0;
let tax = 5;
const date = dayjs().add(7, 'day').format('DD, MMMM YYYY');

document.querySelector('.items-quantity-number-container').innerHTML = `<h2>Checkout (${cart.length} items)</h2>`;

initXHR(renderOrderSummary);

function renderOrderSummary()
{
cart.forEach((cartItem) => {
    products.forEach((product) => {

        if(cartItem.id === product.id)
        {
            totalPrice += parseFloat((product.priceCents / 100).toFixed(2));



            matchingProduct = product;

            productSummaryHTML += `
    <div class="product-summary-container"  data-id="${matchingProduct.id}">
        <div class="delivery-date-container">
            <h3>Delivery Date: Wednesday, July 17</h3>
        </div>
        
        <div class="product-info-container">
            <div class="product-image-container">
                <img src="${matchingProduct.image}" alt="" class="product-image" width="120">
            </div>

            <div class="product-info-without-image">
                <div class="product-name-container">
                    ${matchingProduct.name}
                </div>

                <div class="product-price-container">
                    $${matchingProduct.priceCents / 100}
                </div>

                <div class="quantity-update-container">
                    Quantity: ${cartItem.quantity} <a href="#">Update</a>
                    <a href="checkout.html" class="delete-link" data-id="${matchingProduct.id}">Delete</a>
                </div>
            </div>

            <div class="choose-delivery-date-container">
                <p class="delivery-date-heading">Choose a delivery date</p>
                
                <div class="1-week-container delivery-days-container">
                    <input type="radio" name="delivery-date-${product.id}" checked>
                    <span class="date">${ dayjs().add(7, 'day').format('DD, MMMM YYYY')}</span>
                    <p class="shipping-0-dollars">Free-Shipping</p>
                </div>

                <div class="5-days-container">
                    <input type="radio" name="delivery-date-${product.id}">
                    <span class="date">${ dayjs().add(5, 'day').format('DD, MMMM YYYY')}</span>
                    <p class="shipping-4-dollars">$ 4.99-Shipping</p>
                </div>

                <div class="3-days-container">
                    <input type="radio" name="delivery-date-${product.id}">
                    <span class="date">${ dayjs().add(3, 'day').format('DD, MMMM YYYY')}</span>
                    <p class="shipping-9-dollars">$ 9.99-Shipping</p>
                </div>
            </div>
        </div>
    </div>
    `;
        }
    })

    
});



document.querySelector('.products-container').innerHTML = productSummaryHTML;

document.querySelectorAll('.delete-link').forEach((link) => {
    
    link.addEventListener('click', () => {
        let newCart = [];
        document.querySelectorAll('.product-summary-container').forEach((product) => {
            if(product.dataset.id === link.dataset.id)
            {
                product.remove();
            }

            else
            {
                newCart.push({
                    id: product.dataset.id,
                    quantity: 1
                });
            }
        });
        updateCart(newCart);
    });
});





totalBeforeTax = totalPrice + deliveryCost;
totalAfterTax = totalBeforeTax + 5;

document.querySelector('.bill-items-quantity-container').innerHTML = `items (${cart.length}):`;

document.querySelector('.bill-price-container').innerHTML = `$${totalPrice.toFixed(2)}`;

document.querySelector('.bill-total-before-tax-value').innerHTML = `$${totalBeforeTax.toFixed(2)}`;
document.querySelector('.bill-total-after-tax-value').innerHTML = `$${totalAfterTax.toFixed(2)}`;

document.querySelector('.place-order-button').addEventListener('click',() => {

    localStorage.setItem('placed-order', JSON.stringify(cart));
    alert('order placed');
});
}