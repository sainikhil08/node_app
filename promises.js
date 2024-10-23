console.log("Before")
getUser(1).
    then(user=> getRepos(user.username)).
    then(repos=> console.log(repos)).
    catch(err=> console.log("Error",err.message)) //single error handler for all promises in chain
console.log("After")


function getUser(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("fetching data from db")
            resolve({id: id, username:"sainikhil08"})
        },2000)
    })
}

function getRepos(username){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("calling github api for", username)
            const repos=["java","spring", "react", "node"]
            resolve(repos)
        },2000)
    })
}

// to execute after having all promises ready, if any one of them ready use race method
//Promise.all([p1,p2]).then(result=>console.log("done")).catch(err=>console.log("errpr"))


//use async and await to write asynchronous code in synchronous manner
async function displayRepos(){
    try{
        const user = await getUser(1)
        const repos= await getRepos(user.username)
        console.log("Repos",repos);
    }
    catch(e){
        console.log("Error",e.message)
    }
}

displayRepos()