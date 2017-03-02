class Test extends Base { 
	static defaultPropertyValues(){
    return {
	      test_id: 0,
	      test_name: '',
	      startingTime: '2017-01-01 09:00',
	      endingTime: '2017-01-01 16:00',
	      allowedTime: 0,
	      questions: new QuestionList(),
	      currentQuestionIndex: 0
    	}
  	}

	constructor(propertyValues = {}){ 
		super(propertyValues);

				$(function () {
		if (window.opener != null && !window.opener.closed) {
		var parent = $(window.opener.document).contents();
				var data = "<u>Values using Popup Window</u><br /><br />";  //test
				data += "<b>Name:</b> " + parent.find("#firstName").val() ;
				//console.log("user ", parent.find("#firstName").val());

			}
		});

		// If needed convert the questions property 
	    // from Array to QuestionList
	    var user1 = new User(); //To be checked later
	    var testJava = new TestList();//To be checked later

	    if(!(this.questions instanceof QuestionList)){
	      this.questions = new QuestionList(this.questions);

	     
	    }
	}



	submitTest(){
		$('.page-content').empty();
		//var result = new Result();
		//console.log(this.readResponseFromDB());
		//this.readResponseFromDB();
		var user = JSON.parse(localStorage.getItem('user'));
		var u_id = user.user_id;
		var result = new Result();
		result.readSum(u_id, this.test_id, ()=>{
			console.log("result",result);
			result.users_user_id = u_id;
			result.tests_test_id = this.test_id;
			result.insertInDb(console.log);
			result.display('body');
		});		
	}

	readResponseFromDB(callback){
  		var i;  		
  		var responseArray = [];
  		var StudentsResponse = new ResponsesList();

	 //The student responses
	 StudentsResponse.readAllFromDb(()=>{
	 	
  		/*Loop through the response table to get the options_option_id then
  		  it would be easier to get the points for every question from the 'options' table
  		  option_id(option table) === options_option_id(in response table)
  		  */
  		  for(i = 0; i < StudentsResponse.length; i++){ 
  		   //Putting the 'response_id' in array, the new arrays values to be compared with 
  		   //the option_id later to get the points.
  		    responseArray.push(StudentsResponse[i].options_option_id);
  		   // console.log();
  		}
  		this.readOptionsFromDb(responseArray);
     });
    }

       readOptionsFromDb(responseArray)
       {  
       var j;		
       	var newArray = [];
       	var sum = 0;
       	var optionTable = new OptionList();



  		optionTable.readAllFromDb(()=>{

       	  			//comparing the response with the options
  			for(var response_option_id of responseArray){
  		       //Loop through option table 
 		   	    
  		       for(j = 0; j< optionTable.length;j++){
            
                  //If the option_id(response table) === optionTable[j].option_id(options table)
                  //and get the point inside the option table
  		   	      if( response_option_id === optionTable[j].option_id){
  		   		     sum = sum + optionTable[j].points; 	   		     

  		   	      }

  		       } 		      


  		   }

  		   	var user = JSON.parse(localStorage.getItem('user'));
			var u_id = user.user_id;
			console.log("u_id", u_id);

  		   var resultWrite = new Result({
			users_user_id: u_id,
			tests_test_id: this.test_id,
			finalResult: sum
  		   });
  		   resultWrite.insertInDb(console.log);

  		   console.log(sum);
  		    });
     

  	
  	}

     
	


	get question(){
		var question = this.questions[this.currentQuestionIndex];
		return question;
	}

	nextQuestion(){
		var atLeastOneIsChecked = $('input[name="chk[]"]:checked').length > 0;
		console.log('atLeastOneIsChecked',atLeastOneIsChecked);

		if(this.questions.length > this.currentQuestionIndex && atLeastOneIsChecked){
			$('.alert').remove();
			$('.optionPoint').prop('checked', false);
			console.log(this.questions.length, this.currentQuestionIndex )
			this.currentQuestionIndex++;
		} else if(!atLeastOneIsChecked){
			$('.alert').remove();
			$('.question-container').append('<div class="alert alert-warning" role="alert">You need to select at least one option. Remember - you can always go back and change your answer before you submit.</div>')
		}
	}
	prevQuestion(){
		if(this.currentQuestionIndex > 0){
			$('.alert').remove();
			$('.optionPoint').prop('checked', false);
			console.log( this.currentQuestionIndex )
			this.currentQuestionIndex--;
		}
	}


	insertInDb(callback){
		this.db.newTest({
			test_name: this.test_name,
			startingTime: this.startingTime,
			endingTime: this.endingTime,
			allowedTime: this.allowedTime
		},callback);
	}

	static get sqlQueries(){
		return {
			newTest: `
			INSERT tests SET ?
			` 
		}
	}
}