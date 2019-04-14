import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'

//components
import Students from './Students'
import Campuses from './Campuses'
import Nav from './Nav'
import Home from './Home'
import OneCampus from './OneCampus'
import {getStudentsFromServer, getCampusesFromServer} from './store'




const mapDispatchToProps = (dispatch) =>{
    return{
        getStudentsFromServer:() => dispatch(getStudentsFromServer()),
        getCampusesFromServer:() => dispatch(getCampusesFromServer())
    }
}

const mapStateToProps = (state) =>{
    return{
        students:state.students,
        campuses:state.campuses
    }
}


class App extends React.Component{
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.getStudentsFromServer()
        this.props.getCampusesFromServer()
    }

    render(){
        return (
            <div>
                <Nav />
                <Switch>
                    <Route path='/students' component={Students}/>
                    <Route exact path='/campuses' component={Campuses}/>
                    <Route exact path='/campuses/:id' component={OneCampus} />
                    <Route component={Home} />
                
                </Switch>
            </div>
        )
    }


        
    
}

export default connect(mapStateToProps, mapDispatchToProps)(App)