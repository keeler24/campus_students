export function getStudentsForOneCampus (campus, students){
    return students.filter(student => student.campusUuid === campus.Uuid)
}

export function getCampusForOneStudent(campuses, student){
    return campuses.find(campus => {
        if (campus.Uuid === student.campusUuid) return campus;
    })
}