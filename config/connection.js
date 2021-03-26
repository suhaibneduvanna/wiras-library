const mongoClient=require('mongodb').MongoClient
const state={
    db:null
}
module.exports.connect=(done)=>{
    const url='mongodb+srv://wirasLibrary:wirasLibrary@cluster0.1jdl2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    const dbname='library'



    mongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db=data.db(dbname)
        done()
    })

    
}

module.exports.get=()=>{
    return state.db
}