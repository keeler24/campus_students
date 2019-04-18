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
app.use(express.json())
app.use('/api/campus', campusRouter)
app.use('/api/students', studentsRouter)

app.get('/', (req, res, next) =>{
    res.sendFile(__dirname + '/index.html')
})




let campuses = []

db.sync({force:true})
    .then(() => {
        let fiveCampusPromises = [];

        for(let i = 0; i < 5; i++){
            fiveCampusPromises.push(Campus.create(makeFakeCampus()))
        }

        return Promise.all(fiveCampusPromises)
    })
    .then((resp) => {
        campuses = resp
        console.log(campuses.length)
        let hundredStudentPromises = [];
        
        for(let i = 0; i < 100; i++){
            hundredStudentPromises.push(Student.create(makeFakeStudent()))
        }
        
        return Promise.all(hundredStudentPromises)
    })
    .then((students) =>{
        //ASSIGN RANDOM CAMPUSES TO STUDENTS
        students.forEach(student => student.setCampus(campuses[Math.floor(Math.random()*campuses.length)]))
       
    })
    .then(() =>{
        app.listen(PORT, ()=>{
            console.log(`Listening on port ${PORT}`)
        })
    })
    .catch(error => console.log(error))   