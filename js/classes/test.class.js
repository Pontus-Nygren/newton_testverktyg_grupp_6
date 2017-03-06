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
	    this.timer = new Timer(this.endingTime);

	    // ResponseList to save responses before sending it to DB
	    this.responseListRaw = [];
	}

	load(callback){		 
		this.db.compare((data)=>{console.log(data[0].active);
			var row = data[0]; 
			for(var name in row){
				this[name] = row[name];

			}
			callback && callback(this);
		});
	}


	startTimer(){
		$('#clockdiv').css('display','block');
		this.timer.startTimer();
		/*$(document).ready(function() {
		  checkContainer();
		});

		function checkContainer () {
		  if($('.clockdiv').is(':visible')){ //if the container is visible on the page
		    this.timer = new Timer(new Date(this.endingTime));
		  } else {
		    setTimeout(checkContainer, 50); //wait 50 ms, then try again
		  }
		}*/
	}
	submit(){
		this.saveSelected();
		var responseList = new ResponsesList();
		var user = JSON.parse(localStorage.getItem('user'));
		var u_id = user.user_id;
		for(let response of this.responseListRaw){
			responseList.push(new Response({users_user_id: u_id, options_option_id: response}));
		}
		console.log('responseList',responseList);
		responseList.writeToDb(()=>{
			var responseArray = [];
			for(let i = 0; i < responseList.length; i++){ 
	  		   //Putting the 'response_id' in array, the new arrays values to be compared with 
	  		   //the option_id later to get the points.
	  		   responseArray.push(responseList[i].options_option_id);
	  		   // console.log();
	  		}
	  		this.readOptionsFromDb(responseArray,(result)=>{
		  		$('.page-content').empty();
				result.display('.page-content');
			});		
	  	});
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
			$('.page-content').html('');
			result.display('.page-content');
		});		
	}

	readResponseFromDB(callback){
		var i;  		
		var responseArray = [];
		var studentsResponse = new ResponsesList();

	 //The student responses
	 studentsResponse.readAllFromDb(()=>{
	 	
  		/*Loop through the response table to get the options_option_id then
  		  it would be easier to get the points for every question from the 'options' table
  		  option_id(option table) === options_option_id(in response table)
  		  */
  		  for(i = 0; i < studentsResponse.length; i++){ 
  		   //Putting the 'response_id' in array, the new arrays values to be compared with 
  		   //the option_id later to get the points.
  		   responseArray.push(studentsResponse[i].options_option_id);
  		   // console.log();
  		}
  		this.readOptionsFromDb(responseArray);
  	});
	}

	readOptionsFromDb(responseArray, callback){  
		var j;		
		var newArray = [];
		var sum = 0;
		var optionTable = new OptionList();



		optionTable.readAllFromDb(()=>{

       	  			//comparing the response with the options
       	  			for(var response_option_id of responseArray){
  		       //Loop through option table 

  		       for(let j = 0; j < optionTable.length;j++){
                  //If the option_id(response table) === optionTable[j].option_id(options table)
                  //and get the point inside the option table
                  if( response_option_id == optionTable[j].option_id){
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
          callback(resultWrite);
      });



	}


	


	get question(){
		var question = this.questions[this.currentQuestionIndex];
		return question;
	}

	showButtons(){
		// Hides the buttons that aren't needed at certain places in the test
		if(this.currentQuestionIndex !== 0){
			console.log('första');
			$('button#back').css('display','inline-block');
		} else {
			$('button#back').css('display','none');
		}
		if(this.questions.length -1 !== this.currentQuestionIndex){
			console.log('andra');
			$('button#next').css('display','inline-block');
			$('button#submitTest').css('display','none');
		} else if(this.questions.length -1 === this.currentQuestionIndex){
			console.log('tredje');
			$('button#next').css('display','none');
			$('button#submitTest').css('display','inline-block');
		}
	}

	nextQuestion(){
		var atLeastOneIsChecked = $('input[name="radio-option"]:checked').length > 0;
		console.log('atLeastOneIsChecked',atLeastOneIsChecked);

		if(this.questions.length > this.currentQuestionIndex && atLeastOneIsChecked){
			this.saveSelected();
			$('.alert').remove();
			$('.optionPoint').prop('checked', false);
			console.log(this.questions.length, this.currentQuestionIndex )
			this.currentQuestionIndex++;
			this.checkIfChecked();
		} else if(!atLeastOneIsChecked){
			$('.alert').remove();
			$('.question-container').append('<div class="alert alert-warning" role="alert">You need to select at least one option. Remember - you can always go back and change your answer before you submit.</div>')
		}
	}
	prevQuestion(){
		if(this.currentQuestionIndex > 0){
			this.saveSelected();
			$('.alert').remove();
			$('.optionPoint').prop('checked', false);
			console.log( this.currentQuestionIndex )
			this.currentQuestionIndex--;
			this.checkIfChecked();
		}
	}

	saveSelected(){
		var selected = $("input[name='radio-option']:checked").val();
		console.log('selected',selected,'currentQuestionIndex',this.currentQuestionIndex);
		this.responseListRaw[this.currentQuestionIndex] = selected;
	}

	checkIfChecked(){
		console.log('responseListRaw',this.responseListRaw[this.currentQuestionIndex]);
		if(this.responseListRaw[this.currentQuestionIndex]){
			console.log('Checking');
			$("input[name='radio-option'][value=" + this.responseListRaw[this.currentQuestionIndex] + "]").prop('checked', true);
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
			`,
			compare: `
			SELECT IF(endingTime >= now() and startingTime <= now(),'true','false') AS active from tests
			`
		}
	}
}