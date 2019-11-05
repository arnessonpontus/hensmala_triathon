import React from "react";
import * as firebase from "firebase";

class Login extends React.Component {
  state = {
    isLoggedIn: false
  };

  render() {
    const logInUser = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword("hensmala.triathlon@gmail.com", "password1")
        .then(
          () => console.log("LOGGED IN!"),
          this.setState({ isLoggedIn: true })
        )
        .catch(e => console.log("error at log in: " + e));
    };
    const logOutUser = () => {
      firebase
        .auth()
        .signOut()
        .then(
          () => console.log("LOGGED OUT!"),
          this.setState({ isLoggedIn: false })
        )
        .catch(function(error) {
          console.log("error");
        });
    };

    if (firebase.auth().currentUser) {
      return (
        <div className="login">
          <h1>HEJ LENNART</h1>
          <button onClick={logOutUser}>LOGGA UT HÄR</button>
        </div>
      );
    } else {
      return (
        <div className="login">
          <h1>LOGIN</h1>
          <button onClick={logInUser}>LOGGA IN HÄR</button>
        </div>
      );
    }
  }
}

export default Login;
