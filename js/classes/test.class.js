class Test extends Base{ 
	static defaultPropertyValues(){
    return {
	      id: 0,
	      currentQuestionIndex: 0,
	      startingTime: '2017-01-01 09:00', //dateTimeForMySQL(2017-01-01 09:00:00),
	      endingTime: '2017-01-01 16:00', //dateTimeForMySQL(2017-01-01 16:00:00),
	      allowedTime: 3,
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
			this.currentQuestionIndex++;
		}
	}
	prevQuestion(){
		if(this.currentQuestionIndex > 0){
			this.currentQuestionIndex--;
		}
	}
}