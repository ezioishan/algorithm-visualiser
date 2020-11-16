import React from "react";
import PathfindingVisual from "./PathfindingVisual";
import Header from "../Header";
import Footer from "../Footer";
import './Home.css';


function Home(props) {
    console.log(props);
    return (
        <div className="content">
            <Header isLoggedIn={props.isLogged}/>
            <PathfindingVisual />
            <Footer />
        </div>
    );
}

export default Home;
