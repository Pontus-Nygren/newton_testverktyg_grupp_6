class TeacherTestViewList extends List {

	constructor(items){
		super(TeacherTestView, items);
	}

	 selectTestId(callback){
  	this.db.selectTestId((data)=>{
  		console.log("test result", data);
  		this.push.apply(this,data);
  		callback && callback(this);
  		});
  	}

		static get sqlQueries(){
		return{
		    selectTestId: `
		    SELECT test_id,test_name from tests
            `

		}
	}
}