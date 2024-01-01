import {featuredProductsArray} from './main.js';
 
 //Dynamic creation of featured products:--
 let createFeaturedProducts=()=>{
    let featuredProductsList=document.querySelector('.featured-products__list');
    for (let i=0;i<featuredProductsArray.length;i++){
        let featuredProductsContainer=document.createElement('div');
        featuredProductsContainer.classList.add('featured-product');
        let featuredProductImage=document.createElement('img');
        featuredProductImage.setAttribute('src',featuredProductsArray[i].image);
        for(let j=0;j<featuredProductsArray[i].imagesClasses.length;j++){
            featuredProductImage.classList.add(featuredProductsArray[i].imagesClasses[j]);
        }
        let productInfoContainer=document.createElement('div');
        productInfoContainer.classList.add(featuredProductsArray[i].productInfoContainerClass);
        let productInfoTitle=document.createElement('p');
        productInfoTitle.classList='product__name';
        let productInfoTitleLink=document.createElement('a');
        productInfoTitleLink.setAttribute('href',featuredProductsArray[i].hrefLink);
        productInfoTitleLink.textContent=featuredProductsArray[i].name;
        productInfoTitleLink.classList.add(featuredProductsArray[i].titleClasses);
        let productPrice=document.createElement('span');
        productPrice.classList.add(featuredProductsArray[i].priceClass);
        productPrice.textContent=featuredProductsArray[i].price;
        productInfoTitle.appendChild(productInfoTitleLink);
        productInfoContainer.appendChild(productInfoTitle);
        productInfoContainer.appendChild(document.createElement('br'));
        productInfoContainer.appendChild(productPrice);
        featuredProductsContainer.appendChild(featuredProductImage);
        featuredProductsContainer.appendChild(productInfoContainer);
        featuredProductsList.appendChild(featuredProductsContainer);
    }
}

createFeaturedProducts();