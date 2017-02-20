class App {

  constructor(){

    // Development tool
    new BootstrapSize().display('body');

    //Create a petowner
    var a = new PetOwner({
    	firstName: 'Esmeralda',
    	lastName: 'Efraimsdotter',
    	birthDate: '1997-02-28',
    	pets: [
    		{'name': 'Py', 'birthDate': '2017-02-20'},
    		{'name': 'Po', 'birthDate': '1975-06-17'}
    	]
    });

    //a.display('body');
    window.a = a;

    new Login().display('body');

    // Try
    //var testDataGen = new TestDataGenerator();

  }
}
