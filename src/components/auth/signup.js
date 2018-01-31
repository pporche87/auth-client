import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions";

class Signup extends Component {
  onSubmit({ email, password }) {
    this.props.signupUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  renderField({ input, label, type, meta: { touched, error, warning}}) {
    return (
      <fieldset className="form-group">
        <label>{label}</label>
        <input 
          className="form-control"
          type={type}
          {...input}
        />
        { touched && error && <span className="text-danger">{error}</span>}
      </fieldset>
    );
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
        <Field 
          name="email"
          label="Email:"
          type="text"
          component={this.renderField}
        />
        <Field 
          name="password"
          label="Password:"
          type="password"
          component={this.renderField}
        />
        <Field 
          name="passwordConfirm"
          label="Confirm Password:"
          type="password"
          component={this.renderField}
        />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }
  
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  return errors;
} 

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: "signup",
  validate
})(connect(mapStateToProps, actions)(Signup));