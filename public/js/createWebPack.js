import {webArray} from './main.js';

//Dynamic creation of mobile products:-
export let createWeb=()=>{
    let mobileItemsList=document.querySelector('.web-grids__list');
    for(let i=0;i<webArray.length;i++){
        if(webArray[i].name.includes('Pack')){
            let mobileProductContainer=document.createElement('div');
        mobileProductContainer.classList.add('web-grid__item');
        let mobileProductImage=document.createElement('img');
        mobileProductImage.setAttribute('src',webArray[i].image);
        mobileProductImage.setAttribute('alt',webArray[i].alt);
        for(let j=0;j<webArray[i].imageClasses.length;j++){
            mobileProductImage.classList.add(webArray[i].imageClasses[j]);
        }
        let mobileProductInfo=document.createElement('div');
        mobileProductInfo.classList.add(webArray[i].productInfoClass);
        let productName=document.createElement('p');
        productName.classList.add('product__name');
        let productNameLink=document.createElement('a');
        productNameLink.setAttribute('href',webArray[i].hrefLink);
        for(let j=0;j<webArray[i].linkClasses.length;j++){
            productNameLink.classList.add(webArray[i].linkClasses[j]);
        }
        productNameLink.textContent=webArray[i].name;
        let mobileProductPrice=document.createElement('span');
        mobileProductPrice.classList.add(webArray[i].priceClass);
        mobileProductPrice.textContent=webArray[i].price;

        mobileProductContainer.appendChild(mobileProductImage);
        productName.appendChild(productNameLink);
        mobileProductInfo.appendChild(productName);
        mobileProductInfo.appendChild(document.createElement('br'));
        mobileProductInfo.appendChild(mobileProductPrice);
        mobileProductContainer.appendChild(mobileProductInfo);

        mobileItemsList.appendChild(mobileProductContainer);

            mobileProductContainer.addEventListener('click',()=>{
                if(document.cookie){
                    sessionStorage.clear();
                    sessionStorage.setItem('itemName',productName.textContent);
                    sessionStorage.setItem('itemImage',mobileProductImage.src);
                    sessionStorage.setItem('itemImageAlt',mobileProductContainer.alt);
                    sessionStorage.setItem('itemPrice',mobileProductPrice.textContent);
                    window.location.href='product-view.html';
                }
                else{
                    window.location.href='/login';
                }
            
            })
        }
    }
}

createWeb();