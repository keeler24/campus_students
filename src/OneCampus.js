import React from 'react';
import {connect} from 'react-redux'
import {deleteStudentFromServer, addStudent} from './store'


const mapStateToProps = (state) =>{
    return{
        oneCampus:state.oneCampus,
    }
}

const OneCampus = (props) => {
    const oneCampus = props.oneCampus || {}
    const students = oneCampus.students || []

    // const addCampus = (campus)=>{
    //     name:,
    //     imageUrl
    // }


    if(oneCampus&&students){
        return(
            <div className="container">
                <h3>Campus {oneCampus.name}</h3>
                <div >
                        <img src={oneCampus.imageUrl} /> <br />
                        Address: {oneCampus.address}<br />
                        <p>Mission Statement: {oneCampus.description}</p><br />
                </div>


                <h3>STUDENT BODY</h3>
                <table className="centered highlight">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Pic</th>
                        <th>GPA</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.uuid}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td><img width="50 px" height="50 px" src={''||student.imageUrl}/></td>
                            <td>{student.gpa}</td>
                        </tr>
                    ))}

                </tbody>
                </table>
            </div>
    )}
    else{
        return(
            console.log("waiting for stuff")
        )
    }
}

export default connect(mapStateToProps)(OneCampus)