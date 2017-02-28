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


// Instantiate som objects
    this.bootstrapSizeTool = new BootstrapSize();
    this.navbar = new Navbar();
    this.login = new Login();
    this.tasksMenu = new ShowTestMenu();
    this.aboutPage = new AboutUs();

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

      

      '/about-us': ()=> {

	    $('.page-content').empty();
	    this.aboutPage.display('.page-content');
	    this.navbar.setActiveLink();

        }

    });

});

		
