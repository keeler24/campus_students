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
    const {campuses, getOneCampusFromServer} = props
    return(
        <div display="container">
            <h3>ALL SCHOOLS</h3>
            <div className="row">
                {campuses.map(campus =>{
                    return(
                        <div key={campus.uuid} className="col s6 centered">
                            <Link to={`/campuses/${campus.uuid}`} >
                                <img height="200 px" width="200 px" src={campus.imageUrl} onClick={() => getOneCampusFromServer(campus.uuid)}/> 
                            </Link>

                            <br />
                            {campus.name}<br />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(Campuses)