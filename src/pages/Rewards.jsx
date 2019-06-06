import React from "react";
import "./Rewards.scss";
import Header from "./../components/Header";

class Rewards extends React.Component{
    constructor(props){
        super(props);
        this.state={
         
        };

if ( JSON.parse(localStorage.getItem("user")).name &&
    JSON.parse(localStorage.getItem("user")).email) {
    console.log( )
}


    } // end constructor
    
    render(){
        return (
            <>
            <Header titoloPagina='Rewards'/>
            <div className="content">
                
            </div>
            </>
        )
    }
}

export default Rewards;