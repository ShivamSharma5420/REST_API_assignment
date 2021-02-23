var pipeline=[
            {$match: {languages:{$exists: true}} },
            {$unwind: "$languages"},
            {$group: {_id:"$_id", favLanguages:{$push:"$languages"}} },
            
            
                 
                ]


db.testCollection.aggregate(pipeline)