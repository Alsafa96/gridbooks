const express=require('express');
const bodyParser=require('body-parser');
const multer=require('multer');
const fs=require('fs');
const cookieParser=require('cookie-parser');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const user=require('./public/js/user');
const article=require('./public/js/article');
const userOrders=require('./public/js/userOrders');
const categories=require('./public/js/categories');
const cors=require('cors');
const nodmailer=require('nodemailer');

const app=express();
const upload=multer();

const corsOptions = {
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(upload.array());
app.use(express.static(('./public')))
app.use(bodyParser.urlencoded({'limit':'50mb',extended:true}));
app.use(bodyParser.json({'limit':'50mb'}));
app.use(cookieParser());

const dbURL='mongodb+srv://alsafa96:NoMoreWars96@cluster0.4q4xdc5.mongodb.net/?retryWrites=true&w=majority';
const regex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const saltSecret='This is A Secret Topic! So Keep it as a secret!';

mongoose.connect(dbURL);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

const generateAccessToken=(emailAddress)=>{
    return jwt.sign({'email':emailAddress},saltSecret,{ expiresIn: "6h" });
}

//Function To Check For admin:-
let isAdmin=async (userCookie,emailAddress)=>{
    if(userCookie){
        let isUserFound=await user.findOne({'email':emailAddress});
        if(isUserFound){
            if(isUserFound.admin===true){
                return 'Granted Access';
            }
            else{
                return 'Restriced Access';
            }
        }
        else{
            return 'No User';
        }
    }
    else {
        return 'Login';
    }
}

app.get('/',(req,res)=>{
    res.status(200).send('Alsafa');
})

app.post('/login',async (req,res)=>{
    if(!req.body.email || !req.body.password){
        res.status(500).sendFile(__dirname +'/public/emptyFields.html');
    }
    else{
        if(!regex.test(req.body.email)){
            res.status(200).sendFile(__dirname +'/public/invalidEmail.html');
        }
        else{
            let emailAlreadyExist=await user.findOne({'email':req.body.email});
            console.log(emailAlreadyExist);
            if(!emailAlreadyExist){
                res.status(200).sendFile(__dirname +'/public/NoSuchEmail.html');
            }
            else{
                bcrypt.compare(req.body.password,emailAlreadyExist.password,(err,data)=>{
                    if(err){
                        res.status(500).send('Internal Server Error!');
                    }
                    else{
                        if(data){
                            res.cookie('emailAddress',emailAlreadyExist.email,{maxAge:1000*60*60*24*4});
                            res.redirect('/');
                        }
                        else{
                            res.status(200).sendFile(__dirname +'/public/incorrectPassword.html');
                        }
                    }
                   
                })
            }
        }
    }
})

app.get('/login',(req,res)=>{
    res.status(200).sendFile(__dirname+'/public/account.html');
})

app.get('/getProfile',(req,res)=>{
    if(req.cookies){
        res.status(200).sendFile(__dirname+'/public/profile.html');
    }
    else{
        res.redirect('/login');
    }
   
})

app.get('/profile',async (req,res)=>{
    if(req.cookies){
        let userEmail=req.cookies.emailAddress;
        let currentUser=await user.findOne({'email':userEmail});
        let firstName=currentUser.firstName;
        let lastName=currentUser.lastName;
        let age=currentUser.age;
        let phoneNumber=currentUser.phoneNumber;
        let emailAddress=userEmail;
        let address=currentUser.address;
        let study=currentUser.study;
        let interests=currentUser.interests;
        let profilePicture=currentUser.profilePicture;
        let userName=firstName + ' ' +lastName;
        let fullUserInfo={'foundUser':true,'userName':userName,'age':age,'phoneNumber':phoneNumber,'email':emailAddress,'address':address,'study':study,'interests':interests,'profilePicture':profilePicture};
        res.header('Access-Control-Allow-Origin','*');
        res.status(200).send(fullUserInfo);
    }

    else{
        res.header('Access-Control-Allow-Origin','*');
        res.redirect('/login');
    }
})

app.get('/signUp',(req,res)=>{
    if(!req.cookies){
        res.status(200).sendFile(__dirname+'/public/signUp.html');
    }
    else{
        res.clearCookie();
        res.status(200).sendFile(__dirname+'/public/signUp.html');
    }
    
})

app.post('/signUp',async(req,res)=>{
    if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password){
        res.status(500).sendFile(__dirname+'/public/emptyFields.html')
    }
    else{
        if(!regex.test(req.body.email)){
            res.status(200).sendFile(__dirname+'/public/invalidEmail.html');
        }
        else{
            let emailAlreadyExist=await user.find({'email':req.body.email});
            if(emailAlreadyExist.length>0){
                res.status(200).send(emailAlreadyExist);
            }
            else{
                let newUser=new user;
                newUser.firstName=req.body.firstName;
                newUser.lastName=req.body.lastName;
                newUser.email=req.body.email;
                let encryptedPassword= bcrypt.hashSync(req.body.password,10);
                newUser.password=encryptedPassword;
                newUser.save();
            }
            res.status(200).sendFile(__dirname+'/public/accountCreated.html');
        }
    }
})

