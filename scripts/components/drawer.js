import { DMRElement } from "./base-element.js";

/**
 * A Drawer interacts with a Toggle as in that it responds to the "toggle" event by setting its own
 * "opened" state to true. When the Drawer is in opened state, there is an "opened" attribute on the
 * element that we can use in CSS to style the contents of the drawer accordingly, such as:
 * 
 * ```css
 * dmr-drawer:not([opened]) .content {
 *  ... styling for when the drawer is closed
 * }
 * 
 * dmr-drawer[opened] .content {
 *  ... styling for when the drawer is opened
 * }
 * ```
 */
export class Drawer extends DMRElement {
  set opened(value) {
    if (value) {
      this.setAttribute("opened", true);
    } else {
      this.removeAttribute("opened");
    }
  }

  get opened() {
    this.hasAttribute("opened");
  }

  connectedCallback() {
    this.addEventListener("toggle", this.handleToggle.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener("toggle", this.handleToggle.bind(this));
  }

  handleToggle({ detail }) {
    this.opened = detail.isToggledOn;
  }
}

customElements.define("dmr-drawer", Drawer);
