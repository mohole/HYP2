import React from "react";
import "./Home.scss";
import arrow from "./../icone/arrow.svg";
import userImg from "./../icone/icona-foto.svg";
import axios from 'axios';
import Header from "./../components/Header";
import Loading from "./../components/Loader";

import Ribbon from "./../components/Ribbon";

class SummaryStudents extends React.Component{
    render(){
        return(
            <section className="summary">
               
                <img src={userImg} alt="img_students" width="130" height="130"/>
                <p>{this.props.studentData.username}</p>
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
                        <defs>
                        <linearGradient id="linear-gradient" gradientTransform="rotate(65)">
                            <stop offset="0%" stopColor="#ff2915"/>
                            <stop offset="100%" stopColor="#ffdd47"/>
                        </linearGradient>
                        </defs>
                            <circle r="15.9154943092" cy="20" cx="20" />
                            <circle className="second"  r="15.9154943092" cy="20" cx="20" strokeDashoffset="25" transform="rotate(-90,20,20)" stroke="url(#linear-gradient)"/>
                        </svg>
                    </div>
                </section>
            </section>

        );
    }
}
class SummaryRewards extends React.Component{
    
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };

    let token;
    setTimeout(() => {
      if (localStorage.getItem("user")) {
        token = JSON.parse(localStorage.getItem("user")).token;
      }
      // strapi filter
      Promise.all([
        axios
          .get(
            "https://node.mohole.it/lessons",
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(response => response.data)
      ]).then(([lessons]) => {
        this.setState({
          lessons: lessons,
          loading: false
        });
        console.log(this.state);
      });
    }, 1);

  } // end constructor

  
  render() {
    if (this.state.loading) {
      return (
         <p>in caricamento</p>
      );
    } else {
      const RibbonClasses = this.state.lessons.map((p) => {
        var data = new Date();
        var data_fine = new Date(p.end_date);

        // console.log(data_fine)
        console.log(p);
        // console.log(p.students)
        // p.students.find(stud => {
        //   console.log(stud)

        // if (stud.name == JSON.parse(localStorage.getItem('user')).id) {
        //     console.log('ok')
            if (data < data_fine) {
              return <Ribbon key={p.id} title={p.title} classi='card-rewards'/>;
            }
        

        // } else {
        //   return(
        //     <p> Nessuna lezione </p>
        //   )
        // }
        // });
      });
      return (
        <>
          <div className="summary-rewards">{RibbonClasses}</div>
        </>
      );
    }
  }
}

class SummaryLesson extends React.Component{
    render(){
        return(
            <section className="summary-lessonDay">
                <p>Lunedì 2 Aprile</p>
                <p>Workshop | Mobile App</p>
                <p>Zinetti</p>
                <p>Armando</p>
                <p>14:30 - 18:00</p>
                <p className="scrolla"> <img src={arrow} alt="scrolla"/></p>
            </section>
        );
    }
}


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            loading:true
        });
        let token;
        setTimeout(() => {
            if(localStorage.getItem('user')){
                token=JSON.parse(localStorage.getItem('user')).token;
            }
       
            Promise.all([
                axios
                .get(`https://node.mohole.it/users/${JSON.parse(localStorage.getItem('user')).id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                })
                .then(response =>response.data),
              ]).then(([studentCorrent]) => {
                this.setState({
                    student:studentCorrent,
                    loading: false
                });
              });
        }, 1);
    }
   
    render(){
        if(this.state.loading){
            return(
                <>
                <Header titoloPagina='Home'/>
                <Loading />
                </>
            )
        }else{
            return(
                <>
                <Header titoloPagina='Home'/>
                    <main className="container-home">
                        <section className="real-container">
                            <SummaryStudents studentData={this.state.student} />
                            <SummaryRewards />
                            <SummaryLesson />
                        </section>
                            
                    </main>
                </>
            );
        }
        
            
    }
}

export default Home;