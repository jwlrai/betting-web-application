(function(){
    
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/api/foods',
            headers: {
                'x-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDM2NTE1NzIsImRhdGEiOiJmb29iYXIiLCJpYXQiOjE1NDM2NTA5NzJ9.laxqBhvR075nqdYmUdJ8ZiqbNSZ1-sBeBlz4VHvKpBI',
            },
            data: $(this).serialize(),
            success: function(data){
                
                
            },
            error: function(err){
                
            }
        });
       
   
})();