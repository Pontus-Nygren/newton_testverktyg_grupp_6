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

  readAllFromDBWithQuestions(callback){
    this.db.readAllWithQuestions((data)=>{
      console.log(data);

      // collect all tests in a new array
      var testsById = [];
      var i = 0;
      
      for(let item of data){

        // create test and store by id
        if(testsById.length > 0 && testsById[i].test_id != item.test_id){
          console.log('HEJEHJ');
          i++;
        }
        testsById[i] = testsById[i] || {
          test_id: item.test_id,
          startingTime: item.startingTime,
          endingTime: item.endingTime,
          allowedTime: item.allowedTime,
          questions: []
        }
        // add the current question
        if(item.question_id){
          testsById[i].questions.push({
            question_id: item.question_id,
            imageURL: item.imageURL,
            test_id: item.test_id,
            question_text: item.question_text,
            isOpen: item.isOpen
          });
        }

      }

      // Loop through testsById
      // and push the test to this list
      for(let id in testsById){
        this.push(testsById[id]);
      }

      callback();
    });
  }

  static get sqlQueries(){
  	/*
  		
  	*/
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
      readAllWithQuestions: `
        SELECT * FROM testsWithQuestions
      `
    }
  }
}