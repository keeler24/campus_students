import React from 'react';
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {getOneCampusFromServer} from './store'


const mapStateToProps = (state) =>{
    return{
        campuses:state.campuses
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getOneCampusFromServer:(uuid) => dispatch(getOneCampusFromServer(uuid))
    }
}


const Campuses = (props) =>{
    const {campuses, getOneCampusFromServer, history} = props
    return(
        <div className="container">
            <h3>ALL CAMPUSES <button onClick = {() => {history.push('/createCampus')}} className="btn-floating btn-small waves-effect waves-light green"><span>+</span></button></h3>
            

            <div className="row">
                {campuses.map(campus =>{
                    return(
                        <div key={campus.uuid} className="col s4 centered">
                            <Link to={`/campuses/${campus.uuid}`} >
                                <img height="200 px" width="200 px" src={campus.imageUrl} onClick={() => getOneCampusFromServer(campus.uuid)}/> 
                            </Link>
                            <br />
                            <span className="flow-text">{campus.name}</span><br /><br /><br />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(Campuses)