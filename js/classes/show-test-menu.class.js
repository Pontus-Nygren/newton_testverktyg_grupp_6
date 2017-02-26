class ShowTestMenu extends Base {

	constructor(propertyValues){
		super(propertyValues);
	}

	takeTest(index){
		$('.page-content').empty();
		// Skriver in indexet på testet man vill visa manuellt än så länge,
		// sen kan man använda index från när man klickar på test från en lista
		this.getTestFromDB(0,(test)=>{
			$('.page-content').html('');
			test.display('.page-content');
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
}