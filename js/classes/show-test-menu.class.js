class ShowTestMenu extends Base {

  constructor(propertyValues){
    super(propertyValues);
  }

  takeTest(){
  $('.page-content').empty();
  test.display('body');
}
}