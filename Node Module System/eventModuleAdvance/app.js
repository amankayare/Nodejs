/*
    -   whenever you want to use a Event Emitter amoung/between different files or
        modules we need to create a custom class, class which will extend the Event 
        Emitter class then we define our Event raising method inside that class so
        whenver we need to deal with that Event or whenever we want to add listener
        to that event anywhere then we will just create a object of our custom class  
    
    -   After creating our custom class for event Emitter dont forget to export it 

*/

// Event registered code in this file

const Logger = require('./logger');
const logger = new Logger();

logger.on('eventName', (args) => {

    console.log('Finally' );
    console.log('Listener Called', args);
});

logger.log();

