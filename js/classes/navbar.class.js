 class Navbar extends Base {


  constructor(propertyValues){
    super(propertyValues);
    this.loggedIn = false;
    this.toggleLogin();
    this.toggleMenuText = '';
    this.toggleMenuExit = ''; 
    this.menuItemId = 'visitor-page-menu-item';
    this.toggleMenu();
    this.route = '';
  }


  setActiveLink(){
    // move active link to the one active
    this.$.find('.active').removeClass();
    this.$.find(
      'li a[href="' + location.pathname + '"]'
      ).parent().addClass('active');
  }

  toggleMenu(){
    
    var user = JSON.parse(localStorage.getItem('user'));
    if(user && user.role.toLowerCase() == 'student'){
      this.menuItemId = 'student-page-menu-item';
      this.route = '/teacher';
      this.toggleMenuText = `Student`;
    } else if(user && user.role.toLowerCase() == 'teacher'){
      this.menuItemId = 'teacher-page-menu-item';
      this.route = '/teacher';
      this.toggleMenuText = `Teacher`;
      
    }
  }

     toggleExit(){    
 
    var user = JSON.parse(localStorage.getItem('user')); 
    if(user && user.role.toLowerCase() == 'student'){ 
      this.menuItemId = 'student-page-menu-item'; 
      this.route = '/student'; 
      this.toggleMenuExit = `Exit`;
 
    } 
 
  }
 

  toggleLogin(){
    var user = JSON.parse(localStorage.getItem('user'));
    if(user){
      $('.loggedInUser').css('display','block');
      this.loggedInUser = user.firstName + ' ' + user.lastName;
    }else{
      this.loggedInUser = '';
    }
    if(!this.loggedIn && localStorage.getItem('user') || this.loggedIn){
      if(this.loggedIn && localStorage.getItem('user')){
        localStorage.removeItem('user');
        window.location.href = "/";
      }
      this.loggedIn = !this.loggedIn;    
    }
    this.toggleLoginText = this.loggedIn? 'Sign out' : 'Sign in';
  }

    /*
    var user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if(user){
      this.loggedIn = true;
      this.loggedInUser = user.firstName + ' ' + user.lastName;
      $('.navbar-right').html(`
          <li class = "loggedInUser" >${this.loggedInUser}</li>
          <li class = "logOut" data-click="logOut" ><a href="/#">Logout</a></li>
          `);
    }else{
      $('.navbar-right').html(`
          <li class = "logIn" data-click="logIn" ><a href="/#">Login</a></li>
          `);
    }
    */

  }