app.get('/forget',(req,res)=>{
    if(!req.cookies){
        res.status(200).sendFile(__dirname +'/public/forgot.html');
    }
    else{
        res.clearCookie();
        res.status(200).sendFile(__dirname+'/public/forget.html');
    }
    
})

app.post('/forget',async(req,res)=>{
    if(!req.body.email){
        res.status(500).sendFile(__dirname+'/public/emptyFields.html');
    }
    else{
        let receiverEmail=req.body.email;
        let emailObj=await user.findOne({'email':receiverEmail});
        if(emailObj){
            let dataID=emailObj._id;
            dataID=dataID.toString();
            let token=generateAccessToken(receiverEmail);
            let transporter=nodmailer.createTransport({
                host:'smtp.mail.yahoo.com',
                port:587,
                service:'yahoo',
                secure:true,
                auth:{
                    user:'alsafa_thaar@yahoo.com',
                    pass:'jybhjgjczybconlf'
                },
                debug:false,
                logger:true
            });
    
            let mailOptions={
                from:'alsafa_thaar@yahoo.com',
                to:receiverEmail,
                subject:'Forgot Password',
                text:`This is Our help and support Message
                    To Recover your email Please click the link below
                    If you receive this message by mistake, Please ignore this email:
                    http://192.168.0.110:3000/${dataID}/${token}`
            }
    
            transporter.sendMail(mailOptions,(err,info)=>{
                if(err){
                    res.status(500).sendFile(__dirname +'/public/error.html');
                }
                else{
                    res.status(200).sendFile(__dirname+'/public/emailSent.html');
                }
            })
        }
        else{
            res.status(404).sendFile(__dirname+'/public/NoSuchEmail.html');
        } 
    }
})

app.get('/listCategories',async(req,res)=>{
    let allCategories=await categories.find({});
    res.status(200).send(allCategories);    
})

app.get('/createBlog',(req,res)=>{
    res.status(200).sendFile(__dirname+'/public/createBlog.html');
})

app.get('/blogPostCategories',async (req,res)=>{
    let allCategories=await categories.find({});
    if(req.cookies){
        let userEmail=req.cookies.emailAddress
        let currentUser=await user.find({'email':userEmail});
        let allCategoriesArray={'categories':allCategories};
        //console.log(allCategoriesArray);
        let userAndCategories={...allCategoriesArray,...currentUser};
        //console.log(userAndCategories);
        res.status(200).send(userAndCategories);
    }
    else{
        res.redirect('/login');
    }
})

app.post('/editPost',async (req,res)=>{
    if(req.cookies){
        let articleTitle=req.body.title;
        let articleContent=req.body.contents;
        res.cookie('articleTitle',articleTitle);
        res.cookie('edit',true);
        //res.status(200).send(articleTitle);
        res.redirect('/editBlogPost');
    }

})

