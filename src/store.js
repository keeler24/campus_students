import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

const initialState = {}

//action types
const GET_CAMPUSES_FROM_SERVER = "GET_CAMPUSES_FROM_SERVER"
const GET_STUDENTS_FROM_SERVER = "GET_STUDENTS_FROM_SERVER"
const GET_ONE_STUDENT_FROM_SERVER = "GET_ONE_STUDENT_FROM_SERVER"
const GET_ONE_CAMPUS_FROM_SERVER = "GET_ONE_CAMPUS_FROM_SERVER"


//action creators
const saveCampusesFromServer = (campuses) =>{
    return{
        type:GET_CAMPUSES_FROM_SERVER,
        campuses    
    }
}

const saveOneCampusFromServer = (campus) =>{
    console.log(campus)
    return{
        type:GET_ONE_CAMPUS_FROM_SERVER,
        campus    
    }
}

const saveOneStudentFromServer = (student) =>{
    return{
        type:GET_ONE_STUDENT_FROM_SERVER,
        student    
    }
}

const saveStudentsFromServer = (students) =>{
    return{
        type:GET_STUDENTS_FROM_SERVER,
        students    
    }
}

export const getCampusesFromServer = () =>{
    return (dispatch) =>{
        axios.get('/api/campus/')
            .then(campuses => dispatch(saveCampusesFromServer(campuses.data)))
            .catch(error => console.log(error))
    }
}

export const getStudentsFromServer = () =>{
    return (dispatch) =>{
        axios.get('/api/students/')
            .then(students => {
                console.log(students)
                return dispatch(saveStudentsFromServer(students.data))})
            .catch(error => console.log(error))
    }
}

export const deleteStudentFromServer = (uuid) =>{
    return (dispatch) =>{
        axios.delete(`/api/students/${uuid}`)
            .then((resp) => {
                return dispatch(getStudentsFromServer())
            })
            .catch(error => console.log(error))
    }
}

export const getOneCampusFromServer = (uuid) =>{
    console.log("in thunk get one campus from server " + uuid)
    return (dispatch) =>{
        axios.get(`/api/campus/${uuid}`)
            .then(resp => {
                console.log(resp.data)
                return dispatch(saveOneCampusFromServer(resp.data))
            })
            .catch(error => console.log(error))
    }

}

export const addStudent = (student) =>{
    return (dispatch) =>{
        axios.post('/api/students/', student)
            .then(resp => {
                return dispatch(getStudentsFromServer())
            })
            .catch(error => console.log(error))
    }
}

export const updateStudent = (student) =>{
    return (dispatch) =>{
        axios.put(`/api/students/${student.uuid}`, student)
            .then(resp => {
                return dispatch(getStudentsFromServer())
            })
            .catch(error => console.log(error))
    }

}

export const addCampus = (campus) =>{
    return (dispatch) =>{
        axios.post('/api/campus/', campus)
            .then(resp => {
                return dispatch(getCampusesFromServer())
            })
            .catch(error => console.log(error))
    }
}


//reducers
const campusReducer = (state = [], action) => {
    switch (action.type){
        case GET_CAMPUSES_FROM_SERVER:
            return [...action.campuses]
        default:
            return state
    }
}

const studentReducer = (state = [], action) => {
    switch (action.type){
        case GET_STUDENTS_FROM_SERVER:
            return [...action.students]
        default:
            return state
    }
}

const singleStudentReducer = (state = [], action) => {
    switch (action.type){
        case GET_ONE_STUDENT_FROM_SERVER:
            return action.student
        default:
            return state
    }
}

const singleCampusReducer = (state = [], action) => {
    switch (action.type){
        case GET_ONE_CAMPUS_FROM_SERVER:
            return action.campus
        default:
            return state
    }
}


const reducer = combineReducers({
    campuses:campusReducer,
    students:studentReducer,
    oneStudent:singleStudentReducer,
    oneCampus:singleCampusReducer
})

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

export default store