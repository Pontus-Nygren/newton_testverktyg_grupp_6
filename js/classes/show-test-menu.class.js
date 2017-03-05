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
		});
	}

	showCourses(){
		var course = new CoursesList();
		course.load((courses)=>{
			$('.page-content').html('');
			course.display('.page-content');
		});
	}

	showStudentResults(){
		var result = new StudentResultList();
        result.load(1,'SYSJ2',(studentResults)=>{
        	console.log(result);
        	var testing = new StudentResultPage()
            testing.studentResultList = studentResults
        	$('.page-content').html('');
			testing.display('.page-content');
        	/*for(var studentResults of result)
        	{
        		studentResults.display('body');
        	}*/
        	
		});
	}

	CreateQuestion(){
		var addQuestion = new Question();
		$('.page-content').html('');
		addQuestion.display('.page-content');
	}
}