import { from } from 'form-data';
import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { BrowserRouter as Router, Route, Redirect ,Switch, BrowserRouter, History } from 'react-router-dom'

import '../css/navbar.css'
import Home from '../components/home'
import AddBook from '../components/addBook'
import Notification from '../components/notification'
import AboutUs from '../components/aboutUs'
import Users from '../components/users'
import MyProfile from '../components/myProfile'
import EditUser from '../components/editUser'

class Navbar extends Component{

    constructor(props){
        super(props);
        this.state = {
            token : '',
            username : '',
            role : '',
            avatar : ''
        }
    }

    myFunction= () => {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
    }

    handleLogout = () => {
        localStorage.clear()
        this.setState({
            token : '',
            username : '',
            role : '',
            avatar : ''
        })
    }

    componentWillMount(){
        this.setState({
            token : localStorage.getItem('token'),
            username : localStorage.getItem('username'),
            role : localStorage.getItem('role'),
            avatar : localStorage.getItem('avatar')
        })
    }

    render(){
        const { username, token, avatar, role } = this.state

        return(
            <div>
                {token ? 

                    <div >
                        <BrowserRouter>
                            <Router>

                                <div className="topnav" id="myTopnav">
                                    <Link to="/navbar" className="active" >Home</Link>
                                    <Link to="/navbar/addBook" className="nav-link" >Add Book</Link>
                                    <Link to="/navbar/notification" className="nav-link" ><i className="fas fa-bell"></i>Notification</Link>
                                    <Link to="/navbar/users" className="nav-link" ><i className="fa fa-users"></i>Users</Link>
                                    <Link to="/navbar/myProfile"  data-toggle="tooltip" data-placement="bottom" title={username} ><img className="rounded-circle" src= {process.env.PUBLIC_URL + `/${ avatar }`} width="30px" height="30px" /></Link>
                                    <Link to="/navbar/aboutUs" className="nav-link" >About Us</Link>
                                    <Link to="/" className="nav-link" onClick={this.handleLogout} ><i className="fas fa-sign-out-alt"></i>Logout</Link>         
                                    <a  className="icon" onClick={this.myFunction}>
                                        <i className="fa fa-bars"></i>
                                    </a>
                                </div>
                        
                                <Switch>
                                    <Route path="/navbar/addBook" component={AddBook} />
                                    <Route path="/navbar/notification" component={Notification} />
                                    <Route path="/navbar/aboutUs" component={AboutUs} />
                                    <Route path="/navbar/users" component={Users} />
                                    <Route path="/navbar/myProfile" component={MyProfile} />
                                    <Route path = "/edit/:id" component={EditUser} />
                                    <Route path="/navbar" component={Home} />
                                </Switch>

                            </Router>
                        </BrowserRouter>
                    </div>

                : <Redirect to="/" />}
            </div>
        )
    }
}

export default Navbar