class StudentTestViewList extends List {

	constructor(items){
		super(StudentTestView, items);
	}

 selectMyTests(user_id,callback){
  	this.db.selectTestId([user_id],(data)=>{
  		console.log("test result", data);
  		this.push.apply(this,data);
  		callback && callback(this);
  		});
  	}
  		static get sqlQueries(){
		return{
		    selectTestId: `
		    SELECT DISTINCT tests.test_id,user_id,test_name from usersResultView,tests WHERE user_id = ? 
            `

		}
	}
}