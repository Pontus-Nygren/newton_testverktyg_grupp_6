class Response extends Base {
	static defaultPropertyValues(){
		return {
			users_user_id: 0,
			options_option_id: 0,
			response_text:"responses"
		}
	}

	constructor(propertyValues = {}){ 
		super(propertyValues);
	}

	insertInDb(callback){
		this.db.newResponse({
			users_user_id: this.users_user_id,
			options_option_id: this.options_option_id,
			response_text: this.response_text
		},callback);
	}

	static get sqlQueries(){
		return {
			newResponse: `
			INSERT pets SET ?
			` 
		}
	}

	
}