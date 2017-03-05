class Option extends Base { 

	static defaultPropertyValues(){

    return {
	      option_id: 0,
	      option_text: 'No',
	      questions_question_id: 0,	      
	      points: 0
    	}
  	}

	constructor(propertyValues = {}){ 
		super(propertyValues);
	}

	pointCalculate(){
   		var user = JSON.parse(localStorage.getItem('user'));
   		if(user){
   			var u_id = user.user_id;
			console.log("u_id", u_id);

			//this.users_user_id = user_id;
			console.log(this.option_id,u_id);
			//This algorithm is to insert the student's options to db, for every question there is
			//a connection with db which is a bad design.
			//Another method can be, saving an object of the options in to an array(text, user_id and option_id) 
			var response = new Response({
				users_user_id: u_id,
				options_option_id: this.option_id
			});

			response.insertInDb(console.log);
   		} else {
   			$('.question-container').append('<div class="alert alert-warning" role="alert">You are not logged in. Please log in to take a test.</div>')
   		}
		
	}	


		
	insertInDb(callback){
		this.db.newOption({
			option_id: this.option_id,
			option_text: this.option_text,
			questions_question_id: this.questions_question_id,
			points: this.points
		},callback);
	}

	static get sqlQueries(){
		return {
			newOption: `
			INSERT options SET ?
			` 
		}
	}
}