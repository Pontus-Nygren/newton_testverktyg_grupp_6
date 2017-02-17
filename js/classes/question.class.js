class Question extends Base{  
	constructor(question_id,test_id, text, isOpen){ 
		this.question_id = question_id;
		this.keyword = test_id;
		this.text = text;
		this.isOpen = isOpen;

		//Push the question the question bank
		theQuestionList.push(this);
	}
}