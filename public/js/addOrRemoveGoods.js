let bannerBtn=document.querySelector('.bannerBtn');
let webBtn=document.querySelector('.webBtn');
let mobileBtn=document.querySelector('.mobileBtn');

let btnsArray=[bannerBtn,webBtn,mobileBtn];

btnsArray.forEach(btnElement=>{
    btnElement.addEventListener('click',()=>{
        fetch(`http://192.168.0.108:3000/addOrRemoveGoods/${btnElement.textContent}`).then(response=>{
           return response.json();
        }).then(data=>{
            localStorage.clear();
            localStorage.setItem('listType',data.param);
            window.location.href='goodsList.html';
        })
    })
})