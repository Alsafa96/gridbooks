let deleteAlertBoxPresent=false;

let createBlogBtn=document.querySelector('.create-blog');
let editBtn=document.querySelector('.edit-blog');
let deleteBtn=document.querySelector('.delete-blog');
let blogContent=document.querySelector('.article-content');
let blogTitle=document.querySelector('.article-title');
let theActiveCategory=document.querySelector('.activeCategory');
let categoriesList=document.querySelector('.categories').children;

//Drag and drop any dialog Box:-
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
          
           if(top>= window.screenTop  && top+dlgBoxHeight < window.innerHeight + window.scrollY ){
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

if(blogContent){
    editBtn.disabled=false;
    deleteBtn.disabled=false;
}

deleteBtn.addEventListener('click',(e)=>{
    if(blogContent.textContent!=='' && !deleteAlertBoxPresent){
        //Creating alert Dialog Box:-
        let deleteAlertBox=document.createElement('div');
        let deleteAlertMessage=document.createElement('p');
        deleteAlertMessage.textContent='Ary you sure you want to delete this Blog?';
        deleteAlertMessage.classList.add('mb-5');
        let deleteAlertYesBtn=document.createElement('Yes');
        deleteAlertYesBtn.textContent='Yes';
        let deleteAlertNoBtn=document.createElement('No');
        deleteAlertNoBtn.textContent='No';
        deleteAlertBox.classList.add('deleteDialogBox','p-3','bg-red-300','rounded','rounded-2xl','border','border-4','border-red-500','text-white','font-bold');
        deleteAlertYesBtn.classList.add('cursor-pointer','text-white','font-bold','border','border-2','border-black','hover:cursor-pointer','hover:bg-red-600','rounded','rounded-xl','p-3');
        deleteAlertNoBtn.classList.add('cursor-pointer','text-white','font-bold','ml-24','border','border-2','border-black','hover:cursoer-pointer','hover:bg-red-600','rounded','rounded-xl','p-3');
        deleteAlertBox.appendChild(deleteAlertMessage);
        deleteAlertBox.appendChild(deleteAlertYesBtn);
        deleteAlertBox.appendChild(deleteAlertNoBtn);
        dragAndDropDialogBox(deleteAlertBox);
        deleteAlertBox.style.left=e.x-150+'px';
        deleteAlertBox.style.top=e.y+50+'px';
        document.body.appendChild(deleteAlertBox);
        deleteAlertBoxPresent=true;

        deleteAlertNoBtn.addEventListener('click',(e)=>{
            deleteAlertBox.remove();
            deleteAlertBoxPresent=false;
            if(blogContent.textContent===''){
                deleteBtn.disabled=true;
            }
        })

        deleteAlertYesBtn.addEventListener('click',(e)=>{
            let articleFormData=new FormData();
            articleFormData.append('title',blogTitle.textContent);
            articleFormData.append('content',blogContent.textContent);
            articleFormData.append('category',theActiveCategory.value);
            fetch('http://192.168.0.108:3000/deleteBlog',{
                method:'POST',
                body:articleFormData
            }).then(response=>{
                return response.json();
            }).then(data=>{
                if(data.success==='successed'){
                    categoriesList=Array.from(categoriesList);
                    categoriesList.forEach(categoryToSearch=>{
                        if(categoryToSearch.firstChild.textContent===theActiveCategory.value){
                            let categoryArticlesList=categoryToSearch.lastChild.children;
                            categoryArticlesList=Array.from(categoryArticlesList);
                            categoryArticlesList.forEach(articleItem=>{
                                if(articleItem.textContent===blogTitle.textContent){
                                    articleItem.remove();
                                    return;
                                }
                            })
                        }
                    })
                    blogTitle.textContent='';
                    blogContent.textContent='';
                }
                else{
                    //window.location.href='/error.html';
                    console.log(data);
                }
            })
            deleteAlertBox.remove();
            deleteAlertBoxPresent=false;
        })

       
    }
})

//Create New Blog:-
createBlogBtn.addEventListener('click',(e)=>{
    window.location.href='/createBlog'
})

editBtn.addEventListener('click',(e)=>{
    if(blogContent.textContent!==''){
        let editBlogForm=document.createElement('form');
        let articleTitle=document.createElement('input');
        articleTitle.type='text';
        articleTitle.name='title';
        articleTitle.setAttribute('value',blogTitle.textContent);
        let articleContent=document.createElement('textarea');
        articleContent.name='contents';
        articleContent.textContent=blogContent.textContent;

        editBlogForm.className='editBlogForm';
        editBlogForm.hidden=true;
        editBlogForm.appendChild(articleTitle);
        editBlogForm.appendChild(articleContent);

        editBlogForm.method='POST';
        editBlogForm.action='/editPost';

        let submitArticle=document.createElement('input');
        submitArticle.className='submitArticleBtn';
        submitArticle.type='submit';
        
        editBlogForm.appendChild(submitArticle);
        document.body.appendChild(editBlogForm);

        console.log(editBlogForm);
        submitArticle.click();
        //e.preventDefault();
        }
    
})