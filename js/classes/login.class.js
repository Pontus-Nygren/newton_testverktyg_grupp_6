class Login extends Base {

  constructor(propertyValues){
    super(propertyValues);
  }

  validate() {

    var usernamed = document.getElementById("email").value;
    var passworded = document.getElementById("password").value;
 
    //this.db.usernameCheck([email, passworded],(data));
    var users = new UserList();
    users.readAllFromDb(()=>{
      for(var user of users){
        if(usernamed.toLowerCase()===user.email.toLowerCase() && passworded.toLowerCase() === user.password.toLowerCase()){
          if(user.role.toLowerCase() =='teacher'){
            window.location.href = "/teacher"; // Redirecting to other page.
          }
          else if(user.role.toLowerCase() ==='student') {
            window.location.href = "/student";
          }
          var userAsStr = JSON.stringify(user);
          localStorage.setItem('user', userAsStr);
          break;
        }        
      }

      if(usernamed.toLowerCase() !=user.email.toLowerCase() || passworded.toLowerCase() != user.password.toLowerCase()){
           $('.alert').remove(); //not to get the error message repeatedly
           $('.page-content').append('<div class="alert alert-danger" role="alert">Please enter a valid username or password.</div>');
        }
    });
  }
}