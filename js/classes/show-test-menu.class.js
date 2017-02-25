class ShowTestMenu extends Base {

	constructor(propertyValues){
		super(propertyValues);
	}

	takeTest(index){
		$('.page-content').empty();
		//test.display('body');
		this.getTestFromDB(0,(test)=>{
			test.display('body');
		});
	}

	getTestFromDB(index, callback){
		this.getTestListFromDB((testList)=>{
			callback(testList[index]);
		});
	}

	// Hämtar först alla test tillsammans med frågor, men inga men inga svarsalternativ
	// Kallar på readQuestionsAndOptionsFromDB som returnerar en
	// ---- lista över alla test ----
	getTestListFromDB(callback){
		var testsFromDb = new TestList();
		testsFromDb.readAllFromDBWithQuestions(()=>{

	      	this.readQuestionsAndOptionsFromDB(testsFromDb, (testList)=>{
	      		callback(testList);
	      	});
		});
	}

	// ----- Ska bara kallas på från getWholeTestListFromDB -----
	// Hämtar alla frågor tillsammans med svarsalternativ, men inga test
	// Kopplar sen ihop allt så man får en lista med test>frågor>svarsalternativ
	readQuestionsAndOptionsFromDB(testsFromDb, callback){
		var questionsFromDb = new QuestionList();
		questionsFromDb.readAllFromDBWithOptions(()=>{
			// ----- Kopplar ihop test>frågor>svarsalternativ -----
			// Vi har hämtat test som har frågor, men inga svarsalternativ
			// och frågor som har svarsalternativ, men inga test
			// Nu måste vi koppla ihop alla objekten
			
			// Loopar igenom alla test som hämtats från DB
	      	for(let test of testsFromDb){
	      		// Loopar igenom alla testets frågor
	      		for(let question of test.questions){
	      			// Loopar igenom alla frågor som hämtats från DB
	      			for(let q2 of questionsFromDb){
	      				// Kollar om frågorna från test-objekten och de från fråge-objekten är samma
	      				if(question.question_id == q2.question_id){
	      					// Loopar igenom alla svarsalternativ från fråge-objekten
	      					for(let option of q2.options){
		      					// Kollar om svarsalternativen hör ihop med frågorna
								if(question.question_id == option.question_id){
									test.questions[test.questions.indexOf(question)].options.push(option);
								}
	      					}
						}
	      			}
				}
	    	}
	    	// Returnerar hela testlistan
	    	callback(testsFromDb);
		});
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
		
	}


}