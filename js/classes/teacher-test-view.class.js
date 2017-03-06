class TeacherTestView extends Base { 

static defaultPropertyValues(){
		return {
			test_id: 0,
			test_name: " "
    	}
  	}

	constructor(propertyValues){
		super(propertyValues);
	}

	showCourses(){
		var course = new CoursesList();
		course.selectAllCourses(this.test_id,(courses)=>{
			$('.page-content').html('');
			course.display('.page-content');
		});
	}

		showTests(){
		var result = new TeacherTestViewList();
        result.selectTestId((allTests)=>{
        	console.log(result);
        	$('.page-content').html('');
			result.display('.page-content');
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