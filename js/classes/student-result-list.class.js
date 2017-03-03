class StudentResultList extends List {

	constructor(items){
		super(StudentResult, items);
		this.db.createStudentResultView();
	}	


   load(test_id, course, callback){
    this.db.load([test_id,course],(result)=>{
    	 console.log("student-result", result);
    this.push.apply(this,result);
      callback && callback(this);
    });
  }
 

	static get sqlQueries(){
		return {
			createStudentResultView: `
			create or replace view usersResultView as
			select tests.test_id,users.user_id, users.firstName, users.lastName,users.course, results.finalResult
			from users
			inner join results
			on users.user_id = results.users_user_id
			inner join tests
			on tests.test_id = results.tests_test_id
			`,
			load: `
			SELECT * FROM usersResultView WHERE test_id = ? and course = ? order by firstName
			`
		}
	}
}
