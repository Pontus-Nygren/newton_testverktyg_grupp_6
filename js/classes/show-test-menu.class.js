class ShowTestMenu extends Base {

	constructor(propertyValues){
		super(propertyValues);

	}
	takeTest(index){
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

	getTestListFromDB(callback){
		var testsFromDb = new TestList();
		testsFromDb.readAllFromDBWithQuestionsAndOptions(()=>{
			callback(testsFromDb);
		})
	}

	showListOfTests(){
		var listOfTests = new TeacherView();
		listOfTests.getTests(()=>{
			$('.page-content').html('');
			listOfTests.display('.page-content');
			//listOfTests.display('body');
		});
	}

	showStudentResults(){
		var result = new StudentResultList();
        result.load(1, 'java', (studentResults)=>{
			$('.page-content').html('');
			result.display('.page-content');	
        	
		});
	}

	CreateQuestion(){
		var addQuestion = new Question();
		$('.page-content').html('');
		addQuestion.display('.page-content');
	}
}