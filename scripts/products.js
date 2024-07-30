export let products = [];
export let xhr = new XMLHttpRequest();

export function initXHR(fun)
{

  xhr.addEventListener('load', () => {
  products = JSON.parse(xhr.response) ;
  fun();
});


xhr.open('GET', 'https://supersimplebackend.dev/products');
xhr.send();
}
  
