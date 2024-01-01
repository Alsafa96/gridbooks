let categories=document.querySelector('.categories');
let userName=document.querySelector('.userName');
let profilePicture=document.querySelector('.profilePicture');
let activeCategory=document.querySelector('.activeCategory');

fetch('http://192.168.0.108:3000/blogPostCategories').then(response=>{
   return response.json();
}).then(data=>{
    if(data){
        let dataArray=Object.entries(data);
        let userInfo=dataArray[0];
        let fullUserName=userInfo['1'].firstName + ' ' + userInfo['1'].lastName;
        userName.textContent=fullUserName;
        if(userInfo['1'].profilePicture){
            profilePicture.setAttribute('src','./imgs/Profile/' + userInfo['1'].profilePicture);
        }
        else{
            profilePicture.setAttribute('src','/imgs/Profile/unknown.jpg');
        }
        
        let categoriesArray=dataArray[1];
        categoriesArray=categoriesArray[1];
        categoriesArray.forEach((category,index)=>{
            if(category.articlesList.length>0){
                let currentCategory=document.createElement('span');
                currentCategory.classList.add('ml-4','md:block','text-gray-800','underline','font-bold');
                currentCategory.textContent=category.categoryName
                categories.appendChild(currentCategory);

                //let clicked=false;
                for(let k=0;k<category.articlesList.length;k++){
                    if(category.articlesList[k].authorName===(userInfo['1'].firstName+' ' +userInfo['1'].lastName)){
                       

                        let clicked=false;


                        let articlesList=document.createElement('ul');
                        for(let j=0;j<category.articlesList.length;j++){
                            let articlesListItem=document.createElement('li');
                            articlesListItem.textContent=category.articlesList[j].title;
                            articlesListItem.classList.add('ml-4','text-green-900');
                            articlesList.appendChild(articlesListItem);

                            //Show / Hide the article Content:-
                            let articleContentContainer=document.querySelector('.article-content');
                            let articleContentTitle=document.querySelector('.article-title');
                            articlesListItem.addEventListener('click',()=>{
                                clicked=false;
                                articleContentTitle.textContent=articlesListItem.textContent;
                                articleContentContainer.innerHTML=category.articlesList[j].articleContent;
                                activeCategory.setAttribute('value',articlesListItem.parentElement.parentElement.firstChild.textContent);
                            })
                        }
                        currentCategory.appendChild(articlesList);
                        currentCategory.classList.add('cursor-pointer');

                        ///Show / Hide the list of articles:-

                        //let clicked=false;
                        articlesList.hidden=true;
                        currentCategory.addEventListener('click',()=>{
                            if(!clicked){
                                currentCategory.classList.add('text-blue-700');
                                currentCategory.lastChild.hidden=false;
                            }

                            else{
                                currentCategory.classList.remove('text-blue-700');
                                currentCategory.lastChild.hidden=true;
                            }
                            clicked=!clicked;
                        })
                    }
                    
                }
                
            }
            
        })
    }
    
}).catch(err=>{
    console.log(err);
})