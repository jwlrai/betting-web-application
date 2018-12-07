const db =  require('./models');
const bcrypt = require('bcrypt');
if(db.group != undefined && db.users != undefined){
    db.group.remove({});
    db.users.remove({});
}
if(db.schedule != undefined){
    db.schedule.remove({});
}

if(db.teams != undefined){
    db.teams.remove({});
}
if(db.betting != undefined){
    db.betting.remove({});
}

db.group.create([{
        name: 'admin',
        description:'system admin with all the privileges'
    },
    {
        name: 'user',
        description:'application end user'
    }],
    function(err,data){
        data.forEach((ele)=>{
            if(ele.name=='admin'){
                bcrypt.hash('admin', 10, function(err, hash) {
                    if(err){
                        console.log('error in hasing password');
                    }
                    db.users.create({
                        name:'admin',
                        address:'web betting',
                        email:'admin@admin.com',
                        phone:'1234567890',
                        fund:'0',
                        password:hash,
                        active:1,
                        groupId:ele._id
                    },(ers,data)=>{
                        if(ers){
                            console.log('users cretion error')
                        }else{
                            console.log('data inserted sucessfuly');
                            console.log(data);
                        }
                    });
                });

            }
        });


    }
);