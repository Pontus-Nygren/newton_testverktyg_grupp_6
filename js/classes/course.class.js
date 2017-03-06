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
        result.selectUserResult(this.test_id,this.course,(studentResults)=>{
        	console.log(result);
        	var testing = new StudentResultPage()
            testing.studentResultList = studentResults
        	$('.page-content').html('');
			testing.display('.page-content');
		});
	}
}