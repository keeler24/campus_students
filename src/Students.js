import React from 'react';
import {deleteStudentFromServer, addStudent, updateStudent} from './store'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


const mapDispatchToProps = (dispatch) =>{
    return{
        deleteStudentFromServer:(uuid) => dispatch(deleteStudentFromServer(uuid)),
    }
}

const mapStateToProps = (state) =>{
    return{
        students:state.students,
        campuses:state.campuses
    }
}

const Students = (props) => {
    console.log(props)
    const {students, campuses, deleteStudentFromServer, history} = props
    console.log(campuses)


  
    return(
        <div id="students" className="container">
        <h3>ALL STUDENTS</h3>
        
        <table className="centered highlight">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Campus</th>
                    <th>Pic</th>
                    <th>GPA</th>
                    <th><button onClick = {() => {history.push('/createStudent')}} className="btn-floating btn-small waves-effect waves-light green"><span>+</span></button></th>
                </tr>
            </thead>
            <tbody>
                {students.map(student => (
                    <tr key={student.uuid}>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.email}</td>
                        <td>{student.campus?student.campus.name:"No CAMPUS"}</td>
                        <td><img width="50 px" height="50 px" src={student.imageUrl}/></td>
                        <td>{student.gpa}</td>
                        <td><button onClick={()=>{history.push(`/students/${student.uuid}`)}} className="btn-floating btn-small waves-effect waves-light blue">Edit</button></td>
                        <td><button onClick = {() => deleteStudentFromServer(student.uuid)} className="btn-floating btn-small waves-effect waves-light red"><span>-</span></button></td>
                    </tr>
                ))}

            </tbody>
        </table>
        </div>
    )
    
}




export default connect(mapStateToProps, mapDispatchToProps)(Students)