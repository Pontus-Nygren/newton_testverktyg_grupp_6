class Test extends Base { 
	static defaultPropertyValues(){
    return {
	      test_id: 0,
	      currentQuestionIndex: 0,
	      startingTime: '2017-01-01 09:00', //dateTimeForMySQL(2017-01-01 09:00:00),
	      endingTime: '2017-01-01 16:00', //dateTimeForMySQL(2017-01-01 16:00:00),
	      allowedTime: 0,
	      questions: new QuestionList()
    	}
  	}

	constructor(propertyValues = {}){ 
		super(propertyValues);
		// If needed convert the questions property 
	    // from Array to QuestionList
	    if(!(this.questions instanceof QuestionList)){
	      this.questions = new QuestionList(this.questions);

	     
	    }
	}


	get question(){
		var question = this.questions[this.currentQuestionIndex];
		return question;
	}

	nextQuestion(){
		if(this.questions.length > this.currentQuestionIndex){
			console.log(this.questions.length, this.currentQuestionIndex )
			this.currentQuestionIndex++;
		}
	}
	prevQuestion(){
		if(this.currentQuestionIndex > 0){
			console.log( this.currentQuestionIndex )
			this.currentQuestionIndex--;
		}
	}

    submit(){
		if(this.questions.length !== this.currentQuestionIndex){

		}
	}
	insertInDb(callback){
		this.db.newTest({
			startingTime: this.startingTime,
			endingTime: this.endingTime,
			allowedTime: this.allowedTime
		},callback);
	}

	static get sqlQueries(){
		return {
			newTest: `
			INSERT tests SET ?
			` 
		}
	}
}