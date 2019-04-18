import React from 'react';
import {addCampus} from './store'
import {connect} from 'react-redux'


const mapDispatchToProps = (dispatch) =>{
    return{
        addCampus:(campus) => dispatch(addCampus(campus))
    }
}

class CreateCampus extends React.Component{
    constructor(){
        super()
    }

    handleSubmit = (event) =>{
        event.preventDefault()

        const campus = {
            name:event.target.name.value,
            address:event.target.address.value,
            description:event.target.description.value,
        }

        this.props.addCampus(campus)
        this.props.history.push('/campuses')
    
    }

    render(){
        return(
            <div className="row container">
                <h3>CREATE CAMPUS</h3>
                <form className="col s8" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s4">
                            <input type="text" name="name" defaultValue="name"></input>
                        </div>
                        <div className="input-field col s4">
                            <input type="text" name="address" defaultValue="address"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <input type="text" name="description" defaultValue="description"></input>
                        </div>
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>
        )
    }
}



export default connect(null, mapDispatchToProps)(CreateCampus)