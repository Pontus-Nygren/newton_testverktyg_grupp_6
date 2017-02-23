class Question extends Base { 
	/*
	options: [
	      	{
	      		id: 0,
	      		question_id: 0,
	      		text: 'Yes',
	      		points: 0
	      	},
	      	{
	      		id: 0,
	      		question_id: 0,
	      		text: 'No',
	      		points: 0
	      	}
	      ]
	*/
	static defaultPropertyValues(){
    return {
	      question_id: 0,
	      imageURL: 'http://www.sallytylerhayes.net/file/2016/08/thinking_of_fifty_or_more_questions_to_ask_a_guy_on_a_first_date.jpg',
	      test_id: 0,
	      question_text: 'What is a question?',
	      isOpen: 0,
	      options: new OptionList()
    	}
  	}

	constructor(propertyValues = {}){ 
		super(propertyValues);		
		// If needed convert the options property 
	    // from Array to OptionList
	    if(!(this.options instanceof OptionList)){
	      this.options = new OptionList(this.options);
	    }
	}

	insertInDb(callback){
		this.db.newQuestion({
			imageURL: this.imageURL,
			tests_test_id: this.test_id,
			question_text: this.question_text,
			isOpen: this.isOpen
		},callback);
	}

	static get sqlQueries(){
		return {
			newQuestion: `
			INSERT questions SET ?
			` 
		}
	}
}