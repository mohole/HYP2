import React from "react";
import "./Tabbar.scss";
import Eventi from "./../pages/Eventi";
import Rooms from "./../pages/Rooms";
import Home from "./../pages/Home";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import icona1 from "../icone/clock.svg";

function Orario() {
  return (
    <main className="container-rewards">
      <header />
      <h2>Feedback e rewards</h2>
    </main>
  );
}
function Note() {
  return (
    <main className="container-getback">
      <header />
      <h2> Get back</h2>
    </main>
  );
}

class Tabbar extends React.Component {
  constructor() {
    super();
    this.state = {
      active: "3",
      page: "/",
      notifiche: {
        rooms: 2,
        note: 0,
        orario: 3,
        eventi: 0,
        index: 4
      }
    };
    // this.animateTabbar = this.animateTabbar.bind(this);
  }

  componentDidMount() {
    let selector = document.getElementById("selector");
    let activeItem = document.getElementsByName("focus")[0];

    // in caso di refresh
    if (localStorage.getItem('paginaCorrente') !== null) {
        let local = localStorage.getItem('paginaCorrente');

        let item = document.querySelectorAll('[data-label="'+local+'"]')[0];
        item.setAttribute("name", "focus");
        // console.log(item);
        // console.log(local)
        return activeItem = item;
    }

    selector.style.width = activeItem.clientHeight + "px";
    selector.style.height = activeItem.clientHeight + "px";
    selector.style.left =
      activeItem.offsetLeft + (activeItem.clientHeight / 100) * 10 + "px";
    // console.log(activeItem);

    // notifiche
    if (this.state.notifiche.rooms !== 0) {
      let span = document.getElementById("span-rooms");
      span.append(this.state.notifiche.rooms);
    } else {
      let span = document.getElementById("span-rooms");
      span.style.display = "none";
    }
    if (this.state.notifiche.note !== 0) {
      let span = document.getElementById("span-note");
      span.append(this.state.notifiche.note);
    } else {
      let span = document.getElementById("span-note");
      span.style.display = "none";
    }
    if (this.state.notifiche.orario !== 0) {
      let span = document.getElementById("span-orario");
      span.append(this.state.notifiche.orario);
    } else {
      let span = document.getElementById("span-orario");
      span.style.display = "none";
    }
    if (this.state.notifiche.eventi !== 0) {
      let span = document.getElementById("span-eventi");
      span.append(this.state.notifiche.eventi);
    } else {
      let span = document.getElementById("span-eventi");
      span.style.display = "none";
    }
    if (this.state.notifiche.index !== 0) {
      let span = document.getElementById("span-index");
      span.append(this.state.notifiche.index);
    } else {
      let span = document.getElementById("span-index");
      span.style.display = "none";
    }

  }

  animateTabbar(e) {
    // e.preventDefault();

    var list = e.target.parentElement.parentNode.children;
    for (var i = 0; i < list.length; i++) {
      list[i].removeAttribute("name", "focus");
    }

    let el = e.target;

    setTimeout(function() {
      el.parentElement.setAttribute("name", "focus");
    }, 300);

    let selector = document.getElementById("selector");

    selector.style.width = e.target.parentNode.clientHeight + "px";
    selector.style.height = e.target.parentNode.clientHeight + "px";
    selector.style.left =
      el.parentElement.offsetLeft +
      (e.target.parentNode.clientHeight / 100) * 10 +
      "px";

    selector.classList.add("thinmoment");
    setTimeout(function() {
      selector.classList.remove("thinmoment");
    }, 600);

    // let reset = e.target.parentNode.dataset.label;
    e.target.parentNode.firstChild.style.display = "none";
    this.setState({
      notifiche: {
        ...this.state.notifiche,
        [e.target.parentNode.dataset.label]: 0
      }
    });
    // console.log(this.state);
    localStorage.setItem('paginaCorrente', e.target.parentNode.dataset.label);

  }

