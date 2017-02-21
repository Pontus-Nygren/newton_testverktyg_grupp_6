// Fix MySQL dateTime formatting
function dateTimeForMySQL(d){
	return new Date(d).toISOString().slice(0,19).replace('T', ' ');
}


// Create the app on DOM ready
$(()=>{
	//new App()
	/*
	var login = new Login();
	login.display('body');
	*/
	var question = new Question();
	question.display('body');
});