import {bookArray} from './main.js';
import {padArray} from './main.js';

let imagesList=document.querySelector('.images-list');

let mainContainer=document.querySelector('.main-container');

//Getting the handles:-
/**** The Image container:- */

let imageContainer=document.querySelector('.img-container');
let imageInfoContainer=document.querySelector('.img-info-container');

let currentMainImage=document.querySelector('.main-image');
let currentMainPadImage=document.querySelector('.main-pad-image');
let imageTitleContainer=document.querySelector('.product-name');
let imagePriceContainer=document.querySelector('.product-price');
let addToCartBtn=document.querySelector('.addToCart');

let webBookName=document.querySelector('.web-book__name');
let webPadName=document.querySelector('.web-pad__name');
let mobileBookName=document.querySelector('.mobile-book__name');
let mobilePadName=document.querySelector('.mobile-pad__name');
let webBookPrice=document.querySelector('.web-book__price');

let fullSizeLink=document.querySelector('.full-size-link');

if(currentMainImage){
    bookArray.forEach(book=>{
        let newImageItem=document.createElement('img');
        let newImageSrc=book.image;
        newImageItem.src=newImageSrc;
        newImageItem.alt=book.alt;
        newImageItem.width='50';
        newImageItem.height='100';
        newImageItem.classList.add('cursor-pointer');
    
        newImageItem.addEventListener('click',()=>{
            currentMainImage.src='./'+newImageSrc;
            currentMainImage.alt=newImageItem.alt;
            imageTitleContainer.textContent=book.name;
            imagePriceContainer.textContent=book.price;
            addToCartBtn.disabled=false;
            fullSizeLink.href=currentMainImage.src;
        })
    
        imagesList.appendChild(newImageItem);
    })
}



let webBookImage=sessionStorage.getItem('webGridImage');
let padImage=sessionStorage.getItem('padGridImage');

if(webBookImage){
    let webBookTitle=sessionStorage.getItem('webGridTitle');
    let webBookPrice=sessionStorage.getItem('webGridPrice');

    let indexOfImgName=webBookImage.indexOf('5500');
    indexOfImgName=indexOfImgName+4;
    
    webBookImage=webBookImage.slice(indexOfImgName);
    webBookImage='.'+webBookImage;

    //currentMainImage.src=webBookImage;
    imageTitleContainer.textContent=webBookTitle;
    imagePriceContainer.textContent=webBookPrice;
}

else if(padImage){
    let padTitle=sessionStorage.getItem('padGridTitle');
    let padPrice=sessionStorage.getItem('padGridPrice');

    let indexOfImgPadName=padImage.indexOf('5500');
    indexOfImgPadName=indexOfImgPadName+4;

    padImage=padImage.slice(indexOfImgPadName);
    padImage='.'+padImage;
    if(currentMainPadImage){
        currentMainPadImage.src=padImage;
        imageTitleContainer.textContent=padTitle;
        imagePriceContainer.textContent=padPrice;
    }
}

let loadLargeScreenSize=()=>{
    mainContainer.classList.add('flex','flex-row');
    imagesList.classList.remove('grid','grid-cols-3','border','border-4','mt-4','p-2');
    imageInfoContainer.classList.add('w-6/12');
    webBookName.classList.remove('block','mx-auto');
    webPadName.classList.remove('block','mx-auto');
    mobileBookName.classList.remove('block','mx-auto');
    mobilePadName.classList.remove('block','mx-auto');

    webBookPrice.classList.add('web-book__price');
    
    if(window.innerWidth>600){
        mainContainer.classList.add('main-container');
    }
}

let loadSmallScreenSize=()=>{
    mainContainer.classList.remove('flex','flex-row');
    imagesList.classList.add('grid','grid-cols-3','border','border-4','mt-5','p-2');
    imageInfoContainer.classList.remove('w-6/12');
    webBookName.classList.add('block','mx-auto');
    webPadName.classList.add('block','mx-auto');
    mobileBookName.classList.add('block','mx-auto');
    mobilePadName.classList.add('block','mx-auto');

    webBookPrice.classList.remove('web-book__price');

    if(window.innerWidth<600){
        mainContainer.classList.remove('main-container');
    }

}


//Setting classes according to window size:-
window.addEventListener('load',()=>{
    if(window.innerWidth<941){
       loadSmallScreenSize();
    }
    else if(window.innerWidth>940){
        loadLargeScreenSize();
    }
})

window.addEventListener('resize',()=>{
    if(window.innerWidth<941){
        loadSmallScreenSize();
    }
    else if(window.innerWidth>940){
        loadLargeScreenSize();
    }
})