import React from "react";

class Home extends React.Component {
  handleSubmit(e) {
    console.log("hej");
  }

  render() {
    return (
      <div className="home">
        <h1>HENSMÅLA TRIATHLON 2020</h1>
        <h3>Anmälan</h3>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        ;
        <form className="form" method="post" onSubmit={this.handleSubmit}>
          <label>
            Name:
            <br />
            <input type="text" name="name" />
          </label>
          <label>
            Email:
            <br />
            <input type="text" name="email" />
          </label>
          <label>
            Description:
            <br />
            <input type="text" name="descr" />
          </label>
          <br />
          <br />
          <button>Send data!</button>
        </form>
      </div>
    );
  }
}

export default Home;
