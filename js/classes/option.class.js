class Option extends Base { 

	static defaultPropertyValues(){

    return {
	      option_id: 0,
	      question_id: 0,
	      option_text: 'No',
	      points: 0
    	}
  	}

/*pointCalculate(){
	var i,j,temp;
	 var result = new ResponsesList();
  	result.readAllFromDb(()=>{
  		console.log("result", result[0].options_option_id);
  		var optionTable = new OptionList();
  		for(i = 0; i < result.length; i++){  
  		   optionTable.readAllFromDb(()=>{
  		   	temp = result[i].options_option_id;
  		   for(j = 0; j< optionTable.length;j++){
  		   	console.log("optionTable", optionTable[j].option_id);
  		      if( temp === optionTable[j].option_id){
  		      	console.log("Read point", optionTable[j].points);

  			  }

  		  }
  		});
  	}

	      	});
}*/

	constructor(propertyValues = {}){ 
		super(propertyValues);
		var counter = 0; //to count the number of questions
		window.sum = 0;
	}		

		
	insertInDb(callback){
		this.db.newOption({
			option_id: this.option_id,
			option_text: this.option_text,
			questions_question_id: this.question_id,
			points: this.points
		},callback);
	}

	static get sqlQueries(){
		return {
			newOption: `
			INSERT options SET ?
			` 
		}
	}
}