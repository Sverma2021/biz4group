import React from "react";
import LeftPan from "./leftPan";
import "./forgotPassword.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mail } from "../actions/AuthAction";

class ForgotPassWord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        email: ""
      },
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email.";
    }
    if (fields["email"]) {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "*email is not valid";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  handleSubmit = async event => {
    event.preventDefault();
    if (this.handleValidation()) {
      this.props.mail(this.state.fields).then(() => {
        if (this.props.mailData) {
          this.props.history.push("/resetPassword");
        }
      });
    }
  };

  render() {
    return (
      <div className="main-bg-img">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-4 col-lg-4 p-0">
              <LeftPan />
            </div>
            <div className="col-xs-12 col-md-8 col-lg-8">
              <div className="all-signin">
                <div className="form-racooda">
                  <div className="text-login">
                    <h1>Forgot Password</h1>
                    <p>
                      No worries! Enter your email and we will send you a reset.
                    </p>
                  </div>
                  <div>
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <input
                          type="email"
                          placeholder="example@gmail.com"
                          name="email"
                          value={this.state.fields.email}
                          onChange={this.handleChange.bind(this, "email")}
                        ></input>
                      </div>
                      <div className="proceed-racooda">
                        <button className="send-password" type="submit">
                          Send
                        </button>
                        <Link to={"/login"}>Cancel</Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mailData: state.authReducer.mailData,
  email: state.authReducer.email
});
const mapDispatchToProps = dispatch => bindActionCreators({ mail }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassWord);
