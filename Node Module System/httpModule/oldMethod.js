/*
    - createServer() will return a server which inherit a EventEmitter so it has all 
      the properties of EventEmitter.
    
    - 'connection' is a Event name present in http module 
       we can see this in documentation
    
    

*/


const http = require('http');
const server = http.createServer();

server.on('connection', (socket) => {

        console.log(`Connection is stablished......`);
});
server.listen(2500);
console.log('Listening at port 2500.....');