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
	}

	insertInDb(callback){
		this.db.newOption({
			question_id: this.question_id,
			text: this.text,
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