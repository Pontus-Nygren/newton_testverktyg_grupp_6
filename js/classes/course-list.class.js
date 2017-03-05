class CoursesList extends List {

	constructor(items){
		super(Course, items);
		this.db.createCourseView();
	}

	 load(test_id,callback){
  	this.db.load([test_id],(data)=>{
  		console.log("course-result", data);
  		this.push.apply(this,data);
  		callback && callback(this);
  		});
  	}

		static get sqlQueries(){
		return{
			createCourseView: `
			create or replace view courseView as
			select users.course
			from users
			`,
		    load: `
		    SELECT DISTINCT test_id,course from usersresultview WHERE test_id = ? AND course IS NOT null
            `

		}
	}
}