import App from "./../../App";
import Auth from "./../../Auth";
import { html, render } from "lit-html";
import Utils from "./../../Utils";

class SignUpView {
  init() {
    console.log("SignUpView.init");
    document.title = "Sign In";
    this.render();
    Utils.pageIntroAnim();
  }

  //sign up button handler
  signUpSubmitHandler(e) {
    e.preventDefault();
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.setAttribute("loading", "");
    const formData = e.detail.formData;

    // sign up using Auth
    Auth.signUp(formData, () => {
      submitBtn.removeAttribute("loading");
    });
  }

  render() {
    const template = html`
      <dcb-card-header></dcb-card-header>
      <div class="page-content card-content page-centered">
        <div class="">
          <div class="signinup-box">
            <img
              class="signinup-logo"
              src="/images/logo.svg"
              width="50%"
              height="50%"
            />
            <h1>Sign Up</h1>
            <sl-form class="form-signup" @sl-submit=${this.signUpSubmitHandler}>
              <div class="input-group">
                <sl-input
                  name="title"
                  type="text"
                  placeholder="Title"
                  required
                ></sl-input>
              </div>
              <div class="input-group">
                <sl-input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                ></sl-input>
              </div>
              <div class="input-group">
                <sl-input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                ></sl-input>
              </div>
              <div class="input-group">
                <sl-input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                ></sl-input>
              </div>
              <!--<div class="input-group">
              <sl-input name="dOB" type="date" required></sl-input>
            </div>-->
              <div class="input-group">
                <sl-input
                  name="contactNumber"
                  type="String"
                  placeholder="Contact Number"
                  required
                ></sl-input>
              </div>
              <div class="input-group">
                <sl-input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  toggle-password
                ></sl-input>
              </div>
              <!--<div class="input-group">
                <sl-radio-group name="accessLevel">
                  <sl-radio value="1">New Patient</sl-radio>
                  <sl-radio value="1">Current Patient</sl-radio>
                </sl-radio-group>
              </div>-->
              <sl-button
                type="warning"
                class="submit-btn"
                submit
                style="width: 100%;"
                >Sign Up</sl-button
              >
            </sl-form>
            <div class="card cardSml">
              <p>Have an account?</p>
              <button class="btn" @click=${() => gotoRoute("/signin")}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new SignUpView();
