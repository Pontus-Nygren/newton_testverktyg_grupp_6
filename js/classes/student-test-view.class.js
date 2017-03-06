class StudentTestView extends Base { 

static defaultPropertyValues(){
		return {
			test_id: 0
    	}
  	}

	constructor(propertyValues){
		super(propertyValues)
	}

	 selectMyTests(){
	 		var user = JSON.parse(localStorage.getItem('user'));
		var u_id = user.user_id;
		console.log(u_id);
		 	var result = new StudentTestViewList();
        result.selectMyTests(u_id,(allTests)=>{
        	console.log("anything",this.u_id,allTests);
        	$('.page-content').html('');
			result.display('.page-content');
  		});
  	}
	showStudentResults(){
			var user = JSON.parse(localStorage.getItem('user'));
		var u_id = user.user_id;
		console.log(u_id);
		var result = new StudentResultList();
		console.log(this.test_id)
        result.selectMyResult(u_id,this.test_id,(studentResults)=>{
        	console.log(studentResults);
        	var testing = new StudentResultPage()
            testing.studentResultList = studentResults
        	$('.page-content').html('');
			testing.display('.page-content');
		});
	}
}