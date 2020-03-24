import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      registerStatus: ""
    };
  }

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onSubmitRegister = () => {
    fetch("https://mysterious-reef-18033.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          this.setState({ registerStatus: "pass" });
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          this.setState({ registerStatus: "fail" });
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <div>
        <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <div className="measure ">
              {this.state.registerStatus === "fail" ? (
                <p className="dark-red"> Unable to register </p>
              ) : (
                ""
              )}
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    name="name"
                    id="name"
                    onChange={this.onNameChange}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  onClick={this.onSubmitRegister}
                  className="b br3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Register"
                />
              </div>
              <div className="lh-copy mt3">
                Already a member{" "}
                <p
                  href="#0"
                  className="f6 link dim black db underline  dark-blue pointer"
                  onClick={() => onRouteChange("signin")}
                >
                  Sign In{" "}
                </p>
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default Register;
