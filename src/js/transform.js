import { visit } from 'unist-util-visit';
import { visitParents } from 'unist-util-visit-parents';
import { is } from 'unist-util-is';

const blueToMds = {
    'lut-counter': {
        mdsTagName: 'MdsCounter',
        blueProps: {
            'value': {
                mdsName: 'value',
                value: '10'
            },
            'min': {
                mdsName: 'minimum',
                value: '10'
            },
            'max': {
                mdsName: 'maximum',
                value: '20'
            }
        }
    }
}

const transform = options => tree => {
    visit(
        tree,
        // searching
        node => 
            node.tagName === "lut-counter"
        ,
        // transforming
        node => {
            const mdsComp = blueToMds[node.tagName];
            const mdsTagName = blueToMds[node.tagName].mdsTagName;
            const blueProps = blueToMds[node.tagName].blueProps;

            node.tagName = mdsTagName
            const props = Object.keys(node.properties).map(prop => {
                const mdsProp = [
                    blueProps[prop].mdsName,
                    blueProps[prop].value 
                ];
                return mdsProp;
            })
            node.properties = Object.fromEntries(props);
            console.log(node);
        }
    );
}

export default transform;
