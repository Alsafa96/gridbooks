import * as allData from './main.js';

let allDataArray=[];

allDataArray.push(allData.bannerArray);
allDataArray.push(allData.mobileArray);
allDataArray.push(allData.webArray);

//Getting handle to the container for the list of found items:-

let listContainer=document.querySelector('.list-container');

let searchBox=document.querySelector('.searchBox');

searchBox.addEventListener('keyup',(e)=>{
    listContainer.innerHTML='';
    allDataArray.forEach(dataArray=>{
        dataArray.forEach(datum=>{
            if(datum.name.includes(searchBox.value.trim()) && searchBox.value.trim()!==''){
                //Displaying Items found to contain the search String:-
                let itemCard=document.createElement('div');
                itemCard.classList.add('mx-auto');
                let itemCardTitle=document.createElement('p');
                let itemCardImage=document.createElement('img');
                let itemCardPrice=document.createElement('p');
                itemCardTitle.textContent=datum.name;
                itemCardTitle.classList.add('block','text-center','font-bold','text-2xl');
                itemCard.classList.add('cardItem','rounded','rounded-lg','border','border-4','border-orange-900','bg-yellow-200','cursor-pointer');
                itemCardImage.src=datum.image;
                itemCardImage.alt=datum.alt;
                itemCardPrice.textContent=datum.price;
                itemCardPrice.classList.add('block','text-center','font-bold','text-2xl');
                itemCard.appendChild(itemCardTitle);
                itemCard.appendChild(itemCardImage);
                itemCard.appendChild(itemCardPrice);
                listContainer.appendChild(itemCard);

                itemCard.addEventListener('click',()=>{
                    let cookieEmailAddress=document.cookie.indexOf('emailAddress');
                    if(cookieEmailAddress!==-1){
                        sessionStorage.clear();
                        sessionStorage.setItem('itemName',itemCardTitle.textContent);
                        sessionStorage.setItem('itemImage',itemCardImage.src);
                        sessionStorage.setItem('itemImageAlt',itemCardImage.alt);
                        sessionStorage.setItem('itemPrice',itemCardPrice.textContent);
                        window.location.href='product-view.html';
                    }
                   
                    else{
                        window.location.href='/login';
                    }
                })
            }
        })
    })

   if(listContainer.childElementCount===0){
        let noResultMessage=document.createElement('p');
        noResultMessage.textContent='No Results Found To Match Your Search!';
        noResultMessage.classList.add('noResultMatch','text-center','mt-10','mx-auto','font-bold','text-3xl')
        listContainer.appendChild(noResultMessage);
   }

})