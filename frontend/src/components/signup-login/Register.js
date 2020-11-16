import React from 'react';
import axios from 'axios';
import Navbar from "react-bootstrap/Navbar";
import Footer from "../Footer";
import './Register.css';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            conf_password: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = this.state;
        // const url = 'http://localhost:5000/register';

        // fetch(url, {
        //     method: 'post',
        //     body: JSON.stringify(data),
        //     headers: { "Content-Type": "application/json" }
        // })
        //     .then((res) => res.json())
        //     .then(json => {
        //         console.log(json);
        //         this.setState({
        //             isRegistered: json.isRegistered,
        //         });
        //     });
        axios.post('/', data)
            .then(res => {
                console.log(res);
                if(res.data){
                    console.log('Registration Successful!');
                    this.setState({
                        redirecTo: '/'
                    });
                }
                else{
                    console.log('Registration Error');
                }
            })
            .catch(err => {
                console.log('Registration server error');
                console.log(err);
            });
    

    }

    render() {
        return (
            <>
            <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">
                        <strong>Algo-Visual</strong>
                    </Navbar.Brand>
            </Navbar>
            <div className="login_container">
                <div className="Registerform-container">
                    <form onSubmit={this.handleSubmit}>

                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange}
                        placeholder="email"
                        ></input>

                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange}
                        placeholder="Password"
                        ></input>
    
                        <input type="password" name="conf_password" value={this.state.conf_password} onChange={this.handleChange}
                        placeholder="Confirm Password"
                        ></input>
                        
                        <input type="submit" value="Register"></input>
                        <br></br>
                        <br></br>
                        <a href='/'>Already have an account?</a>
                    </form>

                </div>
            </div>
            <Footer />
            </>
        );
    }
}

export default Register;