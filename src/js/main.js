const template = document.createElement('template');
template.style = `
<style>
        :host {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .counter__display-text {
          background-color: var(--text-bg, #fff);
          color: var(--text-color, #000);
          font-size: var(--font-size, 16px);
        }
        button {
          background-color: #f0be5c;
          color: #000;
          border-radius: 40%;
          padding-inline: 10px;
          padding-block: 5px;
          border: 1px solid #000;
        }
      </style>
`;
template.setAttribute('id','card');
template.innerHTML = 
    `<button id="subtract" title="subtract">-</button>
    <h3 class="counter__display-text"></h3>
    <button id="add" title="add">+</button>
`;

class Card extends HTMLElement {
    constructor() {
        super();

        // 1. These run when the element is created

        // An shadow that is open, has a root that can be accessed from outside the element. Closed shadows are not accessible from outside the component. An example of a closed shadow is the <video> element. 
        const shadow = this.attachShadow({mode: 'open'});
        const clone = template.content.cloneNode(true);
        shadow.appendChild(clone);

        this.valueHeader = this.shadowRoot.querySelector('h3')
        this.valueHeader.innerHTML = this.value;

        this.subtractButton = this.shadowRoot.querySelector("#subtract")
        this.addButton = this.shadowRoot.querySelector("#add")
    }

   

    // 2. Method is called when the element is inserted into the document
    connectedCallback () {
        this.subtractButton.addEventListener('click', this.handleSubtract)
        this.addButton.addEventListener('click', this.handleAdd)
    }

    handleAdd = () => {
        const max = this.getAttribute('max');
        if(max) {
            if (+max <= this.value) return;
        }
        this.value = Number(this.value) + 1;
    }

    handleSubtract = () => {
        const min = this.getAttribute('min');
        if(min) {
            if (+min >= this.value) return;
        }
        this.value = Number(this.value) - 1;

    }


    // 3b. this method is called when the element is removed from the DOM
    disconnectedCallback () {
        // cleanup
        this.subtractButton.removeEventListener('click', this.handleSubtract)
        this.addButton.removeEventListener('click', this.handleAdd)
    }

    // list an array of attributes that should be observed - dynamic / listening   
    static get observedAttributes () {
        return ['value'];
    }

    // 3a. runs when one of the observed attributes changes
    attributeChangedCallback(name, oldVal, newVal) {
        // Where you update the DOM
        this.valueHeader.innerHTML = this.value;
    }

    // called when the element is moved to a new document - rarely used
    adoptedCallback() {}

    get value() {
        return this.getAttribute('value') 
    }

    set value(val) {
        this.setAttribute("value", val)
    }

    get min(){
        return this.getAttribute('min');
    }

    set min(val) {
        this.setAttribute('min', val)
    }

    get max() {
        return this.getAttribute('max')
    }
    set max(val) {
        this.setAttribute('max', val)
    }
    
}
// const container = document.getElementById('container')

// clone.addEventListener('click', () => alert('yeo'))
// container.appendChild(clone);

// const clone2 = template.content.cloneNode(true);
// container.appendChild(clone2);
customElements.define("lut-counter", Card);

function getCard (){
    return Card;
}