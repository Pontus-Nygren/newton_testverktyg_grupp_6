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
	
	
	test = new Test({
		id: 1,
		startingTime: '2017-02-02 09:00', //dateTimeForMySQL(2017-01-01 09:00:00),
	    endingTime: '2017-02-02 16:00', //dateTimeForMySQL(2017-01-01 16:00:00),
	    allowedTime: 3,
	    questions: [{
			id: 1, 
			imageURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR0pcNSyjJILQeqWiSRLr6U8Qhmvs9YGo_AguL2f8O9snFFSX2OIg',
			tests_test_id: 1,
			text: 'What are you going to eat today?',
			open:0,
			options: [{
				option_id: 1,
				questions_question_id: 1,
				text: 'Hamburgers',
				points: 1
			},
			{
				option_id: 3,
				questions_question_id: 1,
				text: 'Pizza',
				points: 1
			},
			{
				option_id: 4,
				questions_question_id: 1,
				text: 'Salad',
				points: 0
			}]
		},
		{
			id: 2, 
			imageURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR0pcNSyjJILQeqWiSRLr6U8Qhmvs9YGo_AguL2f8O9snFFSX2OIg',
			tests_test_id: 1,
			text: 'How hungry are you?',
			open:0,
			options: [{
				option_id: 1,
				questions_question_id: 1,
				text: 'Not at all',
				points: 0
			},
			{
				option_id: 2,
				questions_question_id: 1,
				text: 'Very much',
				points: 1
			}]
		}
		]
	});



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

		


