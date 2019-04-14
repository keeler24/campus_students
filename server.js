const express = require('express')
const campusRouter = require('./routes/campusRouter')
const studentsRouter = require('./routes/studentsRouter')
const {db, Campus, Student} = require('./db/models')
const {makeFakeCampus, makeFakeStudent} = require('./db/fakeSeed')


const app = express();
const PORT = process.env.PORT || 2525

//middlewarez
app.use(express.static('public'))
app.use(express.static('dist'))
app.use('/api/campus', campusRouter)
app.use('/api/students', studentsRouter)

app.get('/', (req, res, next) =>{
    res.sendFile(__dirname + '/index.html')
})

// syncDB()
let campuses = []
db.sync({force:true})
    .then(() => {
        return Promise.all([
            Campus.create(makeFakeCampus()), 
            Campus.create(makeFakeCampus()),
            Campus.create(makeFakeCampus()), 
            Campus.create(makeFakeCampus())
        ])
    })
    .then((resp) => {
        campuses = resp
        return Promise.all([
            Student.create(makeFakeStudent()), 
            Student.create(makeFakeStudent()),
            Student.create(makeFakeStudent()), 
            Student.create(makeFakeStudent())
        ])
    })
    .then((students) =>{
        students[0].setCampus(campuses[0]);
        students[1].setCampus(campuses[1]);
        students[2].setCampus(campuses[2]);
        students[3].setCampus(campuses[3])
    })
    .then(() =>{
        app.listen(PORT, ()=>{
            console.log(`Listening on port ${PORT}`)
        })
    })
    .catch(error => console.log(error))   




     // .then(() => {
    //     return Promise.all([
    //         Promise.all([
    //             Campus.create(makeFakeCampus()), 
    //             Campus.create(makeFakeCampus()),
    //             Campus.create(makeFakeCampus()), 
    //             Campus.create(makeFakeCampus())
    //         ]), 
    //         Promise.all([
    //             Student.create(makeFakeStudent()), 
    //             Student.create(makeFakeStudent()),
    //             Student.create(makeFakeStudent()), 
    //             Student.create(makeFakeStudent())
    //         ])
    //     ])
    // })