class StudentResultList extends List {

	constructor(items){
		super(StudentResult, items);
		this.db.createStudentResultView();
	}	


   selectUserResult(test_id, course, callback){
   	console.log(test_id)
   		this.db.calcMaxPoints([test_id],(data)=>{
   			console.log("maximumPoints",data[0]);
   			this.db.setMaxPoints([data[0].sum,test_id],(data2)=>{
   				this.db.selectUserResult([test_id,course],(result)=>{
                	for (let i = 0; i < result.length; i++) {
                		if(result[i].finalResult === null){
                		result[i].finalResult = "";
                	}
                }
    	 console.log("student-result", result);
    	 this.push.apply(this,result);
         callback && callback(this);
   			});
   		});
   	});
  }
  selectMyResult(user_id, test_id, callback){
  	console.log(test_id);
   		this.db.calcMaxPoints([test_id],(data)=>{
   			console.log("maximumPoints",data[0]);
   			this.db.setMaxPoints([data[0].sum,test_id],(data2)=>{
                this.db.selectMyResult([user_id,test_id],(result)=>{	
    	 console.log("student-result", result);
    	 this.push.apply(this,result);
         callback && callback(this);
   			});
   		});
   	});
  }
 

	static get sqlQueries(){
		return {
			createStudentResultView: `
			create or replace view usersResultView as
			select tests.test_id,users.user_id, users.firstName, users.lastName,users.course, results.finalResult,tests.maximumPoints
			from users
			inner join results
			on users.user_id = results.users_user_id
			inner join tests
			on tests.test_id = results.tests_test_id
			`,
			selectUserResult: `
			SELECT * FROM usersResultView WHERE test_id = ? and course = ? order by firstName
			`,
			selectMyResult: `
			SELECT * FROM usersResultView WHERE user_id = ? and test_id = ?
			`,
			calcMaxPoints: `
			select SUM(points) as sum from testswithquestionsandoptions WHERE test_id = ?
			`,
			setMaxPoints: `
		    UPDATE tests SET maximumPoints= ? WHERE test_id= ?
			`
		}
	}
}
