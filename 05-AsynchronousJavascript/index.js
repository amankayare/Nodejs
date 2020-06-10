/*
console.log('Before');
setTimeout(() => {
    console.log('reading from data base');
}, 3000);
console.log('After');

*/


/*
    console.log('Before');
    console.log(getUser(1));
    console.log('After');

    function getUser(id){
    setTimeout(()=>{
        console.log('reading from data base');
        return {id:id,UserName:'Aman'};
    },2000);
  }
*/






/*
console.log('Before');
//------calling callback functions--------------
getUser(1, (user) => {
    getRepo(user.gitUserName,(repo) => {

        console.log(user.gitUserName,repo);

    });
});
//--------------------------------------------
console.log('After');
*/



/*
// more convinient way to deal with callback hell

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
        const commits = ['commit'];
        callback(commits);
    },2000);
} 
*/

//Replace callback hell with promises
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
        }, 2000);

    });
}

//consuming promises
/*
const p = getUser(1);
p.then(res=>console.log(res));
*/
//chaining promises
getUser(1)
    .then(user => getRepo(user.gitUserName))
        .then(repo => getCommits(repo[0]))
        .then(commits => console.log('Commits:',commits))
        .catch(err => console.log('Error:', err.message));