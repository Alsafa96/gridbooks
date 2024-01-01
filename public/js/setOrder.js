//Getting handles:-

let webGridItemBanner=document.getElementsByClassName('web-grid__item');
let featuredProduct=document.getElementsByClassName('featured-product');

webGridItemBanner=Array.from(webGridItemBanner);

if(webGridItemBanner.length!==-1){

    webGridItemBanner.forEach(webGridItem=>{
        webGridItem.addEventListener('click',()=>{
            let webGridItemChildren=webGridItem.children;
            let webGridImage=webGridItemChildren[0];
            let webGridInfo=webGridItemChildren[1];
            let webGridInfoChildren=webGridInfo.children;
            let webGridInfoTitle= webGridInfoChildren[0].firstChild.textContent;
            let webGridInfoPrice=webGridInfoChildren[2].textContent;
            let webGridImagePath=webGridImage.src;
            let webGridInfoClass=webGridInfo.className;
            if(webGridInfoClass.includes('web-book')){
                sessionStorage.clear();
                sessionStorage.setItem('webGridImage',webGridImagePath);
                sessionStorage.setItem('webGridTitle',webGridInfoTitle);
                sessionStorage.setItem('webGridPrice',webGridInfoPrice);
                console.log(sessionStorage);
            }
            else{
                sessionStorage.clear();
                sessionStorage.setItem('padGridImage',webGridImagePath);
                sessionStorage.setItem('padGridTitle',webGridInfoTitle);
                sessionStorage.setItem('padGridPrice',webGridInfoPrice);
                console.log(sessionStorage);
            }
           
        })
    })
}