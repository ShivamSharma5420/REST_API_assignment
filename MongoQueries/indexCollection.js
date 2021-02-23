//creating and insertind 10000 docs

for(var i=0;i<10000;i++){
db.indexCollection.insertOne({id:i,name:"test"+i})
    
}

//creating index on field id
db.indexCollection.ensureIndex({"id":1})



db.indexCollection.find({id:2000})  //this will take less time as index is created in this



db.indexCollection.find({name:"test2000"})   //this will take more time