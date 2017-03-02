class TestCustomList extends List {

  constructor(items){
    super(TestCustom,items);
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
          endingTime: item.endingTime
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
      readAllWithQuestionsAndOptions: `
        SELECT * FROM tests
      `
    }
  }
}