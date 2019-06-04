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
                            <section className="summary-lessons">
                                <div className="first-box">
                                    <p className="percentage">75%</p>
                                    <svg className="circle" viewBox="0 0 40 40">
                                        <circle r="15.9154943092" cy="20" cx="20" />
                                        <circle className="second"  r="15.9154943092" cy="20" cx="20" strokeDashoffset="25" transform="rotate(-90,20,20)"/>
                                    </svg>
                                </div>
                                <div className="second-box">
                                <p className="percentage">75%</p>
                                    <svg className="circle" viewBox="0 0 40 40">
                                        <circle r="15.9154943092" cy="20" cx="20" />
                                        <circle className="second"  r="15.9154943092" cy="20" cx="20" strokeDashoffset="25" transform="rotate(-90,20,20)"/>
                                    </svg>
                                </div>
                            </section>
                        </section>
                        <section className="summary-rewards">
                            <div className="achievement"></div>
                            <div className="achievement"></div>
                            <div className="achievement"></div>
                            <div className="achievement"></div>
                            <div className="achievement"></div>
                            <div className="achievement"></div>

                        </section>
                        <section className="summary-lessonDay">
                            <p>Lunedì 2 Aprile</p>
                            <p>Workshop | Mobile App</p>
                            <p>Zinetti</p>
                            <p>Armando</p>
                            <p>14:30 - 18:00</p>
                            <p className="scrolla">scrolla</p>

                        </section>
                    </section>
                        
                </main>
            </>
        );
            
    }
}

export default Home;