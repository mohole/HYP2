import React from "react";

import logoTransp from "./../icone/logo-transp.png";
import "./Header.scss";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      
    };

  }

  componentDidMount() {
  }


  render() {
      return (
       <header>
           <img  src={logoTransp} alt=""/>
           <h1>{this.props.titoloPagina}</h1>
       </header>
    )
  }
}

export default Header;
