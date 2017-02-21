class Question extends Base{ 

	static defaultPropertyValues(){
    return {
	      id: 0,
	      imageURL: 'http://www.sallytylerhayes.net/file/2016/08/thinking_of_fifty_or_more_questions_to_ask_a_guy_on_a_first_date.jpg',
	      test_id: 0,
	      text: 'What is a question?',
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
    	}
  	}

	constructor(propertyValues = {}){ 
		super(propertyValues);

		//Push the question the question bank
		theQuestionList.push(this);
	}
}