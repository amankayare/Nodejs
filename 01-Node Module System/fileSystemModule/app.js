/*
    when using file system module it provides you synchronous and Asynchronous  
    both methods but always prefer Asynchronous methods untill its not important 
    to use synchronous methods.

*/

const fs = require('fs');

/*  
    sysnchronous method readdirSync(folder path)
    it gives array of files which is present in the folder which we have passed in para 
*/
const fileSyn = fs.readdirSync('./');
console.log(fileSyn);

console.log('---------------------');

/*  
    Asysnchronous method readdir(folder path)
    it gives array of files which is present in the folder which we have passed in para 
*/
 fs.readdir('./',(error,file)=>{

    if(error)
    console.log(error);
    else
    console.log(file);

});
// for getting error
fs.readdir('10',(error,file)=>{

    if(error)
    console.log(error);
    else
    console.log(file);

});