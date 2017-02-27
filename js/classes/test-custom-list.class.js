class TestCustomList extends List {

  constructor(items){
    super(TestCustom,items);
  }


  static get sqlQueries(){
    return {
      readAllWithQuestionsAndOptions: `
        SELECT * FROM testsWithQuestionsAndOptions
      `
    }
  }
}