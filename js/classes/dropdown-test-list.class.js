class DropdownTestList extends List {

  constructor(items){
    super(DropdownTest,items);
//    this.db.createPetsTableIfNeeded();
this.test = new DropdownTest();
 this.tests = [];
  }



    loadTestNames(callback){
    this.db.showTestNames((data)=>{
      for(let row of data)
      {console.log("**********", row);
      for(var name in row){
        this.test[name] = row[name];
      }
      this.tests.push(this.test);
      }
      callback && callback(this.tests);
    });
  }

  static get sqlQueries(){
    
    return {
             showTestNames: `
               SELECT test_id, test_name from tests where test_name is not null
             `
    }

  }

}
