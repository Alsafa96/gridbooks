console.log(localStorage);

let deleteCardItemBoxPresent=false,deleteAllItemsBoxPresent=false;
let dragAndDropDialogBox=function(dlgBox){
    //Drag and drop the dialog Box:-
   let xPos=0,yPos=0,xOffset=0,yOffset=0;
   let pressedDialogBox=false;

   dlgBox.addEventListener('mousedown',(e)=>{
       xPos=e.x;
       yPos=e.y;
       pressedDialogBox=true;
   })

   dlgBox.addEventListener('mousemove',(e)=>{
       if(pressedDialogBox){
           let style=window.getComputedStyle(dlgBox);
           let left=style.left;
           let top=style.top;
           left=left.slice(0,left.indexOf('px'));
           top=top.slice(0,top.indexOf('px'));
           left=Number(left);
           top=Number(top);
           xOffset=e.x-xPos;
           yOffset=e.y-yPos;
           xPos=e.x;
           yPos=e.y;
           left+=xOffset;
           top+=yOffset;
           dlgBox.style.left=left+'px';
           dlgBox.style.top=top+'px';
       }
       
   })

   dlgBox.addEventListener('mouseup',()=>{
       pressedDialogBox=false;
       
   })
   dlgBox.addEventListener('mouseout',(e)=>{
       pressedDialogBox=false;
   })

}

let emptyCartItem=document.createElement('span');
emptyCartItem.className='cart-info';

let emptyCartText=document.createElement('em');
emptyCartText.textContent="You Don't have any items in your cart yet."

let continueShopping=document.createElement('a');
continueShopping.href='index.html';
continueShopping.textContent='Continue Shopping';

emptyCartText.appendChild(continueShopping);
emptyCartItem.appendChild(emptyCartText);

let secondSectionLine=document.querySelector('.secondSection');

let itemsArray=JSON.parse(localStorage.getItem('cartContents'));


let totalCost=0;

if(!itemsArray || itemsArray.length===0){
    secondSectionLine.insertAdjacentElement('beforebegin',emptyCartItem);
}

