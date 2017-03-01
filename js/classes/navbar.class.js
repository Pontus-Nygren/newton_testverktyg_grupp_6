 class Navbar extends Base {


  constructor(propertyValues){
    super(propertyValues);
    this.loggedIn = false;
    this.toggleLogin();
   }


  setActiveLink(){
    // move active link to the one active
    this.$.find('.active').removeClass();
    this.$.find(
      'li a[href="' + location.pathname + '"]'
    ).parent().addClass('active');
  }

  toggleLogin(){
    var user = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.loggedInUser = user.firstName + ' ' + user.lastName;
    }else{
      this.loggedInUser = '';
      $('.loggedInUser').html('');
    }
    if(!this.loggedIn && localStorage.getItem('user') || this.loggedIn){
      if(this.loggedIn && localStorage.getItem('user')){
        localStorage.removeItem('user');
      }
    this.loggedIn = !this.loggedIn;    
    }
    this.toggleLoginText = this.loggedIn? 'Logga ut' : 'Logga in';
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