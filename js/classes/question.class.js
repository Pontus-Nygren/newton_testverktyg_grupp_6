class Question extends Base { 

	static defaultPropertyValues(){
    return {
	      question_id: 0,
	      imageURL: '',
	      test_id: 0,
	      question_text: 'What is a question?',
	      isOpen: 0,
	      value:'',
	      options: new OptionList()
    	}
  	}

	constructor(propertyValues = {}){ 
		super(propertyValues);	

		    /*$('#select_test_name').on('click', '.dropdown_option', function(){
			console.log("****************");

		});	*/
		// If needed convert the options property 
	    // from Array to OptionList
	    if(!(this.options instanceof OptionList)){
	      this.options = new OptionList(this.options);
	    }
	    this.dropdownTests = new DropdownTestList();

	}
   


	insertInDb(callback){
		this.db.newQuestion({
			imageURL: this.imageURL,
			tests_test_id: this.test_id,
			question_text: this.question_text,
			isOpen: this.isOpen
		},callback);
	}

	getTests(){
		if ( !$( ".dropdown_option" ).length ) {
		var testNames = new DropdownTestList();    //to make the dropdown dynamic
		 testNames.loadTestNames(()=>{
		 	console.log('testNames',testNames);
		 	this.dropdownTests = testNames.tests;
		 	for(let test of this.dropdownTests){
		 		test.display('#select_test_name');
		 	}
		 	
		 });
		}
	}

	addQuestion(){
		 event.preventDefault();//the default action of the event will not be triggered.

   //	 this.imageURL =  document.getElementById("add_pic").value;
   //	 this.question_text = document.getElementById("addQn").value;

		

       //Adding the question
          //sql code to see the last question id, that is needed to be filled in the options table in the db
        	//var testObject= new TestList();
   
            //Getting the test names from the database and then compare the name with the dropdown selection
			//testObject.readAllFromDb(()=>{ 
				//for(var i = 0; i< testObject.length; i++){ 				
					//var pulldownButton= $("option[class='dropdown_option']:checked").val(); //the selected test name from the dropdown menu	
					//if(pulldownButton ==testObject[i].test_name){
						this.test_id = $("option[class='dropdown_option']:checked").val(); //testObject[i].test_id;
						//break;
					//}
					
				//}

				this.imageURL =  document.getElementById("add_pic").value;
				this.question_text = document.getElementById("addQn").value;

				//Inserting the question in the database

				this.insertInDb(()=>{
					this.db.readLatestId((data)=>{
						//To get the options and the correct answer set by the teacher for the question to be added
			var radioButtonId= $('input[name=options]:checked').attr('id');
			var optionNew = document.getElementsByClassName('addOption');//class name for the input text area
			var option_points=0;
			var question_id = data[0].question_id;

    	    /*The set the correct option, example if the teacher clicked the 3rd option, the 3rd else if 
    	    option_point will be 1 and set this value to the database, the others would be 0*/
    	    for(var i=0;i<optionNew.length;i++){   
    	    	var option_text = optionNew[i].value;
    	    	if(radioButtonId =="radio-option1" && i ===0){    	    	   
    	    		option_points = 1;
    	    		console.log("radio-option1");
    	    	}
    	    	else if (radioButtonId =="radio-option2" && i ==1){
    	    		option_points = 1;
    	    		console.log("radio-option2");
    	    	}

    	    	else if(radioButtonId =="radio-option3" && i ==2){
    	    		option_points = 1
    	    		console.log("radio-option3");
    	    	}

    	    	else if(radioButtonId =="radio-option4" && i ==3){
    	    		option_points = 1
    	    		console.log("radio-option4");
    	    	}
    	    	else{
    	    		option_points = 0;
    	    	}
    	    	if(option_text.length > 0){
    	    	/** Inserting the options for the specific question */
    	    	var options = new Option({			
    	    		option_text: option_text,
    	    		questions_question_id: question_id,	        
    	    		points: option_points

    	    	});

                options.insertInDb(console.log);  //inserting the options
                option_points=0;

			     }
            }
					});
				});

				//});

			

        



			//console.log(this.question_text,this.isOpen );
			//question_text: $('.addQn')text(question_text;
			//isOpen: this.isOpen

	}

	static get sqlQueries(){
		return {
			newQuestion: `
			INSERT questions SET ?
			`,
			readLatestId: `
			select question_id from questions order by question_id desc limit 1
			`
		}
	}
}