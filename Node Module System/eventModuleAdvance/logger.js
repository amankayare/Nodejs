//Event Raising Code in this file


const EventEmitter = require('events');

class Logger extends EventEmitter {

    log() {
        this.emit('eventName',{id:1,name:'Aman'});
    }

}

module.exports  = Logger;