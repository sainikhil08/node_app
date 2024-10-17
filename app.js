
//import path module
const p=require("path");

console.log(p.parse(__filename))

//import os module
const os=require("os");

console.log(os.platform());

const fs=require("fs");

// sync function avoid using these in real-time apps
//const files=fs.readdirSync("./");
//console.log(files)

//async version
fs.readdir("./", function(err, files){
    if(err) console.log("error", err);

    else console.log("result ", files)
})

// importing a custom module
const Logger=require("./logger");
const logger=new Logger();

//register a listener
logger.on("messageLogged", function(arg){
    console.log("event logged ", arg);
})
logger.log("message");


const http=require("http");

const server=http.createServer((req, res)=>{
    if(req.url==="/"){
        res.write("hello world");
        res.end();
    }

    if(req.url==="/api/games"){
        res.write(JSON.stringify(["GTA","FIFA", "Cricket"]));
        res.end();
    }
});

server.listen(3000);
console.log("Listening on port 3000");
