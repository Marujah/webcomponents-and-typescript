const style = `<style>
.card {
  padding: 2em;
}


button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
</style>`
window.customElements.define(
  "my-counter",
  class extends HTMLElement {
    #shadow = this.attachShadow({ mode : 'open'});
    constructor() {
      super();
      this.#render();
    }

    get startValue(): string {
      return this.getAttribute('start-value') ?? "0";
    }

    get value(): number {
      return parseInt(this.getAttribute('value') ?? this.startValue);
    }

    set value(newVal: string) {
      this.setAttribute('value', newVal);
    }


    get template() {
      return  `<div class="card">
        <button id="counter" type="button">count is ${this.value}</button>
      </div>`;
    }

    #render() {
      this.#shadow.innerHTML = `${style} ${this.template}`;
    }

    #addClick() {
      this.addEventListener('click', () => {
        this.value = (this.value + 1).toString()
      })
    }

    #removeClick() {
      this.removeEventListener('click', () => {
        this.value = (this.value + 1).toString()
      })
    }

    static get observedAttributes() {
      return ['startValue', 'value'];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (name === 'startValue' || name === 'value') {
        if (oldValue !== newValue) {
          this.#render();
        }
      }
    }
    connectedCallback() {
      this.#addClick();
    }
    disconnectedCallback() {
      this.#removeClick();
    }
  }
);
