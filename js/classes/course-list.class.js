class CoursesList extends List {

	constructor(items){
		super(Course, items);
	}

	 selectAllCourses(test_id,callback){
  	this.db.selectAllCourses([test_id],(data)=>{
  		console.log("course-result", data);
  		this.push.apply(this,data);
  		callback && callback(this);
  		});
  	}

		static get sqlQueries(){
		return{
		    selectAllCourses: `
		    SELECT DISTINCT test_id,course from usersresultview WHERE test_id = ? AND course IS NOT null
            `

		}
	}
}