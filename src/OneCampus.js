import React from 'react';
import {connect} from 'react-redux'


const mapStateToProps = (state) =>{
    return{
        oneCampus:state.oneCampus,
    }
}

const OneCampus = (props) => {
    const oneCampus = props.oneCampus || {}
    const students = oneCampus.students || []

    if(oneCampus&&students){
        return(
            <div>
                <h3>SCHOOL</h3>
                <div className="container">
                        <img src={oneCampus.imageUrl} /> <br />
                        {oneCampus.name}<br />
                        {oneCampus.address}<br />
                        {oneCampus.description}<br />
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
                            <td><img width="50 px" height="50 px" src={''||student.imageUrl}/></td>
                            <td>{student.gpa}</td>
                            <td><button onClick = {() => deleteStudentFromServer(student.uuid)} className="btn-floating btn-small waves-effect waves-light red"><span>-</span></button></td>
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