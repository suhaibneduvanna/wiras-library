var db=require('../config/connection')
var collection=require('../config/collections');
const collections = require('../config/collections');
var objectId=require('mongodb').ObjectID;
const { response } = require('express');
module.exports={


    addProduct:(product,callback)=>{
        let category = product.Category
        product.category = true
        db.get().collection('product').insertOne(product).then((data)=>{
            callback(data.ops[0]._id)
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let product=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            
            resolve(product)
            
        })
    },
    deleteBook:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).removeOne({_id:objectId(proId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:objectId(proId)},{
                $set:{
                    Name:proDetails.Name,
                    No:proDetails.No,
                    Category:proDetails.Category,
                    Author:proDetails.Author,
                    Publisher:proDetails.Publisher,
                    Holder:proDetails.Holder
                }
            }).then((response)=>{
                resolve()
            })
        })
    },
    getCategory:(category)=>{
        return new Promise(async(resolve,reject)=>{
            let categoryList=await db.get().collection(collection.PRODUCT_COLLECTION).find( {Category : category} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(categoryList)
            
        })
    },islamicHistory:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicHistory=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicHistory)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    },islamicStudy:()=>{
        return new Promise(async(resolve,reject)=>{
            let islamicStudy=await db.get().collection(collection.PRODUCT_COLLECTION).find( {"Category" : "ഇസ്‌ലാമിക് പഠനം"} ).toArray()
            //db.get().collection(collection.PRODUCT_COLLECTION).find({Category:"ഇസ്‌ലാമിക് പഠനം"}).toArray()
            
            resolve(islamicStudy)
            
        })
    }
}