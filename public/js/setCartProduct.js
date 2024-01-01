let shoppingCartItemsCounter=document.querySelector('.fa-shopping-cart');
let counter=localStorage.getItem('itemsCounter') || 0;
//shoppingCartItemsCounter.textContent=counter;


let saveBtn=document.querySelector('.save-btn');
let addToCartBtn=document.querySelector('.addToCart');

let mainImage=document.querySelector('.main-image');

let quantityInput=document.querySelector('.quantityInput');

let productsArray= JSON.parse(localStorage.getItem('cartContents')) || [];

console.log(productsArray);

quantityInput.addEventListener('keydown',(e)=>{
    if((e.keyCode < 48 || e.keyCode > 57) && e.keyCode!==8){
        e.preventDefault();
    }
})

saveBtn.addEventListener('click',()=>{
    window.location.href='cart.html';
})

if(!mainImage.src){
    addToCartBtn.disabled=true;
}

addToCartBtn.addEventListener('click',()=>{
    let productName=document.querySelector('.product-name').textContent;
    let productPrice=document.querySelector('.product-price').textContent;
    let quantity=quantityInput.value;
    if(!quantity) quantity=1;

    let productPresent=productsArray.findIndex(x=>x.productName===productName)

    if(productPresent>-1){
        let quantityNumber=Number(productsArray[productPresent].quantity);
        quantityNumber+=Number(quantity);
        productsArray[productPresent].quantity=quantityNumber;
    }
    else{
        let newCartItem={'productName':productName,'productPrice':productPrice,'quantity':quantity,'image':mainImage.src};
        productsArray.push(newCartItem);
    }


    
    localStorage.setItem('cartContents',JSON.stringify(productsArray));

    counter=Number(counter);
    counter+=Number(quantity);
    document.querySelector('.items__counter').textContent=counter;
    localStorage.setItem('itemsCounter',counter);

})