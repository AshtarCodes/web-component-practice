// import { assert, expect } from 'chai';
// import { Card} from '../src/js/main';


    const createComponent = () => {
        const node = document.createElement('lut-counter');
        node.setAttribute('value', 10);
        node.setAttribute('min',0);
        node.setAttribute('max', 15);
        document.body.append(node);
        return node;
    }
const lutCounter = createComponent();

describe('Card component should exist', function(){
    it('Card should render', function(){
        assert.isOk(lutCounter)
    })

    it('shadow root should exist', function (){
        assert.isOk(lutCounter.shadowRoot)
    })

    describe('add/subtract', () => {
        it('should increment value when add button is clicked', () => {
            lutCounter.addButton.click();
            const val = Number(lutCounter.value);
            assert.strictEqual(val, 11)
        });
        it('should decrease by one when subtract button is clicked', () => {
            lutCounter.subtractButton.click();
            const val2 = Number(lutCounter.value);
            assert.strictEqual(val2, 10)
        })
        it('should update value in innerHTML of h3 element', () => {
            lutCounter.subtractButton.click();
            const h3 = Number(lutCounter.valueHeader.innerHTML);
            assert.strictEqual(h3, 9)
        })
    })
})



