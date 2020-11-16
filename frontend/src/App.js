import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// import Home from "./components/Home";
import Login from "./components/signup-login/Login";
import Register from "./components/signup-login/Register";
import Home from "./components/home-page/Home";

// function App() {
// 	return (
// 		<BrowserRouter>
// 			<div>
// 				<Switch>
// 					<Route path="/" component={Login} exact />
// 					<Route path="/home" component={Home} />
// 					<Route path="/register" component={Register} />
// 					<Route component={Error} />
// 				</Switch>
// 			</div>
// 		</BrowserRouter>
// 	);
// }

class App extends React.Component{
	constructor(){
		super();
		this.state = {
			loggedIn: false,
			email: null,
		};
		this.getUser = this.getUser.bind(this)
		this.componentDidMount = this.componentDidMount.bind(this)
		this.updateUser = this.updateUser.bind(this)
	}
	componentDidMount() {
		this.getUser()
	}
	
	updateUser (userObject) {
		this.setState(userObject)
	}
	
	getUser() {
		axios.get('/login').then(response => {
			console.log('Get user response: ')
			console.log(response.data)
			if (response.data.user) {
				console.log('Get User: There is a user saved in the server session: ');
				this.setState({
					loggedIn: true,
					email: response.data.user.email
				});
				console.log(this.state);
			} 
			else {
				console.log('Get user: no user');
				this.setState({
					loggedIn: false,
					email: null
				});
			}
		});
	}
	render(){
		return (
			<BrowserRouter>
				<Switch>
					{/* <Route path="/" render={() => <Home/>} exact /> */}
					<Route path="/" render={() => <Login updateUser={this.updateUser}/>} exact />
					<Route path="/register" render={() => <Register />} />
					{this.state.loggedIn && <Route path="/home" component={Home} loggedIn={this.state.loggedIn}/>}
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
