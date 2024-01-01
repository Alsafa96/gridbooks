let deleteDialogBoxPresent=false;deleteAllOrdersDialogBoxPresent=false;
let deleteAllOrders=document.querySelector('.deleteAllOrders');

let allOrdersFullObjectList;

let listAllUsers=()=>{

    //Getting handle to the table:-

    let tableOfOrdersContainer=document.querySelector('.ordersRecordsContainer');
    let tableOfOrders=document.querySelector('.ordersRecords');
    tableOfOrders=tableOfOrders.lastElementChild;
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
            if(left >= window.screenX && left+dlgBoxWidth<window.innerWidth){
                dlgBox.style.left=left+'px';
            }
          
           if(top>= window.screenTop  && top  +dlgBoxHeight < window.innerHeight + window.scrollY ){
                dlgBox.style.top=top+'px';
           }

           else if(top>= window.screenTop && top +dlgBoxHeight>=window.innerHeight+window.scrollY){
                let dlgBoxTop=Number(dlgBox.style.top.slice(0,dlgBox.style.top.indexOf('px')));
                if(top<=dlgBoxTop){
                    dlgBox.style.top=top+'px';
                }
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
})

let deleteAllOrdersFunction=(data)=>{
    deleteAllOrders.addEventListener('click',(e)=>{
        if(!deleteDialogBoxPresent && !deleteAllOrdersDialogBoxPresent && tableOfOrders.childNodes.length>0){
            let deleteAllDialogBox=document.createElement('div');
            deleteAllDialogBox.classList.add('deleteDialogBox','p-3','bg-red-300','rounded','rounded-2xl','border','border-4','border-red-500','text-white','font-bold');

            let deleteAllMessage=document.createElement('p');
            deleteAllMessage.textContent='Warning::: This Action will Cause Removal of all orders in your DB, Are You sure you want to proceed?';
            
            let deleteAllYesBtn=document.createElement('button');
            deleteAllYesBtn.textContent='Yes';
            deleteAllYesBtn.classList.add('text-white','font-bold','border','border-2','border-black','hover:cursor-pointer','hover:bg-red-600','rounded','rounded-xl','p-3');

            let deleteAllNoBtn=document.createElement('button');
            deleteAllNoBtn.textContent='No';
            deleteAllNoBtn.classList.add('text-white','font-bold','ml-24','border','border-2','border-black','hover:cursoer-pointer','hover:bg-red-600','rounded','rounded-xl','p-3');

            deleteAllDialogBox.appendChild(deleteAllMessage); 
            deleteAllDialogBox.appendChild(deleteAllYesBtn);
            deleteAllDialogBox.appendChild(deleteAllNoBtn);

            document.body.appendChild(deleteAllDialogBox);
            if(window.innerWidth>940){
                deleteAllDialogBox.style.left=e.x -50 +'px';
                deleteAllDialogBox.style.top=e.y+ window.scrollY-50 +'px';
                deleteAllDialogBox.classList.remove('w-full');
            }
            else if(window.innerWidth<941){
                deleteAllDialogBox.style.left=0+'px';
                deleteAllDialogBox.style.top=e.y+window.scrollY+'px';
                deleteAllDialogBox.classList.add('w-full');
            }

            dragAndDropDialogBox(deleteAllDialogBox);

            deleteAllYesBtn.addEventListener('click',(evt)=>{

                //newOrder.remove();
                if(document.documentElement.clientWidth>940){
                    tableOfOrders.textContent='';
                }
                else{
                    document.querySelector('.fullContainer').textContent='';
                }
                
                deleteAllDialogBox.remove();
                deleteAllOrdersDialogBoxPresent=false;
                //window.location.href=`http://192.168.0.111:3000/deleteOrder/${orderName}`;
                fetch('http://192.168.0.108:3000/deleteAllOrders',{
                     method:'GET'
                })
                
                data.splice(0,data.length);
            })

            deleteAllNoBtn.addEventListener('click',()=>{
                deleteAllDialogBox.remove();
                deleteAllOrdersDialogBoxPresent=false;

            })

            deleteAllOrdersDialogBoxPresent=true;
        }
           
    })
    
}

