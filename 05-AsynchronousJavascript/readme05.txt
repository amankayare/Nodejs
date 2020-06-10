#Asynchronous JavaScript
"JavaScript is a single-threaded programming language which means only
one thing can happen at a time.... That's where asynchronous JavaScript 
comes into play. Using 'asynchronous' JavaScript
(such as callbacks, promises, and async/await), you can perform long
network requests without blocking the main thread"

Ex:

    console.log('Before');
    setTimeout(()=>{
        console.log('reading from data base');
    },2000);
    console.log('After');

# Actual implementation
  Not everytime we write this simple code but we write some functional
  code like:

  function getUser(id){
    setTimeout(()=>{
        console.log('reading from data base');
        return {id:id,UserName:'Aman'};
    },2000);
  }
    console.log('Before');
    console.log(getUser(1));
    console.log('After');

    OUTPUT: Before  
          ->undefine
            After

    - here we get a undefine user instead of a 'user object' because 
      'setTimeout()' is a asynchronous function so due to delay of 2
      sec when function is called it return a 'undefined value'
      
    - so how can we get the value from data base if we deal with
      asynchronous function so there are 3 ways  to do so.
        1) callbacks
        2) promises
        3) async/wait  

1) `callbacks:`

  function getUser(id,callback){
    setTimeout(()=>{
        console.log('reading from data base');
        callback ({id:id,gitUserName:'Aman'});
    },2000);
  }
    console.log('Before');
    getUser(1,(user)=>{
        console.log(user);
    }));
    console.log('After');

    -Now we get the result i.e. 'user object' , so when the result of the 
     asynchronous operation is ready then callback function will be called 
     with the result in this case (user)=> will be called when operation
     will be ready with user object result. 

    -so now we want to get the list of repo's that user have in git hub 
     Using git hub api

      console.log('Before');

      //------calling callback functions--------------
      getUser(1, (user) => {
          //after getting user we want to get list of repo 
          getRepo(user.gitUserName,(repo) => {
      
              console.log(user.gitUserName,repo);
      
          });
      }));
      //--------------------------------------------
      console.log('After');
      
      //Asynchronous funtion
      function getUser(id, callback) {
          setTimeout(() => {
              console.log('reading from data base....');
              callback({ id: id, gitUserName: 'Aman' });
          }, 2000);
      }
      
      //Asynchronous funtion
      function getRepo(username,callback) {
          setTimeout(() => {
              console.log('calling github API...');
              const repoList = ['repo1', 'repo2', 'repo3'];
              callback(repoList);
          },2000);
      }     
 
      //Asynchronous funtion
      function getCommits(repo,callback) {
          setTimeout(() => {
              console.log('calling github API...');
              const commitList = ['commit'];
              callback(commitList);
          },2000);
      }     

    - Now what if we want to get all the commits of repo of particular user then 
      our code look like this
      
      //Asynchronous code
      console.log('before');
      getUser(1,(user)=>{
        getRepo(user.name,(repo)=>{
            getcommits(repo[0],(commits)=>{
                    console.log(commits);
            });
        });
      });
      console.log('After');
      
      ** so this nested callback functions are known as 'Callback Hells'
    
      - what if we write synchronous code it will look like this:

        // Synchronous code
        console.log('before');
        const user = getUser(1);
        const userRepo = getRepo(user.gitUserName);
        const commits = getCommits(repo[0]);
        console.log('After');

    - Now on comparing both Synchronous and Asynchronous code we can see 
      that 'Callback Hell' make the Asynchronous code ugly and complex    

    - Simple 'solution for Callback Hell' problem is to replace ananomous
      functions to name functions and create a seperate function for callbacks
      and pass a reference of that newly created function in place of whole 
      funtion.
      
      Ex:


      //Asynchronous code
      console.log('before');
      getUser(1,getRepository);
      console.log('After');

      function displayCommits(commits){
        console.log(commits);
      }
      function getCommits(repo){
         getCommits(repo,displayCommits);
      }
      function getRepository(user){
        getRepo(user.gitUsername,getCommits);
      }

      function getUsers(id,(users)=>{
        setTimeout(()=>{
          console.log('reading from data base');
          callback({id:id,gitUserName:'Aman'});
        },2000);
      });

      ** it is 'better then Callback Hell but not ideal' so to deal with
         callback hell we will use 'Promises'.

2) 'Promises':
-A promise is an object that may produce a single value some time in the 
 future: either a resolved value, or a reason that it’s not resolved 
 (e.g., a network error occurred) during an asynchronous opeartion. 

-A promise may be in one of 3 possible states
          'states: Fulfilled, Rejected, or Pending.'

- When we create an promise object it will be in 'pending state' 
  then it kicks off asynchronous operation then the operation can be
  successfully or can failed.

