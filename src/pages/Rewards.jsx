import React from "react";
import "./Rewards.scss";
import Header from "./../components/Header";
import axios from "axios";
import Loader from "./../components/Loader";
import rewardsSvg from "./../icone/rewards.svg";

// import ReactBodymovin from "react-bodymovin";
// // import bodymovin from "./../animation/lottie";
// import ufoJSON from "./../animation/ufo.json";

class Ribbon extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="card-rewards"  key={this.props.k}>
        <div className="rewards-animation">
          <img src={rewardsSvg} alt="rewards logo" />
        </div>
        <p>{this.props.title}</p>
      </div>
    );
  }
}

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
            "https://node.mohole.it/lessons?students_contains=" +
              JSON.parse(localStorage.getItem("user")).id,
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
        // console.log(this.state);
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
      const classes = this.state.lessons.map((p) => {
        // var data = new Date();
        // var data_fine = new Date(p.end_date);

        // console.log(data_fine)
        console.log(p);
        // console.log(p.students)
        // p.students.find(stud => {
        //   console.log(stud)

        // if (stud.name == JSON.parse(localStorage.getItem('user')).id) {
        //     console.log('ok')
        //     if (data > data_fine) {
        //       console.log('corso finito')
        //     }
        return <Ribbon key={p.id} title={p.title} />;

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
          <div className="content content-rewards">{classes}</div>
        </>
      );
    }
  }
}

export default Rewards;
