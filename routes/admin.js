var express = require('express');
const adminHelpers  = require('../helpers/admin-helpers');
var router = express.Router();
var dateFormat = require("dateformat");
const { ObjectID } = require('bson');
var objectId = require('mongodb').ObjectID;
const { response } = require('express');
const { mongo } = require('mongoose');
// GET
router.get('/', function(req, res, next) {
  // adminHelpers.updateHolder1().then(()=>{
    res.render('admin/dashboard' , {admin:true})
  // })
  

})

router.get('/books',function(req,res){
  adminHelpers.getBooks().then((books)=>{
    res.render('admin/manage/book/main.hbs',{admin:true,books})
  })
  
})

router.get('/edit-book',(req,res)=>{
  let bookId = req.query.id
  adminHelpers.getBook(bookId).then((book)=>{
    if(book.Holder=="Library"){
      res.render('admin/manage/book/edit-book.hbs',{admin:true,book,library:true})
    } else
    {
      res.render('admin/manage/book/edit-book.hbs',{admin:true,book})
    }
    
  })

})

router.get('/users',function(req,res){
  adminHelpers .getUsers().then((users)=>{
    res.render('admin/manage/user/main.hbs',{admin:true,users})
  })
  
})

router.post('/user',async function (req,res){
  let allBooks = await adminHelpers.getBooks()
  let userId = req.body.UserID
  
  adminHelpers.getUserID(userId).then(async(user)=>{
    req.session.user = userId
    let uid = user._id
    let cart = await  adminHelpers.getCartBooks(uid)
   
    res.render('admin/manage/user/dashboard.hbs',{admin:true,allBooks,user,cart})
  })
 
  
})

router.get('/user',async function (req,res){
  let userId = req.session.user
  if(userId){
    let allBooks = await adminHelpers.getBooks() 
    adminHelpers.getUserID(userId).then(async(user)=>{
      
      let uid = user._id
      let cart = await  adminHelpers.getCartBooks(uid)
      
      res.render('admin/manage/user/dashboard.hbs',{admin:true,allBooks,user,cart})
    })
  } else{
    res.redirect('/admin')
  }
  
 
  
})

router.get('/edit-user',(req,res)=>{
  let userId = req.query.id
  adminHelpers.getUser(userId).then((user)=>{

    res.render('admin/manage/user/edit-user.hbs',{admin:true,user})
  })

})

router.get('/authors',function(req,res){
  adminHelpers .getAuthors().then((authors)=>{
    res.render('admin/manage/authors/main.hbs',{admin:true,authors})
  })
  
})

router.get('/publishers',function(req,res){
  adminHelpers .getPublishers().then((publishers)=>{
    res.render('admin/manage/publishers/main.hbs',{admin:true,publishers})
  })
  
})

router.get('/categories',function(req,res){
  adminHelpers .getCategories().then((categories)=>{
    res.render('admin/manage/categories/main.hbs',{admin:true,categories})
  })
  
})

// ADD 

router.get('/add-books',function(req,res){
  res.render('admin/manage/book/add-book',{admin:true})
})

router.get('/add-user',function(req,res){
  res.render('admin/manage/user/add-user',{admin:true})
})

router.get('/add-author',function(req,res){
  res.render('admin/manage/authors/add-author',{admin:true})
})

router.get('/add-publisher',function(req,res){
  res.render('admin/manage/publishers/add-publisher',{admin:true})
})

router.get('/add-category',function(req,res){
  res.render('admin/manage/categories/add-category',{admin:true})
})

router.get('/issue-book',function(req,res){
  let UserID = req.query.uid;
  let BookID = req.query.bid;
  let issueDt = new Date();
  let returnDt = new Date();
  returnDt.setDate(issueDt.getDate()+14)
  let issueDate =  dateFormat(issueDt,"dd-mm-yyyy")
  let returnDate =  dateFormat(returnDt,"dd-mm-yyyy")
 
  let bookObject = {
    IssueID: new mongo.ObjectID(),
    BookID: objectId(BookID),
    IssueDt: issueDate,
    ReturnDt: returnDate,
    Status:true
  }

  

  adminHelpers.issueBook(bookObject,UserID).then(()=>{
    adminHelpers.updateHolder(BookID,UserID).then(()=>{
      res.json({status:true})
    })
  })

})

