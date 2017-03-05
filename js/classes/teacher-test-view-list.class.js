class TeacherTestViewList extends List {

	constructor(items){
		super(TeacherTestView, items);
	}

	 load(callback){
  	this.db.load((data)=>{
  		console.log("test result", data);
  		this.push.apply(this,data);
  		callback && callback(this);
  		});
  	}

		static get sqlQueries(){
		return{
		    load: `
		    SELECT test_id from tests
            `

		}
	}
}