class OptionList extends List {

	constructor(items){
		super(Option,items);
		this.db.createTableIfNeeded();
		this.db.createTestsWithQuestionsAndOptionsView();
	}

	writeToDb(callback){
		var co = 0, listLength = this.length;
		function callbackEach(res){
			co++;
			if(co == listLength){ callback(); }
		}
		for(let option of this){
			option.insertInDb(callbackEach);
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
			CREATE TABLE IF NOT EXISTS options (
				option_id int(11) NOT NULL AUTO_INCREMENT,
				option_text longtext,
				questions_question_id int(11),
				points int(11),
			PRIMARY KEY (option_id),
			KEY fk_options_questions1_idx (questions_question_id),
			CONSTRAINT fk_options_questions1 
			FOREIGN KEY (questions_question_id) 
			REFERENCES questions (question_id) 
			ON DELETE NO ACTION ON UPDATE NO ACTION
			) 
			`,
			createTestsWithQuestionsAndOptionsView: `
			CREATE OR REPLACE VIEW testsWithQuestionsAndOptions 
			AS SELECT 
			tests.test_id,
			tests.test_name,
			tests.startingTime,
			tests.endingTime,
			tests.allowedTime,
			questions.question_id,
			questions.imageURL,
			questions.question_text,
			questions.isOpen,
			options.option_id,
			options.option_text,
			options.points
			FROM options 
			INNER JOIN questions
			ON options.questions_question_id = questions.question_id
			INNER JOIN tests
			ON questions.tests_test_id = tests.test_id
			`,
			readAll: `
			SELECT * FROM options
			`
		}
	} 
}