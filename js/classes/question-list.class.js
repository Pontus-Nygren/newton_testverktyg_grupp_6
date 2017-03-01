class QuestionList extends List {

	constructor(items){
		super(Question,items);
		this.db.createTableIfNeeded();
	}

	writeToDb(callback){
		var co = 0, listLength = this.length;
		function callbackEach(res){
			co++;
			if(co == listLength){ callback(); }
		}
		for(let question of this){
			question.insertInDb(callbackEach);
		}
	}

		insertInDb(callback){
		this.db.questions({
		  question_id: this.question_id,
          imageURL: this.imageURL,
          test_id: this.test_id,
          question_text: this.text,
          isOpen: this.isOpen,
			
		},callback);
	}

	readAllFromDb(callback){
		this.db.readAll((data)=>{
			this.push.apply(this,data);
			callback();
		});
	}

	static get sqlQueries() {
		return {
			createTableIfNeeded: `
			CREATE TABLE IF NOT EXISTS questions (
			  question_id int(11) NOT NULL AUTO_INCREMENT,
			  imageURL VARCHAR(255),
			  tests_test_id int(11),
			  question_text longtext,
			  isOpen tinyint(1),
			PRIMARY KEY (question_id),
		  	KEY fk_questions_tests_idx (tests_test_id),
		  	CONSTRAINT fk_questions_tests FOREIGN KEY (tests_test_id) REFERENCES tests (test_id)
		  	ON DELETE NO ACTION ON UPDATE NO ACTION
			)
			`,
			readAll: `
			SELECT * FROM questions
			`
		}
	}  
}