/*
    -Event is a signal that something has happened

        ex- when a http request is recieved on our application port
            then hhtp class raises an event and our job is to response 
            to that event which basically envolve reading that http 
            request and returning the right response.
    
    -Several classes of nodes raises different events and in our code we need 
     to responsd to those events 
    
    -Module Events constains Class:EventEmitter

    -Listener is a function that would be called when a particular event is raised
    
    - .addListen() and .on() is same and often we use .on most of time 

    - Event rasing syntax:
        
        emitter.emit('Event Name');
    
    - Listener syntax:
        
        emitter.on('Corresponded Event Name' , function(){

        });
    - Sequence of event and listener code is matter , so listener should come
      first before event raising

    - Event emitter with arguments  
        
              Event rasing with argument syntax:
        
                     emitter.emit('Event Name',Arguments);
    
              Listener with argument syntax:
        
                     emitter.on('Corresponded Event Name' , function(args){


                     });


*/

const EventEmitter = require('events');//EventEmitter is a class therefore its Pasacal case 
const emiter = new EventEmitter();//need to create instance because we have class only

//Register a Listener
emiter.on('messageLogged', function () {

    console.log('Listener Called');
});

//Raised a event 
emiter.emit('messageLogged');

//Event Emitter with Argument

emiter.on('withArgs', function (args) {

    console.log('Listener Called', args);

});



emiter.emit('withArgs', { id: 1, name: 'Aman' });
