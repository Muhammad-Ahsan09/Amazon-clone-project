
export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart)
{
    cart = [
        {
            id : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1
    }

    ];
}


export function addToCart(productId)
{
    let status = 1;

    cart.forEach((carItem) => {

        if(carItem.id === productId)
        {
            carItem.quantity++;
            status = 0;
            return;
        }
    });

    if(status)
    {
        cart.push({
            id : productId,
            quantity: 1
        });
    }
    
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
}

export function updateCart(newCart)
{
    cart = newCart;
    localStorage.setItem('cart', JSON.stringify(cart));
}
