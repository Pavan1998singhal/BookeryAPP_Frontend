import React, { Component } from 'react';
import axios from 'axios'
import '../css/login.css'
import logo from '../logo.svg'

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            isChecked : false
        }
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        })
    }

    onChangeCheckbox = (event) => {
        this.setState({
            isChecked: event.target.checked
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, password, isChecked } = this.state;

        const payload = {
            username: username,
            password: password
        }

        console.log('payload is->', payload)

        if(isChecked && username!== "" && password!== ""){
            localStorage.setItem('checkbox', isChecked)
            localStorage.setItem('username_withRememberMe', username) 
            localStorage.setItem('password_withRememberMe', password)
        }

        axios.post('http://localhost:8000/login', payload)
            .then(res => {
                console.log('Response is->', res.data)

                if(res.data === 'Username or Password not match'){
                    alert(res.data);
                    this.setState({
                        username: '',
                        password: ''
                    })      
                    this.props.history.push('/')
                }else{
                    console.log('Response is ->', res.data)
                    const accessToken = res.data.accessToken

                    // storing token into local storage
                    localStorage.setItem('token', accessToken)
                    localStorage.setItem('username', username)

                    axios.get(`http://localhost:8000/users/${username}`, {
                        headers:{
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                        .then( response => {
                            console.log('second api->', response.data)

                            if(response.data === 'Not Valid User'){
                                alert(response.data)
                                this.setState({
                                    username: '',
                                    password: ''
                                }) 
                                this.props.history.push('/')
                            }else{
                                localStorage.setItem('avatar', response.data.avatar)
                                localStorage.setItem('role', response.data.role)

                                this.props.history.push('/navbar')

                            }

                        })
                }
            })
    }

    handleSignup = () => {
       this.props.history.push('/signup')
    }

    componentDidMount(){
        if( (localStorage.getItem('checkbox') && localStorage.getItem('username') !== "" && localStorage.getItem('password') !== "") ){
            this.setState({
                isChecked: true,
                username: localStorage.getItem('username_withRememberMe'),
                password: localStorage.getItem('password_withRememberMe')
            })
        }
    }

    render(){
        return(
            <div>
                <div className="login-container">

                    <div className="imgcontainer">
                        <img src= {process.env.PUBLIC_URL + `/avatar.png`} alt="Avatar" className="avatar" />
                    </div>

                    <div className="container">
                        <label htmlFor="uname" ><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" id="username" name="username" value={this.state.username} onChange={this.handleChange} required />
                    
                        <label htmlFor="psw" ><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" id="inputPassword3" name="password" value={this.state.password} onChange={this.handleChange} required />
                    
                        <button type="submit" onClick={this.handleSubmit} >Login</button>
                        <label>
                            <input type="checkbox" checked={this.state.isChecked} name="isRememberMe" onChange={this.onChangeCheckbox} /> Remember me
                        </label>

                    </div>

                    <div className="container-button" >
                        <button type="button" className="signUpbtn" onClick={this.handleSignup}>Sign Up</button>
                        <span className="psw">Forgot <a href="#">password?</a></span>
                    </div>

                </div>
            </div>
        )
    }
}

export default Login

