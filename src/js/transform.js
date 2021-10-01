import visit from 'unist-util-visit';

const transform = options => tree => {
    visit(
        tree,
        // searching
        node => {
            node.tagName = "lut-counter"
        },
        // transforming
        node => {
            console.log(node)
        }
    )
}

export default transform;
