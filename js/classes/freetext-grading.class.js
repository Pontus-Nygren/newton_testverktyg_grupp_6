class FreetextGrading extends Base {
	static defaultPropertyValues(){
    return {
	      id: 0,
	      points: 10,
	      user_id: 0,
	      freetext_id: 0
    	}
  	}

	constructor(propertyValues = {}){ 
		super(propertyValues);
	}
	}