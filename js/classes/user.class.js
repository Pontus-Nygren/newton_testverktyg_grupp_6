class User extends Base {

	static defaultPropertyValues(){
		return {
		  firstName:"Befkadu",
		  lastName: "Degefa",
	      user_id: 1111, 
	      password: 1111, 
	      email: "befat",
	      course: "SYSJ2",
	      role: "Student",
	      response: new ResponsesList()
	  }
	}

	constructor(propertyValues = {}){ 
		super(propertyValues);		
		// If needed convert the responses property 
	    // from Array to responsesList
	    if(!(this.response instanceof ResponsesList)){
	      this.response = new ResponsesList(this.response);
	    }
	}
	

/*	get name(){
		return this.firstName + ' ' + this.lastName;
	}

	set name(fullName){
		fullName = fullName.split(' ');
		if(
			fullName.length<2 ||
			fullName[0].length<1||
			fullName[1].length<1){
			throw("Invalid name. You must have first name and last name");
	}
	this.firstName = fullName[0];
	this.lastName = fullName[1];
}

get userId(){
	return this.user_id;
}

set userId(id){
	this.user_id = id;
}


get userEmail(){
	return this.email;
}

set userEmail(userEmail){
	this.email = userEmail;
}

get userPassword(){
	return this.password;
}

set userPassword(userPassword){
	this.password = userPassword;
}

get userCourse(){
	return this.course;
}

set userCourse(userCourse){
	this.course = userCourse;
}

get userRole(){
	return this.role;
}

set userRole(userRole){
	this.role = userRole;
}*/

insertInDb(callback){
    this.db.newUser({
      firstName: this.firstName,
      lastName: this.lastName,
      user_id: this.user_id,
      password: this.password,
	  email: this.email,
	  course: this.course,
	  role: this.role
    },callback);
  }

  static get sqlQueries(){
    return {
      newUser: `
        INSERT users SET ?
      ` 
    }
  }

}