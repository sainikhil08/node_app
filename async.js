const axios=require("axios")
console.log("Before")
getUser(1, displayUser)
console.log("After")

function displayUser(user){
    console.log(user)
    getRepos(user.username, displayRepos)
}
function displayRepos(repos){
    console.log(repos)
}

function getUser(id,callback){
    setTimeout(()=>{
        console.log("fetching data from db")
        callback({id: id, username:"sainikhil08"})
    },2000)
}

function getRepos(username,callback){
    
    setTimeout(()=>{
        console.log("calling github api")
        const repos=["java","spring", "react", "node"]
        callback(repos)
    },5000)
}

//const response=axios.get(`https://api.github.com/users/${username}/repos`)

//promise
const p=new Promise((resolve,reject)=>{
    
    setTimeout(()=>{
        //resolve(1)
        reject(new Error("message"))
    },2000)
})

p.then(result=> console.log("Success",result)).catch(err=>console.log("Error",err.message))