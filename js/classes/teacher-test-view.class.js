class TeacherTestView extends Base { 

static defaultPropertyValues(){
		return {
			test_id: 0
    	}
  	}

	constructor(propertyValues){
		super(propertyValues);
	}

	showCourses(){
		var course = new CoursesList();
		course.load(this.test_id,(courses)=>{
			$('.page-content').html('');
			course.display('.page-content');
		});
	}

		showTests(){
		var result = new TeacherTestViewList();
        result.load((allTests)=>{
        	console.log(result);
        	$('.page-content').html('');
			result.display('.page-content');
        	/*for(var studentResults of result)
        	{
        		studentResults.display('body');
        	}*/
        	
		});
	}


	static get sqlQueries(){
		return{
			createCourseView: `
			create or replace view courseView as
			select users.course
			from users
			`,


		}
	}
}