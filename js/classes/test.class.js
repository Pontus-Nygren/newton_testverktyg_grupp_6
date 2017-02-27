class Test extends Base { 
	static defaultPropertyValues(){
    return {
	      test_id: 0,
	      test_name: '',
	      currentQuestionIndex: 0,
	      startingTime: '2017-01-01 09:00', //dateTimeForMySQL(2017-01-01 09:00:00),
	      endingTime: '2017-01-01 16:00', //dateTimeForMySQL(2017-01-01 16:00:00),
	      allowedTime: 0,
	      questions: new QuestionList()
    	}
  	}

	constructor(propertyValues = {}){ 
		super(propertyValues);
		// If needed convert the questions property 
	    // from Array to QuestionList
	    if(!(this.questions instanceof QuestionList)){
	      this.questions = new QuestionList(this.questions);

	     
	    }
	}


	get question(){
		var question = this.questions[this.currentQuestionIndex];
		return question;
	}

	nextQuestion(){
		var atLeastOneIsChecked = $('input[name="chk[]"]:checked').length > 0;
		console.log('atLeastOneIsChecked',atLeastOneIsChecked);

		if(this.questions.length > this.currentQuestionIndex && atLeastOneIsChecked){
			$('.alert').remove();
			$('.optionPoint').prop('checked', false);
			console.log(this.questions.length, this.currentQuestionIndex )
			this.currentQuestionIndex++;
		} else if(!atLeastOneIsChecked){
			$('.alert').remove();
			$('.question-container').append('<div class="alert alert-warning" role="alert">You need to select at least one option. Remember - you can always go back and change your answer before you submit.</div>')
		}
	}
	prevQuestion(){
		if(this.currentQuestionIndex > 0){
			$('.alert').remove();
			$('.optionPoint').prop('checked', false);
			console.log( this.currentQuestionIndex )
			this.currentQuestionIndex--;
		}
	}

    submit(){
		if(this.questions.length !== this.currentQuestionIndex){

		}
	}
	insertInDb(callback){
		this.db.newTest({
			test_name: this.test_name,
			startingTime: this.startingTime,
			endingTime: this.endingTime,
			allowedTime: this.allowedTime
		},callback);
	}

	static get sqlQueries(){
		return {
			newTest: `
			INSERT tests SET ?
			` 
		}
	}
}