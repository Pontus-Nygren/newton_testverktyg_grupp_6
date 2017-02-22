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
      var testsById = {};
      
      
      for(let item of data){

        // create test and store by id
        testsById[item.test_id] = testsById[item.test_id] || {
          id: item.test_id,
          startingTime: item.startingTime,
          endingTime: item.endingTime,
          allowedTime: item.allowedTime,
          questions: []
        }
        // add the current question
        if(item.question_id){
          testsById[item.test_id].questions.push({
            id: item.question_id,
            imageURL: item.imageURL,
            text: item.text
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
    return {
      createTableIfNeeded: `
        CREATE TABLE IF NOT EXISTS tests (
		  test_id int(11) NOT NULL AUTO_INCREMENT,
		  startingTime datetime DEFAULT 'CURRENT_TIMESTAMP',
		  endingTime datetime DEFAULT 'CURRENT_TIMESTAMP',
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