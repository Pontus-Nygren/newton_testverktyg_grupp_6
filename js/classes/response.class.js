class Response extends Base {
	static defaultPropertyValues(){
		return {
			users_user_id: 0,
			options_option_id: 0
		}
	}

	constructor(propertyValues = {}){ 
		super(propertyValues);
	}

	insertInDb(callback){
		this.db.newResponse({
			users_user_id: this.users_user_id,
			options_option_id: this.options_option_id
		},callback);
	}

	static get sqlQueries(){
		return {
			newResponse: `
			INSERT responses SET ?
			` 
		}
	}

	
}