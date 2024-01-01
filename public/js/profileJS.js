fetch('http://192.168.0.108:3000/profile',{
    headers:{
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":true
    }
}).then(response=>{
    if(response){
        return response.json();
    }
}).then(data=>{
    console.log(data);
    if(data.foundUser){
       let userName=document.getElementById('userName');
       let userAge=document.getElementById('userAge');
       let userAddress=document.getElementById('userAddress');
       let userEmail=document.getElementById('userEmail');
       let userPhoneNumber=document.getElementById('userPhoneNumber');
       let userStudy=document.getElementById('userStudy');
       let userInterests=document.getElementById('userInterests');
       let profilePicture=document.getElementById('profilePicture');
       
       userName.textContent=data.userName;
       //userAge.textContent=data.age;
       //userPhoneNumber.textContent=data.phoneNumber;
       userEmail.textContent=data.email;

       let optionalFields=[userAge,userPhoneNumber,userAddress,userStudy,userInterests,profilePicture];
       let optionalFieldsValues=[data.age,data.phoneNumber,data.userAddress,data.study,data.interests,data.profilePicutre]
       for(let optionalFieldsIndex=0;optionalFieldsIndex<optionalFields.length;optionalFieldsIndex++){
        if(optionalFields[optionalFieldsIndex]===profilePicture){
            console.log('Profile Picture');
            if(data.profilePicture){
                profilePicture.setAttribute('src','./imgs/Profile/'+data.profilePicture);
            }
            else{
                profilePicture.setAttribute('src','./imgs/Profile/unknown.jpg');
            }
        }
         else{
            if(optionalFieldsValues[optionalFieldsIndex]){
                optionalFields[optionalFieldsIndex].textContent=optionalFieldsValues[optionalFieldsIndex];
             }
            else{
                optionalFields[optionalFieldsIndex].hidden=true;
            } 
         }
        
       }
    }
}).catch(err=>{
    console.log(err);
})