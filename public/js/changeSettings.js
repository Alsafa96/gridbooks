let newUserName,newAge,newAddress,newEmail,newStudy,newInterests,newProfilePictureURL,newProfilePictureData,newPhoneNumber,newPassword;

//Getting current User Values:-

//Getting references for valueFields:-

let userNameField=document.getElementById('userName');
let ageField=document.getElementById('age');
let addressStudyField=document.getElementById('yourAddress');
let emailField=document.getElementById('email');
let phoneNumberField=document.getElementById('phoneNumber');
let studyField=document.getElementById('study');
let interestsField=document.getElementById('interests');
let passwordField=document.getElementById('password');
let profilePicture=document.getElementById('profileImg');

fetch('http://192.168.0.108:3000/getCurrentUser',{
    method:'Get'
}).then(response=>{
    return response.json();
}).then(data=>{
    if(data){
        if(data.firstName && data.lastName){
            userNameField.setAttribute('value',data.firstName+' ' +data.lastName);
        }
        else if(data.firstName && !data.lastName){
            userNameField.setAttribute('value',data.firstName);
        }
        if(data.age){
            ageField.setAttribute('value',data.age);
        }
        if(data.email){
            emailField.setAttribute('value',data.email);
        }
        if(data.address){
            addressStudyField.setAttribute('value',data.address);
        }
        if(data.phoneNumber){
            phoneNumberField.setAttribute('value',data.phoneNumber);
        }
        if(data.study){
            studyField.setAttribute('value',data.study);
        }
        if(data.interests){
            interestsField.setAttribute('value',data.interests);
        }
        if(data.profilePicture==='undefined' || !data.profilePicture){
            profilePicture.src='imgs/Profile/unknown.jpg';
        }
        else{
            profilePicture.src='imgs/Profile/' + data.profilePicture;
        }
    }
})

//Getting references for Buttons:-

let changeUserNameButton=document.getElementById('changeUserName');
let changeAgeButton=document.getElementById('changeAge');
let changeAddressButton=document.getElementById('changeAddress');
let changePhoneNumberButton=document.getElementById('changePhoneNumber');
let changeEmailButton=document.getElementById('changeEmail');
let changeStudyButton=document.getElementById('changeStudy');
let changeInterestsButton=document.getElementById('changeInterests');
let changePasswordButton=document.getElementById('changePassword');

let changeProfilePicture=document.getElementById('updateProfilePicture');
let profilePictureButton=document.getElementById('profilePictureChangeWrapper');

let doneButton=document.getElementById('done');

//Changing Profile Picture:-
profilePictureButton.addEventListener('click',(e)=>{
    changeProfilePicture.click();
})

let profileImageWasChanged=false;

changeProfilePicture.addEventListener('change',(e)=>{
    const image=changeProfilePicture.files;
    var reader=new FileReader();
    var imageContents;
    console.log(typeof image[0]);

    reader.readAsDataURL(image[0]);
    
    reader.onload=function(){
        imageContents=reader.result;
        //console.log(imageContents);
        if(imageContents){
            profilePicture.src=imageContents;
            newProfilePictureData=imageContents;
            //console.log(newProfilePictureData);
        }
        
    }


    newProfilePictureURL=image[0].name;
    profilePictureButton.textContent='change was done'
})



changeUserNameButton.addEventListener('click',(e)=>{
    e.preventDefault();
    if(userNameField.value){
        newUserName=userNameField.value;
        changeUserNameButton.textContent='change was done';
    }
})

changeAgeButton.addEventListener('click',(e)=>{
    e.preventDefault();
    if(ageField.value){
        newAge=ageField.value;
        changeAgeButton.textContent='change was done'
    }
})

changeAddressButton.addEventListener('click',(e)=>{
    e.preventDefault();
    if(addressStudyField.value){
        newAddress=newAddress.value;
        changeAddressButton.textContent='change was done'
    }
})

changeEmailButton.addEventListener('click',(e)=>{
    e.preventDefault();
    if(emailField.value){
        newEmail=emailField.value;
        changeEmailButton.textContent='change was done'
    }
})

changePhoneNumberButton.addEventListener('click',(e)=>{
    e.preventDefault();
    if(phoneNumberField.value){
        newPhoneNumber=phoneNumberField.value
        changePhoneNumberButton.textContent='change was done'
    }
})

