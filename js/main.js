// Fix MySQL dateTime formatting
function dateTimeForMySQL(d){
	return new Date(d).toISOString().slice(0,19).replace('T', ' ');
}


// Create the app on DOM ready
$(()=>{
	//new App()
	/*
	var login = new Login();
	login.display('body');
	*/
	var tests = new TestList([{
		id: 1,
		startingTime: '2017-02-02 09:00', //dateTimeForMySQL(2017-01-01 09:00:00),
	    endingTime: '2017-02-02 16:00', //dateTimeForMySQL(2017-01-01 16:00:00),
	    allowedTime: 3,
	    questions: [{
			id: 1, 
			imageURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR0pcNSyjJILQeqWiSRLr6U8Qhmvs9YGo_AguL2f8O9snFFSX2OIg',
			test_id: 1,
			text: 'What are you going to eat today?',
			options: [{
				id: 1,
				question_id: 1,
				text: 'Hamburgers',
				points: 1
			},
			{
				id: 2,
				question_id: 1,
				text: 'Pizza',
				points: 1
			},
			{
				id: 3,
				question_id: 1,
				text: 'Salad',
				points: 0
			}]
		},
		{
			id: 2, 
			imageURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR0pcNSyjJILQeqWiSRLr6U8Qhmvs9YGo_AguL2f8O9snFFSX2OIg',
			test_id: 1,
			text: 'How hungry are you?',
			options: [{
				id: 1,
				question_id: 1,
				text: 'Not at all',
				points: 0
			},
			{
				id: 2,
				question_id: 1,
				text: 'Very much',
				points: 1
			}]
		}
		]
	}]);
	tests.writeToDb(()=>{

      console.log("Written to DB!",tests);
      // Now read it back into a list to confirm
      var listFromDb = new TestList();
      listFromDb.readAllFromDb(()=>{
        console.log("Read from DB",listFromDb);
      });

    });
	//test.display('body');
});