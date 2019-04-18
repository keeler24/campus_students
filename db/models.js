const Sequelize = require('sequelize')
const faker = require('faker')
const db = new Sequelize(process.env.DATABASE_URL);

const Campus = db.define('campus', {
    uuid:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    imageUrl:{
        type:Sequelize.STRING,
        defaultValue:faker.image.city()
    },
    address:{
        type:Sequelize.TEXT,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    description:{
        type:Sequelize.TEXT
    }
})

const Student = db.define('student', {
    uuid:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true
    },
    firstName:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    lastName:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            isEmail:true
        }
    },
    imageUrl:{
        type:Sequelize.STRING,
        defaultValue:faker.image.imageUrl(200,200,"people")
    },
    gpa:{
        type:Sequelize.FLOAT,
        validate:{
            min:0.0,
            max:4.0
        }
    }
})


Student.belongsTo(Campus)
Campus.hasMany(Student)



module.exports = {db, Campus, Student}