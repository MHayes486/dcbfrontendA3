import App from "../../App";
import { html, render } from "lit-html";
import Auth from "../../Auth";
import Utils from "../../Utils";
import aptAPI from "../../aptAPI";
import Toast from "../../Toast";

class AptsView {
  async init() {
    document.title = "Appointments";
    this.appointments = null;
    this.render();
    Utils.pageIntroAnim();
    await this.getMyApts();
  }

  // removed in verision 1.1
  // async getApts() {
  //   try {
  //     this.appointments = await aptAPI.getApts();
  //     this.render();
  //   } catch (err) {
  //     Utils.errorBounceAnim();
  //     Toast.show(err, "error");
  //   }
  // }

  //get listing of appointments based on dentists login
  async getMyApts() {
    let myApts = null;
    try {
      this.appointments = await aptAPI.getApts();
      myApts = this.appointments.filter(
        (appointment) => appointment.dentist._id == Auth.currentUser._id
      );
      console.log(myApts);
      this.appointments = myApts;

      this.render();
    } catch (err) {
      Toast.show(err, "error");
      Utils.errorBounceAnim();
    }
  }

  render() {
    const template = html`
      <style>
        .filter-menu {
          display: flex;
          align-items: center;
        }

        .filter-menu > div {
          margin-right: 1em;
        }
      </style>

      <dcb-app-header
        title="Appointments"
        user="${JSON.stringify(Auth.currentUser)}"
      ></dcb-app-header>
      <div class="page-content">
      
        ${
          this.appointments == null
            ? html` <sl-spinner></sl-spinner>`
            : html`${this.appointments.map(
                (appointment) => html`
                  <sl-details
                    class="appointmentDetails"
                    summary="${appointment.type} ${appointment.date} available: ${appointment.avialable}"
                  >
                    <ul>
                      <li>Type= ${appointment.type},</li>
                      <li>
                        Starting Time= ${appointment.startTime}
                        (${appointment.length}mins),
                      </li>
                      <li>Date= ${appointment.date},</li>
                      ${appointment.patient.firstName != null
                        ? html` <sl-details
                            class="aptsPtsDetails"
                            summary="Patient=${appointment.patient.title}
                            ${appointment.patient.firstName}
                            ${appointment.patient.lastName}"
                          >
                            email= ${appointment.patient.email} || phone=
                            ${appointment.patient.contactNumber}
                          </sl-details>`
                        : html` <li>Available= ${appointment.avialable}</li> `}
                    </ul>
                  </sl-details>
                `
              )} `
        }
            </div>
          </div>
        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new AptsView();
