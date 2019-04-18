const express = require('express')
const router = express.Router()
const {Student, Campus} = require('../db/models')
//
//      /api/students/
//
//available:
//student.getCampus()
//student.setCampus()


router.get('/', (req, res, next) =>{
    console.log('in student main get route')
    Student.findAll({include:{model:Campus}})
        .then(students => res.send(students))
        .catch(next)
})

router.get('/:studentUUID', (req, res, next) =>{
    Student.findOne({where:{uuid:req.params.studentUUID}, include:[{model: Campus}]})
        .then(student =>{
            res.send(student)
        })
})

router.post('/', (req, res, next) =>{
    console.log("in student router")
    console.log(req.body)
    Student.create(req.body)
        .then(resp => res.send(resp))
        .catch(next)
})

router.put('/:studentUUID', (req, res, next) =>{
    Student.update({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        campusUuid:req.body.campusUuid,
        gpa:req.body.gpa
    },{where:{uuid:req.params.studentUUID}})
        .then(resp => res.status(204).send(resp))
})

router.delete('/:studentUUID', (req, res, next) =>{
    console.log('in student delete route' + req.params.studentUUID)
    Student.findByPk(req.params.studentUUID)
        .then(student => {
            return student.destroy()
        })
        .then(() => {
            res.status(204).send('deleted!!!')
        })
        .catch(next)
})

module.exports = router



 // curl -X POST -H "Content-Type: application/json" -d '{"firstName": "firstNameTest", "lastName": "lastNameTest", "email":"email@gmail.com", "gpa":"1"}' http://localhost:2525/api/students