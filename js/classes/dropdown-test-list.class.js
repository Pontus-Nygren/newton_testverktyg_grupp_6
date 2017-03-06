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
      {/*console.log("**********", row);*/
      this.tests.push(new DropdownTest({test_id: row.test_id, test_name: row.test_name}));
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
