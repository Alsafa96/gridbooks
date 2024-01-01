import {bannerArray} from './main.js';

//Dynamic creation of mobile products:-
let createBanner=()=>{
    let mobileItemsList=document.querySelector('.web-grids__list');
    for(let i=0;i<bannerArray.length;i++){
        if(!(bannerArray[i].name.includes('Banner Book'))){
            let mobileProductContainer=document.createElement('div');
        mobileProductContainer.classList.add('web-grid__item');
        let mobileProductImage=document.createElement('img');
        mobileProductImage.setAttribute('src',bannerArray[i].image);
        mobileProductImage.setAttribute('alt',bannerArray[i].alt);
        for(let j=0;j<bannerArray[i].imageClasses.length;j++){
            mobileProductImage.classList.add(bannerArray[i].imageClasses[j]);
        }
        let mobileProductInfo=document.createElement('div');
        mobileProductInfo.classList.add(bannerArray[i].paragraphClass);
        let productName=document.createElement('p');
        productName.classList.add('product__name');
        //let productNameLink=document.createElement('a');
        //productNameLink.setAttribute('href',bannerArray[i].hrefLink);
        for(let j=0;j<bannerArray[i].linkClasses.length;j++){
            productNameLink.classList.add(bannerArray[i].linkClasses[j]);
        }
        productNameLink.textContent=bannerArray[i].name;
        let mobileProductPrice=document.createElement('span');
        mobileProductPrice.classList.add(bannerArray[i].priceClass);
        mobileProductPrice.textContent=bannerArray[i].price;

        mobileProductContainer.appendChild(mobileProductImage);
        productName.appendChild(productNameLink);
        mobileProductInfo.appendChild(productName);
        mobileProductInfo.appendChild(document.createElement('br'));
        mobileProductInfo.appendChild(mobileProductPrice);
        mobileProductContainer.appendChild(mobileProductInfo);

        mobileItemsList.appendChild(mobileProductContainer);
        }
        
    }
}

createBanner();