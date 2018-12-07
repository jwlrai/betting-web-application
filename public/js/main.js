

    $(document).ready(function(e){
        $('nav li a').click(function(e){
            e.preventDefault();
            var page = $(this).attr('href');
            var ths = $(this);
            if(page !=='account'){
                $('main > div.container').load(page,function(response, status, xhr){
                    ths.parents('ul').children('li').removeClass('nav-sel');
                   console.log(page);
                    if(page=='/logout'){
                        window.location='/';
                    }
                    else if(page=='/page/profile'){
                        ths.parents('ul').parent('li').addClass('nav-sel');
                    }else{
                        ths.parent('li').addClass('nav-sel');
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
    