else{
    let itemsList=document.createElement('div');
    itemsList.classList.add('grid','sm:grid-cols-3','sm:grid-gap-1','mt-3','mb-3','mx-5','xs:grid-cols-1');

    itemsArray.forEach(item=>{
        let itemCard=document.createElement('div');
        itemCard.classList.add('cartItemCard','rounded','rounded-t-xl','bg-purple-300','mb-4');

        let itemCardImage=document.createElement('img');
        itemCardImage.src=item.image;
        
        if(window.innerWidth<640){
            itemCardImage.width='100';
        }
        

        let itemPrice=document.createElement('p');
        itemPrice.classList.add('px-2','font-bold','text-center');
        itemPrice.textContent=item.productPrice;

        let itemName=document.createElement('p');
        itemName.classList.add('px-2','font-bold','text-center');
        itemName.textContent=item.productName;

        let itemQuantity=document.createElement('p');
        itemQuantity.classList.add('px-2','font-bold','text-center', 'text-sm');
        itemQuantity.textContent='Quantity:  ' +item.quantity;

        let deleteBtn=document.createElement('button');
        deleteBtn.textContent='Remove';

        deleteBtn.classList.add('bg-purple-800','w-full','block','font-bold','text-md','p-2','rounded','hover:bg-purple-400','hover:text-white')

        deleteBtn.addEventListener('click',()=>{
            if(!deleteCardItemBoxPresent && !deleteAllItemsBoxPresent){
                let deleteBox=document.createElement('div');
                let deleteMessage=document.createElement('p');
                deleteMessage.textContent='Are you sure you want to drop this item?';

                let deleteYesBtn=document.createElement('button');
                deleteYesBtn.textContent='Yes';
                deleteYesBtn.classList.add('bg-red-500','hover:text-white','hover:bg-orange-500','border','border-red-800','border-2','rounded','rounded-lg','p-2','font-bold')
                
                let deleteNoBtn=document.createElement('button');
                deleteNoBtn.textContent='No';
                deleteNoBtn.classList.add('bg-red-500','hover:text-white','hover:bg-orange-500','border','border-red-800','border-2','rounded','rounded-lg','p-2','font-bold','ml-12','mt-3')

                deleteBox.appendChild(deleteMessage);
                deleteBox.appendChild(deleteYesBtn);
                deleteBox.appendChild(deleteNoBtn);

                deleteBox.classList.add('deleteDialogBox','bg-red-300','p-2','border','border-2','border-red-600','rounded','rounded-lg','font-bold');

                dragAndDropDialogBox(deleteBox);

                document.body.appendChild(deleteBox);

                deleteCardItemBoxPresent=true;

                deleteYesBtn.addEventListener('click',()=>{
                   let indexToRemove=itemsArray.findIndex(x=>x.productName===item.productName);
                     //Getting the price to Subtract it from the total:-
                     let priceToSubtract=itemsArray[indexToRemove].productPrice;
                     priceToSubtract=Number(priceToSubtract.slice(0,priceToSubtract.indexOf('$')));
                     let quantityToSubtract=Number(itemsArray[indexToRemove].quantity);
                    
                     itemsArray.splice(indexToRemove,1);


                    localStorage.setItem('cartContents',JSON.stringify(itemsArray));
                    localStorage.setItem('itemsCounter',Number(localStorage.getItem('itemsCounter'))-quantityToSubtract);
                    document.querySelector('.items__counter').textContent=localStorage.getItem('itemsCounter');

                    deleteBtn.parentElement.remove();

                    deleteBox.remove();
                    deleteCardItemBoxPresent=false;
                    if(itemsArray.length>0){
                        let totalLabel=document.querySelector('.totalLabel');
                        let oldTotalCost=totalLabel.textContent.slice(totalLabel.textContent.indexOf(':')+1,totalLabel.textContent.indexOf('$'));
                        oldTotalCost=Number(oldTotalCost);

                        let newTotalCost=oldTotalCost-(priceToSubtract*quantityToSubtract);
                        totalLabel.textContent='Total: ' +newTotalCost +'$';
                        
                    }

                    else if(itemsArray.length===0){
                        let totalForm=document.querySelector('.totalForm');
                        if(totalForm){
                            totalForm.remove();
                        }
                        secondSectionLine.insertAdjacentElement('beforebegin',emptyCartItem); 
                    }
                   
                })

                deleteNoBtn.addEventListener('click',()=>{
                    deleteBox.remove();
                    deleteCardItemBoxPresent=false;
                })
            }
        })


        itemCard.appendChild(itemName);
        itemCard.appendChild(itemCardImage);
        itemCard.appendChild(itemPrice);
        itemCard.appendChild(itemQuantity);
        itemCard.appendChild(deleteBtn);

        itemsList.appendChild(itemCard);

        let priceNumber=Number(item.productPrice.slice(0,item.productPrice.indexOf('$')));
        
        totalCost+=Number(item.quantity) * priceNumber;
        
    })

    secondSectionLine.insertAdjacentElement('beforebegin',itemsList);
    secondSectionLine.insertAdjacentElement('beforebegin',document.createElement('hr'));

    //Adding the total Bill:-
    if(JSON.parse(localStorage.getItem('cartContents')).length>0){
        let totalForm=document.createElement('form');
        totalForm.classList.add('totalForm');
        let totalLabel=document.createElement('label');
        totalLabel.textContent='Total: ' + totalCost +'$';
        totalLabel.classList.add('totalLabel','text-center','block','font-bold','text-lg','mb-5','mt-5');
        totalForm.appendChild(totalLabel);
        let formButtons=document.createElement('p');
        let submitCartBtn=document.createElement('input');
        submitCartBtn.type='submit';
        submitCartBtn.value='Confrim Buying';
        submitCartBtn.classList.add('bg-black','text-white','text-lg','font-bold','mx-auto','p-3','rounded-lg','block','mb-5','cursor-pointer','hover:bg-gray-800');

        let deleteAllBtn=document.createElement('button');
        deleteAllBtn.textContent='Empty Cart';
        deleteAllBtn.classList.add('emptyCart','bg-black','text-white','text-lg','font-bold','mx-auto','p-3','rounded-lg','block','mb-5','cursor-pointer','hover:bg-gray-800');

        //Hidden Field To Hold The Items Array:-
        let allItemsInput=document.createElement('input');
        allItemsInput.type='text';
        allItemsInput.setAttribute('value',JSON.stringify(localStorage.getItem('cartContents')));
        allItemsInput.hidden=true;
        allItemsInput.name='allItems';
        totalForm.appendChild(allItemsInput);

        //Hidden Field To Hold the total Price:-
        let totalCostInput=document.createElement('input');
        totalCostInput.setAttribute('value',totalCost);
        totalCostInput.name='totalCost';
        totalCostInput.hidden=true;
        totalForm.appendChild(totalCostInput);

        formButtons.appendChild(submitCartBtn);
        formButtons.appendChild(deleteAllBtn);
        totalForm.appendChild(formButtons);

        totalForm.method='POST';
        totalForm.action='/buyOrder';

        secondSectionLine.insertAdjacentElement('beforebegin',totalForm);

        submitCartBtn.addEventListener('click',(e)=>{
            localStorage.removeItem('cartContents');
            localStorage.removeItem('itemsCounter');
        })

        deleteAllBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            if(!deleteCardItemBoxPresent && !deleteAllItemsBoxPresent){
                let deleteBox=document.createElement('div');
                let deleteMessage=document.createElement('p');
                deleteMessage.textContent='Are you sure you want to drop All Cart Items?';

                let deleteYesBtn=document.createElement('button');
                deleteYesBtn.textContent='Yes';
                deleteYesBtn.classList.add('bg-red-500','hover:text-white','hover:bg-orange-500','border','border-red-800','border-2','rounded','rounded-lg','p-2','font-bold')
                
                let deleteNoBtn=document.createElement('button');
                deleteNoBtn.textContent='No';
                deleteNoBtn.classList.add('bg-red-500','hover:text-white','hover:bg-orange-500','border','border-red-800','border-2','rounded','rounded-lg','p-2','font-bold','ml-12','mt-3')

                deleteBox.appendChild(deleteMessage);
                deleteBox.appendChild(deleteYesBtn);
                deleteBox.appendChild(deleteNoBtn);

                deleteBox.classList.add('deleteDialogBox','bg-red-300','p-2','border','border-2','border-red-600','rounded','rounded-lg','font-bold');

                dragAndDropDialogBox(deleteBox);

                document.body.appendChild(deleteBox);

                deleteAllItemsBoxPresent=true;

                deleteYesBtn.addEventListener('click',()=>{
                    itemsList.innerHTML='';
                    secondSectionLine.insertAdjacentElement('beforebegin',emptyCartItem); 
                    localStorage.removeItem('cartContents');
                    localStorage.setItem('itemsCounter',0);
                    document.querySelector('.items__counter').textContent=localStorage.getItem('itemsCounter');
                    deleteBox.remove();
                    totalForm.remove();
                    deleteAllItemsBoxPresent=false;
                   
                })

                deleteNoBtn.addEventListener('click',()=>{
                    deleteBox.remove();
                    deleteAllItemsBoxPresent=false;
                })
            }
        })
    }
    
}
