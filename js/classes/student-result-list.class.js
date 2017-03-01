class StudentResults extends List {

	constructor(items){
		super(ResultPage, items);
		this.db.createStudentResultView();
	}	


   load(callback){
    this.db.load((data)=>{
    this.push.apply(this,data);
    console.log("student-result", data);
      callback && callback(this);
    });
  }

	static get sqlQueries(){
		return {
			createStudentResultView: `
			create or replace view usersResultView as
			select users.user_id, users.firstName, users.lastName, results.finalResult
			from users
			inner join results
			on users.user_id = results.users_user_id
			`,
			load: `
			SELECT * FROM usersResultView
			`
		}
	}
}