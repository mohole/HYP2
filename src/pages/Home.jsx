import React from "react";
import "./Home.scss";
import axios from 'axios';


class Home extends React.Component{
    constructor(props){
        super(props);
      
        
    }
    
    render(){
        return(
            <>
                <header>
                    <h2>Home</h2>
                </header>
                <section className="container-home">
                    <main className="real-container">

                    </main>
                        
                </section>
            </>
        );
            
    }
}

export default Home;