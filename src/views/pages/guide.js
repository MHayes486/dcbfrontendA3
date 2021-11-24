import App from "../../App";
import { html, render } from "lit-html";
import Auth from "../../Auth";
import Utils from "../../Utils";
import UserApi from "../../UserAPI";
import Toast from "../../Toast";

class GuideView {
  init() {
    document.title = "Guide";
    this.render();
    Utils.pageIntroAnim();
    this.updateCurrentUser();
  }

  async updateCurrentUser() {
    try {
      const updatedUser = await UserApi.updateUser(
        Auth.currentUser._id,
        { newUser: false },
        "json"
      );
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  render() {
    const template = html`
      <style>
        .left {
          text-align: left;
        }
      </style>
      <dcb-app-header
        title="Guide"
        user="${JSON.stringify(Auth.currentUser)}"
      ></dcb-app-header>
      <div class="page-content calign">
        <h2 class="brand-color">
          Welcome to Dental Concepts Bendigo, ${Auth.currentUser.firstName}!
        </h2>
        <hr />
        <h3>Who is DCB?</h3>
            <p class="left">
              Since opening in 2004, we have been assisting the people of
              Bendigo with their gums, teeth and most importantly smiles.
            </p>
            <div class="highlight">
              <p>
                Our patients are more than clients to us, each patient is an
                individual with individual needs. We take a holistic approach to
                dental care, focused around you, our patients.
              </p>
            </div>
            <p class="left">
              Lead by Dr Sandra Webb, with Dr Nikki Crawford, Dr James Richards
              and Dr Criag Miller our aim is to use the latest dental technology
              and training to achieve the best results for you and your family.
            </p>
            <div class="highlight">
              <h4>New patients always welcome.</h4>
            </div>
        <hr />
        <p>
          This is a quick tour to teach you the basics of using Dental Concepts
          Bendigo's online booking app ...
        </p>

        <div class="guide-step">
          <h3>To find an appointment:</h3>
        </div>
          <container class="guideGrid">
            <div><h4>Click "Book an appointment" -></h4></div>
            <div><h4>Answer the questionaire -></h4></div>
            <div>
              <h4>Select your appointment date and time and confirm</h4>
            </div>
            <div>
              <img
                src="/images/guide1.png"
                alt="Select book an appointment"
              />
            </div>
            <div>
              <img
                src="/images/guide2.png"
                alt="Select your appointment type"
              />
            </div>
            <div>
              <img
                src="/images/guide3.png"
                alt="Click book now"
              /></div>
            </div>
          </container>

        <sl-button type="primary" @click=${() => gotoRoute("/")}
          >Okay got it!</sl-button
        >
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new GuideView();
