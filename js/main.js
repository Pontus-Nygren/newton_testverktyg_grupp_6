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
	var question = new Question({
		id: 10, 
		imageURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR0pcNSyjJILQeqWiSRLr6U8Qhmvs9YGo_AguL2f8O9snFFSX2OIg',
		test_id: 1,
		text: 'What are you going to eat today?'
	});
	question.display('body');
});