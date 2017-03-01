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
			console.log('test',test);
			test.display('.page-content');
			//var testView = new TestView({test:test});
			//testView.display('.page-content');
		});
	}

	getTestFromDB(index, callback){
		this.getTestListFromDB((testList)=>{
			callback(testList[index]);
		});
	}

	getTestListFromDB(callback){
		var testsFromDb = new TestList();
		testsFromDb.readAllFromDBWithQuestionsAndOptions(()=>{
			callback(testsFromDb);
		})
	}

	showListOfTests(){
		var listOfTests = new TeacherView();
		listOfTests.getTests(()=>{
			listOfTests.display('body');
		});
	}

	showStudentResults(){
		var result = new StudentResultList();
        result.load((studentResults)=>{
        	studentResults.display('body');
        	/*for(var studentResults of result)
        	{
        		studentResults.display('body');
        	}*/
        	
		});
	}
}