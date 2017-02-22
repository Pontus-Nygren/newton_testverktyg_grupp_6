class Test extends Base{ 
	static defaultPropertyValues(){
    return {
	      id: 0,
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
}