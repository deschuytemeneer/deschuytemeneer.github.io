/**
 * A base element for all custom elements for this project. They're all block elements, and have a
 * single default slot.
 */
export class DMRElement extends HTMLElement {
  static defaultStyle = `
      :host {
        display: block;
        cursor: default;
      }
    `;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = DMRElement.defaultStyle;
    shadow.appendChild(style);

    const slot = document.createElement("slot");
    shadow.appendChild(slot);
  }
}
