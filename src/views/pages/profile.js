import App from "./../../App";
import { html, render } from "lit-html";
import Auth from "./../../Auth";
import Utils from "./../../Utils";
import moment from "moment";

class ProfileView {
  init() {
    document.title = "Profile";
    this.render();
    Utils.pageIntroAnim();
  }

  render() {
    const template = html`
      <dcb-app-header
        title="Profile"
        user="${JSON.stringify(Auth.currentUser)}"
      ></dcb-app-header>
      <div class="page-content calign">
        ${
          Auth.currentUser && Auth.currentUser.avatar
            ? html`
                <sl-avatar
                  style="--size: 200px; margin-bottom: 1em;"
                  image=${Auth.currentUser && Auth.currentUser.avatar
                    ? `${App.apiBase}/images/${Auth.currentUser.avatar}`
                    : ""}
                ></sl-avatar>
              `
            : html`
                <sl-avatar
                  style="--size: 200px; margin-bottom: 1em;"
                ></sl-avatar>
              `
        }
        <h2>
          ${Auth.currentUser.title} ${Auth.currentUser.firstName}
          ${Auth.currentUser.lastName}
        </h2>
        <h4>
          Contact: ${Auth.currentUser.email} ||
          ${Auth.currentUser.contactNumber}
        </h4>

        <h5>
          Updated:
          ${moment(Auth.currentUser.updatedAt).format("MMMM Do YYYY, @ h:mm a")}
        </h5>
                  <sl-button type="warning" class="submit-btn" @click=${() =>
                    gotoRoute("/editProfile")}
            >Edit Profile</sl-button
          >
          
        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new ProfileView();