router.get('/return-book',function(req,res){
  let UserID = req.query.uid;
  let IssueID = req.query.bid;

  adminHelpers.returnBook(IssueID,UserID).then(()=>{
    res.json({status:true})
  })
  
})

router.get('/renew-book',function(req,res){
  let UserID = req.query.uid;
  let IssueID = req.query.bid;
  
  adminHelpers.renewBook(IssueID,UserID).then(()=>{
    
    res.json({status:true})
  })
  
})

// DELETE

router.get('/delete-user',function(req,res){
  let userId = req.query.id; 
  adminHelpers .deleteUser(userId).then(()=>{
    res.redirect('/admin/user')
  })
  
})

router.get('/delete-author',function(req,res){
  let authorId = req.query.id; 
  adminHelpers .deleteAuthor(authorId).then(()=>{
    res.redirect('/admin/authors')
  })
  
})

router.get('/delete-publisher',function(req,res){
  let publisherId = req.query.id; 
  adminHelpers .deletePublisher(publisherId).then(()=>{
    res.redirect('/admin/publishers')
  })
  
})


router.get('/delete-category',function(req,res){
  let categoryId = req.query.id; 
  adminHelpers .deleteCategory(categoryId).then(()=>{
    res.redirect('/admin/categories')
  })
  
})



// POST METHODS

router.post('/add-user',function(req,res){
  let user = req.body;
  adminHelpers .addUser(user).then((userName)=>{
    res.json(userName)
  })
})

router.post('/edit-user',(req,res)=>{
  let id = req.body.id
  adminHelpers.updateUser(id,req.body).then((user)=>{
    
    res.json(user)
  })
})

router.post('/edit-book',(req,res)=>{
  let id = req.body.id
  adminHelpers.updateBook(id,req.body).then((book)=>{
    res.json(book)
  })
})


router.post('/add-book',function(req,res){
  let book = req.body;
  adminHelpers .addBook(book).then((bookName)=>{
    res.json(bookName)
  })
})

router.post('/add-author',function(req,res){
  let author = req.body;
  adminHelpers .addAuthor(author).then((authorName)=>{
    res.json(authorName)
  })
})

router.post('/add-publisher',function(req,res){
  let publisher = req.body;
  adminHelpers .addPublisher(publisher).then((publisherName)=>{
    res.json(publisherName)
  })
})

router.post('/add-category',function(req,res){
  let category = req.body;
  adminHelpers .addCategory(category).then((categoryName)=>{
    res.json(categoryName)
  })
})
// router.post('/add-books',(req,res)=>{
  
  
//   adminHelpers s.addProduct(req.body,(id)=>{
//     let image=req.files.image
//     console.log(id)
//     image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
//       if(!err){
//         res.render("admin/add-books")
//       }else{
//         console.log(err)
//       }
//     })
//     res.render('admin/add-books')
//   })
// })

// router.get('/delete-book/:id',(req,res)=>{
//   let proId=req.params.id
//   adminHelpers s.deleteBook(proId).then((response)=>{
//     res.redirect('/admin/')
//   })

// })

// router.get('/edit-book/:id',async(req,res)=>{
//   let product=await adminHelpers s.getProductDetails(req.params.id)
//   res.render('admin/edit-book',{product})

// })

// router.post('/edit-book/:id',(req,res)=>{
//   let id = req.params.id
//   adminHelpers s.updateProduct(req.params.id,req.body).then(()=>{
//     res.redirect('/admin')
//     if(req.files.image){
//       let image=req.files.image
//       image.mv('./public/product-images/'+id+'.jpg')
//     }
//   })
// })



module.exports = router;
