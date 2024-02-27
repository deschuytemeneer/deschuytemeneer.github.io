import { DMRElement } from "./base-element.js";

/**
 * A Toggle is like a simple interactable element that is either in "toggled on" state (has the
 * attribute `toggled-on`), or in "toggled off" state (has the attribute `toggled-off`). When
 * clicked, emits a `toggle` event with an object detail payload with one property: `isToggledOn`,
 * that reflects the current state of the element.
 * 
 * This custom element purposefully has no visual part; it is up to the user of this element to
 * use the slot of a Toggle to create this visual part. One can easily style the slot contents then
 * according to the state using the aforementioned attributes:
 * 
 * ```css
 * dmr-toggle[toggled-on] { }
 * dmr-toggle[toggled-off] { }
 * ```
 */
export class Toggle extends DMRElement {
  #isToggled = false;

  constructor() {
    super();
    this.mapStateToAttributes();
  }

  connectedCallback() {
    this.addEventListener("click", this.handleClick.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick.bind(this));
  }

  mapStateToAttributes() {
    if (this.#isToggled) {
      this.setAttribute("toggled-on", "");
      this.removeAttribute("toggled-off");
    } else {
      this.setAttribute("toggled-off", "");
      this.removeAttribute("toggled-on");
    }
  }

  handleClick() {
    this.#isToggled = !this.#isToggled;
    this.mapStateToAttributes();

    this.dispatchEvent(
      new CustomEvent("toggle", { bubbles: true, detail: { isToggledOn: this.#isToggled } })
    );
  }
}

customElements.define("dmr-toggle", Toggle);
