import {bannerArray} from './main.js';
import {webArray} from './main.js';
import {mobileArray} from './main.js';
import * as wholeData from './main.js';

let newWholeData=Object.assign({},wholeData);

let oldTabNameArray;

let selectedList=localStorage.getItem('listType');

let saveAll=document.querySelector('.saveAll');
let createCard=document.querySelector('.createNewCard');
let removeAll=document.querySelector('.removeAll');

//Getting the goods List:-
let goodsList=document.querySelector('.goodsList');
let command;

let newImagesStore=[];
let newTitle,newImageName,newPrice,newImage;
let newCardOldImageValue;

let editDialogBoxPresent=false,deleteDialogBoxPresent=false;


//Drag and drop to any dialog box:-

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

let createNewCards=function(arrayName,singleArrayElement,cardTitle,cardImage,cardImageName,cardImageAlt,cardPrice){

   
        let card=document.createElement('div');
        card.classList.add('xs:w-full','md:w-2/6','bg-blue-100','rounded','rounded-t-md','border','border-orange-900');
        let title=document.createElement('p');
        title.textContent=cardTitle;
        title.classList.add('font-bold','text-center','p-3');
        let picture=document.createElement('img');
        picture.src=cardImage;
        picture.alt=cardImageAlt;
        let price=document.createElement('p');
        price.textContent=cardPrice;
        price.classList.add('text-center','text-gray-500','font-bold');
        let editBtn=document.createElement('button');
        editBtn.textContent='Edit';
        editBtn.classList.add('text-orange-800','text-center','bg-green-600','font-bold','p-2','rounded','rounded-2xl');
        let deleteBtn=document.createElement('button');
        deleteBtn.textContent='Delete';
        deleteBtn.classList.add('text-orange-800','text-center','bg-green-600','font-bold','float-right','p-2','rounded','rounded-2xl');
        card.appendChild(title);
        card.appendChild(picture);
        card.appendChild(price);
        card.appendChild(editBtn);
        card.appendChild(deleteBtn);
        goodsList.appendChild(card);

        if(!singleArrayElement){
            let newCardObj={
                "name":cardTitle,
                "image":cardImageName,
                "alt":cardTitle,
                "imageClasses":[
                    'web-book',
                    'features-products__product'
                ],
                'hrefLink':'/mobile.html',
                'linkClasses':[
                    'text-gray-800',
                    'ml-20'
                ],
                "price":cardPrice,
                "priceClass":'web-book__price',
                "productInfoClass":'product-info__web-book'
            }
    
            arrayName.push(newCardObj);
            newWholeData.arrayName=arrayName;
        }

        let oldTitle,oldImageName,oldPrice;


        editBtn.addEventListener('click',(e)=>{

            command='Edit';

            if(editBtn.textContent==='Edit'){

                if(!editDialogBoxPresent && !deleteDialogBoxPresent){

                    editDialogBoxPresent=true;

                        let editDialogBox=document.createElement('div');
                    let editForm=document.createElement('form');
                    let formTitle=document.createElement('span');
                    formTitle.textContent='Edit Card Info';
                    formTitle.classList.add('block','font-bold','text-center');
                    editForm.appendChild(formTitle);
                    let titleInput=document.createElement('input');
                    titleInput.setAttribute('type','text');
                    titleInput.classList.add('block','text-center','rounded','rounded-md','outline-none','mb-3','mt-3','font-bold');
                    titleInput.placeholder=editBtn.parentElement.firstElementChild.textContent;
                    let imageTitle=document.createElement('input');
                    imageTitle.classList.add('text-center','rounded','rounded-md','outline-none','mb-3','mt-3','font-bold');
                    let uploadImage=document.createElement('input');
                    uploadImage.setAttribute('type','file');
                    uploadImage.setAttribute('accept','image/*');
                    uploadImage.setAttribute('hidden',true);
                    let uploadImageBtn=document.createElement('button');
                    uploadImageBtn.textContent='...';
                    uploadImageBtn.classList.add('px-2','bg-yellow-300','rounded','rounded-sm','ml-3');
                    let priceInput=document.createElement('input');
                    priceInput.setAttribute('type','text');
                    priceInput.placeholder=price.textContent;
                    priceInput.classList.add('block','text-center','rounded','rounded-md','outline-none','mb-3','mt-3','font-bold');

                    //Preventing the price Field from typing anything other than numbers and Dollar Sign:-
                    priceInput.addEventListener('keypress',(e)=>{
                        if((e.keyCode < 48 && e.keyCode!==36) || e.keyCode > 57){
                            e.preventDefault();
                        }
                    })

                    let okBtn=document.createElement('button');
                    okBtn.textContent='OK';
                    okBtn.classList.add('font-bold','bg-yellow-900','p-3','text-center','rounded','rounded-3xl','mt-5','hover:bg-yellow-500','hover:text-white');
                    let cancelBtn=document.createElement('button');
                    cancelBtn.textContent='Cancel';
                    cancelBtn.classList.add('font-bold','bg-yellow-900','p-3','text-center','rounded','rounded-3xl','mt-5','ml-12','hover:bg-yellow-500','hover:text-white');
                    editForm.appendChild(titleInput);
                    editForm.appendChild(imageTitle);
                    editForm.appendChild(uploadImage);
                    editForm.appendChild(uploadImageBtn);
                    editForm.appendChild(document.createElement('br'));
                    editForm.appendChild(priceInput);
                    editForm.appendChild(okBtn);
                    editForm.appendChild(cancelBtn);
                    editForm.classList.add('border', 'border-2', 'border-black','p-4','bg-yellow-600', 'rounded','rounded-2xl');
                    editDialogBox.appendChild(editForm);
                    editDialogBox.classList.add('editDialogBox');
                    document.body.appendChild(editDialogBox);

                    editDialogBox.style.left=e.x +50 +'px';
                    editDialogBox.style.top=e.y+ 50+'px';

                    dragAndDropDialogBox(editDialogBox);
                    

                    uploadImageBtn.addEventListener('click',(e)=>{
                        e.preventDefault();
                        uploadImage.click();
                        //console.log(uploadImage.files[0]);
                    })

                    uploadImage.addEventListener('change',()=>{
                        if(uploadImage.files){
                            if(uploadImage.files[0].name){
                                imageTitle.setAttribute('value',uploadImage.files[0].name);
                            }
                        }
                    })

                    cancelBtn.addEventListener('click',(e)=>{
                        e.preventDefault();
                        document.body.removeChild(editDialogBox);

                        editDialogBoxPresent=false;
                    })

                    okBtn.addEventListener('click',(e)=>{
                        //Getting The new Values:-
                        e.preventDefault();
                        //let newTitle,newImageName,newPrice,newImage;
                        if(titleInput.value){
                            newTitle=titleInput.value;
                        }
                        else{
                            newTitle=titleInput.placeholder;
                        }
                        if(imageTitle.value){
                            newImageName='../imgs/mobile/'+imageTitle.value;
                            let reader=new FileReader();
                            reader.readAsDataURL(uploadImage.files[0]);
                            reader.onload=()=>{
                                newImage=reader.result;
                                picture.src=newImage;
                                
                                newImage=newImage.replace(/^data:image\/\w+;base64,/, "");
                                let newImageObject={'name':newImageName,'imageValue':newImage};
                                newImagesStore.push(newImageObject);
                            }
                        }
                        else{
                            if(singleArrayElement){
                                newImageName=singleArrayElement.image;
                            }
                            else{
                                newImageName='../imgs/mobile/missing.jpg';
                            }
                        }
                        /*else{
                            newImageName=singleArrayElement.image;
                        }*/
                        if(priceInput.value){
                            newPrice=priceInput.value;
                            if(newPrice.indexOf('$')==-1){
                                newPrice=newPrice+'$';
                            }
                        }
                        else{
                            newPrice=priceInput.placeholder;
                        }

                            let itemIndex=arrayName.findIndex(x=>x.name==cardTitle);

                            arrayName[itemIndex].name=newTitle;
                            arrayName[itemIndex].image=newImageName;
                            arrayName[itemIndex].price=newPrice;
                       
                        newWholeData.arrayName=arrayName;


                        title.textContent=newTitle;
                        price.textContent=newPrice;

                        if(cardTitle!== newTitle || cardImage!==newImageName || cardPrice!==newPrice){
                            editBtn.textContent='Undo';
                        }

                        //Unload The dialog Box:-
                        document.body.removeChild(editDialogBox);

                        editDialogBoxPresent=false;
                    })


                }

                
            }

            else if(editBtn.textContent==='Undo'){

                //Creating Dailog Box to Confirm undoing changes:-
                let confirmationDialog=document.createElement('div');
                confirmationDialog.classList.add('confirmationDialogBox','p-3','border','border-2','border-green-300','rounded','rounded-xl');
                let confirmationMessage=document.createElement('p');
                confirmationMessage.classList.add('font-bold');
                confirmationMessage.textContent='Do You really want to cancel all changes?';
                let yesConfirmationBtn=document.createElement('button');
                yesConfirmationBtn.textContent='Yes';
                yesConfirmationBtn.classList.add('border','border-4','border-black','ml-3','font-bold','rounded','rounded-xl','hover:bg-green-400','hover:cursor-pointer','hover:text-white','p-2','mt-3','bg-green-500');
                let noConfirmationBtn=document.createElement('button');
                noConfirmationBtn.textContent='No';
                noConfirmationBtn.classList.add('border','border-4','border-black','ml-12','font-bold','rounded','rounded-xl','hover:bg-green-400','hover:cursor-pointer','hover:text-white','p-2','mt-3','bg-green-500');
                confirmationDialog.appendChild(confirmationMessage);
                confirmationDialog.appendChild(yesConfirmationBtn);
                confirmationDialog.appendChild(noConfirmationBtn);

                confirmationDialog.style.left=e.x +'px';
                confirmationDialog.style.top=e.y +'px';

                document.body.appendChild(confirmationDialog);

                //Adding Drag and Drop facility:-
                dragAndDropDialogBox(confirmationDialog);

                //If yes Button was pressed:-
                yesConfirmationBtn.addEventListener('click',()=>{

                    if(singleArrayElement){

                        let newImageName=arrayName[arrayName.indexOf(singleArrayElement)].image;

                        arrayName[arrayName.indexOf(singleArrayElement)].name=cardTitle;
                        arrayName[arrayName.indexOf(singleArrayElement)].image=cardImage;
                        arrayName[arrayName.indexOf(singleArrayElement)].price=cardPrice;
                    }

                    newWholeData.arrayName=arrayName;

                    editBtn.textContent='Edit';

                    let indexToDelete=newImagesStore.findIndex(x=> x.name===newImageName);

                    title.textContent=cardTitle;
                    /*if(singleArrayElement){
                        picture.src=oldImageName;
                    }
                    else{
                        picture.src=cardImage;
                    }*/
                    picture.src=cardImage;
                    price.textContent=cardPrice;

                    newImagesStore.splice(indexToDelete,1);

                    document.body.removeChild(confirmationDialog);
                })

                noConfirmationBtn.addEventListener('click',()=>{
                    document.body.removeChild(confirmationDialog);
                })

            }

        })

        deleteBtn.addEventListener('click',(e)=>{

            if(!deleteDialogBoxPresent && !editDialogBoxPresent){
                
                    //Creating Delete Confirmation Dialog:-
                deleteDialogBoxPresent=true;

                let deleteDialogBox=document.createElement('div');
                deleteDialogBox.classList.add('deleteDialogBox','p-3','bg-red-300','rounded','rounded-2xl','border','border-4','border-red-500','text-white','font-bold');

                let deleteMessage=document.createElement('p');
                deleteMessage.textContent='Are You Sure you want to delete the element?';

                let deleteYesBtn=document.createElement('button');
                deleteYesBtn.textContent='Yes';
                deleteYesBtn.classList.add('text-white','font-bold','mt-6','border','border-2','border-black','hover:cursor-pointer','hover:bg-red-600','rounded','rounded-xl','p-3');

                let deleteNoBtn=document.createElement('button');
                deleteNoBtn.textContent='No';
                deleteNoBtn.classList.add('text-white','font-bold','ml-24','mt-6','border','border-2','border-black','hover:cursoer-pointer','hover:bg-red-600','rounded','rounded-xl','p-3');

                deleteDialogBox.appendChild(deleteMessage);
                deleteDialogBox.appendChild(deleteYesBtn);
                deleteDialogBox.appendChild(deleteNoBtn);

                document.body.appendChild(deleteDialogBox);

                deleteDialogBox.style.left=e.x+50+'px';
                deleteDialogBox.style.top=e.y+50+'px';

                dragAndDropDialogBox(deleteDialogBox);

                deleteYesBtn.addEventListener('click',()=>{

                    let indexToRemove=arrayName.findIndex(item=>item.name==title.textContent);
                    //console.log(indexToRemove);
                    if(indexToRemove>-1){
                        arrayName.splice(indexToRemove,1);
                    }
                    card.remove();
                    deleteDialogBox.remove();
                    deleteDialogBoxPresent=false;
                })

                deleteNoBtn.addEventListener('click',()=>{
                    deleteDialogBox.remove();
                    deleteDialogBoxPresent=false;
                })

            }   
            
        })

}


