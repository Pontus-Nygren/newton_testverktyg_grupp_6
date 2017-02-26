class ResponsesList extends List {

	constructor(items){
		super(Response,items);
		this.db.createTableIfNeeded();
		this.db.createUsersWithResponsesView();

	}

		writeToDb(callback){
		var co = 0, listLength = this.length;
		function callbackEach(res){
			co++;
			if(co == listLength){ callback(); }
		}
		for(let response of this){
			response.insertInDb(callbackEach);
		}
	}

	readAllFromDb(callback){
		this.db.readAll((data)=>{
			this.push.apply(this,data);
			callback();
		});
	}

static get sqlQueries() {
		return {
			createTableIfNeeded: `
			CREATE TABLE IF NOT EXISTS response (
     		  users_user_id int(11) NOT NULL,
			  options_option_id int(11) NOT NULL,
			  response_text longtext,
              PRIMARY KEY (users_user_id,options_option_id),
              KEY fk_responses_users1_idx (users_user_id),
              KEY fk_responses_options1_idx (options_option_id),
              CONSTRAINT fk_responses_options1 FOREIGN KEY (options_option_id) REFERENCES options (option_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT fk_responses_users1 FOREIGN KEY (users_user_id) REFERENCES users (user_id) ON DELETE NO ACTION ON UPDATE NO ACTION

			)
			`,
			createUsersWithResponsesView: `
			CREATE OR REPLACE VIEW usersWithResponsesView 
			AS SELECT
			users.user_id,
            users.firstName,
            users.lastName,
            users.password,
            users.email,
            users.course ,
            users.role, 
			response.users_user_id,
			response.options_option_id,
			response.response_text
			FROM users 
            LEFT JOIN response 
            ON user_id = users_user_id
			`,
			readAll: `
			SELECT * FROM response
			`
		}
	}  




}