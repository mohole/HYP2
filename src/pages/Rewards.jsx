import React from "react";
import "./Rewards.scss";
import Header from "./../components/Header";
import axios from "axios";
import Loader from "./../components/Loader";
import Ribbon from "./../components/Ribbon";

// import ReactBodymovin from "react-bodymovin";
// // import bodymovin from "./../animation/lottie";
// import ufoJSON from "./../animation/ufo.json";


class Rewards extends React.Component {
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
        <>
          <Header titoloPagina="Rewards" />
         <Loader />
        </>
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
            if (data > data_fine) {
              return <Ribbon key={p.id} title={p.title} classi='card-rewards finito'/>;
              // console.log('corso finito')
            } else {
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
          <Header titoloPagina="Rewards" />
          <div className="content content-rewards">{RibbonClasses}</div>
        </>
      );
    }
  }
}

export default Rewards;
