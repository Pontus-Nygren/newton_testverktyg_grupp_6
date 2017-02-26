class Option extends Base { 

	static defaultPropertyValues(){

    return {
	      option_id: 0,
	      question_id: 0,
	      option_text: 'No',
	      points: 0
    	}
  	}



	constructor(propertyValues = {}){ 
		super(propertyValues);
		var counter = 0; //to count the number of questions
		window.sum = 0;
	}		

		
	insertInDb(callback){
		this.db.newOption({
			option_id: this.option_id,
			option_text: this.option_text,
			questions_question_id: this.question_id,
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