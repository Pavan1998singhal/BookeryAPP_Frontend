import React, { Component } from 'react';
import axios from 'axios'
import FormData from 'form-data'

class Signup extends Component{

    constructor(props){
        super(props);
        this.state = {
            firstName : '',
            lastName : '',
            email : '',
            username : '',
            password : '',
            confirmPassword : '',
            selectedFile : null
        }
    }

    onFileChange = (event) =>{
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let formData = new FormData();

        // Update the formData object 
        // formData.append( 
        //     'avatar', 
        //     this.state.selectedFile, 
        //     this.state.selectedFile.name
        // );
        
        const { firstName, lastName, email, username, password, confirmPassword, selectedFile } = this.state;
        
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        formData.append("avatar", selectedFile);

        for (var [key, value] of formData.entries()) { 
            console.log('hello',key, value);
           }

        axios.post('http://localhost:8000/signup', formData)
            .then(res => {
                console.log('Response is->', res.data)
                if(res.data === 'User Added Successfully'){
                    alert('Successfully Register !!')
                    this.props.history.push('/login')
                }else{
                    alert(res.data)
                    this.setState({
                        firstName : '',
                        lastName : '',
                        email : '',
                        username : '',
                        password : '',
                        confirmPassword : '',
                        selectedFile : null
                    })
                    this.props.history.push('/signup')
                }
            })
    }

    render(){
        return(
            <div>
                <form >

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">First name</label>
                        <div className="col-sm-3">
                            <input className="col-sm-10 form-control" id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="first name" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Last name</label>
                        <div className="col-sm-3">
                            <input className="col-sm-10 form-control" id="lastName" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="last name" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-3">
                            <input type="email" className="col-sm-10 form-control" id="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="email" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">UserName</label>
                        <div className="col-sm-3">
                            <input className="col-sm-10 form-control" id="username" name="username" value={this.state.username} onChange={this.handleChange} placeholder="username" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-3">
                            <input type="password" className="col-sm-10 form-control" id="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Confirm Password</label>
                        <div className="col-sm-3">
                            <input type="password" className="col-sm-10 form-control" id="confirmPassword" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} placeholder="Confirm Password" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Avatar</label>
                        <div className="col-sm-3">
                            <input type="file" id="avatar" name="avatar" onChange={this.onFileChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-2 col-form-label">
                            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Register</button>
                        </div>
                    </div>

                </form>
            </div>
        )
    }

}



export default Signup