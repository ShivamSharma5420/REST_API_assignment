//db.indexCollection.ensureIndex({"id":1})
db.indexCollection.find({name:"test2000"}).explain("executionStats")
//db.indexCollection.find({id:2000}).explain("executionStats")