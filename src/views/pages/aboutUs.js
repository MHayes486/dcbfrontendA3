import App from "./../../App";
import { html, render } from "lit-html";
import Auth from "./../../Auth";
import Utils from "./../../Utils";

class AboutUsView {
  init() {
    document.title = "AboutUs";
    this.render();
    Utils.pageIntroAnim();
  }

  render() {
    const aboutUs = html`
      <dcb-app-header
        title="About Us"
        user="${JSON.stringify(Auth.currentUser)}"
      ></dcb-app-header>
      <div class="page-content">
        <h1>About Dental Concepts Bendigo</h1>

        <sl-tab-group>
          <sl-tab slot="nav" panel="general">About DCB</sl-tab>
          <sl-tab slot="nav" panel="webb">Dr Sandra Webb</sl-tab>
          <sl-tab slot="nav" panel="crawford">Dr Nikki Crawford</sl-tab>
          <sl-tab slot="nav" panel="richards">Dr James Richards</sl-tab>
          <sl-tab slot="nav" panel="miller">Dr Criag Miller</sl-tab>

          <sl-tab-panel name="general">
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
          </sl-tab-panel>
          <sl-tab-panel name="webb">
            <h2>Dr Sandra Webb</h2>
            <p>
              Our founding Dentist, Dr Sandra Webb has been with DCB since we
              opened over 10 years ago. Dr Webb is primarily focused on advanced
              dental techniques such as periodontal treatments, implant
              placements, advanced endodontics and smile restorations.
            </p>
          </sl-tab-panel>
          <sl-tab-panel name="crawford">
            <h2>Dr Nikki Crawford</h2>
            <p>
              Dr Nikki Crawford was the first dentist to join our practice in
              2009. Working closely with Dr Webb over the years Dr Crawford has
              gone from a new graduate dentist with little experience to our
              dedicated children's and young adults focused dentist at DCB.
            </p>
          </sl-tab-panel>
          <sl-tab-panel name="richards">
            <h2>Dr James Richards</h2>
            <p>
              Dr James Richards join DCB 5 years ago and has been our goto
              dentist for denture, crown and bridge and root canal treatments
              (endodontics) ever since.
            </p>
          </sl-tab-panel>
          <sl-tab-panel name="miller">
            <h2>Dr Criag Miller</h2>
            <p>
              Dr Criag Miller joined the clinic just over 2 years ago, and fills
              a more generalised role within the clinic, focusing on family and
              general dentistry.
            </p>
          </sl-tab-panel>
        </sl-tab-group>
      </div>
    `;
    render(aboutUs, App.rootEl);
  }
}

export default new AboutUsView();
