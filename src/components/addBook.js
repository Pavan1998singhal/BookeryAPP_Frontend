import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import FormData from 'form-data'
import axios from 'axios';

class AddBook extends Component{

    constructor(props){
        super(props);

        this.myRef = React.createRef();
        this.onChangeBookname = this.onChangeBookname.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangePages = this.onChangePages.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onBookImageChange = this.onBookImageChange.bind(this);
        this.onBookPDFChange = this.onBookPDFChange.bind(this);

        this.state = {
            token: '',
            username: '',
            bookname : '',
            author : '',
            pages : 0,
            date : new Date(),
            selectedBookImage: null,
            selectedBookPdf: null
        }
    }

    componentDidMount(){
        this.setState({
            username : localStorage.getItem('username'),
            token: localStorage.getItem('token')
        })
    }

    onChangeBookname(e){
        this.setState({
            bookname : e.target.value
        });
    }

    onChangeAuthor(e){
        this.setState({
            author : e.target.value
        });
    }

    onChangePages(e){
        this.setState({
            pages : e.target.value
        });
    }

    onChangeDate(date){
        this.setState({
            date : date
        });
    }

    onBookImageChange = (event) =>{
        this.setState({
            selectedBookImage: event.target.files[0]
        })
    }

    onBookPDFChange = (event) =>{
        this.setState({
            selectedBookPdf: event.target.files[0]
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        let callAPI = true;

        const { username, bookname, author, pages, date, selectedBookImage, selectedBookPdf } = this.state;

        formData.append("username", username);
        formData.append("bookname", bookname);
        formData.append("author", author);
        formData.append("date", date)
        formData.append("pages", pages);

        for(var i = 0; i< 2; i++){
            if(i == 0){
                if(selectedBookImage.type === 'image/png' || selectedBookImage.type === 'image/jpeg'){
                    formData.append("bookFiles", selectedBookImage)
                }
                else{
                    alert('Please select image only !!')
                    callAPI = false;
                }
            }
            if(i == 1){
                if(selectedBookPdf.type === 'application/pdf'){
                    formData.append("bookFiles", selectedBookPdf)
                }else{
                    alert('Please select pdf only !!')
                    callAPI = false;
                }
            }
        }

        for (var [key, value] of formData.entries()) { 
            console.log('hello',key, value);
        }

        if(callAPI){
            axios.post('http://localhost:8000/books/'+ this.state.username, formData, { headers: {"Authorization" : `Bearer ${this.state.token}`} })
            .then(res => {
                console.log('Response is->', res.data)
                if(res.data === 'Book already exist !!'){
                    alert(res.data);
                    this.setState({
                        username : '',
                        bookname : '',
                        author : '',
                        pages : '',
                        date : '',
                        selectedBookImage : null,
                        selectedBookPdf: null
                    })
                    this.props.history.push('/navbar')
                }
                else if(res.data === 'Book added successfully !!'){
                    alert(res.data);
                    this.setState({
                        username : '',
                        bookname : '',
                        author : '',
                        pages : '',
                        date : '',
                        selectedBookImage : null,
                        selectedBookPdf: null
                    })
                    this.props.history.push('/navbar')
                }
                else{
                    alert('Some Error Occured!!')
                    this.setState({
                        username : '',
                        bookname : '',
                        author : '',
                        pages : '',
                        date : '',
                        selectedBookImage : null,
                        selectedBookPdf: null
                    })
                    this.props.history.push('/navbar')
                }
            })
        }
    }
    
    render(){
        return(
            <div>
                <h3>Add Book</h3>

                <form onSubmit={this.onSubmit}>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" >Username:</label>
                        <div className="col-sm-3">
                            <input className="col-sm-10 form-control" type="text" required value={this.state.username}  readOnly />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" >Bookname:</label>
                        <div className="col-sm-3">
                            <input className="col-sm-10 form-control" type="text" required value={this.state.bookname} onChange={this.onChangeBookname} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" >Book Author:</label>
                        <div className="col-sm-3">
                            <input className="col-sm-10 form-control" type="text" required value={this.state.author} onChange={this.onChangeAuthor} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">No. of Pages:</label>
                        <div className="col-sm-3">
                            <input className="col-sm-10 form-control" type="number" required value={this.state.pages} onChange={this.onChangePages} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Date:</label>
                        <div className="col-sm-3">
                            <DatePicker className="col-sm-10 form-control" required selected={this.state.date} onChange={this.onChangeDate} /> 
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Book FrontPage Image:</label>
                        <div className="col-sm-3">
                            <input type="file" id="bookImage" name="bookImage" onChange={this.onBookImageChange} required />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Book PDF:</label>
                        <div className="col-sm-3">
                            <input type="file" id="bookPdf" name="bookPdf" onChange={this.onBookPDFChange} required/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-2 col-form-label">
                            <button type="submit" className="btn btn-primary" >Add Book</button>
                        </div>
                    </div>

                </form>

            </div>


        )
    }
}

export default AddBook