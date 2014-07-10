  $('#login-trigger').click(function(event){
    $(this).next('#login-content').slideToggle();
    $(this).toggleClass('active');          
    
    if ($(this).hasClass('active')) $(this).find('span').html('&#x25B2;')
      else $(this).find('span').html('&#x25BC;')    
    })
  
  $('#submit').click(function(e){
        e.preventDefault();//prevents default form submit.
        $.ajax({//fetches data from file and inserts it in <div id="data"></div>
            type: 'post',
            url: 'Utils/Login.php',
            data: 'action=Login&'+$('form').serialize(),
            success: function(data) {
                if(data == 'true'){
                    document.location.href = "account.php"
                }
                
            }
        });  
   });