app.get('/editBlogPost',(req,res)=>{
    res.status(200).sendFile(__dirname+'/public/createBlog.html');
})

app.post('/deleteBlog',async(req,res)=>{

    if(req.cookies){
        let currentUser=await user.findOne({'email':req.cookies.emailAddress});
        /*let categoriesList=await categories.find({});
        categoriesList[0].articlesList=[];
        categoriesList[0].save();*/
        if(currentUser){
            let titleField=req.body.title;
            let categoryField=req.body.category;
            console.log(categoryField,titleField);
            let articleFound=await article.findOne({'category':categoryField,'title':titleField,'authorName':currentUser.firstName + ' ' +currentUser.lastName});
            if(articleFound){
                //let articleCategory=articleFound.category;
                let articleCategoryFound=await categories.findOne({'categoryName':categoryField});
                if(articleCategoryFound){
                    let articleIndex=articleCategoryFound.articlesList.findIndex(article=>article.title===titleField);
                    articleCategoryFound.articlesList.splice(articleIndex,1);
                    if(articleCategoryFound.articlesList.length<0){
                       
                        await categories.deleteOne(articleCategoryFound);
                    }
                    else{
                        await articleCategoryFound.save();
                    }
                    
                  
                    await article.deleteOne(articleFound);
                    res.status(200).send({'success':'successed'});
                   
                }
                else{
                    res.status(500).send({'success':'failed'});
                }
            }
            else{
                res.status(500).send({'success':'failed'});
            }
                
        }
        else{
            res.redirect('/login');
        }
       
    }
    else{
        res.redirect('/login');
    }
})

app.get('/editPostSendArgs', async(req,res)=>{
    if(req.cookies){
        let articleTitles=req.cookies.articleTitle;
        let articleFound=await article.find({'title':articleTitles});
        let fullArticleFound={'newOrEdit':req.cookies.edit,...articleFound};
        //res.status(200).send(articleFound);
    
        if(articleFound){
            res.clearCookie('articleTitle');
            res.status(200).send(fullArticleFound);
        }
        else{
            res.status(200).send('Article Not Found');
        }

    }
    else{
        res.redirect('/login');
    }
   
})

app.post('/blogPost',async (req,res)=>{
    if(req.cookies){
        let nowDate=new Date();
        let email=req.cookies.emailAddress;
        let isUserFound=await user.findOne({'email':email});
        let firstName=isUserFound.firstName;
        let lastName=isUserFound.lastName;
        let authorName=firstName+' ' +lastName;
        let title,category;
        let nowYear=nowDate.getFullYear();
        let nowMonth=nowDate.getMonth();
        let nowDay=nowDate.getDay();
        let fullDate=nowYear+'/'+nowMonth+'/'+nowDay;
        let nowHours=nowDate.getHours();
        let nowMinutes=nowDate.getMinutes();
        let nowSeconds=nowDate.getSeconds();
        let articleContent=req.body.blogPostContent;
        let fullTime=nowHours+':'+nowMinutes+':'+nowSeconds;
        req.body.articleTitle ? title=req.body.articleTitle : title='No Subject';
        req.body.category ? category=req.body.category : category='General';

        if(articleContent==' '){
            articleContent='This article is empty';
        }


        if(!req.cookies.edit){
            let testRegEx=new RegExp(`^${title}+[\(\d+\)]*`); ///^.*[\(\d+\)]*$/;
            let isTitleFound=await article.find({'category':category,'title':{$regex:testRegEx}});
            if(isTitleFound.length >=1){
                 title=title +'('+Number(isTitleFound.length)+')';
            }
            let newArticle=new article;
            newArticle.authorName=authorName;
            newArticle.date=fullDate;
            newArticle.time=fullTime;
            newArticle.title=title;
            newArticle.category=category;
            newArticle.articleContent=articleContent;
            let isCategoryExists=await categories.findOne({categoryName:category});
            if(isCategoryExists){
                //console.log(isCategoryExists);
                isCategoryExists.articlesList.push(newArticle);
               
                await isCategoryExists.save();
                await newArticle.save();

            }
            else{
                let newCategory=new categories;
                newCategory.categoryName=category;
                newCategory.articlesList.push(newArticle);
                await newCategory.save();
                await newArticle.save();
                //console.log(await categories.find({}));
            }
            res.clearCookie('edit');
            res.status(200).sendFile(__dirname+'/public/newArticle.html');

        }

        else if(req.cookies.edit){
            let currentArticle=await article.findOne({'title':title});
            console.log(title);
            currentArticle.title=title;
            currentArticle.category=category;
            currentArticle.date=fullDate;
            currentArticle.time=fullTime;
            currentArticle.articleContent=articleContent;

            let currentCategory=await categories.findOne({'categoryName':currentArticle.category});
            let currentArticleIndex=currentCategory.articlesList.findIndex((thisArticle)=>thisArticle.title==title);

            currentCategory.articlesList[currentArticleIndex]=currentArticle;

            await currentCategory.save();
            await currentArticle.save();

            res.clearCookie('edit');
            res.status(200).sendFile(__dirname+'/public/articleUpdated.html');
        }
    }
    else{
        res.redirect('/login');
    }
    
})

