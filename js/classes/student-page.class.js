class StudentPage extends Base {

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
		});
	}

	showListOfTests(){
		var listOfTests = new StudentView();
		listOfTests.getTests(()=>{
			$('.page-content').html('');
			console.log('listOfTests',listOfTests);
			if(listOfTests.tests.length > 0){
				listOfTests.display('.page-content');
			}else{
				$('.no-active-tests').remove();
        		$('body').append('<div class="alert alert-warning no-active-tests" role="alert">You have no tests to take right now.</div>');
			}
		});
	}
	showMyTests(){
		var myTests = new StudentTestView();
		myTests.selectMyTests(this.u_id,(data)=>{
			$('.page-content').html('');
			myTests.display('.page-content');

		})
	}
}