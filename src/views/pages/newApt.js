import App from "./../../App";
import { html, render } from "lit-html";
import Auth from "./../../Auth";
import Utils from "./../../Utils";
import aptAPI from "../../aptAPI";
import Toast from "../../Toast";

class newAptView {
  init() {
    document.title = "New Appointment";
    this.render();
    Utils.pageIntroAnim();
  }

  //New apt button handler
  async newAptSubmitHandler(e) {
    e.preventDefault();
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.setAttribute("loading", "");
    const formData = e.detail.formData;

    try {
      // sign up using API
      await aptAPI.newApt(formData);
      submitBtn.removeAttribute("loading");
      Toast.show("Appointment added!");
      //reset form

      const radioInputs = document.querySelectorAll("sl-radio");
      if (radioInputs)
        radioInputs.forEach((radioInputs) =>
          radioInputs.removeAttribute("checked")
        );
    } catch (err) {
      Toast.show(err, "error");
      submitBtn.removeAttribute("loading");
    }
  }

  render() {
    const template = html`
      <dcb-app-header
        title="New Appointment"
        user="${JSON.stringify(Auth.currentUser)}"
      ></dcb-app-header>
      <div class="page-content">
        <h1>Add Appointment</h1>
        <sl-form class="page-form" @sl-submit=${this.newAptSubmitHandler}>
          <input type="hidden" name="dentist" value="${Auth.currentUser._id}" />

          <div class="input-group">
            <sl-input
              name="date"
              type="date"
              Placeholder="Date"
              required
            ></sl-input>
            <sl-input
              name="startTime"
              type="text"
              placeholder="Start Time"
              required
            ></sl-input>
            <sl-radio-group label="Type" required fieldset>
              <sl-radio name="type" value="1">Broken Tooth</sl-radio>
              <sl-radio name="type" value="2">Toothache</sl-radio>
              <sl-radio name="type" value="3">Toothache (Endodontic)</sl-radio>
              <sl-radio name="type" value="4">Check-up Exam</sl-radio>
              <sl-radio name="type" value="5">Initial Exam</sl-radio>
              <sl-radio name="type" value="6">Consultation</sl-radio>
              <sl-radio name="type" value="7">Toothache (other)</sl-radio>
            </sl-radio-group>
          </div>
          <sl-button type="warning" class="submit-btn" submit
            >Add Appointment</sl-button
          >
        </sl-form>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new newAptView();
