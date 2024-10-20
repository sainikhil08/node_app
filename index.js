const express=require("express");
const auth=require("./middleware/authentication")
const home=require("./routes/home")
const courses=require("./routes/courses")
const morgan=require("morgan")
const debug=require("debug")("app:startup")
const config=require("config")
const Joi=require("joi")
const app=express();

// middleware function
app.use(express.json())
// built in middleware for static content
app.use(express.static("public"))
//using custom middleware func
app.use(auth)

app.use("/", home)
//
app.use("/api/courses", courses)
debug("server started....")
// config pkg for managing configs for env
console.log(`App name: ${config.get("application_name")}`)
console.log(`host: ${config.get("mail.host")}`)
console.log(`password: ${config.get("mail.password")}`)
// enabling only in dev environment
if(app.get("env")=="development"){
// 3rd part middleware for logging http requests
app.use(morgan("tiny"))
//use debug instead of console.log for better control and separation
debug("Morgan enabled..")
}

const port=process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}`));

function validateCourse(course){
    const schema=Joi.object({
        name: Joi.string().min(2).required()
    });

    return schema.validate(course);
}