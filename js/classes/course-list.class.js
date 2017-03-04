class CoursesList extends List {

	constructor(items){
		super(Course, items);
		this.db.createCourseView();
	}

	 load(callback){
  	this.db.load((data)=>{
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
		    select course from users WHERE course IS NOT null
            `

		}
	}
}