class Response extends Base{
		static defaultPropertyValues(){
    return {
	      user_id: 0,
	      option_id: 0
    	}
  	}

	constructor(propertyValues = {}){ 
		super(propertyValues);
	}
	}
}