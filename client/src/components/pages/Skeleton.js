import React, { Component } from "react";
import GraphingPanel from "../modules/GraphingPanel.js";
import NewFunctionInput from "../modules/NewFunctionInput.js";
import SingleFunction from "../modules/SingleFunction.js";
import NavBar from "../modules/NavBar.js";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Redirect } from "@reach/router";


import { get } from "../../utilities";
import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "511281853920-t004vd2ldi1trng5tj06ubin80bm6j1h.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    // Initialize Default State
  }

  componentDidMount() {
    document.title = "Home";
    get("/api/functions").then((functionObjs) => {
      this.setState({ functions: functionObjs.reverse() });
    });
    const progress = localStorage.getItem("progress")
    if (progress == null){
        localStorage.setItem('progress', "/select/")
    }
  }

  addNewFunction = (functionObj) => {
    this.setState({
      functions: [functionObj].concat(this.state.functions),
    });
  };

  deleteOldFunction = (id) => {
    this.setState({
      functions: this.state.functions.filter((functionObj) => (
        functionObj._id!=id))
    });
  };


  render() {
    if (this.props.userId && this.state.redirect === true) {
      return <Redirect push to={localStorage.getItem('progress')
    }/>;
    }
    return (
      <>
    <div className="Grid-background">
        <div className = "Graphiti-logo"/>
        <section class="u-textCenter front-text u-bold">
          <p> Embrace your inner artsy, math nerd and make drawings with function graphs! Graphiti away!</p>
        </section>
        <section class="u-textCenter">
        {this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              render={(renderProps) => (
                <button
                  className= "Get-started"
                  onClick={renderProps.onClick}
                >
                  Log out
                </button>
              )}
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={(obj)=>{this.props.handleLogin(obj); this.setState({redirect: true})}}
              onFailure={(err) => console.log(err)}
              render={(renderProps) => (
                <button
                  className= "Get-started"
                  onClick={renderProps.onClick}
                >
                  Log in with Google & Start creating! 
                </button>
              )}
            />
          )}
        </section>
    </div>
      </>
    );
  }
}

export default Skeleton;
