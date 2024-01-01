import {mobileArray} from './main.js';

//Dynamic creation of mobile products:-
let createMobile=()=>{
    let mobileItemsList=document.querySelector('.web-grids__list');
    for(let i=0;i<mobileArray.length;i++){
        if(!(mobileArray[i].name.includes('Pack'))){
            let mobileProductContainer=document.createElement('div');
            mobileProductContainer.classList.add('web-grid__item');
            let mobileProductImage=document.createElement('img');
            mobileProductImage.setAttribute('src',mobileArray[i].image);
            mobileProductImage.setAttribute('alt',mobileArray[i].alt);
            for(let j=0;j<mobileArray[i].imageClasses.length;j++){
                mobileProductImage.classList.add(mobileArray[i].imageClasses[j]);
            }
            let mobileProductInfo=document.createElement('div');
            mobileProductInfo.classList.add(mobileArray[i].productInfoClass);
            let productName=document.createElement('p');
            //productName.classList.add('product__name');
            let productNameLink=document.createElement('a');
            productNameLink.setAttribute('href',mobileArray[i].hrefLink);
            for(let j=0;j<mobileArray[i].linkClasses.length;j++){
                productNameLink.classList.add(mobileArray[i].linkClasses[j]);
            }
            productNameLink.textContent=mobileArray[i].name;
            let mobileProductPrice=document.createElement('span');
            mobileProductPrice.classList.add(/*mobileArray[i].priceClass*/'block','text-gray-800','text-center');
            mobileProductPrice.textContent=mobileArray[i].price;
    
            mobileProductContainer.appendChild(mobileProductImage);
            productName.appendChild(productNameLink);
            mobileProductInfo.appendChild(productName);
            mobileProductInfo.appendChild(document.createElement('br'));
            mobileProductInfo.appendChild(mobileProductPrice);
            mobileProductContainer.appendChild(mobileProductInfo);
    
            mobileItemsList.appendChild(mobileProductContainer); mobileProductContainer.addEventListener('click',()=>{
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

createMobile();