class App {

  constructor(){

    //Kommentera ut DataGenerator efter första körningen
    // pga dropTable-funktionen fungerar inte
    /*
    new DataGenerator((callback)=>{
      //this.tasksMenu = new ShowTestMenu();
    });
  */

  // --- If we want to create some users ---
  /*
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
  */

// Instantiate som objects
    this.bootstrapSizeTool = new BootstrapSize();
    this.navbar = new Navbar();
    this.login = new Login();
    this.footer = new Footer();
    this.tasksMenu = new ShowTestMenu();
    this.aboutPage = new AboutUs();
    this.test = new TestList();

    //this.aboutPage = new AboutUs();
    this.student = new Student();
    console.log("student", this.student.name);

    // Show the navbar and the bootstrapSizeTool
    this.navbar.display('body');
    this.bootstrapSizeTool.display('body');
   // this.bootstrapSizeTool.display('body');
    this.footer.display('body');

    // Add a page-content area in the DOM
    $('body').append('<div class="page-content"/>');

   
    // ****** Change to the new router below ******
    var router = new Router({

      '/': ()=>{ this.showPage(this.login);},

      '/tasksMenu': ()=> { this.showPage(this.tasksMenu);},

     // '/test/:test_id': (props)=>{ new ShowTestMenu(props, this.showPage); },
        // do different things depending on id and viewname
       

      '/about-us': ()=> {this.showPage(this.aboutPage);}
      
    });
    


  }

  showPage(page){
    $('.page-content').empty();
    page.display('.page-content');
    this.navbar.setActiveLink();
  }

  

}

  