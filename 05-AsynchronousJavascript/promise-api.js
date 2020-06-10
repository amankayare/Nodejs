/* 
    const ps = Promise.resolve({id:10,name:'Aman'});
    ps.then(result=>console.log(result));
    
    const pf = Promise.reject(new Error('Reason for error...'));
    pf.then(err => console.log(err));

*/




/*
const p1  = new Promise((resolve,reject)=>{

    setTimeout(()=>{
      console.log('Async opeartion 1');
      resolve(10);
    },2000);

   });
   const p2  = new Promise((resolve,reject)=>{

    setTimeout(()=>{
      console.log('Async opeartion 2');
      //resolve(20);
      reject(new Error('Reason for fail...'));
    },2000);
    
   });

   Promise.all([p1,p2])
   .then(result=>console.log(result))
   .catch(err=>console.log(err));
*/






/*
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
*/

//------------------Async and Await-------------------

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

//consuming promises
async function displayCommits() {

    try {
        const user = await getUser(1);
        const repo = await getRepo(user.gitUserName);
        const commits = await getCommits(repo[0]);
        console.log(commits);
    }
    catch (err) {

        console.log(err);
    }
}
displayCommits();