  render() {
    return (
      <>
        <Router>
          <section className="home">
            <nav id="tabbar" className="tabs tabbar">
              <div id="selector" />
              <Link
                to="/orario"
                onClick={this.animateTabbar.bind(this)}
                href="home"
                data-label="orario"
              >
                <span id="span-orario" />
                <svg
                  id="0"
                  x="0px"
                  y="0px"
                  viewBox="0 0 55 55"
                  width="35px"
                  height="35px"
                >
                  <path
                    d="M36.85,65.34h-3.8c-.35,0-.7-.11-1-.14-1.54-.12-2.07-.67-2.08-2.21a6.65,6.65,0,0,0-1.09-3.7,6.75,6.75,0,0,0-10.38-1c-1.07,1-1.79,1.11-2.87.1-1.41-1.33-2.78-2.7-4.09-4.13-1.09-1.19-1-1.81.09-3A6.45,6.45,0,0,0,13,44a6.42,6.42,0,0,0-6-4.14c-1.44-.06-2.17-.72-2.21-2.14-.05-1.74,0-3.48,0-5.22S5,29.93,7.26,29.84a6.49,6.49,0,0,0,5.15-2.78,6.66,6.66,0,0,0-.8-8.68c-.95-1-1-1.74-.11-2.73q2.07-2.2,4.28-4.26c1.11-1,1.81-.93,2.93.09a6.78,6.78,0,0,0,6.43,1.73,6.64,6.64,0,0,0,5-6.5c0-1.26.57-2,1.78-2,2.07-.06,4.15-.07,6.22,0,1.32,0,1.85.73,1.84,2.05a6.71,6.71,0,0,0,11.48,4.87c1.06-1,1.78-1.11,2.86-.09C55.83,13,57.25,14.49,58.69,16a1.49,1.49,0,0,1,.35,1.7,3.35,3.35,0,0,1-.69.95,6.68,6.68,0,0,0,2.81,11.11,10.45,10.45,0,0,0,2.1.33,2,2,0,0,1,1.95,2c0,.33.09.66.14,1v3.8c-.06.49-.12,1-.19,1.46A1.73,1.73,0,0,1,63.25,40a8.06,8.06,0,0,0-1.48.12,6.7,6.7,0,0,0-3.48,11.4c.94,1,1,1.76.12,2.74-1.42,1.5-2.9,3-4.41,4.37a1.7,1.7,0,0,1-2.7-.11,7,7,0,0,0-4.75-2,6.64,6.64,0,0,0-6.79,6.61c0,1.46-.58,2-2,2.13A8.7,8.7,0,0,0,36.85,65.34Zm8.28-30.42a10.14,10.14,0,1,0-10,10.22A10.13,10.13,0,0,0,45.13,34.92Z"
                    transform="scale(0.8)"
                  />
                </svg>
              </Link>
              <Link
                to="/note"
                onClick={this.animateTabbar.bind(this)}
                data-label="note"
                href="home"
              >
                <span id="span-note" />
                <svg
                  transform="scale(0.8)"
                  id="1"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 55 55"
                  width="35px"
                  height="35px"
                >
                  <g>
                    <path
                      d="M3,43c0.552,0,1-0.447,1-1c0-1.654,1.346-3,3-3s3,1.346,3,3c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.757-2.243-5-5-5
		s-5,2.243-5,5C2,42.553,2.448,43,3,43z"
                    />
                    <path
                      d="M3,37c0.552,0,1-0.447,1-1c0-1.654,1.346-3,3-3s3,1.346,3,3c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.757-2.243-5-5-5
		s-5,2.243-5,5C2,36.553,2.448,37,3,37z"
                    />
                    <path
                      d="M3,31c0.552,0,1-0.447,1-1c0-1.654,1.346-3,3-3s3,1.346,3,3c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.757-2.243-5-5-5
		s-5,2.243-5,5C2,30.553,2.448,31,3,31z"
                    />
                    <path
                      d="M3,25c0.552,0,1-0.447,1-1c0-1.654,1.346-3,3-3s3,1.346,3,3c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.757-2.243-5-5-5
		s-5,2.243-5,5C2,24.553,2.448,25,3,25z"
                    />
                    <path
                      d="M4,18c0-1.654,1.346-3,3-3s3,1.346,3,3c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.757-2.243-5-5-5s-5,2.243-5,5
		c0,0.553,0.448,1,1,1S4,18.553,4,18z"
                    />
                    <path
                      d="M52.003,0.004H50h-7H19V0H6v7.101C3.721,7.566,2,9.585,2,12c0,0.553,0.448,1,1,1s1-0.447,1-1c0-1.654,1.346-3,3-3
		s3,1.346,3,3c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.415-1.721-4.434-4-4.899V2h9v54H8v-4v-3c0-0.553-0.448-1-1-1s-1,0.447-1,1v1.815
		C4.839,50.401,4,49.302,4,48c0-1.654,1.346-3,3-3s3,1.346,3,3c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.757-2.243-5-5-5s-5,2.243-5,5
		c0,2.415,1.721,4.434,4,4.899V58h11h2h24h7h2.003C54.207,58,56,56.207,56,54.004V4C56,1.797,54.207,0.004,52.003,0.004z M19,56
		V2.004h24V56H19z M45,56V2.004h3V56H45z M54,54.004C54,55.104,53.104,56,52.003,56H50V2.004h2.003C53.104,2.004,54,2.899,54,4
		V54.004z"
                    />
                  </g>
                </svg>
              </Link>
              <Link
                name="focus"
                to="/"
                onClick={this.animateTabbar.bind(this)}
                href="home"
                data-label="index"
              >
                <span id="span-index" />
                <svg
                  id="2"
                  x="0px"
                  y="0px"
                  viewBox="0 0 55 55"
                  width="35px"
                  height="35px"
                >
                  <path
                    d="M57.863,26.632L29.182,0L0.502,26.632c-0.404,0.376-0.428,1.009-0.052,1.414c0.374,0.404,1.009,0.427,1.413,0.052
	l3.319-3.082v33.349h16h16h16V25.015l3.319,3.082c0.192,0.179,0.437,0.267,0.681,0.267c0.269,0,0.536-0.107,0.732-0.319
	C58.291,27.641,58.267,27.008,57.863,26.632z M23.182,56.365v-16c0-3.309,2.691-6,6-6s6,2.691,6,6v16H23.182z M51.182,56.365h-14
	v-16c0-4.411-3.589-8-8-8s-8,3.589-8,8v16h-14V23.158l22-20.429l22,20.429V56.365z"
                  />
                </svg>
              </Link>
              <Link
                to="/rooms"
                onClick={this.animateTabbar.bind(this)}
                href="home"
                data-label="rooms"
              >
                <span id="span-rooms" />
                <svg
                  id="3"
                  x="0px"
                  y="0px"
                  viewBox="0 0 55 55"
                  width="35px"
                  height="35px"
                >
                  <g>
                    <path
                      d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
	c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
	L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
	c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
	c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
	l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
	L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
	c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
	c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
	L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
	c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
	l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
	c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"
                    />
                  </g>
                </svg>
              </Link>
              <Link
                to="/eventi"
                onClick={this.animateTabbar.bind(this)}
                href="home"
                data-label="eventi"
              >
                <span id="span-eventi" />
                <svg
                  id="4"
                  x="0px"
                  y="0px"
                  viewBox="0 0 55 55"
                  width="35px"
                  height="35px"
                >
                  <path
                    d="M49,0c-3.309,0-6,2.691-6,6c0,1.035,0.263,2.009,0.726,2.86l-9.829,9.829C32.542,17.634,30.846,17,29,17
	s-3.542,0.634-4.898,1.688l-7.669-7.669C16.785,10.424,17,9.74,17,9c0-2.206-1.794-4-4-4S9,6.794,9,9s1.794,4,4,4
	c0.74,0,1.424-0.215,2.019-0.567l7.669,7.669C21.634,21.458,21,23.154,21,25s0.634,3.542,1.688,4.897L10.024,42.562
	C8.958,41.595,7.549,41,6,41c-3.309,0-6,2.691-6,6s2.691,6,6,6s6-2.691,6-6c0-1.035-0.263-2.009-0.726-2.86l12.829-12.829
	c1.106,0.86,2.44,1.436,3.898,1.619v10.16c-2.833,0.478-5,2.942-5,5.91c0,3.309,2.691,6,6,6s6-2.691,6-6c0-2.967-2.167-5.431-5-5.91
	v-10.16c1.458-0.183,2.792-0.759,3.898-1.619l7.669,7.669C41.215,39.576,41,40.26,41,41c0,2.206,1.794,4,4,4s4-1.794,4-4
	s-1.794-4-4-4c-0.74,0-1.424,0.215-2.019,0.567l-7.669-7.669C36.366,28.542,37,26.846,37,25s-0.634-3.542-1.688-4.897l9.665-9.665
	C46.042,11.405,47.451,12,49,12c3.309,0,6-2.691,6-6S52.309,0,49,0z M11,9c0-1.103,0.897-2,2-2s2,0.897,2,2s-0.897,2-2,2
	S11,10.103,11,9z M6,51c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S8.206,51,6,51z M33,49c0,2.206-1.794,4-4,4s-4-1.794-4-4
	s1.794-4,4-4S33,46.794,33,49z M29,31c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S32.309,31,29,31z M47,41c0,1.103-0.897,2-2,2
	s-2-0.897-2-2s0.897-2,2-2S47,39.897,47,41z M49,10c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S51.206,10,49,10z"
                  />
                </svg>
              </Link>
            </nav>

            <Route path="/" exact component={Home} />
            <Route path="/orario" component={Orario} />
            <Route path="/note" component={Note} />
            <Route path="/rooms" component={Rooms} />
            <Route path="/eventi" component={Eventi} />
          </section>
        </Router>
      </>
    );
  }
}
export default Tabbar;
