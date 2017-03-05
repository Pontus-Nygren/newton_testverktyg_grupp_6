class Course extends Base {

	static defaultPropertyValues(){
		return {
			course: " "
    	}
  	}

	constructor(propertyValues){
		super(propertyValues);
	}

		showStudentResults(){
		var result = new StudentResultList();
        result.load(this.test_id,this.course,(studentResults)=>{
        	console.log(result);
        	var testing = new StudentResultPage()
            testing.studentResultList = studentResults
        	$('.page-content').html('');
			testing.display('.page-content');
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