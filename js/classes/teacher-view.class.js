class TeacherView extends Base { 
	static defaultPropertyValues(){
    return {
	      tests: new TestList()
    	}
  	}

	constructor(propertyValues = {}){ 
		super(propertyValues);
	}

	getTests(callback){
		this.tests.readAllFromDBWithQuestionsAndOptions(()=>{
			callback();
		});
	}
	



}