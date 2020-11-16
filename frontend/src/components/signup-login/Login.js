import React from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom'
import Navbar from "react-bootstrap/Navbar";
import Home from "../home-page/Home";
import Footer from "../Footer";
import './Login.css';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            redirectTo: null
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
        // const data = this.state;
        //console.log(data);
        // const url = 'http://localhost:5000/login';
        // fetch(url, {
        //     method: 'post',
        //     body: JSON.stringify(data),
        //     headers: { "Content-Type": "application/json" }
        // })
        //     .then((res) => res.json())
        //     .then(json => console.log(json));
        axios.post('/login', {
                email: this.state.email,
                password: this.state.password
            })
            .then(res => {
                console.log('login response: ')
                console.log(res)
                if (res.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        email: res.data.email
                    })
                    // update the state to redirect to home
                    //possible error ============
                    this.setState({
                        redirectTo: '/home'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
    }
    render() {
        if(this.state.redirectTo){
            // return <Redirect to={{ pathname: this.state.redirectTo }} />
            return (<Home isLogged={true}/>);
        }
        else{
            return (
                <>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">
                        <strong>Algo-Visual</strong>
                    </Navbar.Brand>
			    </Navbar>
                <div className="login_container">
                    <div className="Loginform-container">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="email" value={this.state.email} onChange={this.handleChange}
                            placeholder="email"
                            ></input>
                            <input type="password" name="password" value={this.state.password} onChange={this.handleChange}
                            placeholder="password"
                            ></input>
                            <input type="submit" value="Login"></input>
                            <br></br>
                            <br></br>
                            <a href='/register'>Not yet registered?</a>
                        </form>
                    </div>
                </div>
                <Footer />
                </>
            );
        }
    }
}

export default Login;