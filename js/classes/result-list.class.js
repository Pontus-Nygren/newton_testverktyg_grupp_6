class ResultList extends List {

	constructor(items){
		super(Result,items);
		this.db.createTableIfNeeded();
		}

	writeToDb(callback){
		var co = 0, listLength = this.length;
		function callbackEach(res){
			co++;
			if(co == listLength){ callback(); }
		}
		for(let result of this){
			result.insertInDb(callbackEach);
		}
	}

	readAllFromDb(callback){
		this.db.readAll((data)=>{
			this.push.apply(this,data);
			callback();
		});
	}

	static get sqlQueries(){
		return {
			createTableIfNeeded: `
			CREATE TABLE results (
			  result_id int(11) NOT NULL AUTO_INCREMENT,
			  users_user_id int(11) DEFAULT NULL,
			  tests_test_id int(11) DEFAULT NULL,
			  finalResult double DEFAULT NULL,
			  PRIMARY KEY (result_id),
			  KEY fk_users_user_idx (users_user_id),
			  KEY fk_tests_test_idx (tests_test_id),
			  CONSTRAINT test_id FOREIGN KEY (tests_test_id) REFERENCES tests (test_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
			  CONSTRAINT user FOREIGN KEY (users_user_id) REFERENCES users (user_id) ON DELETE NO ACTION ON UPDATE NO ACTION
			)
			`,
			readAll: `
			SELECT * FROM results
			`

		}
	} 
}