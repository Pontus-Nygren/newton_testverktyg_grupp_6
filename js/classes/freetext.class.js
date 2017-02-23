class Freetext extends Base {
	static defaultPropertyValues(){
    return {
	      id: 0,
	      answer: 'I hope i am right',
	      user_id: 0,
	      question_id: 0
    	}
  	}

	constructor(propertyValues = {}){ 
		super(propertyValues);
	}
}