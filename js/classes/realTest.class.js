class RealTest extends Base{
	static defaultPropertyValues(){
    return {
	      id: 0,
	      startingTime: 0,
	      endingTime: 0,
	      allowedTime: 0
    	}
  	}

	constructor(propertyValues = {}){ 
		super(propertyValues);
	}
	}
}