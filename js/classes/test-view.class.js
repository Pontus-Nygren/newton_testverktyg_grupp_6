class TestView extends Base {

  defaultPropertyValues(){
    return {
      test: new Test()
    }
  }

  constructor(propertyValues = {}, callback){
    super(propertyValues);
    this.currentQuestionIndex = 0;
    this.test = new TestFromDb(propertyValues, ()=>{
    	console.log('this.test',this.test.test);
    	callback(this.test.test);
    });
    
  }

	submitTest(){
		$('.page-content').empty();
		//var result = new Result();
		//console.log(this.test.readResponseFromDB());
		//this.test.readResponseFromDB();
		var user = JSON.parse(localStorage.getItem('user'));
		var u_id = user.user_id;
		var result = new Result();
		result.readSum(u_id, this.test.test_id, ()=>{
			console.log("result",result);
			result.users_user_id = u_id;
			result.tests_test_id = this.test.test_id;
			result.insertInDb(console.log);
			result.display('.page-content');
		});		
	}

  	get question(){
		var q = this.test.questions[this.currentQuestionIndex];
		console.log('current',this.currentQuestionIndex);
		return q;
	}

	

	nextQuestion(){
		var atLeastOneIsChecked = $('input[name="chk[]"]:checked').length > 0;
		console.log('atLeastOneIsChecked',atLeastOneIsChecked);

		if(this.test.questions.length > this.currentQuestionIndex && atLeastOneIsChecked){
			$('.alert').remove();
			$('.optionPoint').prop('checked', false);
			this.currentQuestionIndex++;
			console.log(this.test.questions.length, this.currentQuestionIndex );
		} else if(!atLeastOneIsChecked){
			$('.alert').remove();
			$('.question-container').append('<div class="alert alert-warning" role="alert">You need to select at least one option. Remember - you can always go back and change your answer before you submit.</div>');
		}
	}
	prevQuestion(){
		if(this.currentQuestionIndex > 0){
			$('.alert').remove();
			$('.optionPoint').prop('checked', false);
			this.currentQuestionIndex--;
			console.log( this.currentQuestionIndex );
		}
	}

}