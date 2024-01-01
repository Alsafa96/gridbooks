let deleteDialogBoxPresent=false,promoteDialogBoxPresent=false;

let listAllUsers=()=>{

    //Getting handle to the table:-

    let tableOfUsersContainer=document.querySelector('.usersRecordContainer');
    let tableOfUsers=document.querySelector('.ordersRecords');
    tableOfUsers=tableOfUsers.lastElementChild;
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
           let dlgBoxWidth=style.width;
           let dlgBoxHeight=style.height;
           left=left.slice(0,left.indexOf('px'));
           top=top.slice(0,top.indexOf('px'));
           dlgBoxWidth=dlgBoxWidth.slice(0,dlgBoxWidth.indexOf('px'));
           dlgBoxHeight=dlgBoxHeight.slice(0,dlgBoxHeight.indexOf('px'));
           left=Number(left);
           top=Number(top);
           dlgBoxWidth=Number(dlgBoxWidth);
           dlgBoxHeight=Number(dlgBoxHeight);
           xOffset=e.x-xPos;
           yOffset=e.y-yPos;
           xPos=e.x;
           yPos=e.y;
           left+=xOffset;
           top+=yOffset;
           
           //Checking if not beyond screen coordinates for X and Y Axis:-
           if(left >=  window.screenX && left+dlgBoxWidth<window.innerWidth){
                dlgBox.style.left=left+'px';
           }
          
           if(top>= window.screenTop && top+dlgBoxHeight < window.innerHeight ){
                dlgBox.style.top=top+'px';
           }
           
       }
       
   })

   dlgBox.addEventListener('mouseup',()=>{
       pressedDialogBox=false;
       
   })
   dlgBox.addEventListener('mouseout',(e)=>{
       pressedDialogBox=false;
   })

}

window.addEventListener('unload',()=>{
    if(deleteDialogBox){
        deleteDialogBox.remove();
        deleteDialogBoxPresent=false;
    }

    if(promotionConfirmationBox){
        promotionConfirmationBox.remove();
        promoteDialogBoxPresent=false;
    }
})

let promoteUser=(x,y,emailOfUserToPromote)=>{
    if(!promoteDialogBoxPresent && !deleteDialogBoxPresent){
        let promotionConfirmationBox=document.createElement('div');
    promotionConfirmationBox.classList.add('deleteDialogBox','p-3','bg-red-300','rounded','rounded-2xl','border','border-4','border-red-500','text-white','font-bold');

    let confirmationMessage=document.createElement('p');
    confirmationMessage.textContent='Warning::: This Action will Give this user full Admin Privilages, Are You sure?';

    let promoteYesBtn=document.createElement('button');
    promoteYesBtn.textContent='Yes';
    promoteYesBtn.classList.add('text-white','font-bold','mt-6','border','border-2','border-black','hover:cursor-pointer','hover:bg-red-600','rounded','rounded-xl','p-3');

    let  promoteNoBtn=document.createElement('button');
    promoteNoBtn.textContent='No';
    promoteNoBtn.classList.add('text-white','font-bold','ml-24','mt-6','border','border-2','border-black','hover:cursoer-pointer','hover:bg-red-600','rounded','rounded-xl','p-3');

    promotionConfirmationBox.appendChild(confirmationMessage);
    promotionConfirmationBox.appendChild(promoteYesBtn);
    promotionConfirmationBox .appendChild(promoteNoBtn);

    document.body.appendChild(promotionConfirmationBox);
    promoteDialogBoxPresent=true;
    /*promotionConfirmationBox.style.left=x+50+'px';
    promotionConfirmationBox.style.top=y+50+'px';

    dragAndDropDialogBox(promotionConfirmationBox);*/
    if(window.innerWidth>940){
        promotionConfirmationBox.style.left=x -50 +'px';
        promotionConfirmationBox.style.top=y+ window.scrollY-50 +'px';
        promotionConfirmationBox.classList.remove('w-full');
    }
    else if(window.innerWidth<941){
        promotionConfirmationBox.style.left=0+'px';
        promotionConfirmationBox.style.top=y+window.scrollY+'px';
        promotionConfirmationBox.classList.add('w-full');
    }
   

    if(window.innerWidth>940){
        dragAndDropDialogBox(promotionConfirmationBox);
    }

        promoteYesBtn.addEventListener('click',()=>{

            promoteDialogBoxPresent=false;
            promotionConfirmationBox.remove();
            fetch(`http://192.168.0.108:3000/promoteToAdmin/${emailOfUserToPromote}`,{
                method:'get'
            }).then(resp=>{
                return resp.json();
            }).then(resultsNow=>{
                console.log(resultsNow);
            })
        })

        promoteNoBtn.addEventListener('click',()=>{
            promotionConfirmationBox.remove();
            promoteDialogBoxPresent=false;

        })
    }
    
}

