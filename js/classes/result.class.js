class Result extends Base {

	static defaultPropertyValues(){

    return {
			result_id: 0,
			users_user_id: 0,
			tests_test_id:0,
			finalResult: 0
    	}
  	}

  constructor(propertyValues){
    super(propertyValues);
    this.db.createCalcView();
  }

  calculateResult(){   //to be continued
  	//var testResult = new Test();
  	  var testResult = new StudentTest();
  	  testResult.submitTest(()=>{
  	  console.log("result", testResult);

	      	});
  }

	insertInDb(callback){
		this.db.newResult({
			result_id: this.result_id,
			users_user_id: this.users_user_id,
			tests_test_id: this.tests_test_id,
			finalResult: this.finalResult
			
		},callback);
	}

		readSum(user_id, test_id, callback){
		this.db.calc([user_id,test_id],(data)=>{
			//this.push.apply(this,data);
			console.log('data', data[0].sum, 'user_id', user_id, 'this',this);
			this.finalResult = data[0].sum;
			callback && callback(this);
		});
	}

	static get sqlQueries(){
		return {
			newResult: `
			INSERT results SET ?
			` ,
		    createCalcView: `
			create or replace view responseOptionQuestion as
			select response.options_option_id as option_id, response.users_user_id as user_id, options.points, questions.tests_test_id as test_id
			from response
			inner join options
			on response.options_option_id = options.option_id
			inner join questions
			on options.questions_question_id = questions.question_id
			`,
			calc: `
			select sum(points) AS sum from responseoptionquestion
			where user_id = ? AND test_id = ?
			`
		}
	}
}