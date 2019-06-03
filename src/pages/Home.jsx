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
                <main className="container-home">
                    <section className="real-container">
                        <section className="summary">
                            <img src="#" alt="img_students" width="120" height="120"/>
                            <p>Nome Studente</p>
                            <p>Corso Studente</p>
                            <sectione className="summary-lessons">
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </sectione>
                        </section>
                        <section className="summary-rewards">
                            <div className="achievement"></div>
                            <div className="achievement"></div>
                            <div className="achievement"></div>
                        </section>
                        <section className="summary-lessonDay">

                        </section>
                    </section>
                        
                </main>
            </>
        );
            
    }
}

export default Home;