let deleteUser=(x,y,emailOfUserToRemove,deletionBtn,index,data)=>{
    if(!deleteDialogBoxPresent && !promoteDialogBoxPresent){
        let deleteDialogBox=document.createElement('div');
        deleteDialogBox.classList.add('deleteDialogBox','p-3','bg-red-300','rounded','rounded-2xl','border','border-4','border-red-500','text-white','font-bold');

        let deleteMessage=document.createElement('p');
        deleteMessage.textContent='Warning::: This Action will Cause Removal of this User, Are You sure you want to proceed?';

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
        if(window.innerWidth>940){
            deleteDialogBox.style.left=x -50 +'px';
            deleteDialogBox.style.top=y+ window.scrollY-50 +'px';
            deleteDialogBox.classList.remove('w-full');
        }
        else if(window.innerWidth<941){
            deleteDialogBox.style.left=0+'px';
            deleteDialogBox.style.top=y+window.scrollY+'px';
            deleteDialogBox.classList.add('w-full');
        }
       

        if(window.innerWidth>940){
            dragAndDropDialogBox(deleteDialogBox);
        }
   

        deleteYesBtn.addEventListener('click',(evt)=>{

            evt.preventDefault();
            if(document.documentElement.clientWidth<941){
                deletionBtn.parentElement.remove();
            }
            else{
                deletionBtn.parentElement.parentElement.remove();
            }
            
            deleteDialogBox.remove();
            deleteDialogBoxPresent=false;
            data.splice(index,1);
            if(document.documentElement.clientWidth>940){
                document.querySelector('.ordersRecords').children[1].textContent='';
                loadLargeScreenSize(data);
            }
            else if(document.documentElement.clientWidth<941){
                document.querySelector('.fullContainer').textContent='';
                loadSmallScreenSize(data);
            }

            fetch(`http://192.168.0.108:3000/deleteUser/${emailOfUserToRemove}`,{
                method:'get'
            })

        })

        deleteNoBtn.addEventListener('click',()=>{
            deleteDialogBox.remove();
            deleteDialogBoxPresent=false;
            return false;
        })

        deleteDialogBoxPresent=true;
    }
}

