import React from "react";
import "./Rewards.scss";
import Header from "./../components/Header";
import axios from "axios";

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

      Promise.all([
        axios
          .get("https://node.mohole.it/lessons", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => response.data)
      ]).then(([lessons]) => {
        this.setState({
          lesson: lessons,
          loading: false
        });
      });
    }, 3000);

    
  } // end constructor

  render() {
    if (this.state.loading) {
      return (
        <>
        <Header titoloPagina="Rewards" />
          <p>in caricamento</p>
        </>
      );
    } else {
      return (
        <>
          <Header titoloPagina="Rewards" />
          <div className="content" />
        </>
      );
    }
  }
}

export default Rewards;
