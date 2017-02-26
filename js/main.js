// Fix MySQL dateTime formatting
function dateTimeForMySQL(d){
	return new Date(d).toISOString().slice(0,19).replace('T', ' ');
}
var test;
		
// Create the app on DOM ready
$(()=>{
	
	//new App()
	/*
	var login = new Login();
	login.display('body');
	*/
	


//event handler works here in the menu, couldnt work in other classes, 
//the code below is to test log in
/*$( 'body' ).on( 'click', ' #submit', function(event) {
    event.stopPropagation(); // prevent default bootstrap behavior
    //alert( $(this).hasClass( 'active' ) ); // button state AFTER the click
});*/

	//Create some users
	var userList = new UserList([{
		firstName:"Joel",
		lastName: "Nilsson",
	    user_id: 2222, 
	    password: 'hejsan', 
	    email: "joel.o.nilsson@gmail.com",
	    course: "SYSJ2",
	    role: "Student"
	},
	{
		firstName:"Pelle",
		lastName: "Svensson",
	    user_id: 3333, 
	    password: 'hej', 
	    email: "pellesvensson@mail.com",
	    course: "",
	    role: "Teacher"
	}
	]);

	userList.writeToDb(()=>{
		console.log('Written to DB!',userList);

	});


// Instantiate som objects
    this.bootstrapSizeTool = new BootstrapSize();
    this.navbar = new Navbar();
    this.login = new Login();
    this.tasksMenu = new ShowTestMenu();
    //Kommentera ut DataGenerator efter första körningen
    // pga dropTable-funktionen fungerar inte
    /*
    new DataGenerator((callback)=>{
    	//this.tasksMenu = new ShowTestMenu();
    });
	*/
    this.aboutPage = new AboutUs();
    this.student = new Student();
    console.log("student", this.student.name);

    // Show the navbar and the bootstrapSizeTool
    this.navbar.display('body');
    this.bootstrapSizeTool.display('body');

    // Add a page-content area in the DOM
    $('body').append('<div class="page-content"/>');

    

    // Some routes
    var router = new Router({
      '/': ()=>{ 
      	$('.page-content').empty();
	    this.login.display('.page-content');
	    this.navbar.setActiveLink();



      },
      '/tasksMenu': ()=> { 
        $('.page-content').empty();
	    this.tasksMenu.display('.page-content');
	    this.navbar.setActiveLink();

      },
      '/student': ()=> {
        $("#bs-example-navbar-collapse-1 .navbar-nav .tasksMenu").remove();
	    $('.page-content').empty();
	    this.student.display('.page-content');
	    //this.navbar.setActiveLink();

        },

      '/about-us': ()=> {

	    $('.page-content').empty();
	    this.aboutPage.display('.page-content');
	    this.navbar.setActiveLink();

        }

    });



});

		
