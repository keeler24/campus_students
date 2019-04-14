const express = require('express')
const router = express.Router()
const {Campus, Student} = require('../db/models')

//
//      /api/campus/
//
//available:
//campus.getStudents()


router.get('/', (req, res, next) =>{
    Campus.findAll()
        .then(campuses => res.send(campuses))
        .catch(next)
})

router.get('/:campusUUID', (req, res, next) =>{
    Campus.findOne({where:{uuid:req.params.campusUUID}, include:[{model: Student}]})
        .then(campus =>{
            res.send(campus)
        })
})


router.post('/', (req, res, next) =>{
    Campus.create(req.body)
        .then(resp => res.send(resp))
        .catch(next)
})

module.exports = router