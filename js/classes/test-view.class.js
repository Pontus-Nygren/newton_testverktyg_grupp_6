class TestView extends Base {

  defaultPropertyValues(){
    return {
      availableTests: new TestCustomList(),
      completedTests: new TestCustomList()
    }
  }

  constructor(propertyValues = {}){
    super(propertyValues);
  }

}