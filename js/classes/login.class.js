class Login extends Base {

  constructor(propertyValues){
    super(propertyValues);
  }

  validate() {

  //there is no username column in my table and used firstname as a username
  var usernamed = document.getElementById("email").value;
  var passworded = document.getElementById("password").value;

//this.db.usernameCheck([usernamed, passworded],(data));
var users = new UserList();
users.readAllFromDb(()=>{
  for(var user of users)
  {
    console.log("user logged in ", user.firstName);
    if(usernamed===user.email && passworded === user.password){
     
      if(user.role ==='teacher'){
        window.location.href = "/tasksMenu"; // Redirecting to other page.
      }
      else if(user.role ==='student') {
         //console.log("************"  + $('#bs-example-navbar-collapse-1').attr('class'));
          window.location.href = "/tasksMenu";
          }
          else{
            return false;
          }
      //window.loggedInUser= user;
     // window.loggedInUserName= user.firstName;
     // break;
     var userAsStr = JSON.stringify(user);
     localStorage.setItem('user', userAsStr);
     console.log("*********************", user)
     break;
   }
 }
});

/*if ( usernamed == "abc" && passworded == "123")
   {
alert ("Login successfully");
window.location = "http://localhost:3000/tasksMenu"; // Redirecting to other page.
return false;
}*/
}


  /*static get sqlQueries(){

return {

	usernameCheck: `
	     SELECT users WHERE firstName = ? AND password = ?
	     `,

  }

}*/
}