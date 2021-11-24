import App from "../../App";
import { html, render } from "lit-html";
import Auth from "../../Auth";
import Utils from "../../Utils";
import aptAPI from "../../aptAPI";
import Toast from "../../Toast";

class bookingView {
  async init() {
    document.title = "Book an Appointment";
    this.appointments = null;
    this.render();
    Utils.pageIntroAnim();
    await this.getApts();
  }

  async filterAppointments(aptType) {
    if (!aptType) {
      return;
    }

    this.appointments = await aptAPI.getApts();
    let availableApts = this.appointments.filter(
      (appointment) => appointment.avialable == true
    );
    console.log(this.appointments);
    this.appointments = availableApts;

    let filteredApts;

    filteredApts = this.appointments.filter(
      (appointment) => appointment.type == aptType
    );
    console.log("filtered");
    console.log(filteredApts);
    this.appointments = filteredApts;
    console.log("PostFilter");
    console.log(this.appointments);
    this.render();
  }

  clearFilterButtons() {
    //reset all buttons
    const filterBtns = document.querySelectorAll(".typeBtn");
    filterBtns.forEach((btn) => btn.removeAttribute("type"));
  }

  handleFilterBtn(e) {
    // this.clearFilterButtons();
    //set btn active
    // e.target.setAttribute("type", "checked");
    const values = e.target.getAttribute("value");
    let aptType;
    switch (values) {
      case "1":
        aptType = "Broken Tooth";
        break;
      case "2":
        aptType = "Toothache";
        break;
      case "3":
        aptType = "Toothache (Endodontic)";
        break;
      case "4":
        aptType = "Toothache (other)";
        break;
      case "5":
        aptType = "Initial Exam";
        break;
      case "6":
        aptType = "Check-up Exam";
        break;
      case "7":
        aptType = "Consultation";
        break;
    }
    console.log(aptType);
    this.filterAppointments(aptType);
  }

  clearFilters() {
    this.clearFilterButtons();
    this.getApts();
  }

  async handleBookingBtn(e) {
    try {
      const aptId = e.target.getAttribute("value");
      await aptAPI.updateApt(aptId);
      Toast.show("Your appointment is booked");
      await this.getApts();
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  async getApts() {
    try {
      this.appointments = await aptAPI.getApts();
      let availableApts = this.appointments.filter(
        (appointment) => appointment.avialable == true
      );
      console.log(this.appointments);
      this.appointments = availableApts;
      this.render();
    } catch (err) {
      Toast.show(err, "error");
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

        sl-radio{
          margin:0.5rem;
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
            : html`
                <div class="typeSelection">
                  <h2>What is your primary concern?</h2>
                  <sl-radio-group label="Appointment Type">
                    <sl-radio
                      class="typeBtn"
                      value="1"
                      @click="${this.handleFilterBtn.bind(this)}"
                      >Broken Tooth</sl-radio
                    >
                    <sl-radio
                      class="typeBtn"
                      value="2"
                      @click=${this.handleFilterBtn.bind(this)}
                      >Bleeding or sharp pain</sl-radio
                    >
                    <sl-radio
                      class="typeBtn"
                      value="3"
                      @click=${this.handleFilterBtn.bind(this)}
                      >Throbbing or swelling</sl-radio
                    >
                    <sl-radio
                      class="typeBtn"
                      value="4"
                      @click=${this.handleFilterBtn.bind(this)}
                      >Other pain</sl-radio
                    ><br />
                    <sl-radio
                      class="typeBtn"
                      value="5"
                      @click=${this.handleFilterBtn.bind(this)}
                      >New Patient Exam</sl-radio
                    >
                    <sl-radio
                      class="typeBtn"
                      value="6"
                      @click=${this.handleFilterBtn.bind(this)}
                      >Regular checkup</sl-radio
                    >
                    <sl-radio
                      class="typeBtn"
                      value="7"
                      @click=${this.handleFilterBtn.bind(this)}
                      >Treatment Consult</sl-radio
                    >
                  </sl-radio-group>
                </div>

                ${this.appointments.map(
                  (appointment) => html`
                    <sl-details
                      class="appointmentDetails"
                      summary="${appointment.date} ${appointment.startTime} Dr: ${appointment
                        .dentist.firstName}
                        ${appointment.dentist.lastName}"
                    >
                      <sl-button
                        type="warning"
                        @click=${this.handleBookingBtn.bind(this)}
                        value=${appointment._id}
                        >Book Now</sl-button
                      >
                      <ul>
                        <li>
                          Starting Time= ${appointment.startTime}
                          (${appointment.length}mins),
                        </li>
                        <li>Date= ${appointment.date},</li>
                        <li>Type= ${appointment.type},</li>
                        <li>
                          Dentist= ${appointment.dentist.title}
                          ${appointment.dentist.firstName}
                          ${appointment.dentist.lastName}
                        </li>
                      </ul>
                    </sl-details>
                  `
                )}
              `
        }
            </div>
          </div>
        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new bookingView();
