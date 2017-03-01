class ResultPage extends Base {

	static defaultPropertyValues(){
		return {
			user_id: 0,
			firstName: " ",
			lastName:" ",
			finalResult: 0
    	}
  	}

  constructor(propertyValues){
    super(propertyValues);
    this.db.createStudentResultView();

  }

  /*  load(callback){
    this.db.load((data)=>{
    console.log("student-result", data);
      callback && callback(this);
    });
  }*/


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