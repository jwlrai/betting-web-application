const db =  require('./models');

db.group.create([{
            name: 'admin',
            description:'system admin with all the privileges'
        },
        {
            name: 'user',
            description:'application end user'
        }],
        function(err,data){
            console.log('data inserted sucessfuly');
        }
);