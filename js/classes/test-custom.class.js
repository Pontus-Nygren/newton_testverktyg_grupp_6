class TestCustom extends Base { 
	static defaultPropertyValues(){
    return {
          test_id: 0,
	      test_name: '',
	      startingTime: '2017-01-01 09:00', //dateTimeForMySQL(2017-01-01 09:00:00),
	      endingTime: '2017-01-01 16:00', //dateTimeForMySQL(2017-01-01 16:00:00),
    	}
  	}

	constructor(propertyValues = {}){ 
		super(propertyValues);
		// If needed convert the questions property 
	    // from Array to QuestionList
	    if(!(this.questions instanceof QuestionList)){
	      this.questions = new QuestionList(this.questions);	     
	    }
	   	

	    let niceStartingTime = new Date(this.startingTime);
	    let niceEndingTime = new Date(this.endingTime);

		var options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
		
	    this.prettyStartingTime = niceStartingTime.toLocaleString('en-US', options);
	    this.prettyEndingTime = niceEndingTime.toLocaleString('en-US', options);
	}
}