let categories=document.querySelector('.categories');
let authorName=document.querySelector('.authorName');

fetch('http://192.168.0.108:3000/listCategories').then(response=>{
   return response.json();
}).then(data=>{
    if(data){

        data.forEach((category,index)=>{
            if(category.articlesList.length>0){
                let currentCategory=document.createElement('span');
                currentCategory.classList.add('ml-4','md:block','text-gray-800','underline','font-bold');
                currentCategory.textContent=category.categoryName
                categories.appendChild(currentCategory);

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
                        authorName.setAttribute('value',category.articlesList[j].authorName);
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
            
        })
        
    }
    
}).catch(err=>{
    console.log(err);
})