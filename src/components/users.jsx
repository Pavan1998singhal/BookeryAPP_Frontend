import React, { Component } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';


const User = props => (
    <tr>
        <td><img className="rounded-circle" src= {process.env.PUBLIC_URL + `/${ props.user.avatar }`} width="40px" height="40px" /></td>
        <td>{props.user.username}</td>
        <td>{props.user.role}</td>
        <td>{props.user.firstName}</td>
        <td>{props.user.lastName}</td>
        <td>{props.user.email}</td>
        <td>
            <Link to={"/edit/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
        </td>
    </tr>
  )

class Users extends Component{

    constructor(props){
        super(props);
        
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            token : '',
            username : '',
            role : '',
            users: []
        }

    }

    componentDidMount(){
        axios.get('http://localhost:8000/users/', { headers: {"Authorization" : `Bearer ${this.state.token}`} })
            .then(response => {
                console.log('get all users is ->', response.data)

                this.setState({
                    users: response.data
                })

            })
    }

    componentWillMount(){
        this.setState({
            token : localStorage.getItem('token'),
            username : localStorage.getItem('username'),
            role : localStorage.getItem('role')
        })
    }

    deleteUser(id){
        console.log('hello delete user->', id)

        if(window.confirm('Are you really want to delete this user?')){
            console.log('confirmation')

            axios.delete('http://localhost:8000/users/'+id, { headers: {"Authorization" : `Bearer ${this.state.token}`} })
                .then(res => {
                    console.log(res.data)
                    alert(res.data)

                    this.setState({
                        users: this.state.users.filter(el => el._id !== id)
                    })
                })

            this.props.history.push('/navbar/users')

        }else{

            console.log('not confirm')
            this.props.history.push('/navbar/users')

        }
        
    }



    userList = () => {
        return this.state.users.map(currentUser => {
            return <User user={currentUser} deleteUser={this.deleteUser} key={currentUser._id}/>
        })
    }

    render(){
        const { token, username, role } = this.state

        return(
            <div>
                <h3>Users</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Avatar</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>

                </table>
            </div>
        )
    }
}

export default Users