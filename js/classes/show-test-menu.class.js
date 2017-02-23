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
	list.writeToDb(()=>{
		console.log("Written to DB!",list);

		      // Now read it back into a list to confirm
		      var listFromDb = new TestList();
		      listFromDb.readAllFromDb(()=>{
		      	tests = listFromDb;
		      	console.log("Read from DB!!!",tests);
		      	this.writeQuestionsToDatabase(tests[0].test_id);
		      });
		  });
	}

	writeQuestionsToDatabase(test_id_fromDB) {
		var imageURL;
		var test_id, text, open; 

		// Create a new list of questions
		var list = new QuestionList();

		list.push({
			imageURL: 'http://www.magicalmaths.org/wp-content/uploads/2012/11/questions_answers_2.jpg',
			test_id : test_id_fromDB,
			question_text: 'What are you going to eat today?',
			isOpen : 0

		},
		{
			imageURL: 'http://www.magicalmaths.org/wp-content/uploads/2012/11/questions_answers_2.jpg',
			test_id : test_id_fromDB,
			question_text: 'Are you cool?',
			isOpen : 0
		}
		);


	    // Write the list to DB
	    list.writeToDb(()=>{

	    	console.log("Written to DB!",list);

	      // Now read it back into a list to confirm
	      tests[test_id_fromDB].questions = new QuestionList();
	      tests[test_id_fromDB].questions.readAllFromDb(()=>{
	      	//for(var i = 0; i<listFromDb.length; i++)
	      //	{
	      	console.log("Read from DB",tests[test_id_fromDB].questions);
	      	tests[test_id_fromDB].display('body');
	      //  this.generatePets();
	  	//}
	 	//$('body').append(listFromDb[0].text);
		});

		});
	}
}