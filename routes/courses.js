const express=require("express")

const router=express.Router()

const courses=[
    {id: 1, name: "AI"},
    {id: 2, name: "ML"},
    {id: 3, name: "DB"}
]

router.get("/", (req,res)=>{
    res.send(courses)
})

router.get("/:id", (req,res)=>{
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

router.post("/", (req,res)=>{

    const {error}=validateCourse(req.body)
    if(error){
        res.status(404).send(error);
        return;
    }

    const course={id: courses.length+1, name: req.body.name};
    courses.push(course);
    res.send(course)
})

router.put("/:id", (req,res)=>{

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

router.delete("/:id", (req,res)=>{

    const course=courses.find(c=> c.id===parseInt(req.params.id))
    if(!course) {
        res.status(404).send("Course not found for given id: ", req.params.id);
        return;
    }

    const idx=courses.indexOf(course);
    courses.splice(idx,1);

    res.send(req.params.id);
})

module.exports=router