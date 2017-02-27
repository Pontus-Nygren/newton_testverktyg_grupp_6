class Login extends Base {

  constructor(propertyValues){
    super(propertyValues);
  }

validate() {

  //there is no username column in my table and used firstname as a username
var email = document.getElementById("email").value;
var passworded = document.getElementById("password").value;

//this.db.usernameCheck([email, passworded],(data));
var users = new UserList();
users.readAllFromDb(()=>{
  for(var list of users)
  {
    console.log("user logged in ", list.firstName);
    if(email.toLowerCase()===list.email.toLowerCase() && passworded.toLowerCase() === list.password.toLowerCase()){
      if(list.role.toLowerCase() ==='teacher'){
        window.location = "/tasksMenu"; // Redirecting to other page.
      }
      else if(list.role.toLowerCase() ==='student') {
         console.log("************"  + $('#bs-example-navbar-collapse-1').attr('class'));
          window.location = "/student";
   
//$("#bs-example-navbar-collapse-1 .navbar-nav .taskMenu").hide()

      }
      else{
        return false;
      }

    }
    }
  });

/*if ( email == "abc" && passworded == "123")
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