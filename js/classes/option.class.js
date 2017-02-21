class Option extends Base{ 

	static defaultPropertyValues(){
    return {
	      id: 0,
	      question_id: 0,
	      text: 'No',
	      points: 0
    	}
  	}

	constructor(propertyValues = {}){ 
		super(propertyValues);

		//Push the question the question bank
		theQuestionList.push(this);
	}
}