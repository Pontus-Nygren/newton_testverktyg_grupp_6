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
        console.log("user logged in ", user.firstName);
        if(usernamed.toLowerCase()===user.email.toLowerCase() && passworded.toLowerCase() === user.password.toLowerCase()){
          if(user.role.toLowerCase() ==='teacher'){
            window.location.href = "/tasksMenu"; // Redirecting to other page.
          }
          else if(user.role.toLowerCase() ==='student') {
            window.location.href = "/tasksMenu";
          }
          else{
            return false;
          }
          this.loggedInUser = user.firstName + ' ' + user.lastName;
          $('.navbar-right').html(`<li class = "loggedInUser" >${this.loggedInUser}</li>`);

          var userAsStr = JSON.stringify(user);
          localStorage.setItem('user', userAsStr);
          console.log("*********************", user)
          break;
        }
      }
    });
  }
}