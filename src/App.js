import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'

//components
import Students from './Students'
import Campuses from './Campuses'
import Nav from './Nav'
import Home from './Home'
import OneCampus from './OneCampus'
import CreateStudent from './CreateStudent'
import CreateCampus from './CreateCampus'
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
                    <Route exact path='/students' component={Students}/>
                    <Route exact path='/campuses' component={Campuses}/>
                    <Route exact path='/campuses/:id' component={OneCampus} />
                    <Route exact path='/students/:id' render={(props)=><CreateStudent match={props.match} history={props.history} />} />
                    <Route exact path='/createStudent' component={CreateStudent} />
                    <Route exact path='/createCampus' component={CreateCampus} />
                    <Route component={Home} />
                
                </Switch>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(App)