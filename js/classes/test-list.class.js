class TestList extends List {

  constructor(items){
    super(Test,items);
    this.db.createTableIfNeeded();
  }

writeToDb(callback){
    var co = 0, listLength = this.length;
    function callbackEach(res){
      co++;
      if(co == listLength){ callback(); }
    }
    for(let test of this){
      test.insertInDb(callbackEach);
    }
  }

  readAllFromDb(callback){
    this.db.readAll((data)=>{
      this.push.apply(this,data);
      callback();
    });
  }

  readAllFromDBWithQuestionsAndOptions(callback){
    this.db.readAllWithQuestionsAndOptions((data)=>{
      console.log(data);

      // collect all tests in a new array
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
      for(let id in testsById){
        this.push(testsById[id]);
      }

      callback();
      }
      else{
        // Only for testing
        $('body').append('<div class="alert alert-danger" role="alert">There are no tests in the database. Uncomment the section in main that initializes the data generator. Only run it once and then comment the section out again.</div>');
      }
      
    });
  }

  static get sqlQueries(){
    return {
      createTableIfNeeded: `
        CREATE TABLE IF NOT EXISTS tests (
		  test_id int(11) NOT NULL AUTO_INCREMENT,
      startingTime datetime,
      endingTime datetime,
		  allowedTime int(11) DEFAULT 0,
		  PRIMARY KEY (test_id)
		)
      `,
      readAll: `
        SELECT * FROM tests
      `,
      readAllWithQuestionsAndOptions: `
        SELECT * FROM testsWithQuestionsAndOptions
      `
    }
  }
}