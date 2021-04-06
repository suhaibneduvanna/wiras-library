const { response } = require('express');
var express = require('express');
const session = require('express-session');
const { render } = require('jade');
var router = express.Router();
const productHelpers = require('../helpers/admin-helpers');
const userHelpers=require('../helpers/user-helpers');

const verifyLogin=(req,res,next)=>{
  if (req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  
    productHelpers.getAllProducts().then((data)=>{

      res.render('user/view-books' , {data,admin:false,user})
    })
  
  
  
  
})

router.get('/view-books',(req,res)=>{
  let category = req.query.category
  console.log(category)
  if(category){
    productHelpers.getCategory(category).then((data)=>{
      console.log(data)
      res.json(data)
    })
  } 
})

router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else{

    res.render('user/login',{loginErr:req.session.loginErr})
    req.session.loginErr=false
  }
  
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
  userHelpers.doSignUp(req.body).then((response)=>{
    req.session.loggedIn=true
    req.session.user=response
    res.redirect('/')
  })

})
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.loginErr=true
      res.redirect('/login')
    }
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

router.get('/add-my-books',verifyLogin,(req,res)=>{
  userHelpers.addMyBooks(req.query.id,req.session.user._id).then(()=>{
    res.redirect('/')
  })
})

router.get('/my-books',verifyLogin,(req,res)=>{
  let books=userHelpers.getMyBooks(req.session._id).then(response)
  console.log(books);
  res.render('user/my-books')
  
    
})


 

module.exports = router;
