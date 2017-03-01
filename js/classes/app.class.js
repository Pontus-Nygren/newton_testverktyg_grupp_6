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
    /*
    this.teacherView = new TeacherView();
    teacherView.display('.page-content');
  */
   
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
    // ****** Change to the new router below ******
     /*
    var router = new Router({
    '/': ()=>{ 
        //... this route should always exsist... 
    },
    '/about/': ()=>{
      // my logic to change views etc
      // and show an about page
    },
    '/student/:id/view/:viewname': (params)=>{
      console.log(params.id, params.viewname);
      // do different things depending on id and viewname
     }
    });
    */

  }

  showPage(page){
    $('.page-content').empty();
    page.display('.page-content');
    this.navbar.setActiveLink();
  }

  

}