let loadSmallScreenSize=(data)=>{

    if(deleteDialogBoxPresent || promoteDialogBoxPresent){
        document.querySelector('.deleteDialogBox').classList.add('w-full');
        document.querySelector('.deleteDialogBox').style.top=0+window.innerHeight/4+'px';
        document.querySelector('.deleteDialogBox').style.left=0+'px';
        dragAndDropDialogBox(document.querySelector('.deleteDialogBox'));
    }

    tableOfUsersContainer.remove();
    let fullContainer=document.createElement('div');
    fullContainer.classList.add('fullContainer','w-11/12','h-full');
    for(let dataCounter=0;dataCounter<data.length;dataCounter++){
        let record=document.createElement('div');
        let userNumberRecord=document.createElement('div');
        let userNumber=document.createElement('div');
        userNumber.textContent='No.';
        userNumber.classList.add('w-6/12','text-center','break-words','font-bold','border','border-2','border-black')
        let userNumberValue=document.createElement('div');
        userNumberValue.textContent=dataCounter+1;
        userNumberValue.classList.add('w-6/12','text-center','break-words','font-bold','border','border-2','border-black');
        userNumberRecord.classList.add('flex','flex-row');
        userNumberRecord.appendChild(userNumber);
        userNumberRecord.appendChild(userNumberValue);

        let usersNameRecord=document.createElement('div');
        let usersNameTitle=document.createElement('div');
        let usersNameValue=document.createElement('div');
        usersNameTitle.textContent='User Name';
        usersNameValue.textContent=data[dataCounter].firstName +' ' +data[dataCounter].lastName;
        usersNameTitle.classList.add('w-6/12','text-center','break-words','font-bold','border','border-2','border-black');
        usersNameValue.classList.add('w-6/12','text-center','break-words','font-bold','border','border-2','border-black');
        usersNameRecord.classList.add('flex','flex-row');
        usersNameRecord.appendChild(usersNameTitle);
        usersNameRecord.appendChild(usersNameValue);

        let userAgeRecord=document.createElement('div');
        let userAgeTitle=document.createElement('div');
        let userAgeValue=document.createElement('div');
        userAgeTitle.textContent='Age';
        userAgeValue.textContent=data[dataCounter].age;
        userAgeTitle.classList.add('w-6/12','text-center','break-words','font-bold','border','border-2','border-black');
        userAgeValue.classList.add('w-6/12','text-center','break-words','font-bold','border','border-2','border-black');
        userAgeRecord.classList.add('flex','flex-row');
        userAgeRecord.appendChild(userAgeTitle);
        userAgeRecord.appendChild(userAgeValue);

        let userPhoneNumberRecord=document.createElement('div');
        let userPhoneNumberTitle=document.createElement('div');
        let userPhoneNumberValue=document.createElement('div');
        userPhoneNumberTitle.textContent='Phone Number';
        userPhoneNumberValue.textContent=data[dataCounter].phoneNumber;
        userPhoneNumberTitle.classList.add('w-6/12','text-center','break-words','font-bold','border','border-2','border-black');
        userPhoneNumberValue.classList.add('w-6/12','text-center','break-words','font-bold','border','border-2','border-black');
        userPhoneNumberRecord.classList.add('flex','flex-row');
        userPhoneNumberRecord.appendChild(userPhoneNumberTitle);
        userPhoneNumberRecord.appendChild(userPhoneNumberValue);

        let userEmailRecord=document.createElement('div');
        let userEmailTitle=document.createElement('div');
        let userEmailValue=document.createElement('div');
        userEmailTitle.textContent='Email Address';
        userEmailValue.textContent=data[dataCounter].email;
        userEmailTitle.classList.add('w-6/12','text-center','break-words','font-bold','border','border-2','border-black');
        userEmailValue.classList.add('w-6/12','text-center','break-words','font-bold','border','border-2','border-black');
        userEmailRecord.classList.add('flex','flex-row');
        userEmailRecord.appendChild(userEmailTitle);
        userEmailRecord.appendChild(userEmailValue);

      
        record.appendChild(userNumberRecord);
        record.appendChild(usersNameRecord);
        record.appendChild(userAgeRecord);
        record.appendChild(userPhoneNumberRecord);
        record.appendChild(userEmailRecord);

        //Adding the delete Button:-
        let userRemoveButton=document.createElement('button');
        userRemoveButton.textContent='Remove';

        userRemoveButton.classList.add('bg-gradient-to-b', 'from-blue-900','to-white','p-1','font-bold','rounded','rounded-2xl','border','border-4','border-blue-800','hover:from-gray-900','hover:to-white','block','mt-3','mb-6','mx-auto')
        
        record.appendChild(userRemoveButton);

        //Adding the Promote Button:-
        let userPromotionButton=document.createElement('button');
        userPromotionButton.textContent='Set as Admin';

        userPromotionButton.classList.add('bg-gradient-to-b', 'from-blue-900','to-white','p-1','font-bold','rounded','rounded-2xl','border','border-4','border-blue-800','hover:from-gray-900','hover:to-white','block','mt-3','mb-6','mx-auto')
        
        record.appendChild(userPromotionButton);
        //Adding break after each order:-
        let breakLine=document.createElement('hr');
        breakLine.classList.add('mt-2');

        record.appendChild(breakLine);

        fullContainer.appendChild(record);

        let main=document.querySelector('main');
        main.insertAdjacentElement('afterbegin',fullContainer);

        userRemoveButton.addEventListener('click',(e)=>{
            deleteUser(e.x,e.y,data[dataCounter].email,userRemoveButton,dataCounter,data);
        })

        userPromotionButton.addEventListener('click',(e)=>{
            promoteUser(e.x,e.y,data[dataCounter].email);
        })

    }
    
}

