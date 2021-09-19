// import { assert, expect } from 'chai';
// import {Hello} from '../src/js/currentTest'
// import { Card} from '../public/js/main';

const createComponent = () => {
    const node = document.createElement('lut-counter');
    node.setAttribute('value', 10);
    node.setAttribute('min',0);
    node.setAttribute('max', 15);
    document.body.append(node);
    return node;
}
const lutCounter = createComponent();

describe('Hello should return a greeting string', function (){
    it('Hello should return Hello', function (){
        assert.strictEqual(Hello(), 'hello')
    })
})

describe('Card component should exist', function(){
    it('Card should render', function(){
        assert.isOk(lutCounter)
    })

    it('shadow root should exist', function (){
        assert.isOk(lutCounter.shadowRoot)
    })

    describe('add/subtract', () => {
        it('should increment value when add button is clicked', () => {
            lutCounter.shadowRoot.querySelector("#add").click();
            const val = Number(lutCounter.value);
            assert.isAbove(val, 10)
        });
        it('should decrease by one when subtract button is clicked', () => {
            lutCounter.shadowRoot.querySelector("#subtract").click();
            const val2 = Number(lutCounter.value);
            assert.isBelow(val2, 11)
        })
        it('should update value in innerHTML of h3 element', () => {
            const h3 = Number(lutCounter.valueHeader.innerHTML);
            console.log(h3);
            assert.strictEqual(h3, 10)
        })
    })
})


