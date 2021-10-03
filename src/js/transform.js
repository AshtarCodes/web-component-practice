import { visit } from 'unist-util-visit';
import { visitParents } from 'unist-util-visit-parents';
import { is } from 'unist-util-is';

/**
 * Ideas
 * Props as an array of objects. If length of blueProps !== length of mdsProps -> print comment to compare attributes. 
 * possibly check for the diff beforehand, and compile a data structure holding the difference in properties. 
 * 
 * */
const blueToMds = {
    'lut-counter': {
        mdsTagName: 'MdsCounter',
        blueTagName: 'lut-counter',
        blueProps: [
            {
                blueName: 'value',
                mdsName: 'value',
                value: '10'
            },
            {
                blueName: 'min',
                mdsName: 'minimum',
                value: '10'
            },
            {
                blueName: 'max',
                mdsName: 'maximum',
                value: '20'
            },
            {
                blueName: null,
                mdsName: 'color',
                value: ''
            }
        ]
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
       (node, i, parent) => {
            const mdsComp = blueToMds[node.tagName];
            const mdsTagName = mdsComp.mdsTagName;
            const blueProps = mdsComp.blueProps;

            node.tagName = mdsTagName

            /* One approach is to filter for same props and diff props. */
            const commonProps = blueProps.filter(prop => prop.mdsName && prop.blueName)
            const diffProps = blueProps.filter(prop => !prop.mdsName || !prop.blueName)

            /**
             * 1. Do we want to auto-add mds attrs even if blue doesn't have them? required vs optional ones
             * 2. Do we want to comment on blue attrs that don't map to mds? Probably
             */
            const props = blueProps.reduce((acc, prop) => {
                const { blueName, mdsName, value } = prop;
                
                // mds attrs that blue doesn't have
                if (!blueName && mdsName) {
                    // generate a comment per iteration, possibly using the function generateMdsComment.
                }

                // blue attrs that mds doesn't have
                if (blueName && !mdsName) {

                }

                if (mdsName && blueName) {
                    acc[mdsName] = value;
                }
                return acc;
            }, {});

            node.properties = props;
            
            // Create comment(s) about missing props
            let comment = generateMdsComment(node, mdsComp, diffProps)

            // insert the comment(s) just above the element. 
            comment.forEach(n => {
                parent.children.splice(i, 0, n)
            })
            
            // in-progress:  working on positioning comment and nodes correctly
            // console.log(tree.children[1].children[2].children)
            // console.log('NODE', node.position)
            // console.log('COMMENTS', parent.children.filter(n => n.type === 'comment').map(n => [n.value, n?.position?.start, n?.position?.end]));

        }
    );
}

/* TODO: Refactor to dynamically generate comments based on whether blue or mds is missing attrs/props. Pass in the mdsComp */
// Another idea is to make this as a closure that stores a comment array, and on each iteration of the blueProps.reduce function above, it pushes a new comment on a passing if check. 
function generateMdsComment (node, component, props ) {
    const { blueTagName, mdsTagName } = component;

    return [{
        type: 'comment',
        value: ` The following attributes of ${mdsTagName} are missing: ${props.map(p => p.mdsName)} `,
        position: {
            start: {
                line: Number(node.position.start.line) - 1,
                column: node.position.start.column
            },
            end: {
                line: Number(node.position.start.line) - 1,
                column: node.position.end.column
            }
        }
    },
    {
        type: 'text',
        value: '\n',
        position: {
            start: {
                line: Number(node.position.start.line) - 1,
                column: node.position.end.column
            },
            end: {
                line: Number(node.position.start.line) - 1,
                column: node.position.end.column + 3
            }
        }
    }
].reverse();
};

export default transform;
