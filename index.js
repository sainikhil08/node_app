const express=require("express");

const Joi=require("joi")
const app=express();

app.use(express.json())
const courses=[
    {id: 1, name: "AI"},
    {id: 2, name: "ML"},
    {id: 3, name: "DB"}
]
app.get("/",(req, res)=>{
    res.send("hello world!!")
})

app.get("/api/courses", (req,res)=>{
    res.send(courses)
})

app.get("/api/courses/:id", (req,res)=>{
    // read params
    const course=courses.find(c=> c.id===parseInt(req.params.id))

    if(!course) {
        res.status(404).send("Course not found for given id: ", req.params.id);
        return;
    }

    res.send(course)
    //read query params
    //res.send(req.query)
})

app.post("/api/courses", (req,res)=>{

    const {error}=validateCourse(req.body)
    if(error){
        res.status(404).send(error);
        return;
    }

    const course={id: courses.length+1, name: req.body.name};
    courses.push(course);
    res.send(course)
})

app.put("/api/courses/:id", (req,res)=>{

    const course=courses.find(c=> c.id===parseInt(req.params.id))
    if(!course) {
        res.status(404).send("Course not found for given id: ", req.params.id);
        return;
    }

    const {error}=validateCourse(req.body)
    if(error){
        res.status(404).send(error);
        return;
    }

    course.name=req.body.name;
    res.send(course)

})

app.delete("/api/courses/:id", (req,res)=>{

    const course=courses.find(c=> c.id===parseInt(req.params.id))
    if(!course) {
        res.status(404).send("Course not found for given id: ", req.params.id);
        return;
    }

    const idx=courses.indexOf(course);
    courses.splice(idx,1);

    res.send(req.params.id);
})

const port=process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}`));

function validateCourse(course){
    const schema=Joi.object({
        name: Joi.string().min(2).required()
    });

    return schema.validate(course);
}