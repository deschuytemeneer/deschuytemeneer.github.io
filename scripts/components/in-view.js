import { DMRElement } from "./base-element.js";
import { repeat } from "../utils.js";

function generateTresholds(numberOfSteps) {
  const thresholds = repeat(numberOfSteps, (index) => (index + 1) / numberOfSteps);

  thresholds.push(0);
  return thresholds;
}

/**
 * An InView element tracks whether the contents of this element are currently in the viewport or
 * not. It has a `--intersection-ratio` CSS property in the root of this element that tracks the
 * current intersection ratio of the element's contents with the viewport.
 */
export class InView extends DMRElement {
  static observer = this.createObserver();

  /**
   * Creates the "global" IntersectionObserver that tracks the intersection of all InView elements.
   * Any subclass could override this to create their own IntersectionObserver instance.
   */
  static createObserver() {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target instanceof InView) {
            entry.target.handleIntersection(entry);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: generateTresholds(100),
      }
    );
  }

  connectedCallback() {
    InView.observer.observe(this);
  }

  disconnectedCallback() {
    InView.observer.unobserve(this);
  }

  /**
   * Called by the IntersectionObserver whenever it gets triggered.
   * @param {IntersectionObserverEntry} entry
   */
  handleIntersection(entry) {
    this.style.setProperty("--intersection-ratio", entry.intersectionRatio);
  }
}

customElements.define("dmr-in-view", InView);