app.post('/changeSettings',async(req,res)=>{
  
    if(req.cookies){
            let currentEmail=req.cookies.emailAddress;
        let currentUserAccount=await user.findOne({'email':currentEmail});
        let updatedFirstName,updatedLastName,updatedAge,updatedAddress,updatedPhoneNumber,updatedEmail,updatedStudy,updatedInterests,updatedPassword,updatedProfilePictureURL;
        if(req.body.userName!=='undefined'){
            updatedFirstName=req.body.userName.slice(0,req.body.userName.indexOf(' ')+1);
        }
        else{
            updatedFirstName=currentUserAccount.firstName;
        }

        req.body.userName!=='undefined' ? updatedLastName=req.body.userName.slice(req.body.userName.indexOf(' ')+1) : updatedLastName=currentUserAccount.lastName;
        req.body.age!=='undefined' ? updatedAge=req.body.age : updatedAge=currentUserAccount.age;
        req.body.email!=='undefined' ? updatedEmail=req.body.email : updatedEmail=currentUserAccount.email;
        req.body.address!=='undefined' ? updatedAddress=req.body.address : updatedAddress=currentUserAccount.address;
        req.body.study!=='undefined' ? updatedStudy=req.body.study : updatedStudy=currentUserAccount.study;
        req.body.phoneNumber!=='undefined' ? updatedPhoneNumber=req.body.phoneNumber : updatedPhoneNumber=currentUserAccount.phoneNumber;
        req.body.interests!=='undefined' ? updatedInterests=req.body.interests : updatedInterests=currentUserAccount.interests;

        if(req.body.password!=='undefined'){
            bcrypt.compare(req.body.password,currentUserAccount.password,(err,result)=>{
                if(err){
                    console.log(err);
                }
                else if(result){
                    updatedPassword=currentUserAccount.password;
                }
                else{
                    updatedPassword=bcrypt.hashSync(req.body.password,10);
                }

            })
        }

        else{
            updatedPassword=currentUserAccount.password;
        }

        if(req.body.profilePictureData){
            let data=req.body.profilePictureData.replace(/^data:image\/\w+;base64,/, "");
            fs.writeFile( __dirname + '/public/imgs/Profile/'+ req.body.profilePictureURL,Buffer.from(data,'base64'),(err)=>{
                if(err) throw err;
            })
            updatedProfilePictureURL= req.body.profilePictureURL
        }

        else{
            updatedProfilePictureURL=currentUserAccount.profilePicture;
        }

        let updatedUserAccount={'firstName':updatedFirstName,'lastName':updatedLastName,'age':updatedAge,'address':updatedAddress,'email':updatedEmail,'study':updatedStudy,'interests':updatedInterests,'phoneNumber':updatedPhoneNumber,'password':updatedPassword,'profilePicture':updatedProfilePictureURL};
        //let nowUpdatedAccount=user.updateOne({'email':currentEmail},updatedUserAccount);
        await currentUserAccount.updateOne(updatedUserAccount);

        res.status(200).sendFile(__dirname+'/public/accountUpdated.html');
    }
    else{
        res.redirect('/login');
    }
})



