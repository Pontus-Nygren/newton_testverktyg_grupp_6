class Course extends Base {

	static defaultPropertyValues(){
		return {
			course: " "
    	}
  	}

	constructor(propertyValues){
		super(propertyValues);
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