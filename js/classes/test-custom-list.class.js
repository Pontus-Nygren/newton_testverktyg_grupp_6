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
        $('.no-active-tests').remove();
        $('body').append('<div class="alert alert-danger no-active-tests" role="alert">There are no tests in the database.</div>');
      }
      
    });
  }

  readOnlyActiveTests(callback){
    this.db.readOnlyActiveTests((data)=>{
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
        $('.no-active-tests').remove();
        $('body').append('<div class="alert alert-danger no-active-tests" role="alert">There are no tests you can take right now.</div>');
      }
      
    });
  }

  static get sqlQueries(){
    return {
      readAllWithQuestionsAndOptions: `
        SELECT * FROM tests
      `,
      readOnlyActiveTests: `
      SELECT test_id, test_name, startingTime, endingTime FROM tests INNER JOIN questions ON test_id = tests_test_id WHERE (endingTime >= now() and startingTime <= now()) GROUP BY test_id
      `
    }
  }
}