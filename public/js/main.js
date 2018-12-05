(function(jq){

    $(document).ready(function(e){
        $('nav li a').click(function(e){
            e.preventDefault();
            var page = $(this).attr('href');
            if(page !=='account'){
                $('main > div.container').load(page,function(response, status, xhr){
                   
                    if(page=='/logout'){
                        window.location='/';
                    }
                });
            }
           
        });
        
        // sending image to server
        // jq('#formstest').submit(function(e){
        //     e.preventDefault();
           
        //     var blobFile = jq('#filechooser')[0].files[0];
           
        //     var formData = new FormData();
        //     formData.append("fileToUpload", blobFile);
    
        //     jq.ajax({
        //         url: "sports/create/game",
        //         type: "POST",
        //         data: formData,
        //         processData: false,
        //         contentType: false,
        //         cache: false,
        //         success: function(response) {
        //             console.log(response);
        //             // .. do something
        //         },
        //         error: function(jqXHR, textStatus, errorMessage) {
        //             console.log(errorMessage); // Optional
        //         }
    
        //     });
        // });
    });
    
})();