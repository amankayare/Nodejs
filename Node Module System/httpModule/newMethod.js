/*
    - With createServer() we can pass a callBack as a parameter to the function   
      and with that we can avoid even emitter process        

*/


const http = require('http');
const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.write('Hello root URL');
        res.end();
    }
    if (req.url === '/api/studentsMarks') {

        res.write(JSON.stringify([25, 36, 45, 48]));
        res.end();

    }
    if (req.url === '/api/studentsNames') {

        res.write(JSON.stringify([{ name: 'Aman' }, { name: 'arpit' }, { name: 'Darshan' }]));
        res.end();
    }

});

server.listen(3000);
console.log('Listening at port 3000.....');