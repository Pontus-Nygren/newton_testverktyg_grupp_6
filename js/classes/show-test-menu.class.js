class ShowTestMenu extends Base {

	constructor(propertyValues){
		super(propertyValues);
	}

	takeTest(){
		$('.page-content').empty();
		//test.display('body');
		this.writeTestsToDatabase();
	}

	writeTestsToDatabase(){
		var startingTime, endingTime, allowedTime;

		var list = new TestList();
		list.push({
			startingTime: '2017-12-12 12:00:00',
			endingTime: '2017-12-13 15:00:00',
			allowedTime: 5
		})

	// Write the list to DB
	/*
	list.writeToDb(()=>{
		console.log("Written to DB!",list);

		      // Now read it back into a list to confirm
		      var listFromDb = new TestList();
		      listFromDb.readAllFromDb(()=>{
		      	tests = listFromDb;
		      	console.log("Read from DB!!!",tests);
		      	this.writeQuestionsToDatabase(tests[tests.length - 1].test_id);
		      });
		  });
	*/

	// Testar att bara läsa från databasen
	// den här kodsnutten kan tas bort och avkommentera det ovan om man vill
	// både generera och läsa
	var listFromDb = new TestList();
	listFromDb.readAllFromDb(()=>{
      	tests = listFromDb;
      	console.log("Read from DB!!!",tests);
      	this.writeQuestionsToDatabase(tests[tests.length - 1]);
	});


	}

	writeQuestionsToDatabase(lasts_test_fromDB) {
		var imageURL;
		var test_id, text, open; 

		// Create a new list of questions
		var list = new QuestionList();

		list.push({
			imageURL: 'http://www.magicalmaths.org/wp-content/uploads/2012/11/questions_answers_2.jpg',
			test_id : lasts_test_fromDB.test_id,
			question_text: 'What are you going to eat today?',
			isOpen : 0

		},
		{
			imageURL: 'http://www.magicalmaths.org/wp-content/uploads/2012/11/questions_answers_2.jpg',
			test_id : lasts_test_fromDB.test_id,
			question_text: 'Are you cool?',
			isOpen : 0
		}
		);


	    // Write the list to DB
	    /*
	    list.writeToDb(()=>{

	    	console.log("Written to DB!",list);

	      // Now read it back into a list to confirm
	      tests[0].questions = new QuestionList();
	      tests[0].questions.readAllFromDb(()=>{

	      	console.log("Read from DB",tests[0].questions);
	      	tests[0].display('body');
		});
		});
		*/
		// Testar att bara läsa från databasen
		// den här kodsnutten kan tas bort och avkommentera det ovan om man vill
		// både generera och läsa
		var testsFromDb = new TestList();
		testsFromDb.readAllFromDBWithQuestions(()=>{
			// Måste kolla vilket test_id frågan har innan man väljer vilket test som ska få frågan
			// tests[test_id_fromDB].questions
			/*
			for(let question of testsFromDb){
				for(let test of tests){
					console.log('test.test_id',test.test_id);
					console.log('question.test_id',question.test_id);
					console.log('123question',question);
					if(test.test_id == question.test_id){
						console.log('QUESTION',question);
						test.questions.push(question);
					}
				}
			}
			*/
	      	console.log("12334567Read from DB",testsFromDb);
	      	this.writeOptionsToDatabase(testsFromDb);
	      	console.log('tests', tests);
	      	console.log('test_id_fromDB',lasts_test_fromDB.test_id);
	      	console.log('indexOf',tests.indexOf(lasts_test_fromDB));
	      	console.log(tests[tests.indexOf(lasts_test_fromDB)]);
	      	console.log(tests[0]);
	      	//tests[tests.indexOf(lasts_test_fromDB)].display('body');
		});
	}

	writeOptionsToDatabase(testsFromDb) {
		var question_id, option_text, points; 

		// Create a new list of options
		/*
		var list = new OptionList();

		list.push({
			question_id: question_id_fromDB,
			option_text: 'Yes',
			points: 1
		},
		{
			question_id: question_id_fromDB,
			option_text: 'Maybe',
			points: 0
		},
		{
			question_id: question_id_fromDB,
			points: 0
		}
		);

		*/
	    // Write the list to DB
	    /*
	    list.writeToDb(()=>{

	    	console.log("Written to DB!",list);

		    // Now read it back into a list to confirm
		    tests[0].questions[0].options = new OptionList();
		    tests[0].questions[0].options.readAllFromDb(()=>{

		      	console.log("Read from DB",tests[0].questions[0].options);
			});
	      
		});
		*/
		var questionsFromDb = new QuestionList();
		questionsFromDb.readAllFromDBWithOptions(()=>{
		      	//console.log("Read from DB12345",questionsFromDb);
		      	//console.log('tests from DB:',testsFromDb);
		      	//console.log('questions from DB:',questionsFromDb);
		      	//var listOfQuestions = [];

		      	for(let test of testsFromDb){
		      		//console.log('test!!!!',test);
		      		for(let question of test.questions){
		      			console.log('question!!!!',question);
		      			//listOfQuestionId.push(question);
		      			for(let q2 of questionsFromDb){
		      				if(question.question_id == q2.question_id){
		      					for(let option of q2.options){
			      				//console.log('option!!!!!', option);
								//console.log('question.question_id',question.question_id);
								//console.log('option.question_id',option.question_id);
								//console.log('123question',question);

								if(question.question_id == option.question_id){
									console.log('QUESTION',question);
									//console.log('the question', testsFromDb[0].questions[0]);
									test.questions[test.questions.indexOf(question)].options.push(option);
								}
		      				}
		      				//console.log('second question!!!', q2);
		      				
						}
		      		}
				}
		    }
		      	
			console.log('TESTING:', testsFromDb[0]);
			testsFromDb[1].display('body');
			});
		
	}


}