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
    this.db.createTableIfNeeded();
    this.db.createCalcView();
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
	selectUser(test_id, callback){
	this.db.userSelect([test_id],(data)=>{
		console.log('data', data, 'test_id', test_id, 'this',this);
		this.doneBy = new UserList(data);
		callback && callback(this);
	})
}


	static get sqlQueries(){
		return {
			createTableIfNeeded: `
			CREATE TABLE IF NOT EXISTS results (
			result_id int(11) NOT NULL AUTO_INCREMENT,
			users_user_id int(11),
			tests_test_id int(11) ,
			finalResult DOUBLE,
			PRIMARY KEY (result_id),
			KEY fk_users_user_idx (users_user_id),
			KEY fk_tests_test_idx (tests_test_id),
		  	CONSTRAINT fk_tests_test_id FOREIGN KEY (tests_test_id) REFERENCES tests (test_id)
		  	ON DELETE NO ACTION ON UPDATE NO ACTION,
		  	CONSTRAINT fk_users_user_id FOREIGN KEY (users_user_id) REFERENCES users (user_id)
		  	ON DELETE NO ACTION ON UPDATE NO ACTION
			)
			`,
			newResult: `
			INSERT results SET ?
			` ,
		    createCalcView: `
			create or replace view responseOptionQuestion as
			select responses.options_option_id as option_id, responses.users_user_id as user_id, options.points, questions.tests_test_id as test_id
			from responses
			inner join options
			on responses.options_option_id = options.option_id
			inner join questions
			on options.questions_question_id = questions.question_id
			`,
			calc: `
			select sum(points) AS sum from responseoptionquestion
			where user_id = ? AND test_id = ?
			`,
			createStudentResultView: `
			create or replace view usersResultView as
			select users.user_id, users.firstName, users.lastName, results.finalResult
			from users
			inner join results
			on users.user_id = results.users_user_id
			`,
		}
	}
}