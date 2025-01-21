import { products, initXHR } from "./products.js";
import { cartQuantity } from "./amazon.js";


let stage = 'p';
document.querySelector('.cart-quantity').innerHTML = cartQuantity;

let today = dayjs();
today = today.add(7, 'day')
today = today.format('MMMM-DD');

export let viewProductId = localStorage.getItem('viewed-product-id');
let matchingProduct;
let pageHTML = ``;



initXHR(loadPage);

function loadPage() {

    products.forEach((product) => {


        if (product.id === viewProductId) {
            matchingProduct = product;
            console.log(matchingProduct);
            
        }
    });

    pageHTML += `
    <div class="view-all-orders-link-container">
        <a href="orders.html">view all orders</a>
    </div>
    <div class="arriving-date-container">
        <h2>Arriving on ${today}</h2>
        <p class="product-name">${matchingProduct.name}<br>
            Quantity: 1</p>
    </div>

    <div class="product-image-container">
        <img src=${matchingProduct.image} alt="" width="150">
    </div>

    <span class="preparing">Preparing</span>
    <span class="shipped">Shipped</span>
    <span class="delivered">Delivered</span>

    <div class="progress-bar-container">
        <div class="progress-bar-background">
            <div class="progress-bar">
            </div>
        </div>
    </div>
`

document.querySelector('main').innerHTML = pageHTML;

if(stage === 'p')
{
    let progressBar = document.querySelector('.progress-bar');

    document.querySelector('.preparing').style.color = 'green';
    
    progressBar.style.width = '50px';
}


else if(stage === 's')
{
    let progressBar = document.querySelector('.progress-bar');

    document.querySelector('.shipped').style.color = 'green';

    progressBar.style.width = '400px';
}

else
{
    let progressBar = document.querySelector('.progress-bar');

    document.querySelector('.delivered').style.color = 'green';

    progressBar.classList.add('status-delivered');

    progressBar.style.width = '800px';

   
    
}
}

