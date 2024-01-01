tinymce.init({
    selector:'#myTextArea',
    height:300,
    menubar:true,
    statusbar:true,
    toolbar:'fontselect save fontsizeselect undo redo alignleft aligncenter alignjustify alignright image forecolor backcolor numlist bullist '+'cut copy paste ' +'bold italic underline strikethrough ' +'formatselect indent outdent subscript superscript table',
    plugins:'searchreplace print preview insertdatetime image table pagebreak paste wordcount emoticons link save lists advlist ',
    quickbars_insert_toolbar:'quickimage',
    theme_advanced_buttons3_add : "save",
    advlist_bullet_styles:'circle square disc ',
    image_title:true,
    automatic_uploads:true,
    file_picker_types:'image',
    images_upload_url:'./js/tinymce/postAcceptor.php',
    images_upload_credentials:true,
    save_enablewhendirty:true,
    file_picker_callback:function(cb,value,meta){
        let input=document.createElement('input');
        input.setAttribute('type','file');
        input.setAttribute('accept','image/*');
        input.onchange=function(){
            var file=this.files[0];
            var reader=new FileReader();
            reader.onload=function(){
                var id='blobid' + (new Date()).getTime();
                var blobCache=tinymce.activeEditor.editorUpload.blobCache;
                var base64=reader.result.split(',')[1];
                var blobInfo=blobCache.create(id,file,base64);
                blobCache.add(blobInfo);

                cb(blobInfo.blobUri(),{title:file.name});
            }

            reader.readAsDataURL(file);
        }
        input.click();
    }
});
//let contentTest='<p>Alsafa Test<p>';
//tinymce.activeEditor.setContent(contentTest);

let titleInput=document.querySelector('#articleTitle');
let categoryInput=document.querySelector('#categoryInputBox');
let contentTextArea=document.querySelector('#myTextArea');
let newOrEditField=document.querySelector('#newOrEdit');

fetch('http://192.168.0.108:3000/editPostSendArgs').then(response=>{
    return response.json();
}).then(data=>{
    if(data !=='Article Not Found'){
        if(data.newOrEdit){
            titleInput.setAttribute('readonly',true);
            categoryInput.setAttribute('readonly',true);
        }

        titleInput.setAttribute('value',data[0].title);
        categoryInput.setAttribute('value',data[0].category);
        contentTextArea.textContent=data[0].articleContent;
    }
    else{
        console.log('data not found!');
    }
})