changePasswordButton.addEventListener('click',(e)=>{
    e.preventDefault();
    if(passwordField.value){
        newPassword=passwordField.value;
        changePasswordButton.textContent='change was done'
    }
})

changeStudyButton.addEventListener('click',(e)=>{
    e.preventDefault();
    if(studyField.value){
        newStudy=studyField.value;
        changeStudyButton.textContent='change was done'
    }
})

changeInterestsButton.addEventListener('click',(e)=>{
    e.preventDefault();
    if(interestsField.value){
        newInterests=interestsField.value;
        changeInterestsButton.textContent='change was done'
    }
})

doneButton.addEventListener('click',(e)=>{
    e.preventDefault();
    let hiddenForm=document.createElement('form');
    let hiddenUserField=document.createElement('input');
    hiddenUserField.type='text';
    hiddenUserField.hidden=true;
    hiddenUserField.name='userName';
    hiddenUserField.value=newUserName;
    let hiddenAgeField=document.createElement('input');
    hiddenAgeField.type='text';
    hiddenAgeField.hidden=true;
    hiddenAgeField.name='age';
    hiddenAgeField.value=newAge;
    let hiddenAddressField=document.createElement('input');
    hiddenAddressField.type='text';
    hiddenAddressField.hidden=true;
    hiddenAddressField.name='address';
    hiddenAddressField.value=newAddress;
    let hiddenEmailField=document.createElement('input');
    hiddenEmailField.type='text';
    hiddenEmailField.hidden=true;
    hiddenEmailField.name='email';
    hiddenEmailField.value=newEmail;
    let hiddenStudyField=document.createElement('input');
    hiddenStudyField.type='text';
    hiddenStudyField.hidden=true;
    hiddenStudyField.name='study';
    hiddenStudyField.value=newStudy;
    let hiddenInterestsField=document.createElement('input');
    hiddenInterestsField.type='text';
    hiddenInterestsField.hidden=true;
    hiddenInterestsField.name='interests';
    hiddenInterestsField.value=newInterests;
    let hiddenPhoneNumberField=document.createElement('input');
    hiddenPhoneNumberField.type='text';
    hiddenPhoneNumberField.hidden=true;
    hiddenPhoneNumberField.name='phoneNumber';
    hiddenPhoneNumberField.value=newPhoneNumber;
    let hiddenPasswordField=document.createElement('input');
    hiddenPasswordField.type='text';
    hiddenPasswordField.hidden=true;
    hiddenPasswordField.name='password';
    hiddenPasswordField.value=newPassword;

    hiddenForm.appendChild(hiddenUserField);
    hiddenForm.appendChild(hiddenAgeField);
    hiddenForm.appendChild(hiddenAddressField);
    hiddenForm.appendChild(hiddenPhoneNumberField);
    hiddenForm.appendChild(hiddenEmailField);
    hiddenForm.appendChild(hiddenStudyField);
    hiddenForm.appendChild(hiddenInterestsField);
    hiddenForm.appendChild(hiddenPasswordField);

    if(newProfilePictureData){
        let hiddenProfilePictureDataField=document.createElement('input');
        hiddenProfilePictureDataField.type='text';
        hiddenProfilePictureDataField.hidden=true;
        hiddenProfilePictureDataField.name='profilePictureData';
        hiddenProfilePictureDataField.value=newProfilePictureData;

        let hiddenProfilePictureURLField=document.createElement('input');
        hiddenProfilePictureURLField.type='text';
        hiddenProfilePictureURLField.hidden=true;
        hiddenProfilePictureURLField.name='profilePictureURL';
        hiddenProfilePictureURLField.value=newProfilePictureURL;

        hiddenForm.appendChild(hiddenProfilePictureDataField);
        hiddenForm.appendChild(hiddenProfilePictureURLField);

    }
   

    hiddenForm.method='POST';
    hiddenForm.action='/changeSettings';

    let submitBtn=document.createElement('input');
    submitBtn.type='submit';
    submitBtn.hidden=true;
    hiddenForm.appendChild(submitBtn);
    document.body.appendChild(hiddenForm);
    submitBtn.click();
})