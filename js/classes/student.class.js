class Student extends User{

   constructor(firstName, lastName,user_id, email,course, role){

   	//We must call the constructor of the parent class before we can refer to the this keyword
    super( firstName, lastName,user_id, ssn, email,course, role);

   }


   	  //static is added and this.display is replaced
 // static get template(){} taken to student.html in templates folder
   static template(){ 
     return `
        <div class = "student">
           <h1>${this.name}</h1>
           <p>Förnamn: ${this.firstName}</p>
           <p>Efternamn: ${this.lastName}</p>
           <p>Student ID: ${this.user_id}</p>
           <p>Email: ${this.email}</p>
           <p>Course name: ${this.course}</p>
           <p>Role: ${this.role}</p>
        </div>
   `}

   display(selector){
   	//$(selector).append(this.template);
    //We expect a separate file to add the static property 
    //template to our Student class (js/templates/student/html)
    $(selector).append(Student.template.apply(this));
   }



   showQuestion(){
    //var question = new Question();
    // for(var i = 0; i < theQuestionList.length; i++){
    //    console.log(theQuestionList[i].question_id, theQuestionList[i].text); 
    // }

    theQuestionList.forEach(function(questions){
      console.log(questions.question_id , questions.text);
    });

    
   }
}