- if the operation is successfull then we would say promise is resolved 
  or fulfilled and state of the promise obj will be changed from 'Pending => Fulfilled' 

- if the opeartion is failed then we would say promise is rejected and
  the state of the promise obj will be changed from 'Pending => Rejected'

-To handle or consume resolved and rejection we have to methods in promise obj
      '1) .then((result)=>{})'=> for resolved handling
      '2) .catch((err)=>{})'=> for rejected handling

// Install npm promise package=> 'npm i promise'
//Create a promise
const prom= require('promise');
const prom = new promise((resolved,rejected)=>{

  //asynchronous operation 
  setTimeout(()=>{

    console.log('database data fetching....');
    resolved({id:1,name:"Aman"});
    rejected(new Error('Error in fetching data'));
  
  },2000)

});

//Consume the promise
prom
      .then(result=>console.log('User:', result)) // for successfull
      .catch(err=>console.log('Error:', err.message));// for failed

NOTE**: Anywhere we have asynchronous function which takes callback you should
        modify that function to return a promise.
        
  -'Promise Object in javascript'

    Promises api is usefull particularly in Unit Test  
    Sometime you need a Promise which is already resolved or already
    rejected like in case of testing 

    const p = Promise.resolved({id:10,name:'Aman'});
    p.then(result=>console.log(result));
  
    here Promise is a class which have some methods like all(),race().

 -'If you want to run promises parallely' and want to get the result after
   completion of all promises then we have method called all() which returns
   another promise that have an array contaning the results of each promises.
   
   Ex:
         const p1  = new Promise(resolve,reject){

          setTimeout(()=>{
            console.log('Async opeartion 1');
            resolve(10);
          },2000);

         }
         const p2  = new Promise(resolve,reject){

          setTimeout(()=>{
            console.log('Async opeartion 2');
            resolve(20);
           //reject(new Error('Reason or failed..'));
          },2000);
          
         }
         Promise.all([p1,p2])
         .then(result=>console.log(result));


  ** But if any of the Promise would have been failed then the resulten 
     promise will be considered as failed.

   -"If you want to run promises parallely and want to get the result after
     completion of any one of the promise" then we have method called race() 
     which returns  another promise that give the result of completed promise.
    


const p1  = new Promise(resolve=>{

  setTimeout(()=>{
    console.log('Async opeartion 1');
    resolve(10);
  },3000);

 });
 const p2  = new Promise(resolve=>{

  setTimeout(()=>{
    console.log('Async opeartion 2');
    resolve(20);
  },4000);
  
 });

 Promise.race([p1,p2])
 .then(result=>console.log(result));

 3)'Async and await:'
  - async and await is built over the promise functionality but to handle
    or consume the promises Async and await helps you to write a 
    asynchronous code like a synchronous code without using .then and.catch
    like:
    
    here 'await is a operator'

    const user = await getUser(1);
    const repo = await getRepo(user.gitUserName);
    const commits = await getCommits(repo[0]);
    console.log(commits);

  -but 'await' is only valid in async function  

  async function displayCommits(){
    const user = await getUser(1);
    const repo = await getRepo(user.gitUserName);
    const commits = await getCommits(repo[0]);
    console.log(commits);
  }
  - now call the async function displayCommits();
  displayCommits();

  OUTPUT:
         reading from data base....
         calling github API...
         calling github API...
         [ 'commit' ]


  - To handle errors we have 'catch' in promise approach but in 
    'async and await' to handle errors we need try{} catch{} blocks.       


    async function displayCommits(){
     
     try{
            const user = await getUser(1);
            const repo = await getRepo(user.gitUserName);
            const commits = await getCommits(repo[0]);
            console.log(commits);
     }
     catch(err){

      console.log(err.message);
     } 
    }


    "so our Final code for async and await will be:-


//Asynchronous funtion
function getUser(id) {

    return new Promise((resolved, rejected) => {
        setTimeout(() => {
            console.log('reading from data base....');
            resolved({ id: id, gitUserName: 'Aman' });
        }, 2000);

    });

}

//Asynchronous funtion
function getRepo(username) {

    return new Promise((resolved, rejected) => {

        setTimeout(() => {
            console.log('calling github API...');
            const repoList = ['repo1', 'repo2', 'repo3'];
            resolved(repoList);
        }, 2000);

    });



}

//Asynchronous funtion
function getCommits(repo) {

    return new Promise((resolved, rejected) => {

        setTimeout(() => {
            console.log('calling github API...');
            const commitList = ['commit'];
            resolved(commitList);
            //rejected( new Error('Reason for failure.'));
        }, 2000);

    });
}

async function displayCommits(){
     
  try{
         const user = await getUser(1);
         const repo = await getRepo(user.gitUserName);
         const commits = await getCommits(repo[0]);
         console.log(commits);
  }
  catch(err){

   console.log(err.message);
  } 
 }
displayCommits();

"