db.createCollection("testCollection")
db.testCollection.insertOne({name:"Shivam",age:24,group:"Alpha"})
db.testCollection.insertOne({name:"Suyash",age:24,group:"Alpha"})
db.testCollection.insertOne({name:"Snehal",age:24,group:"Alpha"})


db.testCollection.updateMany({group:"Alpha"},{$set:{dateOfJoining:"06/01/20211"}})

db.testCollection.insertOne({name:"Tobedeleted"})

db.testCollection.deleteOne({name:"Tobedeleted"})



db.testCollection.insertMany([{name:"xyz",age:21,group:"unknown"},{name:"abc",age:23,group:"unknown"},{name:"efg",age:19,group:"unknown"}])

db.testCollection.insertOne({name:"pqr",age:18,group:"newGroup"})

db.testCollection.insertOne({name:"testName",age:22,group:"newGroup",languages:["c","c++","java","javaScript"]})


db.testCollection.find().sort({age:1}).limit(5)
db.testCollection.find({},{name:1}).sort({age:1}).limit(5)