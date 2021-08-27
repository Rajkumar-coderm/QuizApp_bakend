require('dotenv').config()
const knex=require('knex')({
    client:'mysql',
    connection:{
        host:process.env.db_host,
        user:process.env.db_user,
        password:process.env.db_pass,
        database:process.env.db_name
    }
});

knex.schema.createTable('users',(Table)=>{
    Table.increments('id').primary()
    Table.string('name')
    Table.string('email')
    Table.string('password')
    Table.string('image')
}).then((data)=>{
    console.log("User Table created succesfully...");
}).catch((err)=>{
    console.log("User Table already exit");
});

knex.schema.createTable('categories',(Table)=>{
    Table.increments('id').primary()
    Table.string('name')
    Table.integer('topic_id')
    Table.string('description')
    Table.dateTime('time')

}).then((data)=>{
    console.log("categories Table created successfully...");
}).catch((err)=>{
    console.log("categories Table already exits,,");
});

knex.schema.createTable('subscription',(Table)=>{
    Table.increments('subscription_id').primary()
    Table.integer('user_id')
    Table.boolean('transaction');
    Table.string('status')
    Table.dateTime('start_time')
    Table.dateTime('end_time')
}).then((data)=>{
    console.log('subcategories Table created successfully..');
}).catch((err)=>{
    console.log("subcategories Table already exit...");
});


knex.schema.createTable('question',(Table)=>{
    Table.increments('question_id').primary()
    Table.string('question')
    Table.string('Option_A')
    Table.string('Option_B')
    Table.string('Option_C')
    Table.string('Option_D')
    Table.integer('topic_id')
    Table.string('image')
    Table.string('description')
    Table.string('answer')
    Table.dateTime('time')
}).then((message)=>{
    console.log("question table created successfully....");
}).catch((message)=>{
    console.log("question table alreay exits..");
});




knex.schema.createTable('response',(Table)=>{
    Table.increments('resp_id').primary()
    Table.integer('user_id')
    Table.integer('question_id')
    Table.integer('topic_id')
    Table.string('response')
    Table.boolean('answerstatus')
    Table.dateTime('time')

}).then((message)=>{
    console.log("respone table created successfully..");
}).catch((message)=>{
    console.log("response table already exits...");
})


knex.schema.createTable('question_like',(Table)=>{
    Table.increments('id').primary()
    Table.integer('user_id')
    Table.integer('question_id')
    Table.integer('topic_id')
    Table.boolean('like')
    Table.dateTime('time')
}).then((message)=>{
    console.log("question_like table created successfully....");
}).catch((message)=>{
    console.log("question_like table already exits...");
});


knex.schema.createTable('admin',(Table)=>{
    Table.increments('id').primary()
    Table.string('name')
    Table.string('email')
    Table.string('password')
}).then((data)=>{
    console.log("Admin Table created succesfully...");
}).catch((err)=>{
    console.log("Admin Table already exit");
});


knex.schema.createTable('categories',(Table)=>{
    Table.increments('id').primary()
    Table.integer('topic_id')
    Table.string('description')
    Table.dateTime('time')
}).then((message)=>{
    console.log("categories Table created successfully...");
}).catch((message)=>{
    console.log("categories Table alredy exits...");
});

knex.schema.createTable('class',(Table)=>{
    Table.increments('class_id').primary()
    Table.string('name')
    Table.string('image')
    Table.string('description')
    Table.string('color')
    Table.string('status')
}).then((message)=>{
    console.log("class Table created succesfully...");
}).catch((message)=>{
    console.log("class table aready exits...");
})

knex.schema.createTable('topics',(Table)=>{
    Table.increments('topic_id').primary()
    Table.string('name')
    Table.string('image')
    Table.integer('class_id')
    Table.string('description')
    Table.dateTime('time')
}).then((message)=>{
    console.log("topics Table created succesfully...");
}).catch((message)=>{
    console.log("topics table aready exits...");
})

module.exports=knex;
