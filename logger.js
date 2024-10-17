
const EventEmitter=require("events");


class Logger extends EventEmitter{

    log(msg){
        console.log(msg);

        //raise an event
        this.emit("messageLogged", {id: 1, url: "http://"});
    }
}


module.exports=Logger;