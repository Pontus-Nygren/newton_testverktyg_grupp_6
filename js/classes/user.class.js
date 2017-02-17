class User extends Base{
	constructor (firstName, lastName, user_id,email,course,role){
		super();
		this.firstName= firstName;
		this.lastName = lastName;
		this.user_id = user_id;
		this.email = email;
		this.course = course;
		this.role = role;
	}

	get name(){
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
}
}