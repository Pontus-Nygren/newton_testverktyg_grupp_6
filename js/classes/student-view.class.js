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
		var user = JSON.parse(localStorage.getItem('user'));
		var testList = new TestCustomList();
		testList.readOnlyActiveTests(()=>{
			var resultList = new ResultList();
			resultList.readAllFromDb(()=>{
				var indexes = [];
				for(let row of resultList){
					console.log('row', row);
					if(row.finalResult == null){
						for(let test of testList){
							if(test.test_id == row.tests_test_id && user.user_id == row.users_user_id){
								this.tests.push(test);
							}
						}
					}
				}
				/*for(let index of indexes){
					this.tests.splice(index, 1);
				}*/
				callback();
			});
		});
	}
}