//Getting Handles:-


let mainContainer=document.querySelector('.main-container');
let imageContainer=document.querySelector('.img-container');
let infoContainer=document.querySelector('.img-info-container');
let mainImage=document.querySelector('.main-image');
let productName=document.querySelector('.product-name');
let productPrice=document.querySelector('.product-price');
let fullSizeLink=document.querySelector('.full-size-link');

mainImage.src=sessionStorage.getItem('itemImage');
mainImage.alt=sessionStorage.getItem('itemImageAlt');
fullSizeLink.href=mainImage.src

productName.textContent=sessionStorage.getItem('itemName');
productPrice.textContent=sessionStorage.getItem('itemPrice');

window.addEventListener('load',()=>{
    if(document.documentElement.clientWidth<941){
        mainContainer.classList.remove('flex','flex-row');
        imageContainer.classList.add('mx-auto','md:w-8/12','xs:w-10/12');
        imageContainer.classList.remove('w-6/12');
        infoContainer.classList.remove('w-6/12','ml-16');
        productName.classList.add('text-center');
        productPrice.classList.add('block','text-center');
       
    }
    else{
        mainContainer.classList.add('flex','flex-row');
        imageContainer.classList.remove('mx-auto','md:w-8/12','xs:w-10/12');
        imageContainer.classList.add('w-6/12');
        infoContainer.classList.add('w-6/12','ml-16');
        productName.classList.remove('text-center');
        productPrice.classList.remove('block','text-center');
    }
})
window.addEventListener('resize',()=>{
    if(document.documentElement.clientWidth<941){
        mainContainer.classList.remove('flex','flex-row');
        imageContainer.classList.add('mx-auto','md:w-8/12','xs:w-10/12');
        imageContainer.classList.remove('w-6/12');
        infoContainer.classList.remove('w-6/12','ml-16');
        productName.classList.add('text-center');
        productPrice.classList.add('block','text-center');
       
    }
    else{
        mainContainer.classList.add('flex','flex-row');
        imageContainer.classList.remove('mx-auto','md:w-8/12','xs:w-10/12');
        imageContainer.classList.add('w-6/12');
        infoContainer.classList.add('w-6/12','ml-16');
        productName.classList.remove('text-center');
        productPrice.classList.remove('block','text-center');
    }
})