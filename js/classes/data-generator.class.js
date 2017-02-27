class DataGenerator extends Base {
	
	constructor(callback){
	    super();
	    this.callback = callback;
	    this.dropTables(()=>{
	      this.writeTestsToDatabase();
	    });
  	}

  	dropTables(callback){
	    this.db.dropTests(()=>{
	      this.db.dropQuestions(()=>{
	      	this.db.dropOptions(callback);
	      });
	    });
  	}

  	writeTestsToDatabase(){
		var list = new TestList();
		list.push({
			startingTime: '2017-12-12 12:00:00',
			endingTime: '2017-12-13 15:00:00',
			allowedTime: 5
		},
		{
			startingTime: '2017-03-11 10:00:00',
			endingTime: '2017-03-11 15:00:00',
			allowedTime: 3
		}
		);

	// Write the list to DB
	
	list.writeToDb(()=>{
		console.log("Written to DB!",list);
		      // Now read it back into a list to confirm
		      var listFromDb = new TestList();
		      listFromDb.readAllFromDb(()=>{
		      	console.log("Read from DB!!!",listFromDb);
		      	this.writeQuestionsToDatabase(listFromDb);
		      });
		      
		  });

	}

	writeQuestionsToDatabase(listFromDb) {
		// Create a new list of questions
		var list = new QuestionList();
		for(let test of listFromDb){
			list.push({
			imageURL: 'https://wyncode.co/wp-content/uploads/2014/08/171.jpg',
			test_id : test.test_id,
			question_text: 'What are you going to eat today?',
			isOpen : 0

		},
		{
			imageURL: 'https://wyncode.co/wp-content/uploads/2014/08/31.jpg',
			test_id : test.test_id,
			question_text: 'Are you cool?',
			isOpen : 0
		},
		{
			imageURL: 'https://s-media-cache-ak0.pinimg.com/736x/d4/f2/00/d4f20041254a0727ddce7cb81be9e68c.jpg',
			test_id : test.test_id,
			question_text: 'Do you love programming?',
			isOpen : 0
		}
		);
		}

	    // Write the list to DB
	    list.writeToDb(()=>{
		    console.log("Written to DB!",list);
	    	// Now read it back into a list to confirm
	    	var listOfQuestions = new QuestionList();
		    listOfQuestions.readAllFromDb(()=>{
		      	console.log("Read from DB!!!",listOfQuestions);
		      	this.writeOptionsToDatabase(listOfQuestions);
		    });
		});
	}

	writeOptionsToDatabase(listOfQuestions) {
		// Create a new list of options
		
		var list = new OptionList();
		for(let question of listOfQuestions){
			list.push({
				question_id: question.question_id,
				option_text: 'Yes',
				points: 1
			},
			{
				question_id: question.question_id,
				option_text: 'Maybe',
				points: 0
			},
			{
				question_id: question.question_id,
				points: 0
			}
			);
		}
		

		
	    // Write the list to DB
	    
	    list.writeToDb(()=>{

	    	console.log("Written to DB!",list);

		    // Now read it back into a list to confirm
		    var listOfOptions = new OptionList();
		    listOfOptions.readAllFromDb(()=>{
		      	console.log("Read from DB!!!",listOfOptions);
		      	this.callback(listOfOptions);
		    });
	      
		});
	}

	 static get sqlQueries(){
	    return {
	      dropTests: `
	        DROP TABLE IF EXISTS tests
	      `,
	      dropQuestions: `
	        DROP TABLE IF EXISTS questions
	      `,
	      dropOptions: `
	        DROP TABLE IF EXISTS options
	      `
    	}
  	}
}