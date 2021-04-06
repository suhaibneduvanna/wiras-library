var db = require('../config/connection')
var collection = require('../config/collections')
var objectId = require('mongodb').ObjectID
const { response } = require('express')
const collections = require('../config/collections')
const fileUpload = require('express-fileupload')
const dateFormat = require("dateformat");
module.exports = {

    getBooks: () => {
        return new Promise(async (resolve, reject) => {
            let books = await db.get().collection(collection.BOOKS_COLLECTION).find().toArray()
            resolve(books)

        })
    },

    getBook: (bookId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.BOOKS_COLLECTION).findOne({ _id: objectId(bookId) }).then((book) => {
                resolve(book)
            })
        })
    },

    getUsers: () => {
        return new Promise(async (resolve, reject) => {
            let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)

        })
    },
    getUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).findOne({ _id: objectId(userId) }).then((user) => {
                resolve(user)
            })
        })
    },

    getAuthors: () => {
        return new Promise(async (resolve, reject) => {
            let authors = await db.get().collection(collection.AUTHOR_COLLECTION).find().toArray()
            resolve(authors)

        })
    },

    getPublishers: () => {
        return new Promise(async (resolve, reject) => {
            let publishers = await db.get().collection(collection.PUBLISHER_COLLECTION).find().toArray()
            resolve(publishers)

        })
    },

    getCategories: () => {
        return new Promise(async (resolve, reject) => {
            let categories = await db.get().collection(collection.CATEGORY_COLLECTION).find().toArray()
            resolve(categories)

        })
    },

    // ADD 

    issueBook: (bookObject, userId) => {

        return new Promise(async (resolve, reject) => {
            let userCart = await db.get().collection(collection.CART_COLLECTION).findOne({ User: objectId(userId) })
            if (userCart) {

                db.get().collection(collections.CART_COLLECTION).updateOne({ User: objectId(userId) }, {

                    $push: { Books: bookObject }

                }).then((response) => {
                    resolve()
                })



            } else {
                let cartObjects = {
                    User: objectId(userId),
                    Books: [bookObject]
                }

                db.get().collection(collection.CART_COLLECTION).insertOne(cartObjects).then((response) => {

                    resolve()
                })
            }
        })
    },

    returnBook: (iid, uid) => {
        return new Promise(async (resolve, reject) => {

            let userCart = await db.get().collection(collection.CART_COLLECTION).findOne({ User: objectId(uid) })
            if (userCart) {
                let book = userCart.Books.findIndex(book => book.IssueID == iid)
               
                if (book != -1) {
                   let bid =  await db.get().collection(collection.CART_COLLECTION)
                        .findOneAndUpdate(
                            {
                                User: objectId(uid), 'Books.IssueID': objectId(iid)
                            },
                            {
                                $set: {'Books.$.Status':false}
                            },
                            {
                               
                                projection: {'Books.BookID.$':true} 
                            }
                            
                        )
                        

                    
                    db.get().collection(collection.BOOKS_COLLECTION).updateOne({ _id: objectId(bid.value.Books[0].BookID) }, {
                        $set: {
                            Holder: false
                        }
                    }).then(()=>{
                        resolve()
                    })


                }


            }

        })
    },

    renewBook: (iid, uid) => {
        return new Promise(async (resolve, reject) => {

            let userCart = await db.get().collection(collection.CART_COLLECTION).findOne({ User: objectId(uid) })
            if (userCart) {
                let book = userCart.Books.findIndex(book => book.IssueID == iid)
                if (book != -1) {
                   let bid =  await db.get().collection(collection.CART_COLLECTION)
                        .findOneAndUpdate(
                            {
                                User: objectId(uid), 'Books.IssueID': objectId(iid)
                            },
                            {
                                $set: {'Books.$.Status':true}
                            },
                            {
                               
                                projection: {'Books.ReturnDt.$':true} 
                            }
                            
                        )
                        console.log(bid.value.Books[0].ReturnDt)
                        let oldDateArr = bid.value.Books[0].ReturnDt.split('-')
                        let newReturnDate = new Date(oldDateArr[2],oldDateArr[1]-1,oldDateArr[0])
                        newReturnDate.setDate(newReturnDate.getDate()+8)
                        let returnDate =  dateFormat(newReturnDate,"dd-mm-yyyy")
                        console.log(returnDate)

                    
                    db.get().collection(collection.CART_COLLECTION).updateOne(
                        { User: objectId(uid), "Books.IssueID": objectId(iid) },
                        { $set: { "Books.$.ReturnDt" : returnDate } }
                    ).then(()=>{
                        
                        resolve()
                    })


                }


            }

        })
    },
    
    addUser: (user) => {

        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).insertOne(user).then((data) => {
                resolve(data.ops[0].Name)
            })
        })
    },

    addBook: (book) => {

        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.BOOKS_COLLECTION).insertOne(book).then((data) => {
                resolve(data.ops[0].Name)
            })
        })
    },

    addAuthor: (author) => {

        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.AUTHOR_COLLECTION).insertOne(author).then((data) => {
                resolve(data.ops[0].Name)
            })
        })
    },

    addPublisher: (publisher) => {

        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.PUBLISHER_COLLECTION).insertOne(publisher).then((data) => {
                resolve(data.ops[0].Name)
            })
        })
    },

    addCategory: (category) => {

        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.CATEGORY_COLLECTION).insertOne(category).then((data) => {
                resolve(data.ops[0].Name)
            })
        })
    },


    deleteBook: (bookId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.BOOKS_COLLECTION).removeOne({ _id: objectId(bookId) }).then(() => {
                resolve()
            })
        })
    },

    deleteUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).removeOne({ _id: objectId(userId) }).then(() => {
                resolve()
            })
        })
    },

    deleteAuthor: (authorId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.AUTHOR_COLLECTION).removeOne({ _id: objectId(authorId) }).then(() => {
                resolve()
            })
        })
    },

    deletePublisher: (publisherId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PUBLISHER_COLLECTION).removeOne({ _id: objectId(publisherId) }).then(() => {
                resolve()
            })
        })
    },


    deleteCategory: (categoryId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.CATEGORY_COLLECTION).removeOne({ _id: objectId(categoryId) }).then(() => {
                resolve()
            })
        })
    },

    // UPDATE 


    updateHolder: (bookId, userId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).findOne({ _id: objectId(userId) }).then((user) => {


                db.get().collection(collection.BOOKS_COLLECTION).updateOne({ _id: objectId(bookId) }, {
                    $set: {

                        Holder: user.UserID
                    }
                    
                } ).then((response) => {
                    resolve(response)
                })
            })



        })
    },


    updateHolder1: () => {
        return new Promise((resolve, reject) => {



            db.get().collection(collection.BOOKS_COLLECTION).updateMany({}, {
                $set: { Holder: false }
            }).then((response) => {
                resolve()
            })




        })
    },




    updateBook: (id, book) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.BOOKS_COLLECTION).updateOne({ _id: objectId(id) }, {
                $set: {
                    BookNo: book.BookNo,
                    Name: book.Name,
                    Author: book.Author,
                    Publisher: book.Publisher,
                    Category: book.Category,
                    Holder: book.Holder
                }
            }).then((response) => {
                resolve(response)
            })
        })
    },

    updateUser: (id, user) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).updateOne({ _id: objectId(id) }, {
                $set: {
                    UserID: user.UserID,
                    Name: user.Name,
                    Email: user.Email,
                    DOB: user.DOB,
                }
            }).then((response) => {
                resolve(response)
            })
        })
    },

    updateUser: (id, user) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).updateOne({ _id: objectId(id) }, {
                $set: {
                    UserID: user.UserID,
                    Name: user.Name,
                    Email: user.Email,
                    DOB: user.DOB,
                }
            }).then((response) => {
                resolve(response)
            })
        })
    },

    getUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).findOne({ _id: objectId(userId) }).then((user) => {
                resolve(user)
            })
        })
    },

    getUserID: (userId) => {
        return new Promise((resolve, reject) => {
            response
            db.get().collection(collection.USER_COLLECTION).findOne({ UserID: userId }).then((user) => {
                resolve(user)
            })
        })
    },


    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            let product = await db.get().collection(collection.BOOKS_COLLECTION).find().toArray()
            resolve(product)

        })
    },

    getProductDetails: (proId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.BOOKS_COLLECTION).findOne({ _id: objectId(proId) }).then((product) => {
                resolve(product)
            })
        })
    },


    getCartBooks: (userId) => {
        return new Promise(async (resolve, reject) => {
            let userCart
            await db.get().collection(collection.CART_COLLECTION).findOne({ User: objectId(userId) }).then((Cart) => {

                userCart = Cart
            })

            if (userCart) {

                let cartItems = await db.get().collection(collection.CART_COLLECTION).aggregate([
                    {
                        $match: { User: objectId(userId) }
                    },
                    {
                        $unwind: '$Books'
                    },
                    {
                        $project: {
                            IssueID: '$Books.IssueID',
                            BookID: '$Books.BookID',
                            IssueDt: '$Books.IssueDt',
                            ReturnDt: '$Books.ReturnDt',
                            Status: '$Books.Status'
                            
                        }
                    },
                    {
                        $lookup: {
                            from: collection.BOOKS_COLLECTION,
                            localField: 'BookID',
                            foreignField: '_id',
                            as: 'Book'

                        }
                    }
                    // ,
                    // {
                    //     $project:{
                    //         IssueID:1, BookID:1,IssueDt:1,ReturnDt:1, Book:1
                    //     }
                    // }

                ]).toArray()

                resolve(cartItems)
            } else {
                resolve()
            }


        })
    },




}