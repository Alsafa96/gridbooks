//console.log(featuredProductsArray);

let app=()=>{
    //Books Array:-
    let books_arr=[{img_src:'./imgs/spiral_book.jpg',book_name:'Custom Pack Pro',book_description:'Mix and Match books and pads for web and mobile sketching',book_price:'$48',background_color:'grey'},
    {img_src:'./imgs/webbook.jpg',book_name:'Web Book',book_description:'Grid Set for versatile web sketching in 4,5,6,12 and 16 columns',book_price:'$18',background_color:'steelblue'},
    {img_src:'./imgs/mobilebook.jpg',book_name:'Mobile Book',book_description:'Grid Set for mobile sketching in 6:9, 6:10 and 4:3 ratios. iPhone,Android and tablet.',book_price:'$18',background_color:'orangered'}
    ]

    let navbar__magnifying__text=document.querySelector('.searchText');

    //Items counter:-
    let counter=localStorage.getItem('itemsCounter') || 0;
    if(counter===0){
        localStorage.setItem('itemsCounter',counter);
    }

    createSlider: {
        let slideSelector=0;
        let slider=document.querySelector('.books-slider');
    
        if(!slider) break createSlider;

        let renderSlide=(slide_index)=>{
            booksSliderImage.src=books_arr[slide_index].img_src;
            let bookPriceIcon=document.createElement('i');
            bookPriceIcon.classList.add('fa','fa-angle-right');
            bookType.textContent=books_arr[slide_index].book_name;
            bookDescription.textContent=books_arr[slide_index].book_description;
            bookPrice.innerHTML=books_arr[slide_index].book_price +' - order now '
            bookPrice.appendChild(bookPriceIcon);
            slider.style.backgroundColor=books_arr[slide_index].background_color;
        }
    
        let booksSliderImage=document.querySelector('.books-slider__image-container');
        
        let bookType=document.querySelector('.book-type');
        let bookDescription=document.querySelector('.book-type-desc');
        let bookPrice=document.querySelector('.price-order');

        bookPrice.addEventListener('click',()=>{
            counter=localStorage.getItem('itemsCounter');
            counter++;
            items__counter.innerText=counter;
            localStorage.setItem('itemsCounter',counter);
        })

    
        let secondPassed=0;
    
        renderSlide(slideSelector);
        //Adding Information to the slide:-
    
        let leftButton=document.querySelector('.left-btn');
        let rightButton=document.querySelector('.right-btn');
    
        leftButton.addEventListener('click',()=>{
            slideSelector--;
            if(slideSelector<0){
                slideSelector=2;
            }
            slider.classList.add('books-slider__fadeOut');
            slider.classList.remove('books-slider__fadeIn');
            setTimeout(renderSlide,100,slideSelector);
            setTimeout(function(){
                slider.classList.add('books-slider__fadeIn');
                slider.classList.remove('books-slider__fadeOut');
            },100);
    
            secondPassed=0;
            
        })
    
        rightButton.addEventListener('click',()=>{
            slideSelector++;
            if(slideSelector>2){
                slideSelector=0;
            }
            slider.classList.add('books-slider__fadeOut');
            slider.classList.remove('books-slider__fadeIn');
            setTimeout(renderSlide,100,slideSelector);
            setTimeout(function(){
                slider.classList.add('books-slider__fadeIn');
                slider.classList.remove('books-slider__fadeOut');
            },100);
    
            secondPassed=0;
        })
    
        //flip the slide every two seconds:-
        setInterval(()=>{
            secondPassed++;
            if(secondPassed===5){
                rightButton.click();
                secondPassed=0;
            }
        },1000);
        
    
    }
    
    //Creating Humburger Icon Menu items:
    let navbar=document.querySelector('.navbar');
        let showMenu=()=>{

            if(!document.querySelector('.items__menu')){
                let itemsMenu=document.createElement('UL');
                itemsMenu.className='items__menu';
                let menuItemsNames=['Home','Web','Mobile','Banner','About gridBooks','Blog','Where To Buy'];
                let specialItems=['Web','Mobile','Banner'];
                navbar.insertAdjacentElement('afterend',itemsMenu);
                //Create The items:-
                for(let i=0;i<menuItemsNames.length;i++){
                    let newItem=document.createElement('LI');
                    newItem.innerText=menuItemsNames[i];
                    //if(specialItems.indexOf(newItem.innerText)!==-1){
                        newItem.innerText='';
                        let newItemLink=document.createElement('a');
                        newItemLink.innerText=menuItemsNames[i];
                        newItemLink.className=newItemLink.innerText;
                        if(!specialItems.includes(menuItemsNames[i])){
                            newItemLink.style.color='black';
                        }
                        if(newItemLink.innerText==='Home'){
                            newItemLink.href='index.html';
                        }
                        else if(newItemLink.innerText==='Web'){
                            newItemLink.href='web.html'
                        }
                        else if(newItemLink.innerText==='Mobile'){
                            newItemLink.href='mobile.html';
                        }
                        else if(newItemLink.innerText==='Banner'){
                            newItemLink.href='banner.html'
                        }
                        else if(newItemLink.innerText==='About gridBooks'){
                            newItemLink.href='about.html';
                        }

                        else if(newItemLink.innerText==='Where To Buy'){
                            newItemLink.href='WhereToBuy.html';
                        }

                        else if(newItemLink.innerText==='Blog'){
                            newItemLink.href='loadAllBlogs.html';
                        }
                        
                        newItem.appendChild(newItemLink);
                    //}
                    itemsMenu.appendChild(newItem);
                }
                itemsMenu.insertAdjacentElement('afterend',document.createElement('hr'));
            }
           
            else{
                document.querySelector('.items__menu').style.display='flex';
            }

        }

    let humburgerMenu=document.querySelector('.fa-bars');
    humburgerMenu.addEventListener('click',()=>{
        if(!document.querySelector('.items__menu') || document.querySelector('.items__menu').style.display=='none'){
            showMenu();
            humburgerMenu.style.backgroundColor='#545557';
            humburgerMenu.style.color='whitesmoke';
        }

        else{
            document.querySelector('.items__menu').style.display='none';
            humburgerMenu.style.backgroundColor='transparent';
            humburgerMenu.style.color='#C6C6C6';
        }
    })

    window.addEventListener('click',(e)=>{
        if(document.querySelector('.items__menu')){
            if(!e.target.classList.contains('items__menu') && !e.target.classList.contains('humburger__icon') && window.innerWidth <941){
                document.querySelector('.items__menu').style.display='none';
                humburgerMenu.style.backgroundColor='transparent';
                humburgerMenu.style.color='#C6C6C6';
            }
        }
       
    })

    let oldWindowSize=window.innerWidth;
    let shopping_cart,user_account,navbar__icon__magnifying_glass;
    user_account=document.querySelector('.user-account').cloneNode(true);
    //let profilePictureIconImage;
    shopping_cart=document.querySelector('.shopping-cart').cloneNode(true);
    navbar__icon__magnifying_glass=document.querySelector('.navbar__icon__magnifying-glass').cloneNode(true);
    //user_account.setAttribute('data-text','Alsafa');

    if(document.cookie){
        fetch('http://192.168.0.108:3000/getCurrentUser').then(response=>{
            return response.json();
        }).then(data=>{
            if(data){
                //alert(data);
                if(typeof data ==='object'){
                    let userName=data.firstName
                    let profileImageIcon=document.createElement('img');
                    profileImageIcon.className='profilePicture';
                    profileImageIcon.width='30';
                    profileImageIcon.height='25';
                    if(data.profilePicture){
                        profileImageIcon.src='imgs/Profile/' + data.profilePicture;
                    }
                    else{
                        profileImageIcon.src='imgs/Profile/unknown.jpg';
                    }
                    
                    profileImageIcon.classList.add('rounded','rounded-3xl','inline-block','ml-8','mr-1','mb-2','profileImageIcon');
                    user_account.setAttribute('data-text',userName);
                    if(document.querySelector('.headerItemsContainer')){
                        user_account.appendChild(profileImageIcon);
                    }
                    else{
                        navbar.querySelector('.user-account').appendChild(profileImageIcon);
                    }
                   
                    //The Settings Icon:-
                    /*let cogIcon=document.createElement('i');
                    cogIcon.classList.add('fa','fa-cog','fa-xl','ml-2','cursor-pointer');
                    user_account.insertAdjacentElement('afterend',cogIcon);*/

                    //The Drop down menu:-
                    let dropDownSubMenu=document.createElement('div');
                    //Creating the sub items:-
                    let optionsList=document.createElement('ul');
                    //Creating each Item:-

                    //First:- The Profile Icon:-
                    let profileLinkItem=document.createElement('li');
                    profileLinkItem.classList.add('userDropDownMenuItem','p-2');
                    let profileLink=document.createElement('a');
                    profileLink.textContent='Profile';
                    let profileLinkIcon=document.createElement('i');
                    profileLinkIcon.classList.add('fa','fa-user','fa-2x','mr-2');
                    profileLink.insertAdjacentElement('afterbegin',profileLinkIcon);
                    profileLinkItem.classList.add('cursor-pointer');
                    profileLink.href='/getProfile';
                    profileLinkItem.appendChild(profileLink);
                    optionsList.appendChild(profileLinkItem);
                    optionsList.appendChild(document.createElement('hr'));

                    //Second:- The Account Settings Icon:-
                    let accountSettingsItem=document.createElement('li');
                    accountSettingsItem.classList.add('userDropDownMenuItem','p-2');
                    let accountSettingsLink=document.createElement('a');
                    accountSettingsLink.textContent='Account Settings';
                    let accountSettingsIcon=document.createElement('i');
                    accountSettingsIcon.classList.add('fa','fa-cog','fa-2x','mr-2');
                    accountSettingsLink.insertAdjacentElement('afterbegin',accountSettingsIcon);
                    accountSettingsItem.classList.add('cursor-pointer');
                    accountSettingsLink.href='/accountSettings.html';
                    accountSettingsItem.appendChild(accountSettingsLink);
                    optionsList.appendChild(accountSettingsItem);
                    optionsList.appendChild(document.createElement('hr'));
                    
                    //Third:- The orders List:-
                    let ordersListItem=document.createElement('li');
                    ordersListItem.classList.add('userDropDownMenuItem','p-2');
                    let ordersListLink=document.createElement('a');
                    ordersListLink.textContent='Orders List';
                    let ordersListIcon=document.createElement('i');
                    ordersListIcon.classList.add('fa','fa-list','fa-2x','mr-2');
                    ordersListLink.insertAdjacentElement('afterbegin',ordersListIcon);
                    ordersListItem.classList.add('cursor-pointer');
                    ordersListLink.href='/orders.html';
                    ordersListItem.appendChild(ordersListLink);
                    optionsList.appendChild(ordersListItem);
                    optionsList.appendChild(document.createElement('hr'));

                    //Forth:- Blogs list
                    let blogsListItem=document.createElement('li');
                    blogsListItem.classList.add('userDropDownMenuItem','p-2');
                    let blogsListLink=document.createElement('a');
                    blogsListLink.textContent='My Blogs';
                    let blogsListIcon=document.createElement('i');
                    blogsListIcon.classList.add('fa','fa-book','fa-2x','mr-2');
                    blogsListLink.insertAdjacentElement('afterbegin',blogsListIcon);
                    blogsListItem.classList.add('cursor-pointer');
                    blogsListLink.href='/myBlogs.html';
                    blogsListItem.appendChild(blogsListLink);
                    optionsList.appendChild(blogsListItem);
                    optionsList.appendChild(document.createElement('hr'));
                    //If Admin is logged in, get access to admin control panel:-
                    if(data.admin===true){
                        let adminPanel=document.createElement('li');
                        adminPanel.classList.add('userDropDownMenuItem','p-2');
                        let adminPanelLink=document.createElement('a');
                        adminPanelLink.textContent='Admin';
                        adminPanelLink.href='/admin-main.html';
                        let adminPanelIcon=document.createElement('i');
                        adminPanelIcon.classList.add('adminPanel','fa','fa-dashboard','fa-2x','mr-2');
                        adminPanel.classList.add('cursor-pointer');
                        adminPanelLink.insertAdjacentElement('afterbegin',adminPanelIcon);
                        adminPanel.appendChild(adminPanelLink);
                        optionsList.appendChild(adminPanel);
                        optionsList.appendChild(document.createElement('hr'));
                    }
                    
                    //Sixth:- Sign out:-
                    let signOutListItem=document.createElement('li');
                    signOutListItem.classList.add('userDropDownMenuItem','p-2');
                    let signOutListIcon=document.createElement('i');
                    signOutListIcon.classList.add('signOut','fa','fa-sign-out','fa-2x','mr-2');
                    //signOutListLink.insertAdjacentElement('afterbegin',signOutListIcon);
                    signOutListItem.classList.add('cursor-pointer');
                    signOutListItem.textContent='Sign Out';
                    signOutListItem.insertAdjacentElement('afterbegin',signOutListIcon);
                    optionsList.appendChild(signOutListItem);

                    signOutListItem.addEventListener('click',()=>{
                        document.cookie = "emailAddress=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                        window.location.href='/index.html';
                    })

                    dropDownSubMenu.appendChild(optionsList);

                    dropDownSubMenu.classList.add('dropDownSubMenu');
                    //user_account.insertAdjacentElement('afterend',dropDownSubMenu);
                    document.body.appendChild(dropDownSubMenu);

                    user_account.addEventListener('click',()=>{
                        dropDownSubMenu.classList.toggle('dropDownSubMenuActive');
                    })

                    let menuItem=document.querySelectorAll('.userDropDownMenuItem');

                    menuItem.forEach(item=>{
                        item.addEventListener('mousemove',(e)=>{
                            item.classList.add('bg-blue-800','text-white');
                        })

                        item.addEventListener('mouseout',(e)=>{
                            item.classList.remove('bg-blue-800','text-white');
                        })
                    })

                    document.addEventListener('click',(e)=>{
                        if(e.target!==user_account && e.target!==profileImageIcon && e.target!==document.querySelector('.left-btn') && e.target!==document.querySelector('.right-btn') && e.target.closest('.dropDownSubMenu')===null){
                            dropDownSubMenu.classList.remove('dropDownSubMenuActive');
                        }
                    })
                }
                else{
                    let loginIcon=document.createElement('i');
                    loginIcon.classList.add('fa','fa-user','fa-2x','navbar__icon');
                    user_account.appendChild(loginIcon);
                    user_account.setAttribute('data-text','Login');
                    //window.location.href='/account.html';
                    //profilePictureIconImage=loginIcon;
                }
                
            }
            else{
                let loginIcon=document.createElement('i');
                loginIcon.classList.add('fa','fa-user','fa-2x','navbar__icon');
                user_account.appendChild(loginIcon);
                user_account.setAttribute('data-text','Login');
                user_account.setAttribute('data-text','Login');
                //window.location.href='/account.html';
                //profilePictureIconImage=loginIcon;
            }
        })
    }
    else{
        let loginIcon=document.createElement('i');
        loginIcon.classList.add('fa','fa-user','fa-2x','navbar__icon');
        user_account.appendChild(loginIcon);
        user_account.setAttribute('data-text','Login');

        let navbar_loginIcon=loginIcon.cloneNode(true);

        navbar.querySelector('.user-account').appendChild(navbar_loginIcon);

        loginIcon.addEventListener('click',()=>{
            window.location.href='/login';
        })

        navbar_loginIcon.addEventListener('click',()=>{
            window.location.href='/login';
        })
        
    }

    let items__counter=document.createElement('span');
    items__counter.className='items__counter';

    //Loading the screen in small size:-

    let loadSmallScreen=()=>{
        if(document.querySelector('.items__menu')){
            document.querySelector('.items__menu').style.display='none';
        }
        if(document.querySelector('.headerItemsContainer')){
            document.querySelector('.headerItemsContainer').style.display='none';
        }
        
       
        if(document.querySelector('.profilePicture')){
            navbar.querySelector('.user-account').appendChild(document.querySelector('.profilePicture'));
        }
       
        navbar.querySelector('.user-account').addEventListener('click',()=>{
            document.querySelector('.dropDownSubMenu').classList.toggle('dropDownSubMenuActive');    
        })

    }

    document.querySelector('.navbar__icon__magnifying-glass').lastElementChild.classList.add('searchText');

    document.querySelector('.navbar__icon__magnifying-glass').addEventListener('click',()=>{
        window.location.href='/search.html';
    })


    //Loading the screen in large size:-
    let loadLargeScreen=()=>{
        showMenu();
        if(!document.querySelector('.headerItemsContainer')){
            let headerItemsContainer=document.createElement('div');
            headerItemsContainer.appendChild(shopping_cart);
            headerItemsContainer.appendChild(user_account);
            shopping_cart.appendChild(items__counter);
            headerItemsContainer.appendChild(navbar__icon__magnifying_glass);
            headerItemsContainer.className='headerItemsContainer';
            document.querySelector('header').appendChild(headerItemsContainer);
        }
        else{
            document.querySelector('.headerItemsContainer').style.display='block';
        }

        let profilePicture=document.querySelector('.profilePicture');
        if(profilePicture){
            document.querySelector('.headerItemsContainer').querySelector('.user-account').appendChild(document.querySelector('.profilePicture'));
        }
        
    }

    let removePopupBanner=()=>{
        if(document.querySelector('.popup_banner')){
            document.querySelector('.popup_banner').remove();
        }
       
    }

   

    let addRemovePopupBanner=()=>{
        if(!document.querySelector('.popup_banner')){
            let popup_banner=document.createElement('div');
            let arrow=document.createElement('div');
            let popup_text=document.createElement('span');
            popup_text.innerText='Your cart is currently empty!';
            arrow.className='arrow';
            arrow.classList.add('up');
            popup_banner.appendChild(arrow);
            popup_banner.className='popup_banner';
            popup_banner.appendChild(popup_text);
            document.querySelector('header').appendChild(popup_banner);
            return;
           
          } else{
            document.querySelector('.popup_banner').remove();
          }
    }
   

    window.addEventListener('resize',()=>{
        
        if(oldWindowSize>=941 && window.innerWidth<941){
            loadSmallScreen();
            removePopupBanner(); 
        }
        else if(window.innerWidth>=941 && oldWindowSize<941){
            loadLargeScreen();
        }
        oldWindowSize=window.innerWidth;

        if(document.querySelector('.headerItemsContainer')){
            document.querySelector('.headerItemsContainer').lastElementChild.addEventListener('click',()=>{
                window.location.href='/search.html';
            })
        }
       

    })

    window.addEventListener('load',()=>{
        if(window.innerWidth>=941){
            //loadLargeScreen();
            items__counter.innerText=counter;
            shopping_cart.appendChild(items__counter);
            loadLargeScreen();
            //document.querySelector('.navbar__icon__magnifying-glass').appendChild(navbar__magnifying__text);
            document.querySelector('.headerItemsContainer').lastElementChild.addEventListener('click',()=>{
                window.location.href='/search.html';
            })
        }

        else {
            loadSmallScreen();
        } 
    })
    

    

   shopping_cart.addEventListener('click',function(e){
       if(window.innerWidth>=941){
          if(items__counter.textContent==='0'){
            e.preventDefault(); 
            addRemovePopupBanner();
          }
          else{
            window.location.href='cart.html';
          }
       }
   })

   shopping_cart.addEventListener('blur',function(){
       removePopupBanner();
   })


   //Collections.html:-

   let firstRow=document.querySelectorAll('.products-first-row div');
   firstRow.forEach(firstRowElement=>{
        firstRowElement.addEventListener('click',()=>{
            firstRowElement.firstElementChild.click();
        })
   })

   let secondRow=document.querySelectorAll('.products-second-row div');
   secondRow.forEach(secondRowElement=>{
        secondRowElement.addEventListener('click',()=>{
            secondRowElement.firstElementChild.click();
        })
   })

   window.addEventListener('pageshow',(e)=>{
        counter=localStorage.getItem('itemsCounter');
        items__counter.textContent=counter
    })
}


app();