let deleteOrder=(x,y,nameOfOrderToRemove,deletionBtn,index,data)=>{
    if(!deleteDialogBoxPresent && !deleteAllOrdersDialogBoxPresent){
        let deleteDialogBox=document.createElement('div');
        deleteDialogBox.classList.add('deleteDialogBox','p-3','bg-red-300','rounded','rounded-2xl','border','border-4','border-red-500','text-white','font-bold');

        let deleteMessage=document.createElement('p');
        deleteMessage.textContent='Warning::: This Action will Cause Removal of this Order, Are You sure you want to proceed?';

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

            //newOrder.remove();
            //evt.target.parentElement.remove();
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

           
            fetch(`http://192.168.0.108:3000/deleteOrder/${nameOfOrderToRemove}`,{
                method:'get'
            }).then(del=>{
                return true;
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

//Loading large Screens:-
let loadLargeScreenSize=(data)=>{
    if(deleteDialogBoxPresent || deleteAllOrdersDialogBoxPresent){
        document.querySelector('.deleteDialogBox').classList.remove('w-full');
        document.querySelector('.deleteDialogBox').style.top=0+window.innerHeight/2+'px';
        dragAndDropDialogBox(document.querySelector('.deleteDialogBox'));
    }
     for(let i=0;i<data.length;i++){
            let newOrder=document.createElement('tr');
            let orderName=data[i].orderName;
            let order=document.createElement('td');
            let orderNameField=document.createElement('td');
            let orderPrice=document.createElement('td');
            let orderDate=document.createElement('td');
            let orderTime=document.createElement('td');
            let orderQuantity=document.createElement('td');
            let customerName=document.createElement('td');
            
            order.textContent=i+1;

            orderNameField.textContent=orderName;
            orderPrice.textContent=data[i].orderPrice;
            orderDate.textContent=data[i].orderDate;
            orderTime.textContent=data[i].orderTime;
            orderQuantity.textContent=data[i].orderQuantity;
            customerName.textContent=data[i].userName;
            newOrder.appendChild(order);
            newOrder.appendChild(orderNameField);
            newOrder.appendChild(orderPrice);
            newOrder.appendChild(orderDate);
            newOrder.appendChild(orderTime);
            newOrder.appendChild(orderQuantity);
            newOrder.appendChild(customerName);
            //tableOfOrders.appendChild(newOrder);

           
            
            let newOrderRemoveCell=document.createElement('td');
            let newOrderRemove=document.createElement('button');
            newOrderRemove.textContent='Remove';
            newOrderRemoveCell.appendChild(newOrderRemove);

            newOrderRemove.classList.add('bg-gradient-to-b', 'from-blue-900','to-white','p-1','font-bold','rounded','rounded-2xl','border','border-4','border-blue-800','hover:from-gray-900','hover:to-white','mb-2')
    
            newOrderRemove.addEventListener('click',(e)=>{
                //data.splice(i,1);
                //tableOfOrders.children[i].remove
                deleteOrder(e.x,e.y,orderName,newOrderRemove,i,data);
            });
           

        newOrder.appendChild(newOrderRemoveCell);

        newOrder.classList.add('font-black','font-bold','text-center');

        tableOfOrders.appendChild(newOrder);

    } 
    
    let main=document.querySelector('main');
    main.insertAdjacentElement('afterbegin',tableOfOrdersContainer);
    deleteAllOrdersFunction(data);

}

//Loading Small Screens:-
let loadSmallScreenSize=(data)=>{

    if(deleteDialogBoxPresent || deleteAllOrdersDialogBoxPresent){
        document.querySelector('.deleteDialogBox').classList.add('w-full');
        document.querySelector('.deleteDialogBox').style.top=0+window.innerHeight/4+'px';
        document.querySelector('.deleteDialogBox').style.left=0+'px';
        dragAndDropDialogBox(document.querySelector('.deleteDialogBox'));
    }

    tableOfOrdersContainer.remove();
    let fullContainer=document.createElement('div');
    fullContainer.classList.add('fullContainer','w-11/12','h-full');
    for(let dataCounter=0;dataCounter<data.length;dataCounter++){
        let record=document.createElement('div');
        let orderNumberRecord=document.createElement('div');
        let recordNumber=document.createElement('div');
        recordNumber.textContent='No.';
        recordNumber.classList.add('w-6/12','text-center','font-bold','border','border-2','border-black')
        let recordNumberValue=document.createElement('div');
        recordNumberValue.textContent=dataCounter+1;
        recordNumberValue.classList.add('w-6/12','text-center','font-bold','border','border-2','border-black');
        orderNumberRecord.classList.add('flex','flex-row');
        orderNumberRecord.appendChild(recordNumber);
        orderNumberRecord.appendChild(recordNumberValue);

        let orderNameRecord=document.createElement('div');
        let orderNameTitle=document.createElement('div');
        let orderNameValue=document.createElement('div');
        orderNameTitle.textContent='Order Name';
        orderNameValue.textContent=data[dataCounter].orderName;
        orderNameTitle.classList.add('w-6/12','text-center','font-bold','border','border-2','border-black');
        orderNameValue.classList.add('w-6/12','text-center','font-bold','border','border-2','border-black');
        orderNameRecord.classList.add('flex','flex-row');
        orderNameRecord.appendChild(orderNameTitle);
        orderNameRecord.appendChild(orderNameValue);

        let orderPriceRecord=document.createElement('div');
        let orderPriceTitle=document.createElement('div');
        let orderPriceValue=document.createElement('div');
        orderPriceTitle.textContent='Price';
        orderPriceValue.textContent=data[dataCounter].orderPrice;
        orderPriceTitle.classList.add('w-6/12','text-center','font-bold','border','border-2','border-black');
        orderPriceValue.classList.add('w-6/12','text-center','font-bold','border','border-2','border-black');
        orderPriceRecord.classList.add('flex','flex-row');
        orderPriceRecord.appendChild(orderPriceTitle);
        orderPriceRecord.appendChild(orderPriceValue);

        let orderDateRecord=document.createElement('div');
        let orderDateTitle=document.createElement('div');
        let orderDateValue=document.createElement('div');
        orderDateTitle.textContent='Order Date';
        orderDateValue.textContent=data[dataCounter].orderDate;
        orderDateTitle.classList.add('w-6/12','text-center','font-bold','border','border-2','border-black');
        orderDateValue.classList.add('w-6/12','text-center','font-bold','border','border-2','border-black');
        orderDateRecord.classList.add('flex','flex-row');
        orderDateRecord.appendChild(orderDateTitle);
        orderDateRecord.appendChild(orderDateValue);

        let orderTimeRecord=document.createElement('div');
        let orderTimeTitle=document.createElement('div');
        let orderTimeValue=document.createElement('div');
        orderTimeTitle.textContent='Order Time';
        orderTimeValue.textContent=data[dataCounter].orderTime;
        orderTimeTitle.classList.add('w-6/12','text-center','font-bold','border','border-2','border-black');
        orderTimeValue.classList.add('w-6/12','text-center','font-bold','border','border-2','border-black');
        orderTimeRecord.classList.add('flex','flex-row');
        orderTimeRecord.appendChild(orderTimeTitle);
        orderTimeRecord.appendChild(orderTimeValue);

        let orderQuantityRecord=document.createElement('div');
        let orderQuantityTitle=document.createElement('div');
        let orderQuantityValue=document.createElement('div');
        orderQuantityTitle.textContent='Order Quantity';
        orderQuantityValue.textContent=data[dataCounter].orderQuantity;
        orderQuantityTitle.classList.add('w-6/12','text-center','font-bold','border','border-2','border-black');
        orderQuantityValue.classList.add('w-6/12','text-center','font-bold','border','border-2','border-black');
        orderQuantityRecord.classList.add('flex','flex-row');
        orderQuantityRecord.appendChild(orderQuantityTitle);
        orderQuantityRecord.appendChild(orderQuantityValue);

        let userNameRecord=document.createElement('div');
        let userNameTitle=document.createElement('div');
        let userNameValue=document.createElement('div');
        userNameTitle.textContent='Customer Name';
        userNameValue.textContent=data[dataCounter].userName;
        userNameTitle.classList.add('w-6/12','text-center','font-bold','border','border-2','border-black');
        userNameValue.classList.add('w-6/12','text-center','font-bold','border','border-2','border-black');
        userNameRecord.classList.add('flex','flex-row');
        userNameRecord.appendChild(userNameTitle);
        userNameRecord.appendChild(userNameValue);



        record.appendChild(orderNumberRecord);
        record.appendChild(orderNameRecord);
        record.appendChild(orderPriceRecord);
        record.appendChild(orderDateRecord);
        record.appendChild(orderTimeRecord);
        record.appendChild(orderQuantityRecord);
        record.appendChild(userNameRecord);

        //Adding the delete Button:-
        let orderRemoveButton=document.createElement('button');
        orderRemoveButton.textContent='Remove';

        orderRemoveButton.classList.add('bg-gradient-to-b', 'from-blue-900','to-white','p-1','font-bold','rounded','rounded-2xl','border','border-4','border-blue-800','hover:from-gray-900','hover:to-white','block','mt-3','mb-6','mx-auto')
        
        record.appendChild(orderRemoveButton);
        //Adding break after each order:-
        let breakLine=document.createElement('hr');
        breakLine.classList.add('mt-2');

        record.appendChild(breakLine);

        fullContainer.appendChild(record);
        //tableOfOrdersContainer.appendChild(fullContainer);
        let main=document.querySelector('main');
        main.insertAdjacentElement('afterbegin',fullContainer);

        orderRemoveButton.addEventListener('click',(e)=>{
            let orderTable=e.target.parentElement;
            let orderNameRow=orderTable.children[1];
            let nameOfOrder=orderNameRow.children[1].textContent;
            //data.splice(dataCounter,1);
            deleteOrder(e.x,e.y,nameOfOrder,orderRemoveButton,dataCounter,data);
            
        })
        deleteAllOrdersFunction(data);
    }
    
}


    fetch('http://192.168.0.108:3000/allOrdersList').then(response=>{
        return response.json();
    }).then(data=>{

        if(document.documentElement.clientWidth>940){
        loadLargeScreenSize(data);
       }
       else{
        loadSmallScreenSize(data);
       }
        //loadSmallScreenSize(data);
        window.addEventListener('resize',()=>{
            if(document.documentElement.clientWidth<941){
                if(document.querySelector('.fullContainer')){
                    document.querySelector('.fullContainer').remove();
                }
                loadSmallScreenSize(data);
            }
            else if(document.documentElement.clientWidth>940){
                tableOfOrders.textContent='';
                if(document.querySelector('.fullContainer')){
                    document.querySelector('.fullContainer').remove();
                }
                loadLargeScreenSize(data);
            }
        })
    })
}

listAllUsers();