app.get('/listAllUsers',async(req,res)=>{
   
    let isUserAdmin=await isAdmin(req.cookies,req.cookies.emailAddress);
    if(isUserAdmin==='Granted Access'){
        let allUsers=await user.find({});
        res.status(200).send(allUsers);
    }
    else if(isUserAdmin==='Restricted Access'){
        res.status(200).sendFile(__dirname+'/public/forbidden.html');
    }
    else if(isUserAdmin==='No User'){
        res.status(200).sendFile(__dirname+'/public/loginError.html');
    }
    else if(isUserAdmin==='Login'){
        res.redirect('/login');
    }
    0
})

app.get('/pad-product',(req,res)=>{
    res.status(200).sendFile(__dirname +'/public/pad-product.html');
})

app.get('/addOrRemoveGoods/:param',async(req,res)=>{
    if(req.cookies){
        let currentUser=await user.findOne({'email':req.cookies.emailAddress});
        if(currentUser){
            if(currentUser.admin===true){
                res.status(200).send(req.params);
            }
            else{
                res.status(200).send('Access To This Area is limited To Admin.');
            }
        }
        else{
            res.status(200).send('User Not Found!');
        }
    }
    else{
        res.redirect('/login');
    }
    
})

app.post('/submitGoodsChanges',async (req,res)=>{

        let isUserAdmin=await isAdmin(req.cookies,req.cookies.emailAddress);
        if(isUserAdmin==='Granted Access'){
            let dataInput=JSON.parse(req.body.dataArrayInput);
            dataInput=JSON.stringify(dataInput,null,2);
            let arrayName=req.body.arrayType;
            let newImagesInput=JSON.parse(req.body.newImagesInput);

            let gettingArrayData=()=>{
                let mainData=fs.readFileSync(__dirname+'/public/js/main.js');
                mainData=mainData.toString();
                let replacementIndex;
                let arrayNameString;
                switch(arrayName){
                    case 'mobile':
                        replacementIndex=mainData.search('mobileArray');
                        arrayNameString='mobileArray=';
                        break;
                    case 'web':
                        replacementIndex=mainData.search('webArray');
                        arrayNameString='webArray=';
                        break;
                    case 'banner':
                        replacementIndex=mainData.search('bannerArray');
                        arrayNameString='bannerArray=';
                }
        
                replacementIndex=mainData.search(arrayNameString);
                let resumptionIndex=mainData.indexOf('export let',replacementIndex);
                let continuationString;
                if(resumptionIndex>-1){
                    continuationString=mainData.substring(resumptionIndex);
                }
                else{
                    continuationString='';
                }
        
                let dataReplacement=mainData.substring(0,replacementIndex) + arrayNameString + dataInput +'\n' + continuationString; 
                fs.writeFile(__dirname+'/public/js/main.js',dataReplacement,(err)=>{
                    if(err) throw err;
                })
            }
            
            //Saving the images:-

            if(newImagesInput.length >0){
                newImagesInput.forEach(newImage=>{
                    let imageName=newImage.name.split('/').pop();
                    let wordsList=newImage.name.split('/');
                    let category=wordsList[wordsList.length-2];
                    fs.writeFile(__dirname+'/public/imgs/'+category+'/'+imageName,Buffer.from(newImage.imageValue,'base64'),(err)=>{
                        if(err) throw err;
                    })
                    
                })
            }
        
            gettingArrayData();
            
             res.status(200).send('Goods Changes!');
        }
        else if(isAdmin==='Restricted Access'){
            res.status(200).sendFile(__dirname +'/public/forbidden.html');
        }
        else if(isAdmin==='No User'){
            res.status(200).sendFile(__dirname +'/public/loginError.html');
        }
        else if(isAdmin==='Login'){
            res.redirect('/login');
        }
        
})

