class StudentView extends Base { 
	static defaultPropertyValues(){
    return {
	      tests: new TestCustomList()
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