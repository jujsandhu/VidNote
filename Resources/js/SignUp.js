$( ".button" ).click(function() {  
  $name = $('#name').val().split(' ');
  $email = $('#email').val();
  $username = $('#username').val();
  $password = $('#password').val();
  $password2 = $('#password2').val();
  $type = 'Student';
  
  
  
  if($password === $password2){
      addNewUserToDB($name[0],$name[1],$type,$username,$password,$email);
      window.location.assign("account.php");
  }
  
});


function addNewUserToDB(fname,sname,type,username,password,email) {
    e.preventDefault();//prevents default form submit.
    var myData = 'action=addNewUser&FirstName=' + fname + '&SecondName='+sname + '&Type=' + type + '&Username=' + username +
            '&Password=' + password + '&Email=' + email; //build a post data structure
    $.ajax({
        async: 'false',
        type: "POST", // HTTP method POST or GET
        url: "Utils/SubmitToDB.php", //Where to make Ajax calls
        dataType: "text", // Data type, HTML, json etc.
        data: myData, //Form variables
        success: function() {
            
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("error");
            alert(thrownError);
        }
    });
}


