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
this.timeIsUp = new TimeIsUp();


    // Show the navbar and the bootstrapSizeTool
    this.navbar.display('body');
    //this.bootstrapSizeTool.display('body');

    // Add a page-content area in the DOM
    $('body').append('<div class="page-content"/>');
    this.footer.display('body');


    // ****** Change to the new router below ******
    var router;
    var user = JSON.parse(localStorage.getItem('user'));
    if(!user){
      router = new Router({
        '/': ()=>{ 
          $('.page-content').empty();
          this.login.display('.page-content');
          this.navbar.setActiveLink();
        }
      });
    }else if(user && user.role.toLowerCase() == 'teacher'){
      router = new Router({
        '/': ()=>{ 
          $('.page-content').empty();
          this.teacherPage.display('.page-content');
          this.navbar.setActiveLink();
        },
        '/teacher': ()=> { 
          $('.page-content').empty();
          this.teacherPage.display('.page-content');
          this.navbar.setActiveLink();
        },
        '/test/:id': (props)=> {
          console.log('props',props);
          var testView = new TestView(props, this.showPage);
          console.log('TestView.test', testView.test);
        }
      }); 

    }else if(user && user.role.toLowerCase() == 'student'){
     router = new Router({
        '/': ()=>{ 
          $('.page-content').empty();
          this.studentPage.display('.page-content');
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
        },
        '/time-is-up': ()=>{
          $('.page-content').empty();
          this.timeIsUp.display('.page-content');
          this.navbar.setActiveLink();
        }
      });

    }
  }

  showPage(page){
    $('.page-content').empty();
    page.display('.page-content');
  }



}

