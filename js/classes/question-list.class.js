class QuestionList extends List {

	constructor(items){
		super(Question,items);
		this.db.createTableIfNeeded();
		this.db.createTestsWithQuestionsView();
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

	readAllFromDb(callback){
		this.db.readAll((data)=>{
			this.push.apply(this,data);
			callback();
		});
	}

	readAllFromDBWithQuestions(callback){
    this.db.readAllWithQuestions((data)=>{
      console.log(data);

      // collect all questions in a new array
      var questionsById = {};
      
      
      for(let item of data){

        // create question and store by id
        questionsById[item.question_id] = questionsById[item.question_id] || {
          id: item.question_id,
          imageURL: item.imageURL,
          test_id: item.test_id,
          text: item.text,
          options: []
        }
        // add the current option
        if(item.option_id){
          questionsById[item.question_id].questions.push({
            id: item.option_id,
            text: item.option_text,
            points: item.points
          });
        }

      }

      // Loop through questionsById
      // and push the question to this list
      for(let id in questionsById){
        this.push(questionsById[id]);
      }

      callback();
    });
  }


	static get sqlQueries(){
		return {
			createTableIfNeeded: `
			CREATE TABLE IF NOT EXISTS questions (
			question_id int(11) NOT NULL AUTO_INCREMENT,
			'text' longtext DEFAULT 'What is a question?',
			open tinyint(1) DEFAULT '0',
			KEY 'fk_questions_tests_idx' ('tests_test_id'),
			CONSTRAINT 'fk_questions_tests' FOREIGN KEY ('tests_test_id') 
			REFERENCES 'tests' ('test_id') 
			ON DELETE NO ACTION ON UPDATE NO ACTION
			)
			`,
			createTestsWithQuestionsView: `
			CREATE OR REPLACE VIEW testsWithQuestions 
			AS SELECT 
			tests.test_id,
			tests.startingTime,
			tests.endingTime,
			tests.allowedTime,
			questions.question_id,
			questions.text,
			questions.open 
			FROM tests 
			LEFT JOIN questions 
			ON tests.test_id = questions.tests_test_id
			`,
			readAll: `
			SELECT * FROM questions
			`
		}
	}  
}