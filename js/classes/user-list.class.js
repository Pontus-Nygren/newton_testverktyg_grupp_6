class UserList extends List {

  constructor(items){
    super(User,items);
    this.db.createUsersTableIfNeeded();
  }

  writeToDb(callback){
    var co = 0, listLength = this.length;
    function callbackEach(res){
      co++;
      if(co == listLength){ callback(); }
    }
    for(let user of this){
      user.insertInDb(callbackEach);
    }
  }

  readAllFromDb(callback){
    this.db.readAll((data)=>{
      this.push.apply(this,data);
      callback();
    });
  }

    readAllFromDBWithResponses(callback){
    this.db.readAllWithResponses((data)=>{
      console.log('DATA user-list',data);

      // collect all questions in a new array
      var userById = [];
      var i = 0;
      
      for(let item of data){

        // create user and store by id
        if(userById.length > 0 && userById[i].test_id != item.user_id){
          i++;
        }
        userById[i] = userById[i] || {
          user_id: item.user_id,
          firstName: item.firstName,
          lastName: item.lastName,
          password: item.password,
          email: item.email,
          course:item.course,
          role:item.role,
          response: []
        }
        // add the current response
        if(item.option_id){
          userById[i].response.push({
            users_user_id: item.users_user_id,
            options_option_id: item.option_text,
            response_text: item.response_text,
          });
        }

      }

      // Loop through userById
      // and push the question to this list
      for(let id in userById){
        this.push(userById[id]);
      }

      callback();
    });
  }



  static get sqlQueries(){
    
    return {
      createUsersTableIfNeeded: `
        CREATE TABLE IF NOT EXISTS users (
          user_id int(11) unsigned NOT NULL AUTO_INCREMENT,
          firstName longtext,
          lastName longtext,
          password varchar(255) DEFAULT NULL,
          email longtext,
          course longtext,
          role longtext,
          PRIMARY KEY (user_id)
        )
      `,
      
      readAll: `
        SELECT * FROM users
      `,
      readAllWithResponses: `
      SELECT * FROM usersWithResponsesView
      `

    }

  }

}