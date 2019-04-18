import React from 'react';
import { NavLink } from 'react-router-dom'

const Nav = () =>{
    return(
        <nav style={{backgroundColor:'#424242'}}>
            <div className="nav-wrapper">
                <a href="#" className="brand-logo left">Hacker University Directory</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <NavLink to="/campuses">Campuses</NavLink>
                    </li>
                    <li >
                        <NavLink to="/students">Students</NavLink>
                    </li>
                </ul>
                
            </div>
        </nav>
    )
}




export default Nav;