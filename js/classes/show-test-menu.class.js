class ShowTestMenu extends Base {

  constructor(propertyValues){
    super(propertyValues);
  }

  takeTest(){
  $('.page-content').empty();
  test.display('body');
  this.writeQuestionsToDatabase();
}

		writeQuestionsToDatabase() {
			var test_id;
			var text; 
			var open; 

					// Create a new list of petowners
					var list = new QuestionList();

					list.push({
						test_id : 2,
						text: 'What are you going to eat today?',
						open : 0

					});


				    // Write the list to DB
				    list.writeToDb(()=>{

				    	console.log("Written to DB!",list);

				      // Now read it back into a list to confirm
				      var listFromDb = new QuestionList();
				      listFromDb.readAllFromDb(()=>{
				      	//for(var i = 0; i<listFromDb.length; i++)
				      //	{
				      		console.log("Read from DB",listFromDb);
				      		
				      //  this.generatePets();
				  //}
				  $('body').append(listFromDb[0].text);
				});

				  });
				}


}