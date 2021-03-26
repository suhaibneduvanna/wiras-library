var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((product)=>{
    
    
      res.render('admin/view-books' , {product,admin:true})
    
    
    
  })
    
  
  
})
router.get('/add-books',function(req,res){
  res.render('admin/add-books')
})
router.post('/add-books',(req,res)=>{
  
  
  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.image
    console.log(id)
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-books")
      }else{
        console.log(err)
      }
    })
    res.render('admin/add-books')
  })
})

router.get('/delete-book/:id',(req,res)=>{
  let proId=req.params.id
  productHelpers.deleteBook(proId).then((response)=>{
    res.redirect('/admin/')
  })

})

router.get('/edit-book/:id',async(req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  res.render('admin/edit-book',{product})

})

router.post('/edit-book/:id',(req,res)=>{
  let id = req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.image){
      let image=req.files.image
      image.mv('./public/product-images/'+id+'.jpg')
    }
  })
})



module.exports = router;