app.get('/deleteOrder/:orderName',async(req,res)=>{
    let isUserAdmin=await isAdmin(req.cookies,req.cookies.emailAddress);
    if(isUserAdmin==='Granted Access'){
        if(!req.params.orderName){
            res.status(200).sendFile(__dirname +'/public/orderToRemove.html');
        }
        else{
            let orderToRemove=await userOrders.findOne({'orderName':req.params.orderName});
            if(orderToRemove){
                await userOrders.deleteOne({'orderName':req.params.orderName});
                //res.status(200).sendFile(__dirname +'/public/orderSuccessfullyDelete.html');
                res.redirect('back');
                
            }
        }
    }
    else if(isUserAdmin==='Restricted Access'){
        res.status(200).sendFile(__dirname+'/public/forbidden.html');
    }
    else if(isUserAdmin==='No User'){
        res.status(200).sendFile(__dirname+'/public/loginError.html');
    }
    else if(isUserAdmin==='Login'){
        res.redirect('/login');
    }
})

app.get('/deleteAllOrders',async(req,res)=>{
    let allOrders=await userOrders.find({});
    if(allOrders){
        await userOrders.deleteMany({});
        res.redirect('back');
    }
})

app.get('/deleteUser/:userEmail',async(req,res)=>{
    let isUserAdmin=await isAdmin(req.cookies,req.cookies.emailAddress);
    if(isUserAdmin==='Granted Access'){
        if(!req.params.userEmail){
            res.status(200).sendFile(__dirname +'/public/emailToRemove.html');
        }
        else{
            let userEmailAddress=await user.findOne({'email':req.params.userEmail});
            if(userEmailAddress){
                await user.deleteOne({'email':req.params.userEmail});
                //res.status(200).sendFile(__dirname +'/public/userSuccessfullyDelete.html');
                //res.redirect('back');
                res.redirect('back');
            }
        }
    }
    else if(isUserAdmin==='Restricted Access'){
        res.status(200).sendFile(__dirname+'/public/forbidden.html');
    }
    else if(isUserAdmin==='No User'){
        res.status(200).sendFile(__dirname+'/public/loginError.html');
    }
    else if(isUserAdmin==='Login'){
        res.redirect('/login');
    }
   
})

app.get('/promoteToAdmin/:userEmail',async(req,res)=>{
    let isUserAdmin=await isAdmin(req.cookies,req.cookies.emailAddress);
    if(isUserAdmin==='Granted Access'){
        if(!req.params.userEmail){
            res.status(200).sendFile(__dirname+'/public/emailToPromote.html');
        }
        else{
            let userEmailAddress=await user.findOne({'email':req.params.userEmail});
            if(userEmailAddress){
                userEmailAddress.admin=true;
                userEmailAddress.save();
            }
            res.status(200).send(userEmailAddress);
        }
    }
    else if(isUserAdmin==='Restricted Access'){
        res.status(200).sendFile(__dirname+'/public/forbidden.html');
    }
    else if(isUserAdmin==='No User'){
        res.status(200).sendFile(__dirname+'/public/loginError.html');
    }
    else if(isUserAdmin==='Login'){
        res.redirect('/login');
    }
    
})

