import fs from 'fs';
import { unified } from 'unified';
import {rehype} from 'rehype';
import parse from 'rehype-parse';
import DOMparse from 'rehype-dom-parse'
import toHtml from 'rehype-stringify';
import toHtmlDOM from 'rehype-dom-stringify';
import transform from './transform.js';

const fullTree = () => tree => console.log(JSON.stringify(tree, null, 2));

const contents = unified()
  .use(parse)
  .use(transform)
  .use(toHtml)
  .processSync(fs.readFileSync(`${process.cwd()}/html/counterElement.html`))
  .toString();

const outputDir = `${process.cwd()}/html`;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(`${outputDir}/transform.html`, contents);