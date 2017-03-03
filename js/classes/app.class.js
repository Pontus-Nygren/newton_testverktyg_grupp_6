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
    this.teacherPage = new TeacherPage();
    this.studentPage = new StudentPage();
    this.aboutPage = new AboutUs();
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
   /*
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
    */
    // ****** Change to the new router below ******
     
    var router = new Router({
    '/': ()=>{ 
      var user = JSON.parse(localStorage.getItem('user'));
      if(user){
        if(user.role == 'student'){
          $('.page-content').empty();
          this.studentPage.display('.page-content');
          this.navbar.setActiveLink();
        }else if(user.role == 'teacher'){
          $('.page-content').empty();
          this.teacherPage.display('.page-content');
          this.navbar.setActiveLink();
        }
      }else{
        $('.page-content').empty();
        this.login.display('.page-content');
        this.navbar.setActiveLink();
      }
    },
    '/about-us/': ()=>{
      $('.page-content').empty();
        this.aboutPage.display('.page-content');
        this.navbar.setActiveLink();
    },
    '/teacher': ()=> { 
        $('.page-content').empty();
        this.teacherPage.display('.page-content');
        this.navbar.setActiveLink();
    },
    '/student': ()=> { 
        $('.page-content').empty();
        this.studentPage.display('.page-content');
        this.navbar.setActiveLink();
    },
    '/test/:id': (props)=> {
      console.log('props',props);
      var testView = new TestView(props, this.showPage);
      console.log('TestView.test', testView.test);
    }
      
    /*
      this.testList.readAllFromDBWithQuestionsAndOptions(()=>{
      var test = this.testList[0]; 
      console.log('TJAJTJA');
      new TestView(test, ()=>{console.log('HEJEHEJEHJ'); this.showPage});
      // do different things depending on id and viewname
     });
    */

    /*
    '/test/:id': this.testList.readAllFromDBWithQuestionsAndOptions(()=>{
      var test = testList[0]; 
      new TestView(test, this.showPage);
      // do different things depending on id and viewname
     });
    */
    /*
    '/test/:id': (props)=>{
      new TestView(props, this.showPage);
      // do different things depending on id and viewname
     }
    }*/
    
    });

  }

  showPage(page){
    $('.page-content').empty();
    page.display('.page-content');
    this.navbar.setActiveLink();
  }

  

}