app.post('/buyOrder',async(req,res)=>{
    if(req.cookies){
        let totalCost=req.body.totalCost;
        let allItems=JSON.parse(req.body.allItems);
        let currentCookie=req.cookies;

        //Gettting current date and time:-
        let date=new Date();
        let nowYear=date.getUTCFullYear();
        let nowMonth=date.getUTCMonth();
        let nowDay=date.getUTCDay();
        let fullDate=nowDay+'/' +nowMonth + '/' +nowYear;

        let nowHours=date.getHours();
        let nowMinutes=date.getMinutes();
        let nowSeconds=date.getSeconds();
        let fullTime=nowHours+':' +nowMinutes+':'+nowSeconds;

        allItems=JSON.parse(allItems);
        
        let currentUser=await user.findOne({'email':currentCookie.emailAddress});
        if(currentUser){
            //let currentUserName=currentUser.firstName + ' ' +currentUser.lastName;
            //let newOrder={'newOrderUserName':currentUserName,'newOrderDate':fullDate,'newOrderTime':fullTime,'newOrderTotalCost':totalCost,'newOrderOrdersList':allItems};
            allItems.forEach(singleItem=>{
                let newOrder={};
                newOrder.orderDate=fullDate;
                newOrder.orderTime=fullTime;
                newOrder.orderName=singleItem.productName;
                newOrder.quantity=singleItem.quantity;
                //newOrder.totalPrice=totalCost;
                newOrder.singleItemPrice=singleItem.productPrice;
                currentUser.ordersList.push(newOrder);
            })
            
            //currentUser.ordersList.push(newOrder);
            currentUser.save();

            
            allItems.forEach(singleItem=>{
                let newUserOrder=new userOrders;
                newUserOrder.orderName=singleItem.productName;
                newUserOrder.orderDate=fullDate;
                newUserOrder.orderTime=fullTime;
                newUserOrder.orderPrice=singleItem.productPrice;
                newUserOrder.orderQuantity=singleItem.quantity;
                newUserOrder.userName=currentUser.firstName+' ' +currentUser.lastName;

                newUserOrder.save();
            })
            res.status(200).sendFile(__dirname+'/public/ordered.html');
        }
        else {
            res.status(200).send('Please login with correct credentials!');
        }
    }
    else{
        res.redirect('/login');
    }
})

app.get('/allOrdersList',async(req,res)=>{
    let isUserAdmin=await isAdmin(req.cookies,req.cookies.emailAddress);
    if(isUserAdmin==='Granted Access'){
        let allOrders=await userOrders.find({});
        res.status(200).send(allOrders);
    }
    else if(isUserAdmin==='Restricted Access'){
        res.status(200).sendFile(__dirname+'/public/forbidden.html');
    }
    else if(isUserAdmin==='No User'){
        res.status(200).sendFile(__dirname+'/public/loginError');
    }
    else if(isUserAdmin==='Login'){
        res.redirect('/login');

    }
    
})

app.post('/deleteUserOrder/:email',async(req,res)=>{
    if(req.cookies){
       let currentUser=await user.findOne({'email':req.params.email});
       if(currentUser){
        let indexToRemove;
        let userOrdersList=currentUser.ordersList;
        for(let i=0;i<userOrdersList.length;i++){
            if(JSON.stringify(userOrdersList[i])==JSON.stringify(req.body)){
                indexToRemove=i;
                break;
            }
        }

        if(indexToRemove > -1){
            currentUser.ordersList.splice(indexToRemove,1);
            await currentUser.save();
            res.send({'successfulDeletion':'success'});
        }
     
       }
       else{
        res.redirect('/login');
       }
    }
    else{
        res.redirect('/login');
    }
})
app.get('/deleteAllMyOrders/:email',async(req,res)=>{
    let currentUser=await user.findOne({'email':req.params.email});
    if(currentUser){
        currentUser.ordersList=[];
        currentUser.save();
        res.status(500).send({'deletionSuccess':'Success'});

       
    }
    else{
        res.redirect('/login');
    }
})

app.get('/getCurrentUser',async(req,res)=>{
    if(req.cookies.emailAddress){
        let currentUser=await user.findOne({'email':req.cookies.emailAddress});
        if(currentUser){
            res.status(200).send(currentUser);
        }
        else{
            res.status(200).send('No User Found To Match!');
        }
    }
    else{
        res.status(200).send('No Current User Logged!');
    }
})

app.get("*",(req,res)=>{
    res.redirect('/');
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
});

           /* **    *       **      **       ****    **
             *  *   *      *   *   *  *      *      *  *
             ****   *        *     ****      ****   ****
             *  *   *      *   *   *  *      *      *  *
             *  *   ****     *     *  *      *      *   *   */