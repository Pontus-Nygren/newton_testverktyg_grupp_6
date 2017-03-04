class DropdownTest extends Base {

  static defaultPropertyValues(){
    return {
      test_id: 0,
      test_name: ''
      
    }
  }

  constructor(propertyValues, callback){
    super(propertyValues);
    //this.load(propertyValues.id, callback);
  }

  load(id, callback){
    this.db.load([id], (data)=>{
      var row = data[0];
      for(var name in row){
        this[name] = row[name];
      }
      callback && callback(this);
    });
  }



  static get sqlQueries(){
    return {
      load: `
        SELECT * FROM surveys WHERE id = ?
      `
    }
  }

}
