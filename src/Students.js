import React from 'react';
import {deleteStudentFromServer} from './store'
import {connect} from 'react-redux'


const mapDispatchToProps = (dispatch) =>{
    return{
        deleteStudentFromServer:(uuid) => dispatch(deleteStudentFromServer(uuid))
    }
}

const mapStateToProps = (state) =>{
    return{
        students:state.students
    }
}

const Students = (props) => {
    const {students, deleteStudentFromServer} = props
    return(
        <div id="students">
        <h3>ALL STUDENTS</h3>
        <table className="centered highlight">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Pic</th>
                    <th>GPA</th>
                    <th>Campus</th>
                    <th><button onClick = {() => {console.log("I do nothing")}} className="btn-floating btn-small waves-effect waves-light green"><span>+</span></button></th>
                </tr>
            </thead>
            <tbody>
                {students.map(student => (
                    <tr key={student.uuid}>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.email}</td>
                        <td><img width="50 px" height="50 px" src={student.imageUrl}/></td>
                        <td>{student.gpa}</td>
                        <td>{student.campus.name}</td>
                        <td><button onClick = {() => deleteStudentFromServer(student.uuid)} className="btn-floating btn-small waves-effect waves-light red"><span>-</span></button></td>
                    </tr>
                ))}

            </tbody>
        </table>
        </div>
    )
    
}




export default connect(mapStateToProps, mapDispatchToProps)(Students)