let loadLargeScreenSize=(data)=>{
    if(deleteDialogBoxPresent || promoteDialogBoxPresent){
        document.querySelector('.deleteDialogBox').classList.remove('w-full');
        document.querySelector('.deleteDialogBox').style.top=0+window.innerHeight/2+'px';
        dragAndDropDialogBox(document.querySelector('.deleteDialogBox'));
    }
     for(let i=0;i<data.length;i++){
            let newUser=document.createElement('tr');
            let userName=data[i].firstName+' ' +data[i].lastName;
            let userOrder=document.createElement('td');
            let userNameField=document.createElement('td');
            let userAgeField=document.createElement('td');
            let userAddressField=document.createElement('td');
            let userEmailAddressField=document.createElement('td');
            
            userOrder.textContent=i+1;

            userNameField.textContent=userName;
            userAgeField.textContent=data[i].age;
            userAddressField.textContent=data[i].address;
            userEmailAddressField.textContent=data[i].email;
            newUser.appendChild(userOrder);
            newUser.appendChild(userNameField);
            newUser.appendChild(userAgeField);
            newUser.appendChild(userAddressField);
            newUser.appendChild(userEmailAddressField);

           
            let newUserRemoveCell=document.createElement('td');
            let newUserRemove=document.createElement('button');
            newUserRemove.textContent='Remove';
            newUserRemoveCell.appendChild(newUserRemove);

            newUserRemove.classList.add('bg-gradient-to-b', 'from-blue-900','to-white','p-1','font-bold','rounded','rounded-2xl','border','border-4','border-blue-800','hover:from-gray-900','hover:to-white','mb-2')
    
            newUserRemove.addEventListener('click',(e)=>{
               deleteUser(e.x,e.y,data[i].email,newUserRemove,i,data);

            });

            let promoteUserCell=document.createElement('td');
            let promoteUserButton=document.createElement('button');
            promoteUserButton.textContent='Set as Admin';
            promoteUserCell.appendChild(promoteUserButton);
            promoteUserButton.classList.add('bg-gradient-to-b', 'from-blue-900','to-white','p-1','font-bold','rounded','rounded-2xl','border','border-4','border-blue-800','hover:from-gray-900','hover:to-white','mb-2')

            promoteUserButton.addEventListener('click',(e)=>{
                promoteUser(e.x,e.y,data[i].email);
            });

           

        newUser.appendChild(newUserRemoveCell);
        newUser.appendChild(promoteUserCell);
        
        newUser.classList.add('font-black','font-bold','text-center');

        tableOfUsers.appendChild(newUser);

    } 
    
    let main=document.querySelector('main');
    main.insertAdjacentElement('afterbegin',tableOfUsersContainer);

}

    fetch('http://192.168.0.108:3000/listAllUsers').then(response=>{
        return response.json();
    }).then(data=>{
    
        if(document.documentElement.clientWidth>940){
            loadLargeScreenSize(data);
        }
        else{
        loadSmallScreenSize(data);
        }
        
        window.addEventListener('resize',()=>{
            if(document.documentElement.clientWidth<941){
                if(document.querySelector('.fullContainer')){
                    document.querySelector('.fullContainer').remove();
                }
                loadSmallScreenSize(data);
            }
            else if(document.documentElement.clientWidth>940){
                tableOfUsers.textContent='';
                if(document.querySelector('.fullContainer')){
                    document.querySelector('.fullContainer').remove();
                }
                loadLargeScreenSize(data);
            }
        })
    })
}

listAllUsers();