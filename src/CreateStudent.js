import React from 'react';
import {addStudent, updateStudent} from './store'
import {connect} from 'react-redux'
import {getCampusForOneStudent} from './Utils'


const mapDispatchToProps = (dispatch) =>{
    return{
        addStudent:(student) => dispatch(addStudent(student)),
        updateStudent:(student) => dispatch(updateStudent(student))
    }
}

const mapStateToProps = (state) =>{
    return{
        students:state.students,
        campuses:state.campuses
    }
}



class CreateStudent extends React.Component{
    constructor(){
        super()
    }

    handleSubmit = (event) =>{
        event.preventDefault()

        console.log(event.target.firstname.value)
        console.log(event.target.lastname.value)
        console.log(event.target.email.value)
        console.log(event.target.gpa.value)

        const student = {
            firstName:event.target.firstname.value,
            lastName:event.target.lastname.value,
            email:event.target.email.value,
            campusUuid:event.target.school.value,
            gpa:event.target.gpa.value
        }


        if(this.props.match.params.id){
            student.uuid = this.props.match.params.id
            this.props.updateStudent(student)
        }else{
            this.props.addStudent(student)
        }
        
        this.props.history.push('/students')
    

        
    }

    render(){
        const {campuses} = this.props
        const {students} = this.props
        let foundStudent = ''
        const campus = ''

        if(this.props.match.params.id){
            const studentId = this.props.match.params.id
            foundStudent = students.find(student => student.uuid === studentId)
            console.log('asdfasdfasdf ' +campus)
        }

         
    
        return(
            <div className="row container">
                <h3>{foundStudent?"Update Student":"Create Student"}</h3>
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s4">
                            <input type="text" name="firstname" defaultValue={foundStudent.firstName||"first name"}></input>
                        </div>
                        <div className="input-field col s4">
                            <input type="text" name="lastname" defaultValue={foundStudent.lastName||"last name"}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                        
                            <input type="text" name="email" defaultValue={foundStudent.email||"email"}></input>
                        </div>
                        <div className="input-field col s4">
                            <input type="text" name="gpa" defaultValue={foundStudent.gpa||"gpa"}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <select name="school" className="browser-default" width="80 px" defaultValue={campuses.find(campus => campus.uuid === foundStudent.campusUuid)||"select campus"}>
                                <option value="select campus" disabled>select campus</option>
                                {campuses.map(campus =>{
                                    return <option key={campus.uuid} value={campus.uuid}>{campus.name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <button type="submit">{foundStudent?"Update":"Create"}</button>
                </form>
            </div>
        )
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent)