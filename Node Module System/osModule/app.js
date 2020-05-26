const os = require('os');

var totalMem = os.totalmem(); 
var freeMem = os.freemem();

console.log(`Total Memo : ${totalMem}`);
console.log(`Free Memo  : ${freeMem}`);