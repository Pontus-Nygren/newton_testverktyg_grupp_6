class Login extends Base {

  constructor(propertyValues){
    super(propertyValues);
  }

validate() {
var usernamed = document.getElementById("username").value;
var passworded = document.getElementById("password").value;
this.db.usernameCheck([usernamed, passworded],(data));
if ( usernamed == "abc" && passworded == "123")
   {
alert ("Login successfully");
window.location = "http://localhost:3000/tasksMenu"; // Redirecting to other page.
return false;
   }
                   }


  static get sqlQueries(){

return {

	usernameCheck: `
	     SELECT user WHERE username = ? AND password = ?
	     `,

  }

  }
}