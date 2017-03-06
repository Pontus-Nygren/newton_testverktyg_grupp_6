class TestFromDb extends Base { 
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

	constructor(propertyValues = {}, callback){ 
		super(propertyValues);
	    this.load(propertyValues.id, callback);
	}

	load(id, callback){
	    this.db.load([id],(data)=>{

	      	var testsById = [];
      		var i = 0;
      		var j = 0;
      		if(data[0] !== undefined){
        	for(let item of data){

        // create test and store by id
        if(testsById.length > 0 && testsById[i].test_id != item.test_id){
          i++;
          j = 0;
        }
        testsById[i] = testsById[i] || {
          test_id: item.test_id,
          test_name: item.test_name,
          startingTime: item.startingTime,
          endingTime: item.endingTime,
          allowedTime: item.allowedTime,
          questions: []
        }
        // add the current question
        if(item.question_id){
          if(testsById[i].questions.length > 0 && testsById[i].questions[j].question_id != item.question_id){
            j++
          }
          testsById[i].questions[j] = testsById[i].questions[j] || {
            question_id: item.question_id,
            imageURL: item.imageURL,
            test_id: item.test_id,
            question_text: item.question_text,
            isOpen: item.isOpen,
            options: []
          }
        }
        if(item.option_id){
          testsById[i].questions[j].options.push({
            option_id: item.option_id,
            option_text: item.option_text,
            points: item.points
          });
        }

      }

      // Loop through testsById
      // and push the test to this list
      /*
      for(let prop in testsById[0]){
      	console.log(testsById[0]);
        this.prop = testsById[0].prop;
      }*/
      this.test = new Test({test_id: testsById[0].test_id,
      	test_name: testsById[0].test_name,
      	startingTime: testsById[0].startingTime,
	      endingTime: testsById[0].endingTime,
	      allowedTime: testsById[0].allowedTime,
	      questions: testsById[0].questions});
      console.log('test!',this.test);
      callback && (typeof callback == 'function') && callback(this.test);
      }
      else{
        $('.no-active-tests').remove();
        $('body').append('<div class="alert alert-danger no-active-tests" role="alert">This test is not complete, sorry about that.</div>');
      }
      
    });
  	}


	static get sqlQueries(){
		return {
			load: `
			SELECT * FROM testsWithQuestionsAndOptions WHERE test_id = ?
			`
		}
	}
}