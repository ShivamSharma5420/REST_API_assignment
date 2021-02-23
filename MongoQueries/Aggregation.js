var pipeline=[
            {$group: {_id:"$group",
                        Allages: {$sum:"$age"}, 
                        avgAge:{$avg:"$age"},
                        count:{$sum:1}
                        }
                },
            
            {$match: {$and: [ {count:{$gte:1}}, {Allages:{$gt:15}} ] }
                 },
                 
            {$sort: {avgAge:-1}},
            
            {$skip: 1},
            
            {$limit: 5} ,
            
            {$project: {"No of Count":"$count"}}
            
            
                 
                ]


db.testCollection.aggregate(pipeline)