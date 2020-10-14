import React, { Component } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import FormData from 'form-data'

class EditUser extends Component{

    constructor(props){
        super(props);

        this.myRef = React.createRef();
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            avatar : '',
            username : '',
            role : '',
            firstName : '',
            lastName : '',
            email : '',
            selectedFile : null,
            token : localStorage.getItem('token')
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8000/users/userById/'+this.props.match.params.id, { headers: {"Authorization" : `Bearer ${this.state.token}`} })
            .then(response => {
                console.log('Edit User->', response.data)

                this.setState({
                    avatar : response.data.avatar,
                    username : response.data.username,
                    role : response.data.role,
                    firstName : response.data.firstName,
                    lastName : response.data.lastName,
                    email : response.data.email
                })
            })
            .catch(function (error){
                console.log(error);
            })
        
    }

    onChangeUsername(e){
        this.setState({
            username : e.target.value
        });
    }

    onChangeRole(e){
        this.setState({
            role : e.target.value
        });
    }

    onChangeFirstName(e){
        this.setState({
            firstName : e.target.value
        });
    }

    onChangeLastName(e){
        this.setState({
            lastName : e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            email : e.target.value
        });
    }

    onFileChange = (event) =>{
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    onSubmit(e){
        e.preventDefault();

        let formData = new FormData();

        const checkSelectedFile = this.state.selectedFile

        if(checkSelectedFile == null){

            const user = {
                username : this.state.username,
                role : this.state.role,
                firstName : this.state.firstName,
                lastName : this.state.lastName,
                email : this.state.email
            }
            console.log('User Data is->', user)

            axios.patch('http://localhost:8000/users/updateWithoutFile/'+this.props.match.params.id, user, { headers: {"Authorization" : `Bearer ${this.state.token}`} }) 
                .then(res => {
                    console.log(res.data)
                    if(res.data === 'User updated successfully !!'){
                        alert(res.data)
                        this.props.history.push('/navbar/users')
                    }else{
                        alert('Some Error Occured!!')
                        this.setState({
                            username : '',
                            role : '',
                            firstName : '',
                            lastName : '',
                            email : '',
                            avatar : '',
                            selectedFile : null
                        })
                        this.props.history.push('/navbar/users')
                    }
                });

        }else{
            
            const user = {
                username : this.state.username,
                role : this.state.role, 
                firstName : this.state.firstName,
                lastName : this.state.lastName,
                email : this.state.email,
                avatar : this.state.selectedFile
            }
            
            formData.append("username", user.username);
            formData.append("role", user.role)
            formData.append("firstName", user.firstName);
            formData.append("lastName", user.lastName);
            formData.append("email", user.email);
            formData.append("avatar", user.avatar);
            //formData.append('_method', 'PATCH')

            for (var [key, value] of formData.entries()) { 
                console.log('hello',key, value);
               }
            

            axios.patch('http://localhost:8000/users/updateWithFile/'+this.props.match.params.id, formData, { headers: {"Authorization" : `Bearer ${this.state.token}`} }) 
                .then(res => {
                    console.log(res.data)
                    if(res.data === 'User updated successfully !!'){
                        alert(res.data)
                        this.props.history.push('/navbar/users')
                    }else{
                        alert('Some Error Occured!!')
                        this.setState({
                            username : '',
                            role : '',
                            firstName : '',
                            lastName : '',
                            email : '',
                            avatar : '',
                            selectedFile : null
                        })
                        this.props.history.push('/navbar/users')
                    }
                });
        }

        // axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise) 
        //     .then(res => console.log(res.data));

        // window.location = '/';
    }

    render(){
        return(
            <div>
                <h3>Edit User <img className="rounded-circle" src= {process.env.PUBLIC_URL + `/${ this.state.avatar }`} width="70px" height="70px" />
                </h3>
                
                <form  onSubmit={this.onSubmit}>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" >Username:</label>
                        <div className="col-sm-3">
                            <input className="col-sm-10 form-control" type="text" required value={this.state.username} onChange={this.onChangeUsername} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" >Role:</label>
                        <div className="col-sm-3">
                            <input className="col-sm-10 form-control" type="text" required value={this.state.role} onChange={this.onChangeRole} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" >firstName:</label>
                        <div className="col-sm-3">
                            <input className="col-sm-10 form-control" type="text" required value={this.state.firstName} onChange={this.onChangeFirstName} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">LastName:</label>
                        <div className="col-sm-3">
                            <input className="col-sm-10 form-control" type="text" required value={this.state.lastName} onChange={this.onChangeLastName} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email:</label>
                        <div className="col-sm-3">
                            <input className="col-sm-10 form-control" type="text" required value={this.state.email} onChange={this.onChangeEmail} />
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
                            <button type="submit" className="btn btn-primary" >Update User</button>
                        </div>
                    </div>

                </form>
            </div>
        )
    }

}

export default EditUser