let loadSelectedTabData=function(tabNameArray){
     //Creating Card for Each Mobile Element:-

     //Reserving the array Name:-
     oldTabNameArray=tabNameArray;
     
     if(tabNameArray.length > 0){
        tabNameArray.forEach(tabName=>{
            createNewCards(tabNameArray,tabName,tabName.name,tabName.image,null,tabName.alt,tabName.price);
        })
     }
     else{
        let emptyListMessage=document.createElement('p');
        emptyListMessage.textContent='Sorry! This list is empty right now.';
        emptyListMessage.classList.add('text-center','mx-auto','w-full','font-bold','mb-12','emptyMessageList')
        goodsList.appendChild(emptyListMessage);
     }

    createCard.addEventListener('click',(evt)=>{

        //Checking if list was empty:-
        let isEmptyList=document.querySelector('.emptyMessageList');

        let createNewCardDialogBox=document.createElement('div');
        let createNewCardForm=document.createElement('form');
        let formTitle=document.createElement('span');
        formTitle.textContent='Create New Card';
        formTitle.classList.add('block','font-bold','text-center');
        createNewCardForm.appendChild(formTitle);
        let titleInput=document.createElement('input');
        titleInput.setAttribute('type','text');
        titleInput.classList.add('block','text-center','rounded','rounded-md','outline-none','mb-3','mt-3','font-bold');
        titleInput.placeholder='New Card Name';
        let imageTitle=document.createElement('input');
        imageTitle.classList.add('text-center','rounded','rounded-md','outline-none','mb-3','mt-3','font-bold');
        let uploadImage=document.createElement('input');
        uploadImage.setAttribute('type','file');
        uploadImage.setAttribute('accept','image/*');
        uploadImage.setAttribute('hidden',true);
        let uploadImageBtn=document.createElement('button');
        uploadImageBtn.textContent='...';
        uploadImageBtn.classList.add('px-2','bg-yellow-300','rounded','rounded-sm','ml-3');
        let priceInput=document.createElement('input');
        priceInput.setAttribute('type','text');
        priceInput.placeholder='0$';
        priceInput.classList.add('block','text-center','rounded','rounded-md','outline-none','mb-3','mt-3','font-bold');

        //Preventing the price Field from typing anything other than numbers and Dollar Sign:-
        priceInput.addEventListener('keypress',(e)=>{
            if((e.keyCode < 48 && e.keyCode!==36) || e.keyCode > 57){
                e.preventDefault();
            }
        })

        let okBtn=document.createElement('button');
        okBtn.textContent='OK';
        okBtn.classList.add('font-bold','bg-yellow-900','p-3','text-center','rounded','rounded-3xl','mt-5','hover:bg-yellow-500','hover:text-white');
        let cancelBtn=document.createElement('button');
        cancelBtn.textContent='Cancel';
        cancelBtn.classList.add('font-bold','bg-yellow-900','p-3','text-center','rounded','rounded-3xl','mt-5','ml-12','hover:bg-yellow-500','hover:text-white');
        createNewCardForm.appendChild(titleInput);
        createNewCardForm.appendChild(imageTitle);
        createNewCardForm.appendChild(uploadImage);
        createNewCardForm.appendChild(uploadImageBtn);
        createNewCardForm.appendChild(document.createElement('br'));
        createNewCardForm.appendChild(priceInput);
        createNewCardForm.appendChild(okBtn);
        createNewCardForm.appendChild(cancelBtn);
        createNewCardForm.classList.add('border', 'border-2', 'border-black','p-4','bg-yellow-600', 'rounded','rounded-2xl');
        createNewCardDialogBox.appendChild(createNewCardForm);
        createNewCardDialogBox.classList.add('editDialogBox');
        document.body.appendChild(createNewCardDialogBox);

        createNewCardDialogBox.style.left=evt.x -80 +'px';
        createNewCardDialogBox.style.top=evt.y- 150+'px';

        dragAndDropDialogBox(createNewCardDialogBox);
        

        uploadImageBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            uploadImage.click();
            //console.log(uploadImage.files[0]);
        })

        uploadImage.addEventListener('change',()=>{
            if(uploadImage.files){
                if(uploadImage.files[0].name){
                    imageTitle.setAttribute('value',uploadImage.files[0].name);
                }
            }
        })

        cancelBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            document.body.removeChild(createNewCardDialogBox);

            editDialogBoxPresent=false;
        })

        okBtn.addEventListener('click',(e)=>{
            //Getting The new Values:-
            e.preventDefault();
            let newTitle,newImageName,newPrice,newImage;
            if(titleInput.value){
                newTitle=titleInput.value;
            }
            else{
                newTitle=titleInput.placeholder;
            }

            if(priceInput.value){
                newPrice=priceInput.value;
                if(newPrice.indexOf('$')==-1){
                    newPrice=newPrice+'$';
                }
            }
            else{
                newPrice=priceInput.placeholder;
            }


            let newCardImage;

            if(imageTitle.value){
                newImageName='../imgs/mobile/'+imageTitle.value;
                let reader=new FileReader();
                reader.readAsDataURL(uploadImage.files[0]);
                reader.onload=()=>{
                    newCardImage=reader.result;
                    createNewCards(tabNameArray,null,newTitle,newCardImage,newImageName,newTitle,newPrice);
                }
            }
            else{
                newCardImage='../imgs/mobile/missing.jpg';
                createNewCards(tabNameArray,null,newTitle,newCardImage,newCardImage,newTitle,newPrice);
            }

            if(isEmptyList){
                isEmptyList.remove();
            }

            
            //Unload The dialog Box:-
            document.body.removeChild(createNewCardDialogBox);

            editDialogBoxPresent=false;
        })
    })

    removeAll.addEventListener('click',(e)=>{
        if(!deleteDialogBoxPresent && !editDialogBoxPresent){
                
                //Creating Delete Confirmation Dialog:-
            deleteDialogBoxPresent=true;

            let deleteDialogBox=document.createElement('div');
            deleteDialogBox.classList.add('deleteDialogBox','p-3','bg-red-300','rounded','rounded-2xl','border','border-4','border-red-500','text-white','font-bold');

            let deleteMessage=document.createElement('p');
            deleteMessage.textContent='Warning::: This Action will Remove All The Elements, Are You sure?';

            let deleteYesBtn=document.createElement('button');
            deleteYesBtn.textContent='Yes';
            deleteYesBtn.classList.add('text-white','font-bold','mt-6','border','border-2','border-black','hover:cursor-pointer','hover:bg-red-600','rounded','rounded-xl','p-3');

            let deleteNoBtn=document.createElement('button');
            deleteNoBtn.textContent='No';
            deleteNoBtn.classList.add('text-white','font-bold','ml-24','mt-6','border','border-2','border-black','hover:cursoer-pointer','hover:bg-red-600','rounded','rounded-xl','p-3');

            deleteDialogBox.appendChild(deleteMessage);
            deleteDialogBox.appendChild(deleteYesBtn);
            deleteDialogBox.appendChild(deleteNoBtn);

            document.body.appendChild(deleteDialogBox);

            deleteDialogBox.style.left=e.x-80+'px';
            deleteDialogBox.style.top=e.y-150+'px';

            dragAndDropDialogBox(deleteDialogBox);

            deleteYesBtn.addEventListener('click',()=>{

                goodsList.innerHTML='';
                tabNameArray=[];

                let emptyListMessage=document.createElement('p');
                emptyListMessage.textContent='Sorry! This list is empty right now.';
                emptyListMessage.classList.add('text-center','mx-auto','w-full','font-bold','mb-12','emptyMessageList')
                goodsList.appendChild(emptyListMessage);

                deleteDialogBox.remove();
                deleteDialogBoxPresent=false;
            })

            deleteNoBtn.addEventListener('click',()=>{
                deleteDialogBox.remove();
                deleteDialogBoxPresent=false;

            })

        }   

    })

    saveAll.addEventListener('click',()=>{
        //Creating form to submit the data to the server:-

        let arrayTypeValue;
       
        if(oldTabNameArray===mobileArray){
            arrayTypeValue='mobile';
        }
        else if(oldTabNameArray===webArray){
            arrayTypeValue='web';
        }
        else if(oldTabNameArray===bannerArray){
            arrayTypeValue='banner';
        }

        let changesSubmitFrom=document.createElement('form');
        let dataArrayInput=document.createElement('input');
        dataArrayInput.setAttribute('value',JSON.stringify(tabNameArray));
        dataArrayInput.name='dataArrayInput';
        let newImagesInput=document.createElement('input');
        newImagesInput.setAttribute('value',JSON.stringify(newImagesStore));
        newImagesInput.name='newImagesInput';
        let arrayType=document.createElement('input');
        arrayType.setAttribute('value',arrayTypeValue);
        arrayType.setAttribute('name','arrayType');
        let submitChangesBtn=document.createElement('input');
        submitChangesBtn.type='submit';
        changesSubmitFrom.method='POST';
        changesSubmitFrom.action='/submitGoodsChanges';
        changesSubmitFrom.hidden=true;
        changesSubmitFrom.appendChild(dataArrayInput);
        changesSubmitFrom.appendChild(newImagesInput);
        changesSubmitFrom.appendChild(arrayType);
        changesSubmitFrom.appendChild(submitChangesBtn);
        document.body.appendChild(changesSubmitFrom);
        
        submitChangesBtn.click();

  })  


  
}

switch (selectedList){
    case 'Mobile':
        loadSelectedTabData(mobileArray);
        break;
    case 'Web':
        loadSelectedTabData(webArray);
        break;
    case 'Banner':
        loadSelectedTabData(bannerArray);
        break;
}
