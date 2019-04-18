const faker = require('faker')

const makeFakeCampus = () =>{
    return {
        name:faker.fake("{{name.lastName}}"),
        imageUrl:faker.image.city(),
        address:faker.address.streetAddress(),
        description:faker.lorem.text()
    }
}

const makeFakeStudent = () =>{
    return {
        firstName:faker.name.firstName(),
        lastName:faker.name.lastName(),
        email:faker.internet.email(),
        imageUrl:faker.image.imageUrl(200,200,"people"),
        gpa:Math.random()*4
    }
} 

module.exports = {makeFakeCampus, makeFakeStudent}

