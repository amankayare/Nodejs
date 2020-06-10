const promise = require('promise');
//Create a promise
const pro = new Promise((resolved,rejected)=>{

    //asynchronous operation 
    setTimeout(()=>{
  
      console.log('database data fetching....');
     // resolved({id:1,name:"Aman"});
      rejected(new Error('Error in fetching data'));
    
    },2000)
  
  });
  
  //Consume the promise
  pro
        .then(result=>console.log('User:', result)) // for successfull
        .catch(err=>console.log('Error:', err.message));// for failed