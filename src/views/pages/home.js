import App from "./../../App";
import { html, render } from "lit-html";
import Auth from "./../../Auth";
import Utils from "./../../Utils";

class HomeView {
  init() {
    document.title = "Home";
    this.render();
    Utils.pageIntroAnim();
  }

  render() {
    const template = html`
      <dcb-app-header
        title="Home"
        user=${JSON.stringify(Auth.currentUser)}
      ></dcb-app-header>

      <div class="page-content calign">
        <h1 class="anim-in">Welcome ${Auth.currentUser.firstName}!</h1>
        <h2>What would you like to do today?</h2>

        <container class="homeGrid">
          <div>
            <button
              type="warning"
              class="mainBtn"
              @click=${() => gotoRoute("/profile")}
            >
              View your Profile
            </button>
          </div>

          <div class="imgBox">
            <img class="" src="/images/logo.svg" width="100%" height="100%" />
          </div>
          <div>
            ${Auth.currentUser.accessLevel == 1
              ? html` <button
                  type="warning"
                  class="mainBtn"
                  @click=${() => gotoRoute("/bookAppointment")}
                >
                  Book an Appointment
                </button>`
              : html`<button
                  type="warning"
                  class="mainBtn"
                  @click=${() => gotoRoute("/appointments")}
                >
                  View your Appointments
                </button>`}
          </div>
          <div>
            ${Auth.currentUser.accessLevel == 1
              ? html`<button
                  type="warning"
                  class="mainBtn"
                  @click=${() => gotoRoute("/guide")}
                >
                  Review the Guide
                </button>`
              : html`<button
                  type="warning"
                  class="mainBtn"
                  @click=${() => gotoRoute("/newAppointment")}
                >
                  Create Appointments
                </button>`}
          </div>
          <div>
            <button
              type="warning"
              class="mainBtn"
              @click=${() => gotoRoute("/aboutus")}
            >
              About us
            </button>
          </div>
        </container>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new HomeView();
